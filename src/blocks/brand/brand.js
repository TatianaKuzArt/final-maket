const content = document.querySelectorAll('.brand__item');
const buttonShow = document.querySelector('.brand__show-more');
const buttonHide = document.querySelector('.brand__hidden-more');


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
        if (window.innerWidth > 1119 && index > 7) {
            item.style.display = 'none';
        }
        if (window.innerWidth > 767 && window.innerWidth < 1120 && index > 5) {
            item.style.display = 'none';
        }
    })
})