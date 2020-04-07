const firstNameRegister = document.getElementById("firstNameRegister");
const lastNameRegister = document.getElementById("lastNameRegister");
const emailRegister = document.getElementById("emailRegister");
const mobileRegister = document.getElementById("mobileRegister");
const passwordRegister = document.getElementById("passwordRegister");
const confirmPasswordRegister = document.getElementById("confirmPasswordRegister");
const registerSubmit = document.getElementById("registerSubmit");
let usersArray;
var firstNameCheck = false;
var lastNameCheck = false;
var emailCheck = false;
var passwordCheck = false;
var confirmPasswordCheck = false;

function ValidateName(inputText, checker) {
    if (inputText.value.trim().length < 2 || inputText.value.trim.length > 20) {
        inputText.style.border = "Solid red 1px";
        checker = false;
    } else {
        inputText.style.border = "Solid green 1px";
        checker = true;
    }
}

function ValidateEmail(inputText, checker) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.value.match(mailformat)) {
        inputText.style.border = "Solid green 1px";
        checker = true;
    } else {
        inputText.style.border = "Solid red 1px";
        checker = false;
    }
}

function ValidatePassword(input1, checker) {
    var decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (input1.value.match(decimal)) {
        input1.style.border = "Solid green 1px";
        checker = true;
    } else {
        input1.style.border = "Solid red 1px";
        checker = false;
    }
}

function ValidateConfirmPassword(input1, input2, checker) {
    if (input1.value === input2.value) {
        input2.style.border = "Solid green 1px";
        checker = true;
    } else {
        input2.style.border = "Solid red 1px";
        checker = false;
    }
}

firstNameRegister.addEventListener("focusout", function() {
    ValidateName(firstNameRegister, firstNameCheck);
});
lastNameRegister.addEventListener("focusout", function() {
    ValidateName(lastNameRegister, lastNameCheck);
});

emailRegister.addEventListener("focusout", function() {
    ValidateEmail(emailRegister, emailCheck);
});

passwordRegister.addEventListener("focusout", function() {
    ValidatePassword(passwordRegister, passwordCheck);
})

confirmPasswordRegister.addEventListener("focusout", function() {
    ValidateConfirmPassword(passwordRegister, confirmPasswordRegister, passwordCheck);
});