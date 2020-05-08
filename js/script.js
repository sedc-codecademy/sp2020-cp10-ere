const url = "https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json";
let mostOrderedProducts = [];

let mainSectionOne = document.getElementById("main-section-one");
let mainSectionTwo = document.getElementById("main-section-two");



let currentItemQuantity = 1;
let column = 3;
let counter = 0;
let priceItem;
let itemQuantity = document.getElementById("itemQuantity");
let plusItem = document.getElementById("plusItem");
let minusItem = document.getElementById("minusItem");
let dataForModal;
let itemsArr = [];
let breakfastArr = [];
let lunchArr = [];
let desertArr = [];
let drinksArr = [];
let veganArr = [];
let vegetarianArr = [];
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
                <img src="../assets/logo-wallpaper/logo_transparent.png" onerror="this.src = './assets/images/no-image.png'" alt="Image" id="modalImage" width="150px" height="150px">
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
        <button type="button btn-add-to-cart" class="btn btn-primary" id="cartBtn">Add to cart</button>
    </div>
</div>`;

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        getMostOrdered(data.results);
        printProducts(mostOrderedProducts, mainSectionOne);
        printProducts(mostOrderedProducts, mainSectionTwo);
        dataForModal = data.results;

    })
    .catch(function(error) {
        console.log(error);

    });

function getMostOrdered(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].ordered === "most ordered") {
            mostOrderedProducts.push(data[i])
        }
    }

}


function printProducts(data, element) {
    counter = 0;
    element.innerHTML = ``;
    if (element === mainSectionTwo) {
        for (let i = 4; i < 8; i++) {
            element.innerHTML += `
            <figure class="col-sm block-click main-page-items" data-toggle="modal" data-target="#exampleModal" data-text="${[i]}">
                <img src="${data[i].itemImg}" width="250px" height="200px" alt="${data[i].name}" onerror="this.src = 'assets/images/no-image.png'" />  
                <figcaption>
                <h4>${data[i].itemName}</h4>
                <string>${data[i].price} мкд</strong>
                </figcaption>
            </figure>    
            `
        }
    } else {
        for (let i = 0; i < 4; i++) {
            element.innerHTML += `
            <figure class="col-sm block-click main-page-items" data-toggle="modal" data-target="#exampleModal" data-text="${[i]}">
                <img src="${data[i].itemImg}" width="250px" height="200px" alt="${data[i].name}" onerror="this.src = 'assets/images/no-image.png'" />  
                <figcaption>
                <h4>${data[i].itemName}</h4>
                <string>${data[i].price} мкд</strong>
                </figcaption>
            </figure>    
            `
        }
    }
}




$('#exampleModal').on('show.bs.modal', function(event) {
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
    let addToCartBtn = document.getElementById("cartBtn");

    priceItem = dataForModal[parsedNum].price;
    checkboxes[0].innerHTML = "";
    ingredients[0].innerHTML = "";
    allergens[0].innerHTML = "";
    currentItemQuantity = 1;
    itemQuantity.innerHTML = "1";
    modal.find('.modal-title').text(mostOrderedProducts[parsedNum].itemName);
    modalImage[0].src = mostOrderedProducts[parsedNum].itemImg;
    modalImage[0].alt = mostOrderedProducts[parsedNum].itemName;

    if (mostOrderedProducts[parsedNum].extras != null) {
        for (const item of mostOrderedProducts[parsedNum].extras) {
            checkboxes[0].innerHTML += `<input type="checkbox" class="checkbox" id="${item.extrasName}" name="${item.extrasName}" onclick="checkCheckBox(this,'${item.price}')" />
        <label class="extras-design" for="${item.extrasName}">${item.extrasName} <span class="extras-price-color">${item.price} мкд</span></label><br>`
        }
    }
    if (mostOrderedProducts[parsedNum].ingredients != null) {
        for (const ingredient of mostOrderedProducts[parsedNum].ingredients) {
            ingredients[0].innerHTML += `<li>${ingredient}</li>`
        }
    }
    if (mostOrderedProducts[parsedNum].allergens != null) {
        for (const allergen of mostOrderedProducts[parsedNum].allergens) {
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
    addToCartBtn.addEventListener(`click`, function() {
        itemsCounterOrCreateInLocal();
        setItemsInLocalStorage(dataForModal[parsedNum], itemQuantity, parseInt((`#itemPrice`)));
    })


})

function checkCheckBox(thisItem, price) {
    let parsingPriceItem = parseInt(priceItem);
    priceItem = parsingPriceItem;
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


// Add to cart

let objectPassedToCard = {};


if (!localStorage.getItem('productInCart')) {
    document.querySelector('.cart_counter').textContent = '';
} else {
    document.querySelector('.cart_counter').textContent = localStorage.getItem('productInCart');
}


function itemsCounterOrCreateInLocal() {
    if (!localStorage.getItem('productInCart')) {
        localStorage.setItem('productInCart', 1);
        document.querySelector('.cart_counter').textContent = 1;
    } else {
        localStorage.setItem('productInCart', parseInt(localStorage.getItem('productInCart')) + 1);
        document.querySelector('.cart_counter').textContent = parseInt(localStorage.getItem('productInCart'));
    }
}

function setItemsInLocalStorage(data) {
    let extrasArrayChecked = [];
    let objectPassedToCard = {};
    var x = document.querySelectorAll(".checkbox");
    for (const item of x) {
        if (item.checked) {
            extrasArrayChecked.push(item.name);
        }
    }
    if (!localStorage.getItem('productsArr')) {
        let productsArr = []
        let itemON = parseInt(localStorage.getItem('productInCart'));
        objectPassedToCard.id = itemON;
        objectPassedToCard.extras = extrasArrayChecked;
        objectPassedToCard.dataForObject = data;
        objectPassedToCard.fullPrice = priceItem;
        objectPassedToCard.itemQuantity = currentItemQuantity;
        productsArr.push(objectPassedToCard);
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
    } else {
        let productsArr = JSON.parse(localStorage.getItem('productsArr'));
        let itemON = parseInt(localStorage.getItem('productInCart'));
        objectPassedToCard.id = itemON;
        objectPassedToCard.extras = extrasArrayChecked;
        objectPassedToCard.dataForObject = data;
        objectPassedToCard.fullPrice = priceItem;
        objectPassedToCard.itemQuantity = currentItemQuantity;
        productsArr.push(objectPassedToCard);
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
    }
}