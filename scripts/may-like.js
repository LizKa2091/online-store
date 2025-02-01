const itemsHashTable = {};
const mayLikeDiv = document.querySelector('.section-like');

const itemsObject = {
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
};

const insertItem = (item, itemId) => {
    mayLikeDiv.innerHTML += `<div class='section-like__item'>
        <img src='${item.img}' class='item__img' alt='${item.name}'>
        <h4 class="item__title">${item.name}</h4>
        <span class="item__subtitle">${item.strength} ${item.subcategory}</span>
        <span class="item__price">${item.price}</span>
        <button class="item__button" data-item-id="${itemId}">Купить</button>
    </div>`;
};

document.addEventListener('DOMContentLoaded', findItemsMayLike);