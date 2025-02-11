const bodyChildren = document.body.children;
const elemsToBlur = [...bodyChildren].filter(child => child.tagName !== 'SCRIPT');
const goCatalogButton = document.querySelector('.intro__button');

const setModalVisibility = () => {
    let modal = document.querySelector('.modal') || undefined;
    if (!sessionStorage.getItem('isAdult')) {
        [...elemsToBlur].forEach(el => el.classList.add('blurred'));

        const modal = document.createElement('div');

        modal.innerHTML = `
            <div class="modal">
                <div class="modal__wrapper">
                    <div class="modal__inner">
                        <p class="modal__title">Вам точно 18 лет?</p>
                        <p class="modal__subtitle">Добро пожаловать на наш сайт Wunderbeer. Для доступа необходимо подтвердить совершеннолетний возраст.</p>
                        <p class="modal__text">Сайт содержит информацию для лиц совершеннолетнего возраста. Сведения, размещенные на сайте, не являются рекламой, носят исключительно информационный характер, и предназначены только для личного использования.</p>
                        <div class="modal__buttons">
                            <button class="modal__button button-adult">Мне исполнилось 18 лет</button>
                            <button class="modal__button button-underage">Мне ещё нет 18</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.prepend(modal);
        setButtonEventListeners();
    }
    else if (modal) {
        modal.classList.add('hidden');
    }
};

function modalAction(e) {
    if (e.target.classList.contains('button-adult')) {
        document.querySelector('.modal').classList.add('hidden');
        elemsToBlur.forEach(el => el.classList.remove('blurred'));

        sessionStorage.setItem('isAdult', true)
    }
    else if (e.target.classList.contains('button-underage')) {
        document.querySelector('.modal__inner').textContent = 'Возвращайтесь, когда вам исполнится 18 лет';
    }
};

const setButtonEventListeners = () => {
    const adultButton = document.querySelector('.button-adult');
    const underageButton = document.querySelector('.button-underage');

    adultButton.addEventListener('click', modalAction);
    underageButton.addEventListener('click', modalAction);
}

document.addEventListener('DOMContentLoaded', setModalVisibility);
goCatalogButton.addEventListener('click',()=>location.href = './catalog.html');