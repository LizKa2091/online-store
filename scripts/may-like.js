const itemsHashTable = {};
const mayLikeDiv = document.querySelector('.section-like');
const buyButtons = document.querySelectorAll('.item__button');
const cards = document.querySelectorAll('.section-like__item');

const itemsObj = {
    1: { name: 'Irish Stout Irish Stout', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '68 ₽', strength: '4.5 %', img: '../images/item1.png' },
    2: { name: 'Indian Stout', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '108 ₽', strength: '4.5 %', img: '../images/item2.png' },
    3: { name: 'Italian Stout', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' },

    4: { name: 'Irish Stout Irish Stout 2', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '508 ₽', strength: '4.5 %', img: '../images/item1.png' },
    5: { name: 'Indian Stout 2', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '408 ₽', strength: '4.5 %', img: '../images/item2.png' },
    6: { name: 'Irish Stout 2', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '108 ₽', strength: '4.5 %', img: '../images/item3.png' },

    7: { name: 'Irish Stout 3', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '608 ₽', strength: '4.5 %', img: '../images/item3.png' },
    8: { name: 'Irish Stout 4', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' },
    9: { name: 'Irish Stout 5', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' },

    10: { name: 'Irish Stout 6', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' },
    11: { name: 'Irish Stout 7', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' },
    12: { name: 'Irish Stout 8', category: 'Пиво', subcategory: 'Светлое', capacity: '0.355 л', price: '208 ₽', strength: '4.5 %', img: '../images/item3.png' }
};

const findItemsMayLike = () => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const cartItemsId = cartObj.items.map(item => +item.id);
    let counter = 0;

    for (let itemId in itemsObject) {
        if (itemsObject.hasOwnProperty(itemId) && !cartItemsId.includes(+itemId)) {
            itemsHashTable[itemId] = itemsObject[itemId];
        }
    }

    const prevIds = [];

    if (Object.keys(itemsHashTable).length >= 4) {
        while (counter < 4) {
            let randomId = Math.floor(Math.random() * 13);
            
            if (randomId in itemsHashTable && !prevIds.includes(randomId)) {
                insertItem(itemsHashTable[randomId], randomId);
                prevIds.push(randomId);

                counter++;
            }
        }  
    }
    else {
        counter = Object.keys(itemsHashTable).length;
        while (counter > 0) {
            let randomId = Math.floor(Math.random() * 13);

            if (randomId in itemsHashTable && !prevIds.includes(randomId)) {
                insertItem(itemsHashTable[randomId], randomId);
                prevIds.push(randomId)

                counter--;
            }
        }

        let itemsLeft = 4 - prevIds.length;

        while (itemsLeft > 0) {
            let randomId = Math.floor(Math.random() * 13);

            if (itemsObject[randomId] && !prevIds.includes(randomId)) {
                insertItem(itemsObject[randomId], randomId);
                prevIds.push(randomId)

                itemsLeft--;
            }
        }
    }

    addEventListenersToButtons();
    addEventListenersToCards();
};

const insertItem = (item, itemId) => {
    mayLikeDiv.innerHTML += `<div class='section-like__item' data-id='${itemId}'>
        <img src='${item.img}' class='item__img' alt='${item.name}'>
        <h4 class="item__title">${item.name}</h4>
        <span class="item__subtitle">${item.strength} ${item.subcategory}</span>
        <span class="item__price">${item.price}</span>
        <button class="item__button" data-item-id="${itemId}">Купить</button>
    </div>`;
};

const transferItem = (e) => {
    const currItem = e.target.closest('.section-like__item');;
    if (!currItem) return;

    const isQuantityButton = e.target.classList.contains('item__button-decrease') || e.target.classList.contains('item__button-increase') || e.target.classList.contains('item__button-replaced') || e.target.classList.contains('item__button');
    if (isQuantityButton) return;
    
    let currItemId = currItem.dataset.id;

    if (currItemId) {
        window.location.href = `item-card.html?id=${currItemId}`;
    }
};

const addEventListenersToButtons = () => {
    const buyItemButtons = document.querySelectorAll('.item__button');

    [...buyItemButtons].forEach(el => el.addEventListener('click', addToCart));
};

const addEventListenersToCards = () => {
    const cards = document.querySelectorAll('.section-like__item');
    
    [...cards].forEach(card => card.addEventListener('click', transferItem));
};

const updateCartAm = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));
    const totalItemsAm = currCart?.items.reduce((sum, item) => sum + item.amount, 0) || 0;
    const cartIcon = document.querySelector('.cart-link__number');
    cartIcon.textContent = totalItemsAm;
};

const addToCart = (e) => {
    const cards = document.querySelectorAll('.section-like__item');
    const currElId = e.target.dataset.itemId;
    const currButton = [...cards].find(card => +card.dataset.id === +currElId);
    const currCart = localStorage.getItem('cart');
    let cartObj;

    e.target.classList.add('added-to-cart-item');

    if (!currCart) {
        cartObj = {
            items: [{
                id: currElId,
                amount: 1
            }]
        };
        e.target.style.display = 'none';
        currButton.innerHTML += `<div class='item__button-replaced' data-id='${currElId}'>
            <button class='item__button-decrease' data-id='${currElId}' style='display: none;'></button>
            <p class='item__amount' data-id='${currElId}'>1</p>
            <button class='item__button-increase' data-id='${currElId}'></button>
        </div>`;
    } 
    else {
        cartObj = JSON.parse(currCart);
        const existingItem = cartObj.items.find(item => +item.id === +currElId);

        if (existingItem) {
            existingItem.amount++;
            e.target.style.display = 'none';

            currButton.innerHTML += `<div class='item__button-replaced' data-id='${currElId}'>
            <button class='item__button-decrease' data-id='${currElId}' style='display: none;'></button>
            <p class='item__amount' data-id='${currElId}'></p>
            <button class='item__button-increase' data-id='${currElId}'></button>
            </div>`;

            updateItemDisplay(currButton, existingItem);
        } 
        else {
            cartObj.items.push({
                id: currElId,
                amount: 1
            });
            e.target.style.display = 'none';
            currButton.innerHTML += `<div class='item__button-replaced'>
                <button class='item__button-decrease' data-id='${currElId}' style='display: none;'></button>
                <p class='item__amount' data-id='${currElId}'>1</p>
                <button class='item__button-increase' data-id='${currElId}'></button>
            </div>`;
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartObj));
    addEventListeners();
    updateCartAm();
};

const itemDecr = (e) => {
    const itemId = e.target.dataset.id;
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => +item.id === +itemId);

    item.amount > 1 ? item.amount-- : cartObj.items = cartObj.items.filter(item => +item.id !== +itemId);

    localStorage.setItem('cart', JSON.stringify(cartObj));
    updateItemDisplay(e.target.closest('.item__button-replaced'), item);
    updateCartAm();
};

const itemIncr = (e) => {
    const itemId = e.target.dataset.id;
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => +item.id === +itemId);
    item.amount++;
    localStorage.setItem('cart', JSON.stringify(cartObj));
    updateItemDisplay(e.target.closest('.item__button-replaced'), item);
    updateCartAm();
};

const updateItemDisplay = (buttonContainer, item) => {
    if (!buttonContainer) return;
    const currCardAmount = buttonContainer.querySelector('.item__amount');
    if (currCardAmount) {
        currCardAmount.textContent = item.amount;
    }
    const buttonDecrease = buttonContainer.querySelector('.item__button-decrease');
    if (buttonDecrease) {
        buttonDecrease.style.display = item.amount > 1 ? 'inline' : 'none';
    }
};

const addEventListeners = () => {
    const buttonDecrease = document.querySelectorAll('.item__button-decrease');
    const buttonIncrease = document.querySelectorAll('.item__button-increase');
    [...buttonDecrease].forEach(button => button.addEventListener('click', itemDecr));
    [...buttonIncrease].forEach(button => button.addEventListener('click', itemIncr));
};

const loadItems = () => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    if (cartObj) {
        const buyButtons = document.querySelectorAll('.item__button');
        buyButtons.forEach(button => {
            const itemId = button.dataset.itemId;
            const existingItem = cartObj.items.find(item => +item.id === +itemId);
            if (existingItem) {
                button.style.display = 'none';
                const currButton = [...cards].find(card => card.dataset.id === itemId);
                currButton.innerHTML += `<div class='item__button-replaced'>
                    <button class='item__button-decrease' data-id='${itemId}'></button>
                    <p class='item__amount' data-id='${itemId}'>${existingItem.amount}</p>
                    <button class='item__button-increase' data-id='${itemId}'></button>
                </div>`;
                updateItemDisplay(currButton.querySelector('.item__button-replaced'), existingItem);
            }
        });
        addEventListeners();
    }
};

document.addEventListener('DOMContentLoaded', loadItems);
document.addEventListener('DOMContentLoaded', findItemsMayLike);