// DROPDOWN MENU
const menuIcon = document.querySelector('#menu-icon');
const menuList = document.querySelector('#menulist');
const body = document.body;

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('open');

    body.classList.toggle('disable-scroll');
})

// TROCA O BACKGROUND-IMAGE DA DIV IMAGE-EFFECT ==> ALTERAÇÃO DE ESTILO DE UM ELEMENTO HTML

const imageEffect = document.getElementById('slide');
var i = 0;

function changeBackground() {
    if (i % 2 == 0)
    {
        imageEffect.style.backgroundImage = "url(../img/lil_nas_x_nike_1280px.jpg)";
    }
    else
    {
        imageEffect.style.backgroundImage = "url(../img/prateleira-tenis-1280px.jpg)";
    }

    i++;
}

// TROCA COR DO ICONE DE CORAÇÃO

const heartIcon = document.querySelectorAll('.icon-heart');

heartIcon.forEach(heart => {
    heart.addEventListener('click', () => {
        heart.classList.toggle('turn-red');
    })
})

// DÁ UM ALERTA DE QUE A PESSOA ADICIONOU O PRODUTO AO CARRINHO ==> UMA FORMA DE OUTPUT RESULTANTE DE CÓDIGO JAVASCRIPT >> window.alert()

const cartIcon = document.querySelectorAll('.fi-sr-shopping-cart-add');

cartIcon.forEach(cart => {
    cart.addEventListener('click', () => {
        window.alert("Produto adicionado ao carrinho com sucesso!");

        cart.style.color = "var(--theme3)";
    })
})

// MODIFICA ATRIBUTO HREF DE UM LINK QUE SERÁ USADO PARA PESQUISA E ALTERA O CONTEÚDO DO PARÁGRAFO PARA ESTAR DE ACORDO COM A PESQUISA

const divSearch = document.getElementById('searching');
const divContent = document.getElementById('content-plus-link');
const input = document.getElementById('search');
const btnSearch = document.getElementById('getSearch');
const extraContent = document.getElementById('extra');
const link = document.getElementById('link-creator');

var content;

btnSearch.addEventListener('click', () => {
    content = input.value;

    if (content != "") {

        divSearch.style.display = "flex";
        divContent.style.display = "block";

        extraContent.innerHTML = "Dê uma olhadinha no site da nossa patrocinadora <strong>Netshoes</strong>, talvez você encontre o produto:<br>&quot;" + content + "&quot;";

        link.href = "https://www.netshoes.com.br/busca?q=" + content;

        link.innerText = "Clique aqui";
    }
})