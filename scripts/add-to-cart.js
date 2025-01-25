const buyButtons = document.querySelectorAll('.card__button');
const cards = document.querySelectorAll('.card');

const updateCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));

    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
    const cartIcon = document.querySelector('.cart-link__number');

    cartIcon.textContent = totalItemsAmount;
};

const addToCart = (e) => {
    const currElId = e.target.dataset.itemId;
    const currButton = [...cards].find(card => card.dataset.id === currElId)

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

        currButton.innerHTML += `<div class='card__button-replaced' data-id='${currElId}'>
            <p class='card__amount' data-id='${currElId}'>1</p>
            <button class='card__button-increase' data-id='${currElId}'></button>
        </div>`;
    }
    else {
        cartObj = JSON.parse(currCart);
        const existingItem = cartObj.items.find(item => item.id === currElId);

        if (existingItem) {
            existingItem.amount++;
            e.target.style.display = 'none';
            updateItemDisplay(currButton, existingItem);
        }
        else {
            cartObj.items.push({
                id: currElId,
                amount: 1
            });
            
            e.target.style.display = 'none';
            currButton.innerHTML += `<div class='card__button-replaced'>
                <button class='card__button-decrease' data-id='${currElId}' style='display: none;'></button>
                <p class='card__amount' data-id='${currElId}'>1</p>
                <button class='card__button-increase' data-id='${currElId}'></button>
            </div>`;
        }
    }    
    localStorage.setItem('cart', JSON.stringify(cartObj));
    addEventListeners();

    updateCartAmount();
};

const itemDecrease = (e) => {
    const itemId = e.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => item.id === itemId);

    if (item.amount > 1) {
        item.amount--;
    } 
    else {
        cartObj.items = cartObj.items.filter(item => item.id !== itemId);
    }

    localStorage.setItem('cart', JSON.stringify(cartObj));

    updateItemDisplay(e.target.closest('.card__button-replaced'), item);
    updateCartAmount();
};

const itemIncrease = (e) => {
    const itemId = e.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => item.id === itemId);
    item.amount++;

    localStorage.setItem('cart', JSON.stringify(cartObj));

    updateItemDisplay(e.target.closest('.card__button-replaced'), item);
    updateCartAmount();
};

const updateItemDisplay = (buttonContainer, item) => {
    const currCardAmount = buttonContainer.querySelector('.card__amount');
    currCardAmount.textContent = item.amount;

    const buttonDecrease = buttonContainer.querySelector('.card__button-decrease');
    if (item.amount === 1 && buttonDecrease) {
        buttonDecrease.style.display = 'none';
    } else if (buttonDecrease) {
        buttonDecrease.style.display = 'inline';
    }
};

const addEventListeners = () => {
    const buttonDecrease = document.querySelectorAll('.card__button-decrease');
    const buttonIncrease = document.querySelectorAll('.card__button-increase');

    [...buttonDecrease].forEach(button => button.addEventListener('click', itemDecrease));
    [...buttonIncrease].forEach(button => button.addEventListener('click', itemIncrease));
};

const loadItems = () => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    if (cartObj) {
        const buyButtons = document.querySelectorAll('.card__button');

        buyButtons.forEach(button => {
            const itemId = button.dataset.itemId;
            const existingItem = cartObj.items.find(item => item.id === itemId);

            if (existingItem) {
                button.style.display = 'none';
                const currButton = [...cards].find(card => card.dataset.id === itemId);
                currButton.innerHTML += `<div class='card__button-replaced'>
                    <button class='card__button-decrease' data-id='${itemId}'></button>
                    <p class='card__amount' data-id='${itemId}'>${existingItem.amount}</p>
                    <button class='card__button-increase' data-id='${itemId}'></button>
                </div>`;
                updateItemDisplay(currButton.querySelector('.card__button-replaced'), existingItem);
            }
        });
        addEventListeners();
    }
};

document.addEventListener('DOMContentLoaded', loadItems);
[...buyButtons].forEach(el => el.addEventListener('click', addToCart))