<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('max_execution_time', 700);
error_reporting(E_ALL);
header('Access-Control-Allow-Origin: http://localhost:3000');

$loud = 0;
$uploadDir = 'isolate/uploads/';
$output_dir = 'isolate/Output/';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["audio_file"])) {
    $uploadDirectory = "isolate/uploads/";
    $uploadedFilePath = $uploadDirectory . basename($_FILES["audio_file"]["name"]);
    
    if (move_uploaded_file($_FILES["audio_file"]["tmp_name"], $uploadedFilePath)) {
        // Execute Python script
        $pythonScript = "scripts/isolate.py";

        $command = "python $pythonScript $uploadedFilePath $output_dir ";
        exec($command);
        
        // Optionally, you can provide a success message
        $result = array(
             'URL'=> $output_dir,
             'Content'=> pathinfo(basename($_FILES["audio_file"]["name"]),PATHINFO_FILENAME),
             'original_audio' => $uploadedFilePath
            );
            
            
            echo json_encode($result);
            
    } else {
        echo "Error uploading file.";
    }
} else {
    echo "Invalid request.";
}
?>