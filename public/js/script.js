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

            // Alterar ao menos um conteúdo HTML com JavaScript
            extraContent.innerHTML = "Dê uma olhadinha no site da nossa patrocinadora <strong>Netshoes</strong>, talvez você encontre o produto:<br>&quot;" + content + "&quot;";

            // Alterar ao menos um atributo de um elemento HTML com JavaScript
            link.href = "https://www.netshoes.com.br/busca?q=" + content;

            link.innerText = "Clique aqui";
        }
        else
        {
            divContent.style.display = "none";
        }
    })
})