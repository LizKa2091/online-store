const checkDeviceWidth = () => {
    if (window.matchMedia("(max-width: 450px)").matches) {
        setupMobileNavigation();
    }
    else {
        resetMobileNavigation();
    }
};

const resetMobileNavigation = () => {
    const mobileNavButton = document.querySelector('.nav-mobile__button');
    const mobileNavInnerDiv = document.querySelector('.nav-mobile__content');

    mobileNavInnerDiv.innerHTML = '';

    mobileNavButton.classList.remove('nav-on');
    mobileNavButton.classList.add('nav-off');
};

const setupMobileNavigation = () => {
    const mobileNavButton = document.querySelector('.nav-mobile__button');
    const mobileNavInnerDiv = document.querySelector('.nav-mobile__content');
    const body = document.querySelector('body');
    mobileNavButton.classList.add('nav-off');

    const switchMobileNav = (e) => {
        if (e.target.classList.contains('nav-off')) {
            e.target.classList.remove('nav-off');
            e.target.classList.add('nav-on');

            body.style.overflowY = 'hidden';
            showMobileNav(mobileNavInnerDiv);
        }
        else if (e.target.classList.contains('nav-on')) {
            e.target.classList.remove('nav-on');
            e.target.classList.add('nav-off');

            body.style.overflowY = 'auto';
            mobileNavInnerDiv.classList.remove('active-mobile-nav');
            //mobileNavInnerDiv.classList.add('hidden');
        }
    };

    const showMobileNav = (mobileNavInnerDiv) => {
        mobileNavInnerDiv.classList.add('active-mobile-nav');

    };

    mobileNavButton.addEventListener('click', switchMobileNav);
};

document.addEventListener('DOMContentLoaded', checkDeviceWidth);
window.addEventListener('resize', checkDeviceWidth);