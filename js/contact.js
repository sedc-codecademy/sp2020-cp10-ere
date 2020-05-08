let btnTop = $("#backToTop");
btnTop.on("click", function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const text = document.getElementById("text");

var nameCheck = false;
var emailCheck = false;
var phoneCheck = false;
var textCheck = false;

function ValidateName(inputText, checker) {
    var nameformat = /^[a-zA-Z]{3,20}(?: [a-zA-Z]+){0,2}$/;
    if (inputText.value.match(nameformat)) {
        checker = true;
        inputText.style.border = "none";
    } else {
        inputText.style.border = "Solid red 1px";
        checker = false;
    }
}

function ValidateEmail(inputText, checker) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        checker = true;
        inputText.style.border = "none";

    } else {
        inputText.style.border = "Solid red 1px";
        checker = false;
    }
}

function ValidatePhoneNumber(inputText, checker) {
    if (inputText.value.trim().length > 15) {
        inputText.style.border = "Solid red 1px";
        checker = false;
    } else {
        inputText.style.border = "none";
        checker = true;
    }
}

function ValidateText(inputText, checker) {
    if (inputText.value.length < 10 || inputText.value.length > 300) {
        inputText.style.border = "Solid red 1px";
        checker = false;
    } else {
        inputText.style.border = "none";
        checker = true;
    }
}


name.addEventListener("focusout", function() {
    ValidateName(name, nameCheck);
});

email.addEventListener("focusout", function() {
    ValidateEmail(email, emailCheck);
});

phone.addEventListener("focusout", function() {
    ValidatePhoneNumber(phone, phoneCheck)
});


text.addEventListener("focusout", function() {
    ValidateText(text, textCheck)
});