const params = new URLSearchParams(window.location.search);
const itemId = +params.get('id');

const itemDescriptionLinks = document.querySelectorAll('.section__item__header-link');
const currItemAmount = document.querySelector('.main__item-action__amount');
const itemDecreaseButton = document.querySelector('.item-decrease');
const itemIncreaseButton = document.querySelector('.item-increase');
const buyItemButton = document.querySelector('.item-buy');

const itemsObj = {
    1: {
        name: 'Irish Stout Irish Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '68 ₽',
        strength: '4.5 %',
        img: '../images/item1.png'
    },
    2: {
        name: 'Indian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽',
        strength: '4.5 %',
        img: '../images/item2.png'
    },
    3: {
        name: 'Italian Stout',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },

    4: {
        name: 'Irish Stout Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '508 ₽',
        strength: '4.5 %',
        img: '../images/item1.png'
    },
    5: {
        name: 'Indian Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '408 ₽',
        strength: '4.5 %',
        img: '../images/item2.png'
    },
    6: {
        name: 'Irish Stout 2',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '108 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },

    7: {
        name: 'Irish Stout 3',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '608 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },
    8: {
        name: 'Irish Stout 4',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },
    9: {
        name: 'Irish Stout 5',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },

    10: {
        name: 'Irish Stout 6',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },
    11: {
        name: 'Irish Stout 7',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    },
    12: {
        name: 'Irish Stout 8',
        category: 'Пиво',
        subcategory: 'Светлое',
        capacity: '0.355 л',
        price: '208 ₽',
        strength: '4.5 %',
        img: '../images/item3.png'
    }
};

if (itemId) {
    const itemImage = document.querySelector('.main__item-icon');
    const itemTitle = document.querySelector('.main__item__title');
    const itemCategory = document.querySelectorAll('.main__item__subtitle')[0];
    const itemStrengthValue = document.querySelectorAll('.main__item__value')[0];
    const itemCapacityValue = document.querySelectorAll('.main__item__value')[1];
    const itemPrice = document.querySelector('.main__item__price');

    itemImage.src = itemsObj[itemId].img;
    itemTitle.textContent = itemsObj[itemId].name;
    itemCategory.textContent = `${itemsObj[itemId].category} ${itemsObj[itemId].subcategory}`;
    itemStrengthValue.textContent = itemsObj[itemId].strength;
    itemCapacityValue.textContent = itemsObj[itemId].capacity;
    itemPrice.innerHTML = `${itemsObj[itemId].price}<span class="main__item__value">шт.</span>`;
}
else {
    throw new Error(`item wasn't found`);
}

const updateUI = (amount) => {
    if (amount === undefined) {
        currItemAmount.textContent = '';
        itemDecreaseButton.classList.add('hidden');
        itemIncreaseButton.classList.add('hidden');
        buyItemButton.classList.remove('hidden');
    } 
    else {
        currItemAmount.textContent = amount;

        if (amount === 1) {
            itemDecreaseButton.classList.add('hidden');
            itemIncreaseButton.classList.remove('hidden');
        } 
        else {
            itemDecreaseButton.classList.remove('hidden');
            itemIncreaseButton.classList.remove('hidden');
        }
    }
};

const itemDecrease = (e) => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => +item.id === itemId);
    
    if (item) {
        item.amount--;

        if (item.amount <= 1) {
            itemDecreaseButton.classList.add('hidden');
        }

        localStorage.setItem('cart', JSON.stringify(cartObj));

        updateUI(item.amount);
        updateCartAmount();
    }
};

const itemIncrease = (e) => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj.items.find(item => +item.id === itemId);

    if (item) {
        item.amount++;
        localStorage.setItem('cart', JSON.stringify(cartObj));

        updateUI(item.amount);
        updateCartAmount();
    }
};

const getItemAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));
    const currItemInCart = currCart?.items.find(item => +item.id === itemId);

    if (currItemInCart) {
        updateUI(currItemInCart.amount);
    } 
    else {
        updateUI(undefined);
    }
};

const updateCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));
    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0) || 0;
    const cartIcon = document.querySelector('.cart-link__number');
    cartIcon.textContent = totalItemsAmount;
};

const switchDescription = (e) => {
    e.preventDefault();

    let currItem = [...itemDescriptionLinks].find(link => link.classList.contains('current-item-link'));

    if (e.target !== currItem) {
        currItem.classList.remove('current-item-link');
        e.target.classList.add('current-item-link');

        currItem.closest('div').classList.remove('current-item');
        e.target.closest('div').classList.add('current-item');
    }
};

const switchItemActionAmount = () => {
    const cartObj = JSON.parse(localStorage.getItem('cart')) || { items: [] };
    const item = cartObj.items.find(item => +item.id === itemId);

    if (!item) {
        cartObj.items.push({ id: itemId, amount: 1 });
        localStorage.setItem('cart', JSON.stringify(cartObj));

        updateUI(1);
    }
    else {
        updateUI(item.amount);
    }
};

document.addEventListener('DOMContentLoaded', getItemAmount);
itemDecreaseButton.addEventListener('click', itemDecrease);
itemIncreaseButton.addEventListener('click', itemIncrease);
[...itemDescriptionLinks].forEach(link => link.addEventListener('click', switchDescription));

buyItemButton.addEventListener('click', () => {
    const cartObj = JSON.parse(localStorage.getItem('cart'));
    const item = cartObj?.items.find(item => +item.id === itemId);
    if (!item) {
        switchItemActionAmount();
        updateCartAmount();
    } 
    else {
        location.href = './cart.html';
    }
});