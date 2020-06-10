
let priceForAll = 0;

let productsArr = JSON.parse(localStorage.getItem('productsArr'));

let cartProducts = localStorage.getItem('productInCart');

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
    let counter = 1;
    if (cartProducts != null) {
        productsSection.innerHTML = '';
        priceForAll = 0;
        for (const product of productsArr) {
            priceForAll += product.itemQuantity * product.fullPrice;
            productsSection.innerHTML += `<div class="product">
                <ion-icon name="close-circle-outline" class="deleteBtn" id="${product.id}"></ion-icon>
                <img src="${product.dataForObject.itemImg}"width="200px" height="150px" alt="${product.dataForObject.itemName}" onerror="this.src = '../assets/images/no-image.png'" />
                <span class="product_name">${product.dataForObject.itemName}</span>
                <div class="product_price">${product.fullPrice},00 мкд </div>
                    <div class="product_quantity"> 
                        <ion-icon class="addQuantity" name="add-circle-outline"></ion-icon>
                        <span>${product.itemQuantity}</span>
                        <ion-icon class="subtractQuantity" name="remove-circle-outline"></ion-icon>  
                    </div>
            <div class="product_total">
               ${product.itemQuantity * product.fullPrice},00 мкд
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



function productSectionElements(el) {
    if (el.classList.contains('deleteBtn')) {
        el.parentElement.remove();
        productsArr.splice(productsArr.findIndex(elemenet => elemenet.id === parseInt(el.id)), 1)
        localStorage.setItem("productsArr", JSON.stringify(productsArr));
        cartProducts--;
        localStorage.setItem('productInCart', parseInt(localStorage.getItem('productInCart')) - 1);
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
            console.log(e.target);
            productSectionElements(e.target);
        });
    }
}
let objectPassedToCard = {};

if (!localStorage.getItem('productInCart')) {
    document.querySelector('.cart_counter').textContent = '';
} else {
    document.querySelector('.cart_counter').textContent = localStorage.getItem('productInCart');
}


