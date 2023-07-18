<?php
    $conn = mysqli_connect("localhost:4306","root","aakash","chat");
    if(!$conn){
        echo "Database connected" .mysqli_connect_error();
    }
?>