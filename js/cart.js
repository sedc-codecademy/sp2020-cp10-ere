let priceForAll = 0;

let productsArr = JSON.parse(localStorage.getItem('productsArr'));

let cartProducts = localStorage.getItem('productInCart');

let foodModal = `
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Item Name</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
    </div>
    <div class="modal-body">
        <div class="row">
            <div class="col-md modal-padding">
                <img src="../assets/logo-wallpaper/logo_transparent.png" onerror="this.src = '../assets/images/no-image.png'" alt="Image" id="modalImage" width="150px" height="150px">
            </div>
            <div class="col-md" id="checkboxes">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <p>Ingredients:</p>
                <ul id="ingredients">
                </ul>
            </div>
            <div class="col-sm-3">
                <p>Allergens:</p>
                <ul id="allergens">
                </ul>
            </div>
            <div class="col-md-6">
                <form>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Note:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="modal-footer">
        <p id="itemPrice">150 мкд</p>
        <div class="quantity">
            <p id="quantity-label">Quantity: </p>
            <p id="itemQuantity">1</p>
            <button class="quantityButtons" id="plusItem">+</button>
            <button class="quantityButtons" id="minusItem">-</button>
        </div>
        <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
        <button type="button btn-add-to-cart" class="btn btn-primary" id="save">SAVE</button>
    </div>
</div>`;

function displayInCart() {
    if (!localStorage.getItem('productInCart')) {
        document.querySelector('.cart_counter').textContent = '';
    } else {
        document.querySelector('.cart_counter').textContent = localStorage.getItem('productInCart');
    }
    productsArr = JSON.parse(localStorage.getItem('productsArr'));
    cartProducts = localStorage.getItem('productInCart');
    let productsSection = document.getElementById('productSection');
    let productsContainer = document.getElementById('productContainer');
    if (cartProducts != null) {
        productsSection.innerHTML = '';
        priceForAll = 0;
        for (let i = 0; i < productsArr.length; i++) {
            priceForAll += productsArr[i].itemQuantity * productsArr[i].fullPrice;
            productsSection.innerHTML += `<div class="product block-click-cart block-click" data-toggle="modal" data-target="#exampleModal" data-text="${[i]}" >
                <ion-icon name="close-circle-outline" class="deleteBtn" id="${productsArr[i].id}"></ion-icon>
                <img src="${productsArr[i].dataForObject.itemImg}"width="200px" height="150px" alt="${productsArr[i].dataForObject.itemName}" onerror="this.src = '../assets/images/no-image.png'" />
                <span class="product_name">${productsArr[i].dataForObject.itemName}</span>
                <div class="product_price">${productsArr[i].fullPrice},00 мкд </div>
                    <div class="product_quantity"> 
                        <ion-icon class="addQuantity" name="add-circle-outline"></ion-icon>
                        <span id="productItemQuantity">${productsArr[i].itemQuantity}</span>
                        <ion-icon class="subtractQuantity" name="remove-circle-outline"></ion-icon>  
                    </div>
            <div class="product_total">
               ${productsArr[i].itemQuantity * productsArr[i].fullPrice},00 мкд
            </div> 
            </div>`;
        }
        productsSection.innerHTML += `
            <div class="cart_total_price_container">
                <h4 class="cart_total_title">Cart Total Price</h4>
                <h4 class="cart_total_price">${priceForAll},00 мкд</h4> 
            </div>

            <div class="place_order_button">
            <button class="placeOrder login_button  button_tools">PLACE ORDER</button>
            </div>

            <div class="cancel_order_button">
            <button class="candelOrder login_button  button_tools">CANCEL ORDER</button>
            </div>`;
    } else if (cartProducts === null) {
        productsContainer.innerHTML = '';
        productsContainer.innerHTML += `
            <div class="empty_cart_title">
                <h4>Your Cart is Empty</h4>
            </div>
        <div class="main_section_empty_cart"></div>`;
    }
}


function productSectionElements(el, e) {
    e.preventDefault();
    e.stopPropagation();
    if (el.classList.contains('deleteBtn')) {
        let currentQuantity = parseInt(el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerText);
        productsArr.splice(productsArr.findIndex(elemenet => elemenet.id === parseInt(el.id)), 1);
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
        localStorage.setItem('productInCart', parseInt(localStorage.getItem('productInCart')) - currentQuantity);
        cartProducts = cartProducts - currentQuantity;
        el.parentElement.remove();
        if (cartProducts === 0) {
            localStorage.removeItem('productInCart');
            localStorage.removeItem('productsArr');
        }
        displayInCart();
    } else if (el.classList.contains('addQuantity')) {
        let currentQuantity = parseInt(el.nextElementSibling.innerText);
        if (currentQuantity === 10) {
            alert("You can't order more then 10 items!(current items: 10)");
        } else {
            currentQuantity += 1;
            el.nextElementSibling.innerText = currentQuantity;
            productsArr[productsArr.findIndex(elemenet => elemenet.id === parseInt(el.parentElement.parentElement.firstElementChild.id))].itemQuantity = currentQuantity;
            localStorage.setItem("productsArr", JSON.stringify(productsArr));
            localStorage.setItem('productInCart', parseInt(localStorage.getItem('productInCart')) + 1);
            document.querySelector('.cart_counter').textContent = parseInt(localStorage.getItem('productInCart'));
            displayInCart();
        }
    } else if (el.classList.contains('subtractQuantity')) {
        let currentQuantity = parseInt(el.previousElementSibling.innerText);
        if (currentQuantity === 1) {
            return;
        } else {
            currentQuantity -= 1;
            el.previousElementSibling.innerText = currentQuantity;
            productsArr[productsArr.findIndex(elemenet => elemenet.id === parseInt(el.parentElement.parentElement.firstElementChild.id))].itemQuantity = currentQuantity;
            localStorage.setItem("productsArr", JSON.stringify(productsArr));
            localStorage.setItem('productInCart', parseInt(localStorage.getItem('productInCart')) - 1);
            document.querySelector('.cart_counter').textContent = parseInt(localStorage.getItem('productInCart'));
            displayInCart();
        }
    } else if (el.classList.contains('candelOrder')) {

        if (confirm(`Are you sure you want to cancel order?`)) {
            productsArr = "";
            localStorage.removeItem("productInCart");
            localStorage.removeItem("productsArr");
            displayInCart();
        }
    }
};

displayInCart();
productSectionElementsListener()

function productSectionElementsListener() {
    if (cartProducts != null) {
        document.querySelector(".products_section").addEventListener('click', (e) => {
            productSectionElements(e.target, e);
        });
    }
}
let objectPassedToCard = {};

if (!localStorage.getItem('productInCart')) {
    document.querySelector('.cart_counter').textContent = '';
} else {
    document.querySelector('.cart_counter').textContent = localStorage.getItem('productInCart');
}


$('#exampleModal').on('show.bs.modal', function(event) {
    productsArr = JSON.parse(localStorage.getItem('productsArr'));
    let button = $(event.relatedTarget); // Button that triggered the modal
    $('#foodModal').html(foodModal);
    let parsedNum = parseInt(button.data('text')); // Extract info from data-* attributes
    let modal = $(this);
    let modalImage = modal.find(`#modalImage`);
    let checkboxes = modal.find(`#checkboxes`);
    let ingredients = modal.find(`#ingredients`);
    let allergens = modal.find(`#allergens`);
    let itemPrice = modal.find(`#itemPrice`);
    let itemQuantity = document.getElementById("itemQuantity");
    let plusItem = document.getElementById("plusItem");
    let minusItem = document.getElementById("minusItem");
    let saveBtn = document.getElementById("save");

    priceItem = productsArr[parsedNum].fullPrice;
    checkboxes[0].innerHTML = "";
    ingredients[0].innerHTML = "";
    allergens[0].innerHTML = "";
    currentItemQuantity = productsArr[parsedNum].itemQuantity;
    itemQuantity.innerHTML = currentItemQuantity;
    modal.find('.modal-title').text(productsArr[parsedNum].dataForObject.itemName);
    modalImage[0].src = productsArr[parsedNum].dataForObject.itemImg;
    modalImage[0].alt = productsArr[parsedNum].dataForObject.itemName;

    if (productsArr[parsedNum].extras != null) {
        for (const item of productsArr[parsedNum].dataForObject.extras) {
            let dada = productsArr[parsedNum].extras.indexOf(item.extrasName)
            if (dada != -1) {
                checkboxes[0].innerHTML += `<input type="checkbox" checked class="checkbox" id="${item.extrasName}" name="${item.extrasName}" onclick="checkCheckBox(this,'${item.price}')" />
                    <label class="extras-design" style="color:green;" for="${item.extrasName}">${item.extrasName} <span  class="extras-price-color">${item.price} мкд</span></label><br>`
            } else {
                checkboxes[0].innerHTML += `<input type="checkbox" class="checkbox" id="${item.extrasName}" name="${item.extrasName}" onclick="checkCheckBox(this,'${item.price}')" />
                    <label class="extras-design" for="${item.extrasName}">${item.extrasName} <span class="extras-price-color">${item.price} мкд</span></label><br>`
            }
        }
    }
    if (productsArr[parsedNum].dataForObject.ingredients != null) {
        for (const ingredient of productsArr[parsedNum].dataForObject.ingredients) {
            ingredients[0].innerHTML += `<li>${ingredient}</li>`
        }
    }
    if (productsArr[parsedNum].dataForObject.allergens != null) {
        for (const allergen of productsArr[parsedNum].dataForObject.allergens) {
            allergens[0].innerHTML += `<li>${allergen}</li>`
        }
    }
    itemPrice[0].innerHTML = `${priceItem} мкд`;


    plusItem.addEventListener(`click`, function() {
        if (currentItemQuantity < 10) {
            currentItemQuantity += 1
            itemQuantity.innerHTML = currentItemQuantity;
        } else {
            alert("You can't order more then 10 items!(current items: 10)");
        }
    })

    minusItem.addEventListener(`click`, function() {
            if (currentItemQuantity >= 2) {
                currentItemQuantity -= 1;
                itemQuantity.innerHTML = currentItemQuantity;
            }
        })
        // addToCartBtn.addEventListener(`click`, addProduct())
    saveBtn.addEventListener(`click`, function() {
        $('#exampleModal').modal('hide');
        setItemsInLocalStorage(parsedNum);
        displayInCart();
        // itemsCounterOrCreateInLocal();
        // setItemsInLocalStorage(dataForModal[parsedNum], itemQuantity, parseInt((`#itemPrice`)));
    })
})

function setItemsInLocalStorage(item) {
    let extrasArrayChecked = [];
    let objectPassedToCard = {};
    var x = document.querySelectorAll(".checkbox");
    for (const item of x) {
        if (item.checked) {
            extrasArrayChecked.push(item.name);
        }
    }
    let productsArr = JSON.parse(localStorage.getItem('productsArr'));
    let itemON = parseInt(localStorage.getItem('productInCart'));
    productsArr[item].extras = extrasArrayChecked;
    productsArr[item].fullPrice = priceItem;
    productsArr[item].itemQuantity = currentItemQuantity;
    localStorage.setItem("productsArr", JSON.stringify(productsArr));

}

function checkCheckBox(thisItem, price) {
    priceItem = parseInt(priceItem);
    let parsingPrice = parseInt(price);
    if (thisItem.checked === true) {
        priceItem += parsingPrice;
        itemPrice.innerHTML = `${priceItem} мкд`;
        thisItem.nextElementSibling.style.color = "green";
    } else if (thisItem.checked === false) {
        priceItem -= parsingPrice;
        itemPrice.innerHTML = `${priceItem} мкд`;
        thisItem.nextElementSibling.style.color = "unset";
    }
};
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