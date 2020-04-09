let listItems = document.querySelector("#list-Items");
let threeGridView = document.querySelector("#three-grid-view");
let twoGridView = document.querySelector("#two-grid-view");
let listView = document.querySelector("#list-view");
let btnAll = document.querySelector("#all")
let breakfast = document.querySelector("#breakfast");
let lunch = document.querySelector("#lunch");
let desert = document.querySelector("#desert");
let drinks = document.querySelector("#drinks");
var column = 3;
let counter = 0;
let dataJSON;
const currentLocation = window.location.href.split("pages/")[1];

let itemsArr = [];

let breakfastArr = [];
let lunchArr = [];
let desertArr = [];
let drinksArr = [];

function printCategoryAndView() {
    if (currentLocation === "menu.html") {
        printItems(itemsArr[0].results, listItems, column);
    } else if (currentLocation === "breakfast.html") {
        printItems(breakfastArr, listItems, column);
    } else if (currentLocation === "lunch.html") {
        printItems(lunchArr, listItems, column);
    } else if (currentLocation === "desert.html") {
        printItems(desertArr, listItems, column);
    } else if (currentLocation === "drinks.html") {
        printItems(drinksArr, listItems, column);
    } else {
        listItems.innerHTML = "OOPS... SOMETHING WENT WRONG!"
    }
}

$.ajax({
    url: 'https://raw.githubusercontent.com/LordGrim15/JSON-Menu/master/menu.json',
    dataType: 'json',
    success: function(data) {
        dataJSON = data
        itemsArr.push(data);
        filteredBreakfastArrFunction();
        filteredLunchArrFunction();
        filteredDesertArrFunction();
        filtereDrinksdArrFunction();
        printCategoryAndView();
    },
    error: function(err) {
        listItems.innerHTML = err.message;
    }

});

function filteredBreakfastArrFunction() {
    breakfastArr = itemsArr[0].results.filter(function(e) {
        return e.mainCategory === "Breakfast";
    });
}

function filteredLunchArrFunction() {
    lunchArr = itemsArr[0].results.filter(function(e) {
        return e.mainCategory === "Lunch";
    });
}

function filteredDesertArrFunction() {
    desertArr = itemsArr[0].results.filter(function(e) {
        return e.mainCategory === "Desert";
    });
}

function filtereDrinksdArrFunction() {
    drinksArr = itemsArr[0].results.filter(function(e) {
        return e.mainCategory === "Drink";
    });
}

threeGridView.addEventListener("click", function() {
    column = 3;
    printCategoryAndView();
})
twoGridView.addEventListener("click", function() {
    column = 2;
    printCategoryAndView();
})
listView.addEventListener("click", function() {
    column = 1;
    printCategoryAndView();
})

function counterFunc() {
    counter++
    return counter;
}

function printItems(data, htmlItem, column) {
    counter = 0;
    htmlItem.innerHTML = ``;
    for (let i = 0; i < data.length; i++) {
        htmlItem.innerHTML += `
            <div class="row list-item" id="row${counterFunc()}">
                <div class="col-sm block-click">
                    <img src="${data[i].itemImg}" width="250px" height="200px" alt="${data[i].name}" />
                    <ul class="list-items">
                    <li>${data[i].itemName}</li>
                    <li>${data[i].mainCategory}</li>
                    <li class="price-class">${data[i].price} мкд</li>
                    </ul>
                </div>
             </div>
            `;
        let row = `row${counter}`
        let rowz = document.getElementById(row);
        if (data[i + 1] != null) {
            if (column === 2 || column === 3) {
                rowz.innerHTML += `<div class="col-sm block-click">
                <img src="${data[i+1].itemImg}" width="250px" height="200px" alt="${data[i+1].name}" />
                <ul class="list-items">
                <li>${data[i+1].itemName}</li>
                <li>${data[i+1].mainCategory}</li>
                <li class="price-class">${data[i+1].price} мкд</li>
                </ul>
            </div>`
            }
        }
        if (data[i + 2] != null) {
            if (column === 3) {
                rowz.innerHTML += `<div class="col-sm block-click">
            <img src="${data[i+2].itemImg}" width="250px" height="200px" alt="${data[i+1].name}" />
            <ul class="list-items">
            <li>${data[i+2].itemName}</li>
            <li>${data[i+2].mainCategory}</li>
            <li class="price-class">${data[i+2].price} мкд</li>
            </ul>
            </div>`
            }
        }
        if (column === 2) {
            i += 1
        } else if (column === 3) {
            i += 2
        }
    }
}