// Navbar scroll
const header = document.querySelector('.navbar');
const signInBtn = document.querySelector('#signInBtn');
const signUpBtn = document.querySelector('#signUpBtn');
const hero = document.querySelector('.hero');
const currentLogo = document.querySelector('#navbarLogo');
const startBtn = document.querySelector('#startBtn');
const searchBtn = document.querySelector('#searchBtn');

function toggleImg (img, src) {
    img.setAttribute('src', '/public/img/' + src);
}

const currentChevron = document.querySelector('#whiteChevron');

function toggleOnScroll(element, newClass) {
    if (window.pageYOffset > 1
        || document.querySelector('.mobile-nav').classList.contains('mobile-nav--shown')) {
        setTimeout(function(){
            currentLogo.style.display = "inline";
            startBtn.style.display = "inline";
            searchBtn.style.display = "inline";
        }, 0);
        element.classList.add(newClass);
        toggleImg(currentChevron, 'icons/arrows/chevron-down-blue.svg');
    } else {
        setTimeout(function(){
            currentLogo.style.display = "none";
            startBtn.style.display = "none";
            searchBtn.style.display = "none";
        }, 0);
        element.classList.remove(newClass);
        toggleImg(currentChevron, 'icons/arrows/chevron-down.svg');
    }
}

const scrollToggler = () => {
    toggleOnScroll(header, "navbar--scroll");
    toggleOnScroll(signInBtn, 'btn--full');
    toggleOnScroll(signUpBtn, 'btn--bordered-dark');
}


//Mobile Menu

const burger = document.querySelector('.navbar__burger');
const mobile_nav = document.querySelector('.mobile-nav');
const lang_menu = document.querySelector('#lang-sub-menu');
const service_menu = document.querySelector('#service-sub-menu');
const lang_toggler = document.querySelector('#lang-toggler');
const service_toggler = document.querySelector('#service-toggler');
const lang_arrow = document.querySelector('#lang-toggler > .mobile-nav__arrow');
const service_arrow = document.querySelector('#service-toggler > .mobile-nav__arrow');
const menu_overlay = document.querySelector('.overlay--menu-hidden');
const body = document.querySelector('body');


var menu_open = false;

const toggle_mobile_menu = (e) => {
    mobile_nav.classList.toggle('mobile-nav--shown');
    mobile_nav.classList.toggle('mobile-nav--hidden');

    menu_overlay.classList.toggle('overlay--menu-show');
    scrollToggler();
    menu_open = menu_open ? false : true;
    console.log("menu open : ", menu_open)
    if ( menu_open ) {
        window.addEventListener('scroll', noScroll);
        document.documentElement.classList.toggle('no-scroll')
        window.addEventListener('touchmove', function(e) {
            e.preventDefault()
        }, false)
    } else {
        window.removeEventListener('scroll', noScroll);
        document.documentElement.classList.toggle('no-scroll')
        window.addEventListener('touchmove', function(e) {
            e.preventDefault()
        }, false)
    }
};

const toggle_lang_menu = (e) => {
    if (lang_menu.classList.contains('mobile-nav__sub-menu--shown'))
        lang_arrow.setAttribute('src', '/public/img/icons/arrows/chevron-down-grey.svg');
    else
        lang_arrow.setAttribute('src', '/public/img/icons/arrows/chevron-up-grey.svg');
    lang_menu.classList.toggle('mobile-nav__sub-menu--hidden');
    lang_menu.classList.toggle('mobile-nav__sub-menu--shown');
}

const toggle_service_menu = (e) => {
    if (service_menu.classList.contains('mobile-nav__sub-menu--shown'))
        service_arrow.setAttribute('src', '/public/img/icons/arrows/chevron-down-grey.svg');
    else
        service_arrow.setAttribute('src', '/public/img/icons/arrows/chevron-up-grey.svg');
    service_menu.classList.toggle('mobile-nav__sub-menu--hidden');
    service_menu.classList.toggle('mobile-nav__sub-menu--shown');
}

burger.addEventListener('click', toggle_mobile_menu);
lang_toggler.addEventListener('click', toggle_lang_menu);
service_toggler.addEventListener('click', toggle_service_menu);


function noScroll() {
    window.scrollTo(0,0)
}

const overlay = document.getElementById('menu-overlay');
overlay.addEventListener('click', () => {
    if ( mobile_nav.classList.contains('mobile-nav--shown') ){

        menu_switcher();
        document.documentElement.classList.toggle('no-scroll')
    }
})

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchMove, false);

var yDown = null;

function getTouches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! yDown )  return;

    var yUp = evt.changedTouches[0].clientY;
    var yDiff = yDown - yUp;

    if ( yDiff > 400 ) {
        if ( mobile_nav.classList.contains('mobile-nav--shown') ){

            menu_switcher();
            setTimeout( function () {
                document.documentElement.classList.toggle('no-scroll')
            }, 500);
        }
    }

    yDown = null;
};


const menu_switcher = () => {

    mobile_nav.classList.remove('mobile-nav--shown')
    mobile_nav.classList.add('mobile-nav--hidden')
    document.getElementById('burger-menu').checked = false;
    menu_overlay.classList.toggle('overlay--menu-show');

    if ( window.pageYOffset <= 1 ) {
        header.classList.remove('navbar--scroll')
        setTimeout(function(){
            currentLogo.style.display = "none";
            startBtn.style.display = "none";
            searchBtn.style.display = "none";
        }, 300);
    }

    menu_open = false;
    window.removeEventListener('scroll', noScroll);

    window.addEventListener('touchmove', function(e) {
        e.preventDefault()
    }, false)

}

window.onscroll = scrollToggler;


/* Menu service qui reste ouvert lors du focus sur les enfants */
const service_menu_dropdown = document.querySelector('.navbar__dropdown');
const service_menu_items = document.querySelectorAll('.navbar__dropdown-item');
service_menu_items.forEach( ( item, index ) => {
    item.addEventListener('focus', ( event ) => {
        service_menu_dropdown.classList.toggle('navbar__dropdown--active')
    })
    item.addEventListener('focusout', ( event ) => {
        service_menu_dropdown.classList.toggle('navbar__dropdown--active')
    })
})

const flag_menu_dropdown = document.querySelector('.navbar__dropdown--flag');
const flag_menu_items = document.querySelectorAll('.navbar__dropdown-item--flag');
flag_menu_items.forEach( ( item, index ) => {
    item.addEventListener('focus', ( event ) => {
        flag_menu_dropdown.classList.toggle('navbar__dropdown--active')
    })
    item.addEventListener('focusout', ( event ) => {
        flag_menu_dropdown.classList.toggle('navbar__dropdown--active')
    })
})
