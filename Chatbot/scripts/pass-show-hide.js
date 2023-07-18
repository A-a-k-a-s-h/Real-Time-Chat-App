const pswordfield = document.querySelector(".form .field input[type='password']"),
toggleBtn = document.querySelector(".form .field i");

toggleBtn.onclick = ()=>{
    if(pswordfield.type == "password"){
        pswordfield.type = "text";
        toggleBtn.classList.add("active");
    }
    else{
        pswordfield.type = "password";
        toggleBtn.classList.remove("active");
    }
}