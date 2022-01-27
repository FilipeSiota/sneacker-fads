// IMPLEMENTANDO JQUERY

$(document).ready(function() {

    // TROCA O BACKGROUND-IMAGE DA DIV IMAGE-EFFECT ==> ALTERAÇÃO DE ESTILO DE UM ELEMENTO HTML

    const $imageEffect = $('#slide');
    const $btnSlide = $('.changeImage');
    var slide = false;

    $btnSlide.click(function() {
        if (!slide)
        {
            $imageEffect.css('background-image', 'url(img/lil_nas_x_nike_1280px.jpg)');

            slide = true;
        }
        else
        {
            $imageEffect.css('background-image', 'url(img/prateleira-tenis-1280px.jpg)');

            slide = false;
        }
    })

    // TROCA COR DO ICONE DE CORAÇÃO

    const $heartIcon = $('.icon-heart');
    var liked = false;

    $heartIcon.click(function() {

        if (!liked)
        {
            $(this).css('color', 'red');

            liked = true;
        }
        else
        {
            $(this).css('color', 'var(--theme4)');

            liked = false;
        }

    })

    // DÁ UM ALERTA DE QUE A PESSOA ADICIONOU O PRODUTO AO CARRINHO ==> UMA FORMA DE OUTPUT RESULTANTE DE CÓDIGO JAVASCRIPT >> window.alert()

    const cartIcon = document.querySelectorAll('.fi-sr-shopping-cart-add');

    cartIcon.forEach(cart => {
        var addCart = false;

        cart.addEventListener('click', () => {

            if (!addCart)
            {
                window.alert("Produto adicionado ao carrinho com sucesso!");

                cart.style.color = "var(--theme3)";

                addCart = true;
            }
            else
            {
                cart.style.color = "var(--theme4)";

                addCart = false;
            }
        })
    })

    // MODIFICA ATRIBUTO HREF DE UM LINK QUE SERÁ USADO PARA PESQUISA E ALTERA O CONTEÚDO DO PARÁGRAFO PARA ESTAR DE ACORDO COM A PESQUISA

    const divContent = document.getElementById('content-plus-link');
    const input = document.getElementById('search');
    const btnSearch = document.getElementById('getSearch');
    const extraContent = document.getElementById('extra');
    const link = document.getElementById('link-creator');

    btnSearch.addEventListener('click', () => {
        var content = input.value;

        if (content != "") {

            divContent.style.display = "block";

            extraContent.innerHTML = "Dê uma olhadinha no site da nossa patrocinadora <strong>Netshoes</strong>, talvez você encontre o produto:<br>&quot;" + content + "&quot;";

            link.href = "https://www.netshoes.com.br/busca?q=" + content;

            link.innerText = "Clique aqui";
        }
        else
        {
            divContent.style.display = "none";
        }
    })

    // Utiliza getElementById, getElementsByTagName, querySelector e querySelectorAll para selecionar elementos da DOM

    const btnReveal = document.getElementById("reveal-prices");
    const priceBestSeller = document.querySelectorAll(".best-seller p");
    const delPrice = document.getElementsByTagName("del");
    const newPrice = document.getElementsByTagName("ins");

    btnReveal.addEventListener('click', () => {
        priceBestSeller.forEach(price => {
            price.innerText = "R$159,99";
            price.style.backgroundColor = "var(--theme4)";
            price.style.color = "var(--theme7)";
            price.style.fontWeight = "bold";
        });

        for (var i = 0; i < delPrice.length; i++)
        {
            delPrice[i].innerText = newPrice[i].innerText;
            newPrice[i].innerText = "R$129,99";
            newPrice[i].style.backgroundColor = "var(--theme7)";
        }

        document.querySelector(".image-effect h1").innerText = "Black Friday";
        document.querySelector(".image-effect p").style.display = "none";
        document.getElementById("promo").getElementsByTagName("h1")[0].innerText = "Confira nossa Black Friday";
    })

    // Utiliza getElementsByClassName para selecionar elementos da DOM

    const eye = document.getElementsByClassName("fi-sr-eye");

    for (var i = 0; i < eye.length; i++)
    {
        eye[i].addEventListener("click", () => {
            window.location.assign("https://images.lojanike.com.br/1024x1024/produto/tenis-air-jordan-1-retro-high-og-555088-180-1.jpg");
        })
    }

    // Mostra atualizações através do window.alert
    const $btnShowUpdates = $('#show-updates');

    $btnShowUpdates.on('click', () => {
        window.alert("Verificar a nova aba 'Database'.");
    })
})