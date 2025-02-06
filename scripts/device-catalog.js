const filterButton = document.querySelector('.filter-panel-mobile__section-main-button');
const filterMobileDiv = document.querySelector('.filter-panel-mobile');
const filterPanel = document.querySelector('.fitler-panel')
const displayTwoItemsButton = document.querySelector('.filter-panel-mobile__button-left');
const displayOneItemButton = document.querySelector('.filter-panel-mobile__button-right');
const closeFiltersButton = document.querySelector('.filter-panel-mobile__close');

const cardSections = document.querySelectorAll('.card');
const mainSection = document.querySelector('.main');

const toggleFilterDiv = () => {
    filterButton.classList.toggle('active');
    filterButton.classList.toggle('hidden');

    filterPanel.classList.toggle('active');
    filterPanel.classList.toggle('hidden');
};

const displayOneItem = (e) => {
    e.target.classList.remove('inactive');
    e.target.classList.add('active');

    displayTwoItemsButton.classList.remove('active');
    displayTwoItemsButton.classList.add('inactive');

    [...cardSections].forEach(card => card.style.width = '260px');
    mainSection.style.padding = '0 15px';
};

const displayTwoItems = (e) => {
    e.target.classList.remove('inactive');
    e.target.classList.add('active');
    
    displayOneItemButton.classList.remove('active');
    displayOneItemButton.classList.add('inactive');

    [...cardSections].forEach(card => card.style.width = '155px');
    mainSection.style.padding = '0';
};

filterButton.addEventListener('click', toggleFilterDiv);
closeFiltersButton.addEventListener('click', toggleFilterDiv);
displayOneItemButton.addEventListener('click', displayOneItem);
displayTwoItemsButton.addEventListener('click', displayTwoItems);
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia("(max-width: 450px)")) {
        filterButton.classList.add('active');
        filterMobileDiv.classList.add('active');
        filterPanel.classList.add('hidden');
        closeFiltersButton.classList.add('active');
    }
    else {
        filterMobileDiv.classList.add('hidden');
        filterPanel.classList.add('active');
        closeFiltersButton.classList.add('hidden');
    }
});