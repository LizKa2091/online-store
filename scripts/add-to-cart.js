const buyButtons = document.querySelectorAll('.card__button');

const updateCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));

    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
    const cartIcon = document.querySelector('.cart-link__number');

    cartIcon.textContent = totalItemsAmount;
}

const addToCart = (e) => {
    const currElId = e.target.dataset.itemId;

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
        e.target.textContent = '1';
    }
    else {
        cartObj = JSON.parse(currCart);
        const existingItem = cartObj.items.find(item => item.id === currElId);

        if (existingItem) {
            e.target.textContent = ++existingItem.amount;
        }
        else {
            cartObj.items.push({
                id: currElId,
                amount: 1
            });
            e.target.textContent = '1';
        }
    }    
    localStorage.setItem('cart', JSON.stringify(cartObj));

    updateCartAmount();
};

[...buyButtons].forEach(el => el.addEventListener('click', addToCart))