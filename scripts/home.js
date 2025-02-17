const bodyChildren = document.body.children;
const elemsToBlur = [document.querySelector('.header'), document.querySelector('.intro'), document.querySelector('.intro-slider'), document.querySelector('.intro-dots'), document.querySelector('.intro-tip'), document.querySelector('.section-about'), document.querySelector('.footer')]
const goCatalogButton = document.querySelector('.intro__button');

const sliderBgs = document.querySelectorAll('.intro-slider__background');
const sliderDiv = document.querySelector('.intro-slider');
const arrowLeft = document.querySelector('.slider-arrow-left');
const arrowRight = document.querySelector('.slider-arrow-right');
const introDots = document.querySelectorAll('.intro-dot');

const sliderObj = {
    1: '../images/home-bg.png',
    2: '../images/home-slide2.png',
    3: '../images/home-slide3.png',
    arrowAvailable: '../images/slider-arrow-available.png',
    arrowUnavailable: '../images/slider-arrow-unavailable.png',
    currImageId: 1
};

const setModalVisibility = () => {
    let modal = document.querySelector('.modal') || undefined;
    if (!sessionStorage.getItem('isAdult')) {
        [...elemsToBlur].forEach(el => el.classList.add('blurred'));
        
        const modal = document.createElement('div');

        modal.innerHTML = `
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
        `;

        modal.classList.add('modal');
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
};

const setSlider = () => {
    const currLeftArrowPadding = (parseInt(window.getComputedStyle(document.querySelector('body')).width) - parseInt(window.getComputedStyle(document.querySelector('.intro__subtitle')).width)) / 2;
    const currRightArrowPadding = parseInt(window.getComputedStyle(document.querySelector('body')).width) - currLeftArrowPadding;
    
    arrowLeft.style.left = `${currLeftArrowPadding}px`;
    arrowRight.style.left = `${currRightArrowPadding-35}px`;

    arrowLeft.addEventListener('click', goPrevSlide);
    arrowRight.addEventListener('click', goNextSlide);

    updateSlides();
};

const goPrevSlide = (e) => {
    if (e.target.classList.contains('arrow-unavailable')) {
        return;
    }

    sliderObj.currImageId--;
    updateSlides();
};

const goNextSlide = (e) => {
    if (e.target.classList.contains('arrow-unavailable')) {
        return;
    }

    sliderObj.currImageId++;
    updateSlides();
};

const updateSlides = () => {
    sliderBgs.forEach((bg, index) => {
        bg.classList.remove('active');
        bg.style.background = `url(${sliderObj[index + 1]}) no-repeat center center`;
        bg.style.backgroundSize = 'cover';
        bg.style.filter = 'brightness(0.4)';

        if (index + 1 === sliderObj.currImageId) {
            bg.classList.add('active');
        }
    });

    const isFirstSlide = sliderObj.currImageId === 1;
    const isLastSlide = sliderObj.currImageId === 3;

    arrowLeft.classList.toggle('arrow-unavailable', isFirstSlide);
    arrowRight.classList.toggle('arrow-unavailable', isLastSlide);
    arrowLeft.classList.toggle('arrow-available', !isFirstSlide);
    arrowRight.classList.toggle('arrow-available', !isLastSlide);

    arrowLeft.style.background = `url(${isFirstSlide ? sliderObj.arrowUnavailable : sliderObj.arrowAvailable}) no-repeat center center`;
    arrowRight.style.background = `url(${isLastSlide ? sliderObj.arrowUnavailable : sliderObj.arrowAvailable}) no-repeat center center`;
    
    arrowLeft.style.backgroundSize = 'contain';
    arrowRight.style.backgroundSize = 'contain';

    arrowLeft.style.transform = isFirstSlide ? 'rotate(0deg)' : 'rotate(180deg)';
    arrowRight.style.transform = isLastSlide ? 'rotate(180deg)' : 'rotate(0deg)';

    [...introDots].filter(dot => dot.classList.contains('active')).forEach(el => el.classList.remove('active'));

    introDots[sliderObj.currImageId-1].classList.add('active');
};

document.addEventListener('DOMContentLoaded', () => {
    setModalVisibility();
    setSlider();
});
goCatalogButton.addEventListener('click',()=>location.href = './catalog.html');