const asideList = document.querySelector('.aside__list');

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

const getCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const asideSummaryPrice = document.querySelector('.aside__summary__subtitle');
    const asideSummaryAmount = document.querySelector('.aside-amount');

    let totalItemsAmount = 0;
    let totalPrice = 0;

    cart.items.forEach(item => {
        if (item.id in itemsObj) {
            totalItemsAmount += item.amount;
            totalPrice += +itemsObj[item.id].price.slice(0, itemsObj[item.id].price.length-2) * item.amount;

            insertItem(itemsObj[item.id], item.id, cart);
        }
    });

    asideSummaryPrice.textContent = `${totalPrice} ₽`;
    asideSummaryAmount.textContent = totalItemsAmount;

    applyModificationsForTablet();
};

const insertItem = (item, itemId, cart) => {
    const currItemAmount = cart.items.find(it => it.id === itemId).amount;

    asideList.innerHTML += `<li class='aside__item'>
        <img class='aside__item-icon' src='${item.img}'>
        <div class='aside__item-inner'>
            <p class='aside__item-title'>${item.name}</p>
            <p class='aside__item-subtitle'>${item.category}</p>
            <p class='aside__item-subtitle'>${item.subcategory}</p>
            <p class='aside__item-capacity'>${item.capacity}</p>
            <p class='aside__item-amount'>${currItemAmount} шт.</p>
        </div>
    </li>`;
};

const applyModificationsForTablet = () => {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        const asideTablet = document.querySelector('.main__form__aside-tablet');
        const standardAside = document.querySelector('.aside');

        asideTablet.append(standardAside);
    }
};

document.addEventListener('DOMContentLoaded', getCartItems);