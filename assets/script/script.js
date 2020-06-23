const url = "https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json";
const mostOrderedItems = ``;
const mostOrderedProductsTitle = `<div class="mostOrderedTitle">Most Ordered Products</div>
<div class="row mostOrderedItems" id="mostOrderedItemsRow"></div>`;
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
    printMenu('none', 'most ordered', modalForFood, 3);
    printCard(document.getElementById("mostOrderedItemsRow"), currentArray, 3);
    document.getElementById("divModal").innerHTML = modalForFood;
    modalEventListener();
};

function printCard(element, array, column) {
    element.innerHTML = ``;
    for (let i = 0; i < array.length; i++) {
        element.innerHTML += `
        <div class="flex-sm-column col-sm-${column}" >
        <div data-toggle="modal" class="${column === 12 ? 'pointer listCardElement' : 'pointer'}" data-target="${array[i].mainCategory != 'Drink' ? '#foodModal' : '#drinkModal'}" data-text="${i}">
        <div class="cardImageContainer">
            <span class="itemImageText"><img src="./assets/images/giphyo.gif" width="150px"></span>
            <img class="${column === 12 ? 'card-img-top imageListSize' : 'card-img-top'}" src="./assets/images/Screenshot_2.png" alt="Card image cap">
        </div>
        <div class="${column === 12 ? 'cardItemListContent' : 'cardItemContent'}">
            <h5 class="${column === 12 ? 'cardListTitle' : 'cardTitle'}">${array[i].itemName}</h5>
            <div class="${column === 12 ? 'itemListPrice': 'itemPrice'}">
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
    printMenu('menuAll', 'All', modalForFood + modalForDrinks, 4);
});

function filterAndPrintEventListeners() {
    document.getElementById(`menuAll`).addEventListener(`click`, function() {
        printMenu('menuAll', 'All', modalForFood + modalForDrinks, 4);
    });
    document.getElementById(`menuBreakfast`).addEventListener(`click`, function() {
        printMenu('menuBreakfast', 'Breakfast', modalForFood, 4);
    });
    document.getElementById(`menuLunch`).addEventListener(`click`, function() {
        printMenu("menuLunch", "Lunch", modalForFood, 4);
    });
    document.getElementById(`menuDesert`).addEventListener(`click`, function() {
        printMenu('menuDesert', 'Desert', modalForFood, 4);
    });
    document.getElementById(`menuVegetarian`).addEventListener(`click`, function() {
        printMenu("menuVegetarian", "Vegetarian", modalForFood, 4);
    });
    document.getElementById(`menuDrinks`).addEventListener(`click`, function() {
        printMenu("menuDrinks", "Drink", modalForDrinks, 4);
    });
}

function printMenu(menuNavigation, navigation, modal, column) {
    if (navigation != 'most ordered') {
        mainContainer.innerHTML = menuNav;
        document.getElementById(menuNavigation).classList.add(`selected`);
        currentArray = navigation != "All" ? productItemsArr[0].filter(x => x.mainCategory === navigation) : productItemsArr[0];

        document.getElementById('threeColumn').addEventListener(`click`, function() {
            printCard(document.getElementById("mostOrderedItemsRow"), currentArray, 4);
            document.getElementById("selectedView").innerText = '3 COLUMN';
        });
        document.getElementById('twoColumn').addEventListener(`click`, function() {
            printCard(document.getElementById("mostOrderedItemsRow"), currentArray, 6);
            document.getElementById("selectedView").innerText = '2 COLUMN';
        });
        document.getElementById('list').addEventListener(`click`, function() {
            printCard(document.getElementById("mostOrderedItemsRow"), currentArray, 12);
            document.getElementById("selectedView").innerText = 'LIST';
        });
    } else {
        currentArray = productItemsArr[0].filter(x => x.ordered === "most ordered");
    }
    document.getElementById("divModal").innerHTML = modal;
    printCard(document.getElementById("mostOrderedItemsRow"), currentArray, column);
    modalEventListener();
    if (navigation != 'most ordered') {
        filterAndPrintEventListeners();
    }
}