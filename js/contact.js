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

if (!localStorage.getItem('productInCart')) {
    document.querySelector('.cart_counter').textContent = '';
} else {
    document.querySelector('.cart_counter').textContent = localStorage.getItem('productInCart');
}

// LOGIN --------------------------------------------------------------------

let oneday;
let twoday;
let loggedUser = false;
let accountForm = document.getElementById(`accountForm`);
let showLoginModalDialog = $(`#showLoginModalDialog`);
const loginFormModal = `<form id="login-form" class="text-left">
<div class="login-form-main-message"></div>
<div class="main-login-form">
    <div class="login-group">
        <div class="form-group">
            <label for="lg_email" class="sr-only">Username</label>
            <input type="text" class="form-control" id="lg_email" name="lg_email" placeholder="username">
        </div>
        <div class="form-group">
            <label for="lg_password" class="sr-only">Password</label>
            <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password">
        </div>
        <div class="form-group login-group-checkbox">
            <input type="checkbox" class="checkbox" id="lg_remember" name="lg_remember">
            <label for="lg_remember">remember</label>
        </div>
    </div>
    <button type="submit" class="login-button" id="lg_btn_submit"><i class="fa fa-chevron-right"></i></button>
</div>
<div class="etc-login-form">
    <p>forgot your password? <button type="button" onclick="forgotPassword()">click here</button></p>
    <p>new user? <button type="button" onclick="registrationForm()">create new account</button></p>
</div>
</form>`;
const registerFormModal = `<form id="register-form" class="text-left">
<div class="login-form-main-message"></div>
<div class="main-login-form">
    <div class="login-group">
        <div class="form-group">
            <label for="reg_firstName" class="sr-only">First name</label>
            <input type="text" class="form-control" id="reg_firstName" name="reg_firstName" placeholder="First name">
        </div>
        <div class="form-group">
            <label for="reg_lastName" class="sr-only">Last name</label>
            <input type="text" class="form-control" id="reg_lastName" name="reg_lastName" placeholder="Last name">
        </div>
        <div class="form-group">
            <label for="reg_email" class="sr-only">Email</label>
            <input type="text" class="form-control" id="reg_email" name="reg_email" placeholder="Email">
        </div>
        <div class="form-group">
            <label for="reg_mobile" class="sr-only">Mobile</label>
            <input type="text" class="form-control" id="reg_mobile" name="reg_mobile" placeholder="Mobile">
        </div>
        <div class="form-group">
            <label for="reg_password" class="sr-only">Password</label>
            <input type="password" class="form-control" id="reg_password" name="reg_password" placeholder="Password">
        </div>
        <div class="form-group">
            <label for="reg_password_confirm" class="sr-only">Password Confirm</label>
            <input type="password" class="form-control" id="reg_password_confirm" name="reg_password_confirm" placeholder="Confirm Password">
        </div>
    </div>
    <button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
</div>
<div class="etc-login-form">
    <p>already have an account? <button type="button" onclick="loginFunction()">login here</button></p>
</div>
</form>`;
const forgotPasswordModal = `<form id="forgot-password-form" class="text-left">
<div class="etc-login-form">
    <p>When you fill in your registered email address, you will be sent instructions on how to reset your password.</p>
</div>
<div class="login-form-main-message"></div>
<div class="main-login-form">
    <div class="login-group">
        <div class="form-group">
            <label for="fp_email" class="sr-only">Email address</label>
            <input type="text" class="form-control" id="fp_email" name="fp_email" placeholder="email address">
        </div>
    </div>
    <button type="submit" class="login-button"><i class="fa fa-chevron-right"></i></button>
</div>
<div class="etc-login-form">
    <p>already have an account? <button type="button" onclick="loginFunction()">login here</button></p>
    <p>new user? <button type="button" onclick="registrationForm()">create new account</button></p>
</div>
</form>`;
let clearHtml = $("#accountForm");

function clearHtmlFunction() {
    if (clearHtml.style.display === "none") {
        accountForm.innerHTML = "";
    }
};

function showLoginModal(params, param2, param3) {
    params.innerHTML = `<div class="modal-dialog" role="document">
        <div class="modal-content text-center" id="modalForm">
            <div class="modal-header text-center">
                <h5 class="modal-title logoLogin" id="titleFormLabel">${param2}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="loginModalClose">
                    <span aria-hidden="true">&times;</span>
                    </button>
            </div>
            <div class="modal-body">
                <div class="login-form-1">
                ${param3}
                </div>
            </div>
        </div>
    </div>`;
    validateLogInForm();
};

function registrationForm() {
    showLoginModal(accountForm, `Register`, registerFormModal);
}

function forgotPassword() {
    showLoginModal(accountForm, `Forgot password`, forgotPasswordModal);
};

function validateLogInForm() {
    (function($) {
        "use strict";

        // Options for Message
        //----------------------------------------------
        var options = {
            'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
            'btn-success': '<i class="fa fa-check"></i>',
            'btn-error': '<i class="fa fa-remove"></i>',
            'msg-success': 'All Good! Redirecting...',
            'msg-error': 'Wrong login credentials!',
            'useAJAX': true,
        };

        // Login Form
        //----------------------------------------------
        // Validation
        $("#login-form").validate({
            rules: {
                lg_email: "required",
                lg_password: "required",
            },
            errorClass: "form-invalid"
        });

        // Form Submission
        $("#login-form").submit(function() {
            remove_loading($(this));

            if (options['useAJAX'] == true) {
                // Dummy AJAX request (Replace this with your AJAX code)
                // If you don't want to use AJAX, remove this
                dummy_submit_form($(this));

                // Cancel the normal submission.
                // If you don't want to use AJAX, remove this
                return false;
            }
        });

        // Register Form
        //----------------------------------------------
        // Validation
        $("#register-form").validate({
            rules: {
                reg_email: "required",
                reg_firstName: {
                    namecheck: true,
                    required: true,
                    rangelength: [2, 20]
                },
                reg_lastName: {
                    namecheck: true,
                    required: true,
                    rangelength: [2, 20]
                },
                reg_email: {
                    required: true,
                    email: true
                },
                reg_mobile: {
                    required: true
                },
                reg_password: {
                    required: true,
                    pwcheck: true,
                    rangelength: [7, 50]
                },
                reg_password_confirm: {
                    required: true,
                    rangelength: [7, 50],
                    equalTo: "#register-form [name=reg_password]"
                },

            },
            errorClass: "form-invalid",
            errorPlacement: function(label, element) {
                if (element.attr("type") === "checkbox") {
                    element.parent().append(label); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
                    label.on("click", function() {
                        label.remove();
                    })
                } else {
                    label.insertAfter(element); // standard behaviour
                    label.on("click", function() {
                        label.remove();
                    })
                }
            }
        });

        // Form Submission
        $("#register-form").submit(function() {
            remove_loading($(this));

            if (options['useAJAX'] == true) {
                // Dummy AJAX request (Replace this with your AJAX code)
                // If you don't want to use AJAX, remove this
                dummy_submit_form($(this));

                // Cancel the normal submission.
                // If you don't want to use AJAX, remove this
                return false;
            }
        });

        // Forgot Password Form
        //----------------------------------------------
        // Validation
        $("#forgot-password-form").validate({
            rules: {
                fp_email: {
                    required: true,
                    email: true,
                }
            },
            errorClass: "form-invalid"
        });

        // Form Submission
        $("#forgot-password-form").submit(function() {
            remove_loading($(this));

            if (options['useAJAX'] == true) {
                // Dummy AJAX request (Replace this with your AJAX code)
                // If you don't want to use AJAX, remove this
                dummy_submit_form($(this));

                // Cancel the normal submission.
                // If you don't want to use AJAX, remove this
                return false;
            }
        });

        // Loading
        //----------------------------------------------
        function remove_loading($form) {
            $form.find('[type=submit]').removeClass('error success');
            $form.find('.login-form-main-message').removeClass('show error success').html('');
        }

        function form_loading($form) {
            $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
        }

        function form_success($form) {
            $form.find('[type=submit]').addClass('success').html(options['btn-success']);
            $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
        }

        function form_failed($form) {
            $form.find('[type=submit]').addClass('error').html(options['btn-error']);
            $form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
        }

        // Dummy Submit Form (Remove this)
        //----------------------------------------------
        // This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
        function dummy_submit_form($form) {
            if ($form.valid()) {
                form_loading($form);

                setTimeout(function() {
                    form_success($form);
                }, 2000);
            }
        }
        $.validator.addMethod("pwcheck", function(value) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/.test(value) // consists of only these
        });
        $.validator.addMethod("namecheck", function(value) {
            return /^[a-zA-Z]{3,20}(?: [a-zA-Z]+){0,2}$/.test(value) // consists of only these
        });

    })(jQuery)
};

function loginFunction() {
    showLoginModal(accountForm, 'Login', loginFormModal);
    const lg_btn_submit = document.getElementById("lg_btn_submit");
    const rmCheck = document.getElementById("lg_remember");
    const emailInput = document.getElementById("lg_email");
    const passInput = document.getElementById("lg_password");

    lg_btn_submit.addEventListener("click", function() {
        if (localStorage.checkbox && localStorage.checkbox !== "") {
            rmCheck.setAttribute("checked", "checked");
            emailInput.value = localStorage.username;
            passInput.value = localStorage.password;
        } else {
            rmCheck.removeAttribute("checked");
            // emailInput.value = "";
            // passInput.value = "";
        }

        function lsRememberMe() {
            if (rmCheck.checked && emailInput.value !== "") {
                localStorage.username = emailInput.value;
                localStorage.password = passInput.value;
                loggedUser = "true";
                oneday = new Date();
                oneday.setDate(oneday.getDay() + 90);
                twoday = { 'Day': oneday.getDay(), 'Month': oneday.getMonth(), 'Year': oneday.getFullYear(), 'Minutes': oneday.getMinutes(), 'Hours': oneday.getHours() }
                localStorage.setItem('testObject', JSON.stringify(twoday));
                localStorage.loggedUser = loggedUser;
                // localStorage.setItem(loggedUser);
            } else {
                localStorage.username = "";
                localStorage.checkbox = "";
            }
        }
        lsRememberMe();
    })
}





if (localStorage.loggedUser === "true") {
    loggedUser = true
}
if (loggedUser === true) {
    showLoginModalDialog.innerHTML = `LOG OUT`;
}

showLoginModalDialog.on(`click`, function() {
    loginFunction();
})



// if (window.localStorage.length != 0) {
//     let dateNow = new Date;
//     var retrievedObject = localStorage.getItem('testObject');
//     let dadada = JSON.parse(retrievedObject);
//     let dateLogged = new Date;
//     dateLogged.setFullYear(dadada.Year)
//     dateLogged.setMonth(dadada.Month)
//     dateLogged.setDate(dadada.Day)
//     dateLogged.setMinutes(dadada.Minutes)

//     if (dateLogged <= dateNow) {
//         localStorage.clear();
//         loggedUser = "false";
//     }
// }

// showLoginModalDialog.on("click", function() {
//     logOut();
// })

function logOut() {
    if (showLoginModalDialog.innerText === "LOG OUT") {
        localStorage.clear();
        loggedUser = "false";
        location.reload();
    }
}