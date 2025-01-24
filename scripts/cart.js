const goCatalogButton = document.querySelector('.empty-cart__button');
const emptyCartDiv = document.querySelector('.empty-cart');
const filledCartDiv = document.querySelector('.filled-cart');

const itemsObj = {
    1: {
        name: 'Irish Stout Irish Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '68 ₽'
    },
    2: {
        name: 'Indian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽'
    },
    3: {
        name: 'Italian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    },

    4: {
        name: 'Irish Stout Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '508 ₽'
    },
    5: {
        name: 'Indian Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '408 ₽'
    },
    6: {
        name: 'Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽'
    },

    7: {
        name: 'Irish Stout 3',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '608 ₽'
    },
    8: {
        name: 'Irish Stout 4',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    },
    9: {
        name: 'Irish Stout 5',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    },

    10: {
        name: 'Irish Stout 6',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    },
    11: {
        name: 'Irish Stout 7',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    },
    12: {
        name: 'Irish Stout 8',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽'
    }
};

const isCartFilled = () => {
    const currCart = localStorage.getItem('cart');
    
    console.log(currCart)
    if (!currCart) {
        emptyCartDiv.classList.remove('hidden');
        filledCartDiv.classList.add('hidden');
    }
    else {
        emptyCartDiv.classList.add('hidden');
        filledCartDiv.classList.remove('hidden');
    }
};

goCatalogButton.addEventListener('click', ()=>location.href='./catalog.html');
document.addEventListener('DOMContentLoaded', isCartFilled);
