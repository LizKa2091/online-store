const searchInput = document.querySelector('.filter-panel__input');
const searchInputButton = document.querySelector('.filter-panel__search-icon');

const filterTitles = document.querySelectorAll('.filter-panel__item-title');
const filterIcons = document.querySelectorAll('.filter-panel__item-icon');
const filterSubList = document.querySelectorAll('.filter-panel__sublist');

const startPriceInput = document.querySelector('.filter-panel__price__input');
const endPriceInput = document.querySelector('.filter-panel__price__input');
const pricePickButton = document.querySelector('.filter-panel__button');

const filtersObj = {};

const inputOnChange = (e) => {
    if (!e.target.value) {
        searchInputButton.style.cursor = 'not-allowed';
    }
    else {
        searchInputButton.style.cursor = 'pointer';
    }
};

const categoryOnChange = (e) => {
    const categoryName = e.target.dataset.name;
    const currFilterIconEl = [...filterIcons].find(filterIcon => filterIcon.dataset.name === categoryName);
    const currSubfiltersList = [...filterSubList].find(filterSublist => filterSublist.dataset.name === categoryName);

    console.log(filtersObj.currSubfiltersList, currSubfiltersList)
    if (!filtersObj.currFilter) {
        filtersObj.currFilter = categoryName;
        filtersObj.currFilterIconEl = currFilterIconEl;
        filtersObj.currSubfiltersList = currSubfiltersList;

        currSubfiltersList.classList.toggle('hidden');
        currFilterIconEl.classList.toggle('hidden');
    }
    else if (filtersObj.currFilter !== categoryName) {
        filtersObj.currFilterIconEl.classList.toggle('hidden');
        filtersObj.currSubfiltersList.classList.toggle('hidden');

        filtersObj.currSubfiltersList = currSubfiltersList;
        filtersObj.currFilter = categoryName;
        filtersObj.currFilterIconEl = currFilterIconEl;
        currFilterIconEl.classList.toggle('hidden');
        currSubfiltersList.classList.toggle('hidden');
    }

};

searchInput.addEventListener('input', inputOnChange);
[...filterTitles].forEach(filterTitle => filterTitle.addEventListener('click', categoryOnChange));