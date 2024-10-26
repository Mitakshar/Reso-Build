<?php
$audioFilePath = '/output/normalized_output.wav';

// Create an array to hold the response
$response = array();

// Check if the audio file exists
if (file_exists($audioFilePath)) {
    // Add the audio file location to the response
    $response['audioFile'] = $audioFilePath;
    // Convert the response to JSON
    $jsonResponse = json_encode($response);
    // Set the content type header to JSON
    header('Content-Type: application/json');
    // Output the JSON response
    echo $jsonResponse;
} else {
    // If the audio file doesn't exist, send an error message
    $response['error'] = "Audio file not found";
    // Convert the response to JSON
    $jsonResponse = json_encode($response);
    // Set the content type header to JSON
    header('Content-Type: application/json');
    // Output the JSON response
    echo $jsonResponse;
}
?>
