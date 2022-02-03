import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getDatabase, ref, set, get, child, push, update, remove } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAKqimGxeUGVnvMv6iavC4pvje37Qr3LM",
  authDomain: "filipesiota-ifrs.firebaseapp.com",
  databaseURL: "https://filipesiota-ifrs-default-rtdb.firebaseio.com",
  projectId: "filipesiota-ifrs",
  storageBucket: "filipesiota-ifrs.appspot.com",
  messagingSenderId: "1054095732107",
  appId: "1:1054095732107:web:4f9a2a955619224d18938e",
  measurementId: "G-F4EVY5SF36"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const dbRef = ref(getDatabase());
const databaseURL = "https://filipesiota-ifrs-default-rtdb.firebaseio.com";

// Pega os elementos da DOM
const $divPromo = $('#promo');
const $form = $('#form');
const $nameInput = $('#nameInput');
const $priceInput = $('#priceInput');
const $percDiscountInput = $('#percDiscountInput');
const $imageInput = $('#imageInput');
const $addButton = $('#addButton');
const $btnBlackFriday = $('#btn-black-friday');

// Quando o formulário for enviado
$form.on('submit', function(event) {

    // Evita o recarregamento da página
    event.preventDefault();

    // Desabilita o botão de envio do formulário para não cadastrar dois tênis iguais sem querer
    $addButton.attr("disabled", true);

    var data = {
        name: $nameInput.val(),
        price: $priceInput.val(),
        percDiscount: $percDiscountInput.val(),
        image: $imageInput.val(),
        countLikes: 0
    }

    // Manda executar a função de escrever no Banco de Dados
    appendToDatabase(data, "sneackers", () => {
        alert("Dados adicionados ao banco de dados com sucesso!");

        // Carrega os produtos na tela
        loadProducts();
    },
    (error) => {
        alert("Error: " + error);

        // Carrega os produtos na tela
        loadProducts();
    });

    // Retaura os campos do formulário para vazios
    $nameInput.val("");
    $priceInput.val("");
    $percDiscountInput.val("");
    $imageInput.val("");

    // Habilita o botão de envio do formulário
    $addButton.attr("disabled", false);
});

// Gravando no Database
function appendToDatabase(data, path, callbackSuccess, callbackError) {
    
    fetch(databaseURL + "/" + path + "/.json", {
        method: "POST",
        body: JSON.stringify(data)
    })
    .then(response => {
        response.json()
        .then(callbackSuccess)
        .catch(error => {
            callbackError(error)
        })
    })
    .catch(error => {
        callbackError(error)
    })
}

// // Lendo do Database
// function readFromDatabase(path, callback) {

//     fetch(databaseURL + "/" + path + "/.json", {
//         method: "GET"
//     })
//     .then(response => {
//         response.json()
//         .then(callback)
//         .catch(error => {
//             console.log(error);
//         })
//     })
//     .catch(error => {
//         console.log(error);
//     })
// }

// Verifica se a página é de administrador
const $verifyAdmin = $('a#selected').find('i.fi-sr-database');

// Carrega os produtos quando o documento termina o carregamento
loadProducts();

function loadProducts() {

    get(child(dbRef, 'sneackers/')).then((snapshot) => {
        $divPromo.html('');

        const h1 = document.createElement('h1');

        if (!snapshot.exists())
        {
            $btnBlackFriday.attr("disabled", true);

            h1.innerText = "Ainda não temos sneackers no catálogo";
            h1.style.marginBottom = "0px";

            $divPromo.append(h1);
        }
        else
        {
            $btnBlackFriday.attr("disabled", false);

            h1.innerText = "Confira nossos sneackers";

            $divPromo.append(h1);

            // Para cada elemento do snapshot
            snapshot.forEach(function (item) {

                const divShoe = document.createElement('div');
                divShoe.classList.add('shoe');
                divShoe.setAttribute('id', item.key);

                // Transforma o valor do preço para valor monetário (BRL) - Exemplo: 120 -> R$120,00
                var price = item.val().price * 1.0;
                price = price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                // Escreve o código referente a uma div de sneacker, substituindo os dados estáticos pelos dinâmicos
                divShoe.innerHTML = "<div class='data'><img src='" + item.val().image + "' alt='Foto do " + item.val().name + "'><h2>" + item.val().name + "</h2>";

                if (item.val().percDiscount > 0) // Se houver desconto
                {
                    // Calcula o desconto baseado no percentual contido no banco de dados e transforma este valor em valor monetário (BRL)
                    var discountValue = item.val().price - (item.val().price * item.val().percDiscount / 100.0);
                    discountValue = discountValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                    divShoe.innerHTML += "<p><del>" + price + "</del><ins>" + discountValue + "</ins></p></div><div class='discount'>" + item.val().percDiscount + "% OFF</div>";  
                }
                else
                {
                    divShoe.classList.add('normal'); // Adiciona uma classe a div
                }

                if ($verifyAdmin.length)
                {
                    divShoe.innerHTML += "<div class='product-options'><a href='" + item.val().image + "' target='_blank'><i class='fi fi-sr-eye'></i></a><div><i class='fi fi-sr-heart icon-heart'></i><span class='likes'>" + item.val().countLikes + "</span></div><i class='fi fi-sr-trash'></i></div>";
                }
                else
                {
                    divShoe.innerHTML += "<div class='product-options'><a href='" + item.val().image + "' target='_blank'><i class='fi fi-sr-eye'></i></a><div><i class='fi fi-sr-heart icon-heart'></i><span class='likes'>" + item.val().countLikes + "</span></div><a href='https://api.whatsapp.com/send?phone=5551900000000&text=Olá, Sneacker Fads! Estava dando uma olhada no site e me interessei pelo sneacker " + item.val().name + ". Gostaria de saber se vocês possuem ele em estoque?' target='_blank'><i class='fi fi-sr-shopping-cart-add'></i></a></div>";
                }

                // Concatena a div de sneacker a div principal
                $divPromo.append(divShoe);
            })

            // Habilita a barra de opções dos produtos
            addInterativeOptions();
        }
    })
}

$btnBlackFriday.on('click', function() {

    // Fará uma consulta ao Database
    get(child(dbRef, 'sneackers/')).then((snapshot) => {

        if (!snapshot.exists())
        {
            h1.innerText = "Ainda não temos sneackers no catálogo";
            h1.style.marginBottom = "0px";

            $divPromo.append(h1);
        }
        else
        {
            var blackFriday = false;

            // Para cada elemento do snapshot
            data.forEach(function (item) {

                if (item.val().percDiscount > 0) // Se houver desconto
                {
                    blackFriday = true;

                    const divShoe = document.createElement('div');
                    divShoe.classList.add('shoe');
                    divShoe.setAttribute('id', item.key);

                    // Transforma o valor do preço para valor monetário (BRL) - Exemplo: 120 -> R$120,00
                    var price = item.val().price * 1.0;
                    price = price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                    // Calcula o desconto baseado no percentual contido no banco de dados e transforma este valor em valor monetário (BRL)
                    var discountValue = item.val().price - (item.val().price * item.val().percDiscount / 100.0);
                    discountValue = discountValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});

                    // Escreve o código referente a uma div de sneacker, substituindo os dados estáticos pelos dinâmicos
                    divShoe.innerHTML = "<div class='data'><img src='" + item.val().image + "' alt='Foto do " + item.val().name + "'><h2>" + item.val().name + "</h2><p><del>" + price + "</del><ins>" + discountValue + "</ins></p></div><div class='discount'>" + item.val().percDiscount + "% OFF</div><div class='product-options'><a href='" + item.val().image + "' target='_blank'><i class='fi fi-sr-eye'></i></a><div><i class='fi fi-sr-heart icon-heart'></i><span class='likes'>" + item.val().countLikes + "</span></div><a href='https://api.whatsapp.com/send?phone=5551900000000&text=Olá, Sneacker Fads! Estava dando uma olhada no site e me interessei pelo sneacker " + item.val().name + ". Gostaria de saber se vocês possuem ele em estoque?' target='_blank'><i class='fi fi-sr-shopping-cart-add'></i></a></div>"; 
                }

                // Concatena a div de sneacker a div principal
                $divPromo.append(divShoe);
            })

            if (blackFriday)
            {
                // Habilita a barra de opções dos produtos
                addInterativeOptions();

                h1.innerText = "Confira nossa Black Friday";
            }
            else
            {
                h1.innerText = "Não temos destaques da Black Friday ainda";
                h1.style.marginBottom = "0px";
            }

            $divPromo.append(h1);
        }
    }).catch((error) => {
        console.log("Error: " + error);
    })
})

// Lendo do Database
function getLikesToUpdate(id, like) {

    get(child(dbRef, 'sneackers/')).then((snapshot) => {
        if (snapshot.exists())
        {
            snapshot.forEach((item) => {
                if (item.key === id)
                {
                    return updateDatabase(item.key, item.val().name, item.val().price, item.val().percDiscount, item.val().image, item.val().countLikes + like);
                }
            })
        }
        else
        {
            console.log('Nenhum dado disponível')
        }
    }).catch((error) => {
        console.error(error);
    })
}

// Atualizando dados no Database
function updateDatabase(key, name, price, percDiscount, imageURL, countLikes) {
    const newData = {
        name: name,
        price: price,
        percDiscount: percDiscount,
        image: imageURL,
        countLikes: countLikes
    };

    const updates = {};
    updates['sneackers/' + key + '/'] = newData;

    return update(ref(db), updates);
}

// Remove um produto do Database
function removeFromDatabase(id) {
    const target = ref(db, 'sneackers/' + id);
    remove(target);

    // Carrega os produtos na tela
    return loadProducts();
}

function addInterativeOptions() {

    if (!$verifyAdmin.length)
    {
        // TROCA COR DO ÍCONE DE CORAÇÃO
        const $heartIcon = $('.icon-heart');

        $heartIcon.on('click', function() {

            const $productId = $(this).parent().parent().parent().attr('id');
            const $likes = $(this).parent().find($('.likes'));
            var numLikes = likes.text();
            numLikes = parseInt(numLikes);
            
            // se a cor do coração for branca, ou seja, o ícone está desativado
            if ($(this).css('color') == 'rgb(255, 255, 255)')
            {
                $(this).css('color', 'red');

                getLikesToUpdate($productId, 1);

                $likes.text(numLikes + 1);
            }
            else
            {
                $(this).css('color', 'var(--theme4)');

                getLikesToUpdate($productId, -1);

                $likes.text(numLikes - 1);
            }
            
        })

        // UMA FORMA DE OUTPUT RESULTANTE DE CÓDIGO JAVASCRIPT >> window.alert()
        const $cartIcon = $('.fi-sr-shopping-cart-add');

        $cartIcon.on('click', function() {

            // Conter ao menos uma forma de output (saída) resultante de código de JavaScript
            window.alert("Você será redirecionado ao nosso Whatsapp para efetuar a compra!");
        })
    }
    else
    {
        const $heartIcon = $('.icon-heart');
        $heartIcon.css('color', 'red');
        $heartIcon.css('cursor', 'default');
        $heartIcon.on('mouseover', function() {
            $heartIcon.css('opacity', '1');
        })

        const $trashIcon = $('.fi-sr-trash');

        $trashIcon.on('click', function() {

            const productId = $(this).parent().parent().attr('id');
            const nameProduct = $(this).parent().parent().find('h2').text();

            var status = confirm("Exclusão do sneacker " + nameProduct + ".\nPressione OK para confirmar ou cancele a operação.");

            if (status)
            {
                removeFromDatabase(productId);
            }
        })
    }
}