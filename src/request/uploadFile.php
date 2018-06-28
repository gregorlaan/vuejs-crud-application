<?php

$target_dir = "../uploads/";
$file_name = $_POST['fileName'];
$target_file = $target_dir . basename($file_name);
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check file size
if ($_FILES["pdf"]["size"] > 1000000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
// Allow certain file formats
if($fileType != "pdf") {
    echo "Sorry, only PDF file is allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} else {
    if (
        move_uploaded_file($_FILES["pdf"]["tmp_name"], "{$target_dir}/{$file_name}")) {
        echo "The file has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

?>