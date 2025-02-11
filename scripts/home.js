const modal = document.querySelector('.modal');
const adultButton = document.querySelector('.button-adult');
const underageButton = document.querySelector('.button-underage');
const goCatalogButton = document.querySelector('.intro__button');
const bodyChildren = document.body.children;
const elemsToBlur = [...bodyChildren].filter(child => child !== modal && child.tagName !== 'SCRIPT');

const setModalVisibility = () => {
    if (!sessionStorage.getItem('isAdult')) {
        [...elemsToBlur].forEach(el => el.classList.add('blurred'));
    }
    else {
        modal.classList.add('hidden');
    }
};

function modalAction(e) {
    if (this === adultButton) {
        modal.classList.add('hidden');
        elemsToBlur.forEach(el => el.classList.remove('blurred'));

        sessionStorage.setItem('isAdult', true)
    }
};

document.addEventListener('DOMContentLoaded', setModalVisibility)
adultButton.addEventListener('click', modalAction);
underageButton.addEventListener('click', modalAction);
goCatalogButton.addEventListener('click',()=>location.href = './catalog.html');