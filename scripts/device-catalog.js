const filterButton = document.querySelector('.filter-panel-mobile__section-main-button');
const filterMobileDiv = document.querySelector('.filter-panel-mobile');
const filterPanel = document.querySelector('.fitler-panel')
const displayItemsButtons = document.querySelectorAll('.button-display');
const closeFiltersButton = document.querySelector('.filter-panel-mobile__close');

const toggleFilterDiv = () => {
    filterButton.classList.toggle('active');
    filterButton.classList.toggle('hidden');

    filterPanel.classList.toggle('active');
    filterPanel.classList.toggle('hidden');
};

filterButton.addEventListener('click', toggleFilterDiv);
closeFiltersButton.addEventListener('click', toggleFilterDiv);
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 450) {
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