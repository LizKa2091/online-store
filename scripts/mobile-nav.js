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
    const mobileNavEl = document.querySelector('.nav-mobile');

    mobileNavInnerDiv.innerHTML = '';

    mobileNavEl.classList.add('hidden');
    mobileNavButton.classList.remove('nav-on');
    mobileNavButton.classList.add('nav-off');
};

const setupMobileNavigation = () => {
    const mobileNavButton = document.querySelector('.nav-mobile__button');
    const mobileNavInnerDiv = document.querySelector('.nav-mobile__content');
    const mobileNavEl = document.querySelector('.nav-mobile');

    const body = document.querySelector('body');
    mobileNavButton.classList.add('nav-off');
    mobileNavEl.classList.remove('hidden');

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
            mobileNavInnerDiv.classList.add('hidden');
        }
    };

    const showMobileNav = (mobileNavInnerDiv) => {
        mobileNavInnerDiv.classList.add('active-mobile-nav');
        mobileNavInnerDiv.classList.remove('hidden');

        mobileNavInnerDiv.innerHTML = `
            <ul class="header-mobile__action-list">
                <li class="header-mobile__action-item">
                    <a class='search-link' href="#"></a>
                </li>
                <li class="header-mobile__action-item">
                    <a class='cart-link' href="./cart.html"></a>
                    <a class="cart-link__number cart-mobile-link__number" href="./cart.html"></a>
                </li>
            </ul>
            <ul class="footer__links">
                <li class="footer__links-item">
                    <a href="./catalog.html" class="footer__links-item-link">Каталог</a>
                </li>
                <li class="footer__links-item">
                    <a href="#" class="footer__links-item-link">Дистрибуция</a>
                </li>
                <li class="footer__links-item">
                    <a href="#" class="footer__links-item-link">Комплектация магазинов</a>
                </li>
                <li class="footer__links-item">
                    <a href="#" class="footer__links-item-link">О компании</a>
                </li>
                <li class="footer__links-item">
                    <a href="#" class="footer__links-item-link">Контакты</a>
                </li>
            </ul>
            <ul class="footer__social-list mobile-nav__social-list">
                <li class="footer__social-item">
                    <a href="https://www.instagram.com/wunder.beer/">
                        <div class="footer__social-images">
                            <img class='footer__social-image' src="/images/inst1.png" alt="instagram">
                            <img class='footer__social-image' src="/images/inst2.png" alt="instagram">
                            <img class='footer__social-image' src="/images/inst3.png" alt="instagram">
                        </div>
                    </a>
                </li>
                <li class="footer__social-item">
                    <a class='vk-link' href="https://vk.com/wunderbeer"></a>
                </li>
                <li class="footer__social-item">
                    <a class='facebook-link' href="#"></a>
                </li>
            </ul>
        `;

        const currCart = JSON.parse(localStorage.getItem('cart'));

        const totalItemsAmount = currCart?.items.reduce((sum, item) => sum + item.amount, 0);
        const cartIcon = document.querySelector('.cart-mobile-link__number');

        cartIcon.textContent = totalItemsAmount;
    };

    mobileNavButton.addEventListener('click', switchMobileNav);
};

document.addEventListener('DOMContentLoaded', checkDeviceWidth);
window.addEventListener('resize', checkDeviceWidth);