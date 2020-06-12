const url = 'https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json';
const centeredContainer = ``;
const mostOrderedProductsTitle = `<div class="titleForPages"></div>
<div class="row centeredContainer" id="centeredContainerRow"></div>`;
const menuNav = `<div class="foodMenuNavigation">
        <div class="foodMenuButton" id="menuAll">all</div>
        <div class="foodMenuButton" id="menuBreakfast">BREAKFAST</div>
        <div class="foodMenuButton" id="menuLunch">Lunch</div>
        <div class="foodMenuButton" id="menuDesert">dessert</div>
        <div class="foodMenuButton" id="menuVegetarian">vegetarian</div>
        <div class="foodMenuButton" id="menuDrinks">drinks</div>
        <div class="dropdown dropdown-main-button">
            <button class="btn btn-primary dropdown-design dropdown-toggle" id="selectedView" type="button" data-toggle="dropdown">3 COLUMN</button>
            <ul class="dropdown-menu">
              <li id="threeColumn"><a href="#">3 COLUMN</a></li>
              <li id="twoColumn"><a href="#">2 COLUMN</a></li>
              <li id="list"><a href="#">LIST</a></li>
            </ul>
        </div>
    </div>
    <div class="row centeredContainer" id="centeredContainerRow"></div>`;
const newestModalForFood = `
    <div class="modal fade" id="foodModal" tabindex="-1" role="dialog" aria-labelledby="foodModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content modalItem modalCenter" id="inModalFooter">
            
        </div>
    </div>
    </div>
    </div>
    `;
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
const newestFoodModal = `
<h5 class="modalItemTitle" id="modalItemTitle">Basic Omelete</h5>
                <div class="modalItemTitleLine"></div>
                <button type="button" class="xModal close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                    <div id="inModalContent">
                        <div class="foodModalIngredients">
                            <p class="foodModalIngredientsParagraph">Ingredients</p>
                            <ul class="foodModalIngredientsList" id="foodModalIngredientsList">
                            </ul>
                        </div>
                        <div class="foodModalExtras">
                            <p class="foodModalExtrasParagraph">Extras</p>
                            <ul class="foodModalExtrasList" id="foodModalExtrasList">
                            </ul>
                        </div>
                        <div class="modalImageAndAllergensDiv">
                            <img src="./assets/images/Screenshot_2.png" id="modalFoodItemImage" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImageModal')" class="foodModalItemImage">
                            <p class="foodModalAllergensParagraph">*Allergens:<span id="foodModalAllergens"></span></p>
                        </div>
                    </div>
                    <div> <textarea name="note" id="foodModalNote" cols="30" rows="20" placeholder="Add a note, for example: more cheese, less macaroni"></textarea></div>
                    <hr>
                    <div class="modalFooter">
                    <ul class="tg-list">
                        <p class="eatThere eatOrPickSelected">EAT THERE</p>
                        <li class="tg-list-item">
                            <input class="tgl tgl-ios" id="cb2" type="checkbox"><label class="tgl-btn" for="cb2"></label></li>
                        <p class="pickUp">PICK UP</p>
                    </ul>
                    <div class="groupModalQuantity">
                        <p id="modalQuantity">Quantity</p>
                        <button type="button" class="addAndRemoveModalQuantity" id="removeModalQuantity">-</button>
                        <p id="modalItemQuantity">1</p>
                        <button type="button" class="addAndRemoveModalQuantity" id="addModalQuantity">+</button>
                    </div>
                    <button id="addItemToCard" type="button" class="modalAddToCart">add to cart</button>
                    <p class="modalFullPrice" id="modalFullPrice">70 MKD</p>
                    </div>`;
const drinkModal = `<div class="drinksModalAdds">
<img src="./assets/images/Screenshot_2.png" id="modalDrinkItemImage" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImageModalDrinks')" class="drinksModalItemImage">
</div>
<textarea name="note" id="drinksModalNote" cols="30" rows="20" placeholder="Add a note, for example: room temperature drink"></textarea>
<hr class="drinksModalDivider">
<div class="drinksModalFooter">
<ul class="tg-list drinksTgList">
    <p class="eatThere eatOrPickSelected">EAT THERE</p>
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
let mainContainer = document.getElementById('mainContainer');
const menu = document.getElementById(`menu`);
const home = document.getElementById(`home`);

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        productItemsArr = [];
        productItemsArr.push(data.results);
        printMostOrderedProducts();
    })
    .catch(function(error) {
        console.log(error);
    });

if (!localStorage.getItem('productsArr')) {
    document.querySelector('.inCartQuantity').textContent = '0';
} else {
    let productsArr = JSON.parse(localStorage.getItem('productsArr'));
    document.querySelector('.inCartQuantity').textContent = productsArr.length;

}

function printMostOrderedProducts() {
    currentArray = productItemsArr[0].filter((x) => x.ordered === 'most ordered');
    mainContainer.innerHTML = mostOrderedProductsTitle;
    document.getElementsByClassName(`titleForPages`).innerHTML = `Most Ordered Products`;
    printMenu('none', 'most ordered', newestModalForFood, 3);
    printCard(document.getElementById('centeredContainerRow'), currentArray, 3);
    document.getElementById('divModal').innerHTML = newestModalForFood;
    modalEventListener();
}

function printCardItems() {
    currentArray = JSON.parse(localStorage.getItem('productsArr'))
    mainContainer.innerHTML = mostOrderedProductsTitle;
    document.getElementsByClassName(`titleForPages`).innerHTML = `Card`;
    printItemsCard(document.getElementById('centeredContainerRow'), currentArray, 12);
    document.getElementById('divModal').innerHTML = newestModalForFood + modalForDrinks;
    modalEventListenerForCard();
    productSectionElementsListener();
}

function printCard(element, array, column) {
    element.innerHTML = ``;
    for (let i = 0; i < array.length; i++) {
        element.innerHTML += `
        <div class="flex-sm-column col-sm-${column}" >
        <div data-toggle="modal" class="${column === 12 ? 'pointer listCardElement' : 'pointer'}" data-target="${array[i].mainCategory != 'Drink'? '#foodModal': '#drinkModal'}" data-text="${i}">
        <div class="cardImageContainer">
            <span class="itemImageText"><img src="./assets/images/giphyo.gif" width="150px"></span>
            <img class="${column === 12 ? 'card-img-top imageListSize' : 'card-img-top'}" src="./assets/images/Screenshot_2.png" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImage')" alt="Card image cap">
        </div>
        <div class="${column === 12 ? 'cardItemListContent' : 'cardItemContent'}">
            <h5 class="${column === 12 ? 'cardListTitle' : 'cardTitle'}">${array[i].itemName}</h5>
            <div class="${column === 12 ? 'itemListPrice' : 'itemPrice'}">
                ${array[i].price} МКД
            </div>
        </div>
    </div>
    </div>`;
    }
}

function printItemsCard(element, array, column) {
    element.innerHTML = ``;
    for (let i = 0; i < array.length; i++) {
        element.innerHTML += `
        <div class="flex-sm-column col-sm-${column}" >
        <div data-toggle="modal" class="${column === 12 ? 'pointer listCardElement' : 'pointer'}" data-target="${array[i].dataForObject.mainCategory != 'Drink'? '#foodModal': '#drinkModal'}" data-text="${i}">
        <div class="productContainer">
            <div class="removeProduct"><i class="fas fa-times"></i>
            </div>
            <img src="./assets/images/Screenshot_2.png" onerror="this.src = '../assets/images/no-image.png', this.classList.add('onerrorImage')" alt="Card image cap" class="cardProductImage">
            <h5 class="producCardTitle">${array[i].dataForObject.itemName}</h5>
            <div class="quantityContainer">
                <p class="quantityParagraph">Quantity</p>
                <button type="button" class="quantityStyleButtons"><i class="fas fa-minus"></i></button>
                <p class="productQuantityNumber">${array[i].itemQuantity}</p>
                <button type="button" class="quantityStyleButtons"><i class="fas fa-plus"></i></button>
            </div>
            <div class="containerCardPrice">
                <p class="productCardPrice">${array[i].fullPrice} MKD</p>
            </div>
        </div>
    </div>
    </div>`;
    }
}


function modalEventListener() {
    let currentItemQuantity = 1;
    $(`#foodModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let item = currentArray[parseInt(button.data('text'))];
        priceItem = item.price;
        document.getElementById('inModalFooter').innerHTML = newestFoodModal;
        document.getElementById('modalItemTitle').innerHTML = item.itemName;
        for (const ingrediant of item.ingredients) {
            document.getElementById('foodModalIngredientsList').innerHTML += `<li><i class="fas fa-check modalItemCheck"></i>${ingrediant}</li>`;
        }
        for (const extras of item.extras) {
            document.getElementById(
                'foodModalExtrasList'
            ).innerHTML += `<li><input id="${extras.extrasName}" type="checkbox" class="checkbox" onclick="checkCheckBox(this,'${item.price}')" /><label for="${extras.extrasName}">${extras.extrasName}</label></li>`;
        }
        for (const allergen of item.allergens) {
            if (item.allergens[item.allergens.length - 1] === allergen) {
                document.getElementById('foodModalAllergens').innerText += ` ${allergen}`;
            } else {
                document.getElementById('foodModalAllergens').innerText += ` ${allergen},`;
            }
        }
        document.getElementById(`cb2`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb2'));
        addOrRemoveQuantity(
            document.getElementById('addModalQuantity'),
            document.getElementById('removeModalQuantity'),
            document.getElementById('modalItemQuantity'),
            currentItemQuantity
        );
        document.getElementById('modalFullPrice').innerHTML = `${item.price} MKD`;
        document.getElementById('addItemToCard').addEventListener(`click`, function() {
            setItemsInLocalStorage(item, priceItem);
        });
    });
    $(`#drinkModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let item = currentArray[parseInt(button.data('text'))];
        document.getElementById('drinksModalContent').innerHTML = drinkModal;
        document.getElementById('modalDrinksItemTitle').innerHTML = item.itemName;
        document.getElementById('drinksModalFullPrice').innerHTML = `${item.price} MKD`;
        document.getElementById(`cb3`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb3'));
        addOrRemoveQuantity(
            document.getElementById(`addDrinksModalQuantity`),
            document.getElementById(`removeDrinksModalQuantity`),
            document.getElementById(`drinksModalItemQuantity`),
            currentItemQuantity
        );
    });
}

function modalEventListenerForCard() {
    $(`#foodModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let currentItemQuantity = currentArray[parseInt(button.data('text'))].itemQuantity;
        let item = currentArray[parseInt(button.data('text'))].dataForObject;
        priceItem = currentArray[parseInt(button.data('text'))].fullPrice;
        document.getElementById('inModalFooter').innerHTML = newestFoodModal;
        document.getElementById('modalItemTitle').innerHTML = item.itemName;
        for (const ingrediant of item.ingredients) {
            document.getElementById('foodModalIngredientsList').innerHTML += `<li><i class="fas fa-check modalItemCheck"></i>${ingrediant}</li>`;
        }
        for (const extras of item.extras) {
            document.getElementById('foodModalExtrasList').innerHTML += `<li><input id="${extras.extrasName}" type="checkbox" class="checkbox" onclick="checkCheckBox(this,'${item.price}')" /><label for="${extras.extrasName}">${extras.extrasName}</label></li>`;
        }
        for (const allergen of item.allergens) {
            if (item.allergens[item.allergens.length - 1] === allergen) {
                document.getElementById('foodModalAllergens').innerText += ` ${allergen}`;
            } else {
                document.getElementById('foodModalAllergens').innerText += ` ${allergen},`;
            }
        }
        document.getElementById(`cb2`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb2'));
        addOrRemoveQuantity(
            document.getElementById('addModalQuantity'),
            document.getElementById('removeModalQuantity'),
            document.getElementById('modalItemQuantity'),
            currentItemQuantity
        );
        document.getElementById('modalFullPrice').innerHTML = `${item.price} MKD`;
        document.getElementById('addItemToCard').addEventListener(`click`, function() {
            setItemsInLocalStorage(item, priceItem);
        });
    });
    $(`#drinkModal`).on('show.bs.modal', function(event) {
        let button = $(event.relatedTarget);
        let item = currentArray[parseInt(button.data('text'))];
        document.getElementById('drinksModalContent').innerHTML = drinkModal;
        document.getElementById('modalDrinksItemTitle').innerHTML = item.itemName;
        document.getElementById('drinksModalFullPrice').innerHTML = `${item.price} MKD`;
        document.getElementById(`cb3`).addEventListener(`click`, pickOrEatClass.bind(null, 'cb3'));
        addOrRemoveQuantity(
            document.getElementById(`addDrinksModalQuantity`),
            document.getElementById(`removeDrinksModalQuantity`),
            document.getElementById(`drinksModalItemQuantity`),
            currentItemQuantity
        );
    });
}

function checkCheckBox(thisItem, price) {
    let parsingPrice = parseInt(price);
    if (thisItem.checked === true) {
        priceItem += parsingPrice;
        modalFullPrice.innerHTML = `${priceItem} MKD`;
        thisItem.nextElementSibling.style.color = "green";
    } else if (thisItem.checked === false) {
        priceItem -= parsingPrice;
        modalFullPrice.innerHTML = `${priceItem} MKD`;
        thisItem.nextElementSibling.style.color = "unset";
    }
};

function pickOrEatClass(id) {
    document.getElementById(id).checked === true ? document.getElementsByClassName(`pickUp`)[0].classList.add(`eatOrPickSelected`) & document.getElementsByClassName(`eatThere`)[0].classList.remove(`eatOrPickSelected`) : document.getElementsByClassName(`eatThere`)[0].classList.add(`eatOrPickSelected`) & document.getElementsByClassName(`pickUp`)[0].classList.remove(`eatOrPickSelected`);
}

function addOrRemoveQuantity(param1, param2, param3, param4) {
    param1.addEventListener(`click`, function() {
        if (param4 < 10) {
            param4 += 1;
            param3.innerText = param4;
        } else {
            alert("You can't order more then 10 items!(current items: 10)");
        }
    });

    param2.addEventListener(`click`, function() {
        if (param4 >= 2) {
            param4 -= 1;
            param3.innerText = param4;
        }
    });
}

function setItemsInLocalStorage(data, priceItem) {
    let extrasArrayChecked = [];
    let objectPassedToCard = {};
    var x = document.querySelectorAll(".checkbox");
    for (const item of x) {
        if (item.checked) {
            extrasArrayChecked.push(item.id);
        }
    }
    if (!localStorage.getItem('productsArr')) {
        let productsArr = [];
        objectPassedToCard.extras = extrasArrayChecked;
        objectPassedToCard.dataForObject = data;
        objectPassedToCard.fullPrice = priceItem;
        objectPassedToCard.itemQuantity = parseInt(document.getElementById('modalItemQuantity').innerHTML);
        productsArr.push(objectPassedToCard);
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
        document.querySelector('.inCartQuantity').textContent = productsArr.length;
    } else {
        let productsArr = JSON.parse(localStorage.getItem('productsArr'));
        objectPassedToCard.extras = extrasArrayChecked;
        objectPassedToCard.dataForObject = data;
        objectPassedToCard.fullPrice = priceItem;
        objectPassedToCard.itemQuantity = parseInt(document.getElementById('modalItemQuantity').innerHTML);
        productsArr.push(objectPassedToCard);
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
        document.querySelector('.inCartQuantity').textContent = productsArr.length;
    }
}

home.addEventListener(`click`, function() {
    printMostOrderedProducts(currentArray);
    home.classList.add('eatOrPickSelected');
    menu.classList.remove('eatOrPickSelected');
});
menu.addEventListener('click', function() {
    printMenu('menuAll', 'All', newestModalForFood + modalForDrinks, 4);
    home.classList.remove('eatOrPickSelected');
    menu.classList.add('eatOrPickSelected');
});
card.addEventListener('click', function() {
    printCardItems();
});



function filterAndPrintEventListeners() {
    document.getElementById(`menuAll`).addEventListener(`click`, function() {
        printMenu('menuAll', 'All', newestModalForFood + modalForDrinks, 4);
    });
    document.getElementById(`menuBreakfast`).addEventListener(`click`, function() {
        printMenu('menuBreakfast', 'Breakfast', newestModalForFood, 4);
    });
    document.getElementById(`menuLunch`).addEventListener(`click`, function() {
        printMenu('menuLunch', 'Lunch', newestModalForFood, 4);
    });
    document.getElementById(`menuDesert`).addEventListener(`click`, function() {
        printMenu('menuDesert', 'Desert', newestModalForFood, 4);
    });
    document.getElementById(`menuVegetarian`).addEventListener(`click`, function() {
        printMenu('menuVegetarian', 'Vegetarian', newestModalForFood, 4);
    });
    document.getElementById(`menuDrinks`).addEventListener(`click`, function() {
        printMenu('menuDrinks', 'Drink', modalForDrinks, 4);
    });
}

function printMenu(menuNavigation, navigation, modal, column) {
    if (navigation != 'most ordered') {
        mainContainer.innerHTML = menuNav;
        document.getElementById(menuNavigation).classList.add(`selected`);
        currentArray = navigation != 'All' ? productItemsArr[0].filter((x) => x.mainCategory === navigation) : productItemsArr[0];
        document.getElementById('threeColumn').addEventListener(`click`, function() {
            printCard(document.getElementById('centeredContainerRow'), currentArray, 4);
            document.getElementById('selectedView').innerText = '3 COLUMN';
        });
        document.getElementById('twoColumn').addEventListener(`click`, function() {
            printCard(document.getElementById('centeredContainerRow'), currentArray, 6);
            document.getElementById('selectedView').innerText = '2 COLUMN';
        });
        document.getElementById('list').addEventListener(`click`, function() {
            printCard(document.getElementById('centeredContainerRow'), currentArray, 12);
            document.getElementById('selectedView').innerText = 'LIST';
        });
    } else {
        currentArray = productItemsArr[0].filter((x) => x.ordered === 'most ordered');
    }
    document.getElementById('divModal').innerHTML = modal;
    printCard(document.getElementById('centeredContainerRow'), currentArray, column);
    modalEventListener();
    if (navigation != 'most ordered') {
        filterAndPrintEventListeners();
    }
}

// CARD

function productSectionElementsListener() {
    if (localStorage.getItem('productsArr')) {
        document.querySelector("#centeredContainerRow").addEventListener('click', (e) => {
            productSectionElements(e.target, e);
        });
    }
}

function productSectionElements(el, e) {
    if (el.classList.contains('.removeProduct') || el.classList.value === `fas fa-times`) {
        e.stopPropagation();
    }
};