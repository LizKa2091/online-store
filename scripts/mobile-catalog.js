const filterButton = document.querySelector('.filter-panel-mobile__section-main-button');
const filterMobileDiv = document.querySelector('.filter-panel-mobile');
const filterPanel = document.querySelector('.fitler-panel')
const displayItemsButtons = document.querySelectorAll('.button-display');

const toggleFilterDiv = () => {
    filterButton.classList.toggle('active');
    filterButton.classList.toggle('hidden');

    filterPanel.classList.toggle('active');
    filterPanel.classList.toggle('hidden');
};

filterButton.addEventListener('click', toggleFilterDiv);
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 450) {
        filterButton.classList.add('active');
        filterMobileDiv.classList.add('active');
        filterPanel.classList.add('hidden');
    }
    else {
        filterMobileDiv.classList.add('hidden');
    }
});