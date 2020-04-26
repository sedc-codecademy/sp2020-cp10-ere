const name = document.getElementById("name");
const email = document.getElementById("e-mail");
const phone = document.getElementById("phone");

var nameCheck = false;
var emailCheck = false;
var phoneCheck = false;

function ValidateName(inputText, checker) {
    var nameformat = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+){0,2}$/;
    if (inputText.value.match(nameformat)) {
        checker = true;
    } else {
        inputText.style.border = "Solid red 1px";
        checker = false;
    }
}

function ValidateEmail(inputText, checker) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        checker = true;
    } else {
        inputText.style.border = "Solid red 1px";
        checker = false;    
    }
}

function ValidatePhoneNumber(inputText, checker){
    if (inputText.value.trim().length > 15) {
        inputText.style.border = "Solid red 1px";
        checker = false;
    }
    else {
        checker = true;
    }
}


name.addEventListener("focusout", function() {
    ValidateName(name, nameCheck);
});

email.addEventListener("focusout", function() {
    ValidateEmail(email, emailCheck);
});

phone.addEventListener("focusout", function(){
    ValidatePhoneNumber(phone, phoneCheck)
});