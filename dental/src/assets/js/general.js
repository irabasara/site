window.addEventListener('DOMContentLoaded', function () {
    // header ------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const menu = document.querySelector('.header__menu');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menu.classList.toggle('open');
        links.forEach((link) => {
            link.classList.toggle('fade');
        });
        hamburger.classList.toggle('toggle');
    });

    // anchors -------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });

    // if(document.querySelector('.hero-slider')) {
    //     new Swiper(document.querySelector('.hero-slider'), {
    //         slidesPerView: 1,
    //         centeredSlides: true,
    //         spaceBetween: 500,
    //         speed: 1000,
    //         grabCursor : true,

    //         keyboard: {
    //             enabled: true,
    //         },

    //         pagination: {
    //             el: '.slider-progressbar',
    //             type: 'progressbar',
    //         },
    //         // Navigation arrows
    //         navigation: {
    //             nextEl: '.slider-next',
    //             prevEl: '.slider-prev',
    //         },
    //     });
    // }

    // scroll animations ----------------------------------------
    // const animItems = document.querySelectorAll('._anim-item');
    //
    // if(animItems.length > 0) {
    //     document.addEventListener('scroll', animOnScroll);
    // }
    //
    // function animOnScroll() {
    //     animItems.forEach(animItem => {
    //         const animItemHeight = animItem.offsetHeight;
    //         const animItemOffset = offset(animItem).top;
    //         const animStart = 1.5;
    //
    //         let animItemPoint = window.innerHeight - animItemHeight / animStart;
    //         if(animItemHeight > window.innerHeight) {
    //             animItemPoint = window.innerHeight - window.innerHeight / animStart;
    //         }
    //
    //         if((pageYOffset > animItemOffset - animItemPoint) &&
    //             pageYOffset < (animItemOffset + animItemHeight)) {
    //             let time = setTimeout(() => {
    //                 animItem.classList.add('_active-animation');
    //             }, 0);
    //         }
    //     });
    // }
    // function offset(el) {
    //     const rect = el.getBoundingClientRect(),
    //         scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    //         scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    //     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
    // }
});
