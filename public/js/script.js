$(document).ready(function() {

    // ALTERAÇÃO DE ESTILO DE UM ELEMENTO HTML
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

    // MOSTRA O FORMULÁRIO PARA ADICIONAR UM NOVO SNEACKER
    const $addSneacker = $('#addSneacker');
    const $form = $('#form');

    $addSneacker.on('click', function() {
        $form.slideToggle();
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
    const btnBlackFriday = document.getElementById("btn-black-friday");
    const priceBestSeller = document.querySelectorAll(".best-seller p");
    const newPrice = document.getElementsByTagName("ins");

    if (btnBlackFriday) {
        
        btnBlackFriday.addEventListener('click', () => {
            window.location = "#promo";
    
            priceBestSeller.forEach(price => {
                price.style.backgroundColor = "var(--theme4)";
                price.style.color = "var(--theme7)";
                price.style.fontWeight = "bold";
            });
    
            for (var i = 0; i < newPrice.length; i++)
            {
                newPrice[i].style.backgroundColor = "var(--theme7)";
            }
    
            document.querySelector(".image-effect h1").innerText = "Black Friday";
            document.querySelector(".image-effect p").style.display = "none";
    
            btnBlackFriday.innerText = "Ver todos os sneackers";
    
            btnBlackFriday.addEventListener('click', () => {
                location.reload();
            })
        })
    }
})