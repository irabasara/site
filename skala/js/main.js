let documentActions = (e) => {
    const targetElement = e.target

    if (targetElement.closest('.js-open-btn')) {
        document.documentElement.classList.toggle('open-menu')
    }
}

document.addEventListener('click', documentActions);

// const mobileMenu = document.querySelector('#menu');
// const menuButton = document.querySelector('#menu-button');
//
// function moveButtonToMobileMenu() {
//     if (window.innerWidth <= 768) { // Розмір екрану для мобільного (можете змінити)
//         if (!mobileMenu.contains(menuButton)) { // Перевірка, чи вже кнопка переміщена
//             mobileMenu.appendChild(menuButton); // Додати кнопку в мобільне меню
//         }
//     }
// }
//
// // Виклик функції при завантаженні сторінки
// document.addEventListener("DOMContentLoaded", moveButtonToMobileMenu);

// Виклик функції при зміні розміру вікна
// window.addEventListener("resize", moveButtonToMobileMenu);

    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 20, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 600, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });


let addWindowScrollEvent = false;

function headerScroll() {
    addWindowScrollEvent = true;

    const header = document.querySelector('header.header');
    const headerShow = header.hasAttribute('data-scroll-show');
    const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
    const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;

    let scrollDirection = 0;
    let timer;

    // Додаємо обробник для прокрутки
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;

        clearTimeout(timer);

        if (scrollTop >= startPoint) {
            if (!header.classList.contains('_header-scroll')) {
                header.classList.add('_header-scroll');
            }

            if (headerShow) {
                if (scrollTop > scrollDirection) {
                    // Прокрутка вниз
                    if (header.classList.contains('_header-show')) {
                        header.classList.remove('_header-show');
                    }
                } else {
                    // Прокрутка вгору
                    if (!header.classList.contains('_header-show')) {
                        header.classList.add('_header-show');
                    }
                }

                // Затримка для додавання класу
                timer = setTimeout(() => {
                    if (!header.classList.contains('_header-show')) {
                        header.classList.add('_header-show');
                    }
                }, headerShowTimer);
            }
        } else {
            if (header.classList.contains('_header-scroll')) {
                header.classList.remove('_header-scroll');
            }

            if (headerShow) {
                if (header.classList.contains('_header-show')) {
                    header.classList.remove('_header-show');
                }
            }
        }

        scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
    });
}

headerScroll();

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'
const gallery = new Swiper('.gallery__slider', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 320px
        678: {
            spaceBetween: 8,
        },
    },
    // If we need pagination
    pagination: {
        el: '.gallery__pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.gallery__next',
        prevEl: '.gallery__prev',
    },

});

const videoGallery = new Swiper('.video-gallery__slider', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 20,
    breakpoints: {
        // when window width is >= 320px
        678: {
            spaceBetween: 8,
        },
    },
    // If we need pagination
    pagination: {
        el: '.video-gallery__pagination',
        clickable: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.video-gallery__next',
        prevEl: '.video-gallery__prev',
    },

});

// Отримуємо кнопку
const upScrollButton = document.getElementById('up-scroll');

// Додаємо слухач події "click"
upScrollButton.addEventListener('click', function () {
    // Прокручуємо сторінку плавно до початку
    window.scrollTo({
        top: 0,          // Початок сторінки
        behavior: 'smooth' // Плавний скрол
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    const body = document.body;

    // Функція відкриття модалки
    const openModal = (modalId) => {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            modalBackdrop.hidden = false; // Показуємо бекдроп
            targetModal.style.display = 'block'; // Показуємо модалку
            body.classList.add('modal-open'); // Блокуємо скрол сторінки
        }
    };

    // Функція закриття всіх модалок
    const closeModal = () => {
        modalBackdrop.hidden = true; // Ховаємо бекдроп
        document.querySelectorAll('.modal').forEach((modal) => {
            modal.style.display = 'none'; // Ховаємо всі модалки
        });
        body.classList.remove('modal-open'); // Відновлюємо скрол сторінки
    };

    // Обробка кліків по кнопках відкриття
    openModalButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            openModal(modalId);
        });
    });

    // Обробка кліків по кнопках закриття
    closeModalButtons.forEach((button) => {
        button.addEventListener('click', closeModal);
    });

    // Закриття модалки при кліку на бекдроп
    modalBackdrop.addEventListener('click', (event) => {
        if (event.target === modalBackdrop) {
            closeModal();
        }
    });
});
