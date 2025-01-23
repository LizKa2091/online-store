const buyButtons = document.querySelectorAll('.card__button');

const addToCart = (e) => {
    const currElId = e.target.dataset.itemId;

    const currCart = localStorage.getItem('cart');
    let cartObj;

    if (!currCart) {
        cartObj = {
            items: [{
                id: currElId,
                amount: 1
            }]
        };
    }
    else {
        cartObj = JSON.parse(currCart);

        if (cartObj)
        cartObj.items.push({
            id: currElId,
            amount: 1
        })
    }
    
    localStorage.setItem('cart', JSON.stringify(cartObj))
};

[...buyButtons].forEach(el => el.addEventListener('click', addToCart))