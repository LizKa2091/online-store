const goCatalogButton = document.querySelector('.empty-cart__button');
const placeOrderButton = document.querySelector('.filled-cart__button');
const emptyCartDiv = document.querySelector('.empty-cart');
const filledCartDiv = document.querySelector('.filled-cart');

const tableBody = document.querySelector('.filled-cart__body');

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

const isCartFilled = () => {
    const currCart = localStorage.getItem('cart');
    const mainBlock = document.querySelector('.main');
    
    if (!currCart) {
        emptyCartDiv.classList.remove('hidden');
        filledCartDiv.classList.add('hidden');

        //mainBlock.style.height = 'clamp(230px, 100dvh, 620px)';
    }
    else {
        emptyCartDiv.classList.add('hidden');
        filledCartDiv.classList.remove('hidden');

        //mainBlock.style.minHeight = 'clamp(230px, 100dvh, 620px)';

        tableBody.innerHTML = '';

        getCartItems(JSON.parse(currCart));
    }
    addEventListeners();
};

const getCartItems = (cart) => {
    cart.items.forEach(item => {
        if (item.id in itemsObj) {
            insertItem(itemsObj[item.id], item.id, cart);
        }
    });
    applyModificationsForMobile();
};

const insertItem = (itemObj, itemId, currCart) => {
    const currItemAmount = currCart.items.find(item => item.id === itemId).amount;

    if (currItemAmount === 1) {
        tableBody.innerHTML += `<tr class='filled-cart__item'>
        <td class='filled-cart__item-cell'>
            <img class='filled-cart__item-icon' src='${itemObj.img}'>
        </td>
        <td class='filled-cart__item-cell item-info'>
            <p class='filled-cart__item-name'>${itemObj.name}</p>
            <p class='filled-cart__item-category'>${itemObj.category}</p>
            <p class='filled-cart__item-subcategory'>${itemObj.subcategory}</p>
            <p class='filled-cart__item-capacity'>${itemObj.capacity}</p>
        </td>
        <td class='filled-cart__item-cell'>
            <div class='filled-cart__item-cell__item-actions'>
                <p class='filled-cart__item-amount' data-id='${itemId}'>${currItemAmount}</p>
                <button class='filled-cart__action-button item-increase' data-id='${itemId}'></button>
            </div>
        </td>
        <td class='filled-cart__item-cell item-total-price' id='item-price'>
            <p class='filled-cart__item-total'>${+itemObj.price.slice(0, itemObj.price.length-2) * +currItemAmount} ₽</p>
        </td>
        <td class='filled-cart__item-cell item-calculations' id='item-calculations'>
            <p class='filled-cart__item-price'>${itemObj.price} * ${currItemAmount}</p>
        </td>
        <td class='filled-cart__item-cell item-del'>
            <button class='filled-cart__button-delete' data-id='${itemId}'></button>
        </td>
        </tr>`;
    }
    else {
        tableBody.innerHTML += `<tr class='filled-cart__item'>
        <td class='filled-cart__item-cell'>
            <img class='filled-cart__item-icon' src='${itemObj.img}'>
        </td>
        <td class='filled-cart__item-cell item-info '>
            <p class='filled-cart__item-name'>${itemObj.name}</p>
            <p class='filled-cart__item-category'>${itemObj.category}</p>
            <p class='filled-cart__item-subcategory'>${itemObj.subcategory}</p>
            <p class='filled-cart__item-capacity'>${itemObj.capacity}</p>
        </td>
        <td class='filled-cart__item-cell'>
            <div class='filled-cart__item-cell__item-actions'>
                <button class='filled-cart__action-button item-decrease' data-id='${itemId}'></button>  
                <p class='filled-cart__item-amount' data-id='${itemId}'>${currItemAmount}</p>
                <button class='filled-cart__action-button item-increase' data-id='${itemId}'></button>
            </div>
        </td>
        <td class='filled-cart__item-cell item-total-price' id='item-price'>
            <p class='filled-cart__item-total'>${+itemObj.price.slice(0, itemObj.price.length-2) * +currItemAmount} ₽</p>
        </td>
        <td class='filled-cart__item-cell item-calculations' id='item-calculations'>
            <p class='filled-cart__item-price'>${itemObj.price} * ${currItemAmount}</p>
        </td>
        <td class='filled-cart__item-cell item-del'>
            <button class='filled-cart__button-delete' data-id='${itemId}'></button>
        </td>
        </tr>`;
    }

    updateSummary();
}

const updateSummary = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));
    const summarySpan = document.querySelector('.filled-cart__price');

    let total = 0;

    currCart.items.forEach(item => {
        if (item.id in itemsObj) {
            const itemObj = itemsObj[item.id];
            const currItemAmount = item.amount;
            const itemTotalPrice = +itemObj.price.slice(0, itemObj.price.length-2) * currItemAmount;
            total += itemTotalPrice;
        }
    });

    summarySpan.textContent = `${total} ₽`;
};

const increaseItem = (button) => {
    const itemId = button.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    cartObj.items.filter(item => item.id === itemId)[0].amount++;

    localStorage.setItem('cart', JSON.stringify(cartObj));

    isCartFilled(); 
    updateCartAmount();
};

const decreaseItem = (button) => {
    const itemId = button.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    cartObj.items.filter(item => item.id === itemId)[0].amount--;

    localStorage.setItem('cart', JSON.stringify(cartObj));

    isCartFilled();
    updateCartAmount();
};

const deleteItem = (button) => {
    const itemId = button.target.dataset.id;
    
    const cartObj = JSON.parse(localStorage.getItem('cart'));

    if (cartObj.items.length === 1) {
        localStorage.removeItem('cart');
        isCartFilled();
    }

    cartObj.items = cartObj.items.filter(item => item.id !== itemId);

    if (cartObj.items.length >= 1)  {
        localStorage.setItem('cart', JSON.stringify(cartObj));
    }

    isCartFilled();
    updateCartAmount();
};

const updateCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));

    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
    const cartIcon = document.querySelector('.cart-link__number');

    cartIcon.textContent = totalItemsAmount;
};

const addEventListeners = () => {
    const increaseButtons = document.querySelectorAll('.item-increase');
    const decreaseButtons = document.querySelectorAll('.item-decrease');
    const deleteButtons = document.querySelectorAll('.filled-cart__button-delete');
    [...increaseButtons].forEach(button => button.addEventListener('click', increaseItem));
    [...decreaseButtons].forEach(button => button.addEventListener('click', decreaseItem));
    [...deleteButtons].forEach(button => button.addEventListener('click', deleteItem));
};

const applyModificationsForMobile = () => {
    if (window.matchMedia("(max-width: 500px)").matches) {
        const cardsWordsDiv = document.querySelectorAll('.item-info');
        const cardsActionsDiv = document.querySelectorAll('.filled-cart__item-cell__item-actions');
        const cardsTotalPriceDiv = document.querySelectorAll('.item-total-price');
        const cardsCalculationsDiv = document.querySelectorAll('.item-calculations');

        cardsWordsDiv.forEach((cardWordsDiv, i) => cardWordsDiv.append(cardsActionsDiv[i], cardsTotalPriceDiv[i], cardsCalculationsDiv[i++]));
        
        const allTds = document.querySelectorAll('.filled-cart__item-cell');
        allTds.forEach(td => td.innerHTML.trim(' ').length ? td : td.classList.add('hidden'));
    }
};

goCatalogButton.addEventListener('click', ()=>location.href='./catalog.html');
placeOrderButton.addEventListener('click', ()=>location.href='./order.html');
document.addEventListener('DOMContentLoaded', isCartFilled);
