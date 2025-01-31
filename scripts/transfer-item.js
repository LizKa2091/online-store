const itemCards = document.querySelectorAll('.card');

const transferItem = (e) => {
    const currItem = e.target.closest('.card');;
    if (!currItem) return;

    const isQuantityButton = e.target.classList.contains('card__button-decrease') || e.target.classList.contains('card__button-increase') || e.target.classList.contains('card__button-replaced') || e.target.classList.contains('card__button');
    if (isQuantityButton) return;
    
    let currItemName = currItem.dataset.itemName;
    let currItemId = currItem.dataset.id;

    if (currItemName && currItemId) {
        window.location.href = `item-card.html?id=${currItemId}`;
    }
};

[...itemCards].forEach(card => card.addEventListener('click', transferItem));