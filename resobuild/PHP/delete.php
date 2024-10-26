<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");

// Allow the Content-Type header
header("Access-Control-Allow-Headers: Content-Type");

// Set response content type to JSON
header("Content-Type: application/json");
$directoryPath = $_POST['directoryPath'];

// Function to recursively delete a directory
function deleteDirectory($dir) {
    if (!file_exists($dir)) {
        return true;
    }
    if (!is_dir($dir)) {
        return unlink($dir);
    }
    foreach (scandir($dir) as $item) {
        if ($item == '.' || $item == '..') {
            continue;
        }
        if (!deleteDirectory($dir . DIRECTORY_SEPARATOR . $item)) {
            return false;
        }
    }
    return rmdir($dir);
}

// Actual deletion
if(deleteDirectory($directoryPath)) {
   // echo json_encode(['success' => true]);
   echo ($directoryPath);
} else {
    echo json_encode(['success' => false]);
}
?>