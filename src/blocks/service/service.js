const content = document.querySelectorAll('.service__item');
const buttonShow = document.querySelector('.service__show-more');
const buttonHide = document.querySelector('.service__hidden-more');


buttonShow.addEventListener("click", event => {
    event.preventDefault();

    buttonHide.classList.toggle('hidden');
    buttonShow.classList.toggle('hidden');


    content.forEach((item) => {
        item.style.display = 'block';
    })
})

buttonHide.addEventListener("click", event => {
    event.preventDefault();
    buttonHide.classList.toggle('hidden');
    buttonShow.classList.toggle('hidden');

    content.forEach((item, index) => {
        if (window.innerWidth >= 1120 && index > 3) {
            item.style.display = 'none';
        }
        if (window.innerWidth > 767 && window.innerWidth < 1120 && index > 2) {
            item.style.display = 'none';
        }
    })
})