const url = "https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json";
const mostOrderedItems = ``;
const mostOrderedProductsTitle = `<div class="mostOrderedTitle">Most Ordered Products</div>
<div class="row mostOrderedItems" id="mostOrderedItemsRow"></div>`;
const menuNav = `<div class="foodMenuNavigation">
        <div class="foodMenuButton" id="menuAll">all</div>
        <div class="foodMenuButton" id="menuBreakfast">BREAKFAST</div>
        <div class="foodMenuButton" id="menuLunch">Lunch</div>
        <div class="foodMenuButton" id="menuDesert">dessert</div>
        <div class="foodMenuButton" id="menuDrinks">drinks</div>
    </div>
    <div class="row mostOrderedItems" id="mostOrderedItemsRow"></div>`;
const modalForFood = `<div class="modal fade" id="foodModal" tabindex="-1" role="dialog" aria-labelledby="foodModalTitle" aria-hidden="true">
<div class="modal-dialog modal-xl" role="document">
    <div class="modal-content modalItem modalCenter">
        <h5 class="modalItemTitle" id="modalItemTitle"></h5>
        <div class="modalItemTitleLine"></div>
        <button type="button" class="xModal close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        <div id="inModalContent">
        </div>
    </div>
</div>
</div>`;
const modalForDrinks = `<div class="modal fade" id="drinkModal" tabindex="-1" role="dialog" aria-labelledby="drinkModalTitle" aria-hidden="true">
<div class="modal-dialog modal-sm" role="document">
    <div class="modalCenter modal-content drinksModalContent">
        <h5 class="modalItemTitle drinksModalItemTitle" id="modalDrinksItemTitle"></h5>
        <hr class="drinksModalItemTitleLine" />
        <button type="button" class="xModal close" data-dismiss="modal" aria-label="Close">
<span aria-hidden="true">×</span>
</button>
        <div id="drinksModalContent">
        </div>
    </div>
</div>
</div>`;
const foodModal = `<div class="modaladds">
<ul class="modalIngredients" id="modalIngredients">
    Ingredients
</ul>
<ul class="modalExtras" id="modalExtras">
    Extras
</ul>
<img src="./assets/images/Screenshot_2.png" id="modalFoodItemImage" class="modalItemImage">
</div>
<textarea name="note" id="modalNote" cols="30" rows="20" placeholder="Add a note, for example: more cheese, less macaroni"></textarea>
<hr class="modalDivider" />
<div class="modalFooter">
<ul class="tg-list">
    <p class="eatThere">EAT THERE</p>
    <li class="tg-list-item">
        <input class="tgl tgl-ios" id="cb2" type="checkbox" /><label class="tgl-btn" for="cb2"></label></li>
    <p class="pickUp">PICK UP</p>
</ul>
<div class="groupModalQuantity">
    <p id="modalQuantity">Quantity</p>
    <button type="button" class="addAndRemoveModalQuantity" id="removeModalQuantity">-</button>
    <p id="modalItemQuantity">1</p>
    <button type="button" class="addAndRemoveModalQuantity" id="addModalQuantity">+</button>
</div>
<button type="button" class="modalAddToCart">add to cart</button>
<p class="modalFullPrice" id="modalFullPrice"></p>
</div>`;
const drinkModal = `<div class="drinksModalAdds">
<img src="./assets/images/Screenshot_2.png" id="modalDrinkItemImage" class="drinksModalItemImage">
</div>
<textarea name="note" id="drinksModalNote" cols="30" rows="20" placeholder="Add a note, for example: room temperature drink"></textarea>
<hr class="drinksModalDivider">
<div class="drinksModalFooter">
<ul class="tg-list drinksTgList">
    <p class="eatThere">EAT THERE</p>
    <li class="tg-list-item">
        <input class="tgl tgl-ios" id="cb3" type="checkbox"><label class="tgl-btn" for="cb3"></label></li>
    <p class="pickUp pickUpDrinks">PICK UP</p>
</ul>
<div class="groupModalQuantity drinksGroupModalQuantity">
    <p id="drinksModalQuantity">Quantity</p>
    <button type="button" class="addAndRemoveModalQuantity" id="removeDrinksModalQuantity">-</button>
    <p id="drinksModalItemQuantity">1</p>
    <button type="button" class="addAndRemoveModalQuantity" id="addDrinksModalQuantity">+</button>
</div>
<button type="button" class="modalAddToCart drinksModalAddToCart">add to cart</button>
<p class="modalFullPrice drinksModalFullPrice" id="drinksModalFullPrice">60 MKD</p>
</div>`;
let productItemsArr = [];
let currentArray = [];
let mainContainer = document.getElementById("mainContainer");
const menu = document.getElementById(`menu`);
const home = document.getElementById(`home`);

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        productItemsArr = [];
        productItemsArr.push(data.results);
        printMostOrderedItems();

    })
    .catch(function(error) {
        console.log(error);
    });

function printMostOrderedItems() {
    currentArray = productItemsArr[0].filter(x => x.ordered === "most ordered");
    mainContainer.innerHTML = mostOrderedProductsTitle;
    printMenu('none', 'most ordered', modalForFood);
    printCard(document.getElementById("mostOrderedItemsRow"), currentArray);
    document.getElementById("divModal").innerHTML = modalForFood;
    modalEventListener();
};

function printCard(element, array) {
    element.innerHTML = ``;
    for (let i = 0; i < array.length; i++) {
        element.innerHTML += `
        <div class="flex-sm-column col-sm-3" >
        <div data-toggle="modal" class="pointer" data-target="${array[i].mainCategory != 'Drink' ? '#foodModal' : '#drinkModal'}" data-text="${i}">
        <div class="cardImageContainer">
            <span class="itemImageText"><img src="./assets/images/giphyo.gif" width="150px"></span>
            <img class="card-img-top" src="./assets/images/Screenshot_2.png" alt="Card image cap">
        </div>
        <div class="cardItemContent">
            <h5 class="cardTitle">${array[i].itemName}</h5>
            <div class="itemPrice">
                ${array[i].price} МКД
            </div>
        </div>
    </div>
    </div>`;
    }
};

function modalEventListener() {
    $(`#foodModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let item = currentArray[parseInt(button.data('text'))];
        document.getElementById("inModalContent").innerHTML = foodModal;
        document.getElementById("modalItemTitle").innerHTML = item.itemName;
        document.getElementById("modalIngredients").innerHTML = `Ingredients`;
        for (const ingrediant of item.ingredients) {
            document.getElementById("modalIngredients").innerHTML += `<li><i class="fas fa-check modalItemCheck"></i>${ingrediant}</li>`
        };
        document.getElementById("modalExtras").innerHTML = `Extras`;
        for (const extras of item.extras) {
            document.getElementById("modalExtras").innerHTML += `<li><input id="${extras.extrasName}" type="checkbox" /><label for="${extras.extrasName}">${extras.extrasName}</label></li>`
        };
        document.getElementById("modalFullPrice").innerHTML = `${item.price} MKD`;
    });
    $(`#drinkModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let item = currentArray[parseInt(button.data('text'))];
        document.getElementById("drinksModalContent").innerHTML = drinkModal;
        document.getElementById("modalDrinksItemTitle").innerHTML = item.itemName;
        document.getElementById("drinksModalFullPrice").innerHTML = `${item.price} MKD`;
    });
}
home.addEventListener(`click`, function() {
    printMostOrderedItems(currentArray);
});

menu.addEventListener('click', function() {
    printMenu('menuAll', 'All', modalForFood + modalForDrinks);
});

function filterAndPrintEventListeners() {

    mainContainer.style="margin-bottom: 110px;"
    let menuAll = document.getElementById(`menuAll`);
    let menuBreakfast = document.getElementById(`menuBreakfast`);
    let menuLunch = document.getElementById(`menuLunch`);
    let menuDesert = document.getElementById(`menuDesert`);
    let menuDrinks = document.getElementById(`menuDrinks`);
    menuAll.addEventListener(`click`, function() {
        printMenu('menuAll', 'All', modalForFood + modalForDrinks);
    });
    menuBreakfast.addEventListener(`click`, function() {
        printMenu('menuBreakfast', 'Breakfast', modalForFood);
    });
    menuLunch.addEventListener(`click`, function() {
        printMenu("menuLunch", "Lunch", modalForFood);
    });
    menuDesert.addEventListener(`click`, function() {
        printMenu('menuDesert', 'Desert', modalForFood);
    });
    menuDrinks.addEventListener(`click`, function() {
        printMenu("menuDrinks", "Drink", modalForDrinks);
    });
}

function printMenu(menuNavigation, navigation, modal) {
    mainContainer.style="margin-bottom: 110px;"
    if (navigation != 'most ordered') {
        mainContainer.innerHTML = menuNav;
        document.getElementById(menuNavigation).classList.add(`selected`);
        currentArray = navigation != "All" ? productItemsArr[0].filter(x => x.mainCategory === navigation) : productItemsArr[0];
    } else {
        currentArray = productItemsArr[0].filter(x => x.ordered === "most ordered")
    }
    document.getElementById("divModal").innerHTML = modal;
    printCard(document.getElementById("mostOrderedItemsRow"), currentArray);
    modalEventListener();
    if (navigation != 'most ordered') {
        filterAndPrintEventListeners();
    }
}

const contact = document.getElementById("contact");
contact.addEventListener('click', function(){
    mainContainer.innerHTML = ``;
    mainContainer.style="margin-bottom: 0;"
    mainContainer.innerHTML=`
    <div class="row contact">
        <div class="col-sm-6"> 
            <div class="mail_form">
                <h1 class="headers_contact">CONTACT US</h1> <br>
                <form id="contact-form">
                    <input type="text" name="name" id="name" placeholder="Name" required/>
                    <br>
                    <input type="text" name="e-mail" id="email" placeholder="E-mail" required />
                    <br>
                    <input type="number" name="phone" id="phone" placeholder="Phone" />
                    <br>
                    <textarea name="remark" id="text" placeholder="Questions/Comments" cols="40" rows="4" required></textarea>
                    <br>
                    <button type="submut" id="btn_send">SEND</button>
                </form>
            </div>
        </div>
        <div class="col-sm-6 number">
            <div class="call_us"><h1 class="headers_contact" ></h1>
                <button type="" class = "phone"><i class="fa fa-phone" style="font-size:20px"></i>+389 70 123 456</button>
            </div>
            <br><br>
            <div class="working_hours">
                <h1 class="headers_contact_hours">Working Hours</h1>
                <br>
                <div class="days_of_week">
                    <p>Monday .............. <strong> 9.30 - 15.30</strong></p>
                    <p>Tuesday ............. <strong> 9.30 - 15.30</strong></p>
                    <p>Wednesday ...... <strong> 9.30 - 15.30</strong></p>
                    <p>Thursday ..........<strong> 9.30 - 15.30</strong></p>
                    <p>Friday .................<strong> 9.30 - 15.30</strong></p>
                    <p>Saturday <strong>closed</strong></p>
                    <p>Sunday <strong>closed</strong></p>
                </div>
            </div>
            <br><br><br>
            <p class="address"><i class="fa fa-map-marker"  style="font-size:18px;color:#C8B273"></i> 11TH OCTOBER ST. 33, SKOPJE 1000</p>
        </div>
    </div>
    <div class="row map">
        <div>
        <iframe class= "iframe "src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11862.546673614783!2d21.439687!3d41.98661!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb73c65132f7d38d2!2sSeavus%20Group!5e0!3m2!1sen!2smk!4v1592334183573!5m2!1sen!2smk" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
        </div>
    </div>
`
})

//CONTACT VALIDATION
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