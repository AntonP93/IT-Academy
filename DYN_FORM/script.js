'use strict'
let formIn = document.createElement('form');
formIn.method = 'POST';
formIn.action = "https://fe.it-academy.by/TestForm.php"
document.body.append(formIn);


let divIn = document.createElement('rt');
divIn.innerText = 'Название сайта:'
let input = document.createElement('input');
input.type = 'text';
input.name = 'sitename';
formIn.append(divIn);
divIn.append(input);


// formIn.className = 'longtext';
// formIn.name = 'sitename';
// formIn.type = 'text'