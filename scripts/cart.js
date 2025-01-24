const goCatalogButton = document.querySelector('.empty-cart__button');
const emptyCartDiv = document.querySelector('.empty-cart');
const filledCartDiv = document.querySelector('.filled-cart');

const tableBody = document.querySelector('.filled-cart__body');

const itemsObj = {
    1: {
        name: 'Irish Stout Irish Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '68 ₽',
        img: '../images/item1.png'
    },
    2: {
        name: 'Indian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽',
        img: '../images/item2.png'
    },
    3: {
        name: 'Italian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    },

    4: {
        name: 'Irish Stout Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '508 ₽',
        img: '../images/item1.png'
    },
    5: {
        name: 'Indian Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '408 ₽',
        img: '../images/item2.png'
    },
    6: {
        name: 'Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽',
        img: '../images/item3.png'
    },

    7: {
        name: 'Irish Stout 3',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '608 ₽',
        img: '../images/item3.png'
    },
    8: {
        name: 'Irish Stout 4',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    },
    9: {
        name: 'Irish Stout 5',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    },

    10: {
        name: 'Irish Stout 6',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    },
    11: {
        name: 'Irish Stout 7',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    },
    12: {
        name: 'Irish Stout 8',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        img: '../images/item3.png'
    }
};

const isCartFilled = () => {
    const currCart = localStorage.getItem('cart');
    const mainBlock = document.querySelector('.main');
    
    if (!currCart) {
        emptyCartDiv.classList.remove('hidden');
        filledCartDiv.classList.add('hidden');

        mainBlock.style.height = 'clamp(250px, 100dvh, 620px)';
    }
    else {
        emptyCartDiv.classList.add('hidden');
        filledCartDiv.classList.remove('hidden');

        mainBlock.style.minHeight = 'clamp(250px, 100dvh, 620px)';

        tableBody.innerHTML = '';

        getCartItems(JSON.parse(currCart));
    }
};

const getCartItems = (cart) => {
    cart.items.forEach(item => {
        if (item.id in itemsObj) {
            insertItem(itemsObj[item.id], item.id);
        }
    });
};

const insertItem = (itemObj, itemId) => {
    const currCart = JSON.parse(localStorage.getItem('cart'));
    const currItemAmount = currCart.items.find(item => item.id === itemId).amount;

    tableBody.innerHTML += `<tr class='filled-cart__item'>
        <td class='filled-cart__item-cell'>
            <img class='filled-cart__item-icon' src='${itemObj.img}'>
        </td>
        <td class='filled-cart__item-cell'>
            <p class='filled-cart__item-name'>${itemObj.name}</p>
            <p class='filled-cart__item-category'>${itemObj.category}</p>
            <p class='filled-cart__item-subcategory'>${itemObj.subcategory}</p>
            <p class='filled-cart__item-capacity'>${itemObj.capacity}</p>
        </td>
        <td class='filled-cart__item-cell'>
            <p class='filled-cart__item-amount'>${currItemAmount}</p>
        </td>
        <td class='filled-cart__item-cell'>
            <p class='filled-cart__item-total'>${+itemObj.price.slice(0, itemObj.price.length-2) * +currItemAmount} ₽</p>
        </td>
        <td class='filled-cart__item-cell'>
            <p class='filled-cart__item-price'>${itemObj.price} * ${currItemAmount}</p>
        </td>
        <td class='filled-cart__item-cell'>

        </td>
    </tr>`;

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

goCatalogButton.addEventListener('click', ()=>location.href='./catalog.html');
document.addEventListener('DOMContentLoaded', isCartFilled);
