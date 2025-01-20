const searchInput = document.querySelector('.filter-panel__input');
const searchInputButton = document.querySelector('.filter-panel__search-icon');

const filterTitles = document.querySelectorAll('.filter-panel__item-title');
const filterIcons = document.querySelectorAll('.filter-panel__item-icon');
const filterSubList = document.querySelectorAll('.filter-panel__sublist');

const startPriceInput = document.querySelector('.filter-panel__price__input');
const endPriceInput = document.querySelector('.filter-panel__price__input');
const pricePickButton = document.querySelector('.filter-panel__button');

const searchResultSpan = document.querySelector('.search-result');
const headerTitle = document.querySelector('.header__title');

const items = document.querySelectorAll('.card');

const filtersObj = {};
const itemsObj = {};

const findItems = async (input) => {
    const resultItems = [...items].filter(item => item.dataset.itemName.toLowerCase().includes(input.toLowerCase()));
    
    resultItems.forEach(item => item.style.display = 'flex');
    return resultItems.length;
};

const inputOnChange = (e) => {
    if (!e.target.value) {
        searchInputButton.style.cursor = 'not-allowed';
        return;
    }
    filtersObj.currInput = e.target.value;
    searchInputButton.style.cursor = 'pointer';
};

const categoryOnClick = (e) => {
    const categoryName = e.target.dataset.name;
    const currFilterIconEl = [...filterIcons].find(filterIcon => filterIcon.dataset.name === categoryName);
    const currSubfiltersList = [...filterSubList].find(filterSublist => filterSublist.dataset.name === categoryName);

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

const searchInputOnClick = async (e) => {
    if (filtersObj.currInput) {
        [...items].forEach(item => item.style.display = 'none');
        const itemsLen = await findItems(filtersObj.currInput);

        headerTitle.textContent = `Поиск "${filtersObj.currInput}"`;

        searchResultSpan.textContent = `Найдено результатов поиска: ${itemsLen}`;
        searchResultSpan.style.display = 'inline';
    }

};


searchInput.addEventListener('input', inputOnChange);
[...filterTitles].forEach(filterTitle => filterTitle.addEventListener('click', categoryOnClick));
searchInputButton.addEventListener('click', searchInputOnClick);

//clear filters
document.addEventListener('DOMContentLoaded', () => Object.keys(filtersObj).forEach(key => delete items[key]));