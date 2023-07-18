const form = document.querySelector(".typing-area"),
inputField = form.querySelector(".input-field"),
sendBtn = form.querySelector("button");
chatBox = document.querySelector(".chat-box");

form.onsubmit = (e)=>{
    e.preventDefault();    //preventing form from submitting
}

sendBtn.onclick = ()=>{
    //Ajax
    let xhr = new XMLHttpRequest();   //creating XML object
    xhr.open("POST", "php/insert-chat.php", true);
    xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                     inputField.value = "";  //once msg inserted into the database and leave blank the space in input field
                     scrollToBottom();
                }
            }
    }
    //Send the Form Data through Ajax to PHP
    let formData = new FormData(form);   //creating new formData object
    xhr.send(formData);    //sending the form data to php
}
chatBox.onmousecenter = ()=>{
    chatBox.classList.add("active");
}
chatBox.onmouseleave = ()=>{
    chatBox.classList.remove("active");
}

setInterval(()=>{
    //Ajax
    let xhr = new XMLHttpRequest();   //creating XML object
    xhr.open("POST", "php/get-chat.php", true);
    xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let data = xhr.response;
                    chatBox.innerHTML = data;
                    if(!chatBox.classList.contains("active")){
                        scrollToBottom();
                    }
                }
            }
    }

    //Send the Form Data through Ajax to PHP
    let formData = new FormData(form);   //creating new formData object
    xhr.send(formData);    //sending the form data to php
}, 500);   //this func will run frequently after 500ms

function scrollToBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}
