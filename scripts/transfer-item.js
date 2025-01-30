const itemCards = document.querySelectorAll('.card');

const transferItem = (e) => {
    let currItemName = e.target.dataset.itemName || e.target.parentElement.dataset.itemName;
    let currItemId = e.target.dataset.id || e.target.parentElement.dataset.id;
    
    if (currItemName && currItemId) {
        window.location.href = `item-card.html?id=${currItemId}`;
    }
};

[...itemCards].forEach(card => card.addEventListener('click', transferItem));