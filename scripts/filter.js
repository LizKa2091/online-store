const searchInput = document.querySelector('.filter-panel__input');
const searchInputButton = document.querySelector('.filter-panel__search-icon');

const filterTitles = document.querySelectorAll('.filter-panel__item-title');
const filterIcons = document.querySelectorAll('.filter-panel__item-icon');
const filterSubList = document.querySelectorAll('.filter-panel__sublist');

const startPriceInput = document.querySelector('.filter-panel__price__input');
const endPriceInput = document.querySelectorAll('.filter-panel__price__input')[1];
const pricePickButton = document.querySelector('.filter-panel__button');

const searchResultSpan = document.querySelector('.search-result');
const headerTitle = document.querySelector('.header__title');

const main = document.querySelector('.main');

const items = document.querySelectorAll('.card');
const saleBanner = document.querySelector('.sale');

const contactPanelButton = document.querySelector('.contact-panel__button');

const filtersObj = {};

const findItemsByQuery = async (input) => {
    const resultItems = [...items].filter(item => item.dataset.itemName.toLowerCase().includes(input.toLowerCase()));
    
    resultItems.forEach(item => item.style.display = 'flex');
    return resultItems.length;
};

const findItemsByPrice = async (startingPrice, endingPrice) => {
    const resultItems = [...items].filter(item => startingPrice <= parseInt(item.dataset.price) && parseInt(item.dataset.price) <= endingPrice);

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
        main.insertBefore(saleBanner, main.firstChild);
        [...items].forEach(item => item.style.display = 'none');

        const itemsLen = await findItemsByQuery(filtersObj.currInput);

        headerTitle.textContent = `Поиск "${filtersObj.currInput}"`;

        searchResultSpan.textContent = `Найдено результатов поиска: ${itemsLen}`;
        searchResultSpan.style.display = 'inline';

        closeMobileFilter();
    }
};

const priceOnClick = async () => {
    if (startPriceInput && endPriceInput) {
        main.insertBefore(saleBanner, main.firstChild);
        [...items].forEach(item => item.style.display = 'none');

        const itemsLen = await findItemsByPrice(startPriceInput.value, endPriceInput.value);

        headerTitle.textContent = `Поиск по диапазону цены от ${startPriceInput.value} до ${endPriceInput.value}`;

        searchResultSpan.textContent = `Найдено результатов поиска: ${itemsLen}`;
        searchResultSpan.style.display = 'inline';
        
        closeMobileFilter();
    }
};

const contactPanelProccess = (e) => {
    e.preventDefault();

    const contactInputs = document.querySelectorAll('.contact-panel__input');
    const areInputsFilled = [...contactInputs].every(input => input.value !== '');

    [...contactInputs].filter(input => input.value === '').forEach(el => {
        el.style.border = '1px solid red';
    });

    [...contactInputs].filter(input => input.value !== '').forEach(el => {
        el.style.border = '0';
    });

    if (areInputsFilled) {
        
        const contactPanel = document.querySelector('.contact-panel');
        const contactPanelButton = document.querySelector('.contact-panel__button');
        
        contactPanel.classList.add('success');
        e.target.style.cursor = 'not-allowed';

        setTimeout(() => {
            contactPanel.classList.toggle('success');
            contactPanelButton.classList.add('hidden');
            contactPanel.innerHTML += `<p class='success-p'>Форма успешно отправлена!</p>`;
        }, 3000);
    }
    else {
        [...contactInputs].filter(input => input.value === '').forEach(el => {
            el.style.border = '1px solid red';
        });
    }
}

const closeMobileFilter = () => {
    console.log('called closemobilefilter')
    const filterDiv = document.querySelector('.filter-panel');

    if (filterDiv.classList.contains('active') && window.matchMedia("(max-width: 500px)").matches) {
        filterDiv.classList.remove('active');
        filterDiv.classList.add('hidden');

        openFilterMobileButton = document.querySelector('.filter-panel-mobile__section-main-button');
        openFilterMobileButton.classList.remove('hidden');
        openFilterMobileButton.classList.add('active');
    }
};

searchInput.addEventListener('input', inputOnChange);
[...filterTitles].forEach(filterTitle => filterTitle.addEventListener('click', categoryOnClick));
searchInputButton.addEventListener('click', searchInputOnClick);
pricePickButton.addEventListener('click', priceOnClick);

document.addEventListener('DOMContentLoaded', () => Object.keys(filtersObj).forEach(key => delete items[key]));
contactPanelButton.addEventListener('click', contactPanelProccess);