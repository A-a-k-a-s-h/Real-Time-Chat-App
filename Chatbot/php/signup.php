<?php
    session_start();
    include_once "config.php";
    $fname = mysqli_real_escape_string($conn, $_POST['fname']);
    $lname = mysqli_real_escape_string($conn, $_POST['lname']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);

    if(!empty($fname) && !empty($lname) && !empty($email) && !empty($password)){
            //Validate Email
            if(filter_var($email, FILTER_VALIDATE_EMAIL)){
                 //Check Duplicate Email
                 $sql = mysqli_query($conn, "SELECT email FROM users WHERE email = '{$email}'");
                 if(mysqli_num_rows($sql) > 0){
                    echo "$email - This email already exist!";
                 }else{
                    //Check user upload file or not
                    if(isset($_FILES['image'])){
                         $img_name = $_FILES['image']['name'];  //getting user uploading img name
                         $tmp_name = $_FILES['image']['tmp_name']; //this temporary name is used to save file in our folder

                         //Explode image and get the last extension like jpg png
                         $img_explode = explode('.',$img_name);
                         $img_ext = end($img_explode);          //Get the extension of user uploaded img file

                         $extensions = ['png','jpeg','jpg'];
                         if(in_array($img_ext, $extensions) === true){
                             $time = time();
                             //move the user uploaded img to our particular folder
                             $new_img_name = $time.$img_name;
                            
                             if( move_uploaded_file($tmp_name, "images/".$new_img_name)){
                                   $status = "Active now";
                                   $random_id = rand(time(), 10000000);

                                   //Insert all user into table
                                   $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, lname, email, password, img, status) 
                                                        VALUES ({$random_id}, '{$fname}', '{$lname}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");
                                   if($sql2){
                                        $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'" );
                                        if(mysqli_num_rows($sql3) > 0){
                                            $row = mysqli_fetch_assoc($sql3);
                                            $_SESSION['unique_id'] = $row['unique_id'];
                                            echo "success";
                                        }
                                   }else{
                                        echo "Something went wrong!";
                                   } 
                             }
                         }else{
                            echo "Please select an Image file - jpeg, jpg, png!";
                         }
                    }else{
                        echo "Please select an Image file!";
                    }
                 }
            }else{
        echo "$email - This is not valid email";
    }
    }else{
        echo "All input field are required!";
    }
?>