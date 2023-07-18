const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-txt");

form.onsubmit = (e)=>{
     e.preventDefault();    //preventing form from submitting
}
continueBtn.onclick = ()=>{
    //Ajax
    let xhr = new XMLHttpRequest();   //creating XML object
    xhr.open("POST", "php/signup.php", true);
    xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let data = xhr.response;
                    if(data == "success"){
                         location.href = "users.php";
                    }else{
                        errorText.textContent = data;
                        errorText.style.display = "block";       
                    }
                }
            }
    }
    //Send the Form Data through Ajax to PHP
    let formData = new FormData(form);   //creating new formData object
    xhr.send(formData);    //sending the form data to php
}