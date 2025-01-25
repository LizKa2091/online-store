const buyButtons = document.querySelectorAll('.card__button');
const cards = document.querySelectorAll('.card');

const updateCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));

    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
    const cartIcon = document.querySelector('.cart-link__number');

    cartIcon.textContent = totalItemsAmount;
}

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
            e.target.style.display = 'none';

            currButton.innerHTML += `<div class='card__button-replaced'>
                <button class='card__button-decrease' data-id='${currElId}'></button>
                <p class='card__amount' data-id='${currElId}'>${++existingItem.amount}</p>
                <button class='card__button-increase' data-id='${currElId}'></button>
            </div>`;
        }
        else {
            cartObj.items.push({
                id: currElId,
                amount: 1
            });
            
            e.target.style.display = 'none';

            currButton.innerHTML += `<div class='card__button-replaced'>
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
    cartObj.items.filter(item => item.id === itemId)[0].amount--;

    localStorage.setItem('cart', JSON.stringify(cartObj));

    updateItem(e);
};

const itemIncrease = (e) => {
    const itemId = e.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    cartObj.items.filter(item => item.id === itemId)[0].amount++;

    localStorage.setItem('cart', JSON.stringify(cartObj));

    updateItem(e);
};

const updateItem = (e) => {
    const itemId = e.target.dataset.id;
    const cartObj = JSON.parse(localStorage.getItem('cart'));

    const currItemAmount = cartObj.items.filter(item => item.id === itemId)[0].amount;

    const cardAmounts = document.querySelectorAll('.card__amount');
    const currCardAmount = [...cardAmounts].find(item => item.dataset.id === itemId);
    currCardAmount.textContent = currItemAmount;

    const buttonDecrease = document.querySelectorAll('.card__button-decrease');
    const currButtonDecrease = [...buttonDecrease].find(item => item.dataset.id === itemId);

    if (currItemAmount === 1 && currButtonDecrease) {
        currButtonDecrease.style.display = 'none';
    }
    else if (currButtonDecrease) {
        currButtonDecrease.style.display = 'inline';
    }
};

const addEventListeners = () => {
    const buttonDecrease = document.querySelectorAll('.card__button-decrease');
    const buttonIncrease = document.querySelectorAll('.card__button-increase');

    [...buttonDecrease].forEach(button => button.addEventListener('click', itemDecrease));
    [...buttonIncrease].forEach(button => button.addEventListener('click', itemIncrease));
};

[...buyButtons].forEach(el => el.addEventListener('click', addToCart))

//добавить: как загрузилась страница сразу показываем кнопочки новые