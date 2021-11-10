// DROPDOWN MENU
const menuIcon = document.querySelector('#menu-icon');
const menuList = document.querySelector('#menulist');
const body = document.body;

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('open');

    body.classList.toggle('disable-scroll');
})

// TROCA COR DO ICONE DE CORAÇÃO

const heartIcon = document.querySelectorAll('.icon-heart');

heartIcon.forEach(heart => {
    heart.addEventListener('click', () => {
        heart.classList.toggle('turn-red');
    })
})