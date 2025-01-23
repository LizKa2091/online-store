const getCartAmount = () => {
    const currCart = JSON.parse(localStorage.getItem('cart'));

    const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
    const cartIcon = document.querySelector('.cart-link__number');

    cartIcon.textContent = totalItemsAmount;
};

document.addEventListener('DOMContentLoaded', getCartAmount);