const itemDescriptionLinks = document.querySelectorAll('.section__item__header-link');

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