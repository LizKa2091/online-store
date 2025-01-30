const params = new URLSearchParams(window.location.search);
const itemId = +params.get('id');

const itemDescriptionLinks = document.querySelectorAll('.section__item__header-link');

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

[...itemDescriptionLinks].forEach(link => link.addEventListener('click', switchDescription));