import './scss/style.scss';
import './blocks/brand/brand.js';
import './blocks/service/service.js';

import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';


Swiper.use([Pagination]);
let init = false;
let swiper;

function swiperCard() {
    if (window.innerWidth <= 767) {
        if (!init) {
            init = true;
            swiper = new Swiper(".swiper", {
                direction: 'horizontal',
                spaceBetween: 10,
                slidesPerView: "auto",
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        }
    } else if (init) {
        try {
            swiper.disable();
        } catch (e) {
            console.error(e);
        }
        init = false;
    }
}

swiperCard();
window.addEventListener("resize", swiperCard);

const sidebar = document.querySelector('.sidebar');
const btnBurger = document.querySelector('#burger');
const feedbackChat = document.querySelector('#feedback--chat');
const feedbackCall = document.querySelector('#feedback--call');
const btnCall = document.querySelectorAll('#call');
const btnChat = document.querySelectorAll('#chat');

const openButtons = [...btnChat, ...btnCall, btnBurger]


btnBurger.addEventListener("click", event => {
    event.preventDefault();
    sidebar.classList.add('show');
})

btnChat.forEach(btn => btn.onclick = event => {
    event.preventDefault();
    feedbackChat.classList.add('show');
})

btnCall.forEach(btn => btn.onclick = event => {
    event.preventDefault();
    feedbackCall.classList.add('show');
})

document.querySelector('.header-sidebar__button_back').onclick = () => {
    sidebar.classList.remove('show');
}

document.querySelector('#close-chat').onclick = () => {
    feedbackChat.classList.remove('show');
}

document.querySelector('#close-call').onclick = () => {
    feedbackCall.classList.remove('show');
}


document.addEventListener('click', event => {
    const target = event.target;
    if (target !== sidebar && !openButtons.includes(target)
        && !sidebar.contains(target)
        && !feedbackChat.contains(target)
        && !feedbackCall.contains(target)
    ) {
        sidebar.classList.remove('show');
        feedbackChat.classList.remove('show');
        feedbackCall.classList.remove('show');
    }
})
