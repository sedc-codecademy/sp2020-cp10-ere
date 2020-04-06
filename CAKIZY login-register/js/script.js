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

function Person(fname, email, mobile, password) {
    this.firstName = fname;
    this.email = email;
    this.mobile = mobile;
    this.password = password;
}

var stefan = new Person("Stefan", "test123@gmail.com", "075400258", "ovaepassword");
var petar = new Person("Petar", "testz@gmail.com", "074293632", "petarH4ker");

usersArray = [stefan, petar];

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
        alert("You have entered an invalid email address!");
        inputText.style.border = "Solid red 1px";
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

confirmPasswordRegister.addEventListener("focusout", function() {
    ValidateConfirmPassword(passwordRegister, confirmPasswordRegister, passwordCheck);
});