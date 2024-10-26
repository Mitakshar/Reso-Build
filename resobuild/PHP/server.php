<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Headers: X-Requested-With,privatekey");
    header('Access-Control-Allow-Origin: http://localhost:3000');
    ini_set('max_execution_time', 300);
    $loud = 0;
    $uploadDir = 'uploads/';
    
    if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES['audio_file'])) {
        // Ensure 'uploads' directory exists
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $ogaudio = $_FILES['audio_file']['name'];
        $audioName2 = strtolower($ogaudio);
        $audioName = str_replace(' ', '', $audioName2);
        $audioSize = $_FILES['audio_file']['size'];
        $audioLoc = $uploadDir . $audioName;
        
        //$loud = isset($_POST["loud"]) ? intval($_POST["loud"]) : 0;
        $loud = -14;
        // Move the uploaded file to the 'uploads' directory
        if (move_uploaded_file($_FILES['audio_file']['tmp_name'], $audioLoc)) {
        
        
                // Call Python script
                $pythonScript = "scripts\analyse.py $audioLoc $loud";
                $command = "python $pythonScript";
                
                // Execute the command and capture the output
                $output = shell_exec($command);
                $jsonData = json_decode($output);
                
                
                if ($jsonData && isset($jsonData->normalized_file, $jsonData->final_loudness)) {
                    $loc = $jsonData->normalized_file;
                    $finall_loudness= $jsonData->final_loudness;
                    $true_peak = $jsonData->true_peak;
                    
                } else {
                    echo "Error decoding JSON or missing 'normalized_file' property.";
                }
                
                // Output the result in JSON format
                $result = array('status' => 'success', 'output' => 
                json_decode($output));
                
                // Send the appropriate CORS header
                header("Access-Control-Allow-Origin: http://localhost:3000");
                
                echo json_encode($result);
            
            
        
        } else {
            echo json_encode(array('status' => 'error', 'message' => 'Failed to move uploaded file.'));
        }
    } else {
        echo json_encode(array('status' => 'error', 'message' => 'No file uploaded.'));
    }
?>
