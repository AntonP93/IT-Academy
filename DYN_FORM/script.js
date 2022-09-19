'use strict'
// let formIn = document.createElement('form');
// formIn.method = 'POST';
// formIn.action = "https://fe.it-academy.by/TestForm.php"
// document.body.append(formIn);


// let divIn = document.createElement('rt');
// divIn.innerText = 'Название сайта:'
// let input = document.createElement('input');
// input.type = 'text';
// input.name = 'sitename';
// formIn.append(divIn);
// divIn.append(input);
var formDef2=
[
  {label:'Фамилия:',kind:'longtext',name:'lastname'},
  {label:'Имя:',kind:'longtext',name:'firstname'},
  {label:'Отчество:',kind:'longtext',name:'secondname'},
  {label:'Возраст:',kind:'number',name:'age'},
  {caption:'Зарегистрироваться',kind:'submit'},
];
var formDef1=
[
  {label:'Название сайта:',kind:'longtext',name:'sitename'},
  {label:'URL сайта:',kind:'longtext',name:'siteurl'},
  {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
  {label:'E-mail для связи:',kind:'shorttext',name:'email'},
  {label:'Рубрика каталога:',kind:'combo',name:'division',
    variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
//   {label:'Размещение:',kind:'radio',name:'payment',
//     variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
//   {label:'Разрешить отзывы:',kind:'check',name:'votes'},
//   {label:'Описание сайта:',kind:'memo',name:'description'},
  {caption:'Опубликовать',kind:'submit'},
];
function addForm(form){
    let formIn = document.createElement('form');
    formIn.method = 'POST';
    formIn.action = "https://fe.it-academy.by/TestForm.php"
    document.body.append(formIn);

    form.forEach( element => {
        let divIn = document.createElement('rt');
        if(element.label){
        divIn.innerText = element.label;
        };
        let input = document.createElement('input');
        if(element.kind === 'longtext'){
            input.type = 'text'; 
        } else if(element.kind === 'number'){
            input.type = element.kind;
        } else if(element.kind === 'shorttext'){
            input.type = 'email';
        } else if(element.kind === 'combo'){
            console.log('я здесь')
            input = document.createElement('select');
            element.variants.forEach(el =>{
                let option = new Option(el.text,el.text);
                option.value = el.value; 
                input.append(option);                
            });
        } else if(element.kind === 'submit'){
            input.type = element.kind;
            input.value = element.caption;
        };
        input.name = element.name;
        input.style = 'display:block';
        formIn.append(divIn);
        divIn.append(input);     
    });         
};

addForm(formDef2);
addForm(formDef1);



