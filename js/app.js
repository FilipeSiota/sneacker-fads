// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const db = getDatabase(app);

var $usersList = $('#usersList');
var $nameInput = $('#nameInput');
var $ageInput = $('#ageInput');
var $addButton = $('#addButton');

// Ao clicar no botão
$addButton.on('click', function() {
    writeUserData($nameInput.val(), $ageInput.val());
});

// Gera uma chave aleatória
function generateKey() {
    const key = Math.random().toString(36).slice(-8);

    return key;
}

// Gravando no banco de dados
function writeUserData(name, age) {

    // Pega a chave aleatória gerada para usar como identificador
    const userKey = generateKey();

    set(ref(db, 'users/' + userKey + '/'), {
        name: name,
        age: age
    })
    .then(() => {
        alert("Dados adicionados ao banco de dados com sucesso!");
    })
    .catch((error) => {
        alert("Error: ", error);
    })
}

// Quando um valor for atualizado no banco de dados, lista novamente os users
const users = ref(db, 'users/');

onValue(users, (snapshot) => {
    $usersList.html('');

    snapshot.forEach(function (item) {
        const li = document.createElement('li');

        li.append(document.createTextNode(item.val().name + ' : ' + item.val().age + ' anos'));
        $usersList.append(li);
    })
});