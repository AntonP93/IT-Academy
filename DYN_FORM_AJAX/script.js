'use strict'

// var formDef2=
// [
//   {label:'Фамилия:',kind:'longtext',name:'lastname'},
//   {label:'Имя:',kind:'longtext',name:'firstname'},
//   {label:'Отчество:',kind:'longtext',name:'secondname'},
//   {label:'Возраст:',kind:'number',name:'age'},
//   {caption:'Зарегистрироваться',kind:'submit'},
// ];
// var formDef1=
// [
//   {label:'Название сайта:',kind:'longtext',name:'sitename'},
//   {label:'URL сайта:',kind:'longtext',name:'siteurl'},
//   {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
//   {label:'E-mail для связи:',kind:'shorttext',name:'email'},
//   {label:'Рубрика каталога:',kind:'combo',name:'division',
//     variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
//   {label:'Размещение:',kind:'radio',name:'payment',
//     variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
//   {label:'Разрешить отзывы:',kind:'check',name:'votes'},
//   {label:'Описание сайта:',kind:'memo',name:'description'},
//   {caption:'Опубликовать',kind:'submit'},
// ];
let arr =[];
// function ajaxForm(){
//     let arrFormAJAX = ['https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json','https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json'];

//     for(let i = 0; i < arrFormAJAX.length; i++){
//         $.ajax(`${arrFormAJAX[i]}`,
//         { type:'GET', dataType:'text', success: dataLoaded }
//         );
//     }    
// }
// let formDef1 = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json';
//     $.ajax(formDef1,
//     { type:'GET', dataType:'text', success:dataLoaded }
//     );
// let formDef2 = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json';
//     $.ajax(formDef2,
//     { type:'GET', dataType:'text', success:dataLoaded }
//     );        
// function dataLoaded(data){
//     let dataForm = JSON.parse(data);
//     arr.push(dataForm);
//     console.log(arr)
//     if(arr.length >=2){
//         formAdd(arr)
//     }
// }
let formDef1 = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef1.json';
let formDef2 = 'https://fe.it-academy.by/Examples/dyn_form_ajax/formDef2.json';
let arrNew = [];
function req(formDef){
    var request = new XMLHttpRequest();
    request.open('GET',formDef,false);
    request.send();
    request.responseType = 'text';
   
    request.onload = function() {
        var arrJSON = request.response;
        let arr1 = JSON.parse(arrJSON);
        if(request.readyState === 4){
            formAdd(arr1)
        }
        
    } 
}
req(formDef1)
req(formDef2)




// function dataLoaded(data){
//     let dataForm = JSON.parse(data);
//     arr.push(dataForm);
//     console.log(arr)
//     if(arr.length >=2){
//         formAdd(arr)
//     }
// }

// formAdd(arrNew9);
// formAdd(arrNew[5]);
function formAdd(arr) {
    console.log(arr)
    let formIn = document.createElement('form');
    formIn.method = 'POST';
    formIn.action = "https://fe.it-academy.by/TestForm.php"
    document.body.append(formIn);
    arr.forEach( element => {
        let divIn = document.createElement('rt');
        if(element.label){
        divIn.innerText = element.label;
        };
        let input = document.createElement('input');
        if(element.kind === 'longtext'){
            input.type = 'text'; 
        } else if(element.kind === 'number'){
            input.type = 'number';
        } else if(element.kind === 'shorttext'){
            input.type = 'email';
        } else if(element.kind === 'combo'){
            input = document.createElement('select');
            element.variants.forEach(el =>{
                let option = new Option(el.text);
                option.value = el.value; 
                input.append(option);                
            });
        } else if(element.kind === 'submit'){
            input.type = 'submit';
            input.value = element.caption;
        } else if(element.kind === 'radio'){
            input = document.createElement('td')
            element.variants.forEach(el =>{
            let radioIn = document.createElement('input');
            let textRadio = document.createTextNode(el.text);
            radioIn.type = 'radio';
            radioIn.name = element.name;
            radioIn.value = el.value;
            input.append(radioIn);
            
            input.append(textRadio);
            })
        } else if(element.kind === 'check'){
            input.type = 'checkbox';
            input.checked = 'true';
        } else if(element.kind === 'memo'){
            input = document.createElement('textarea');
        };
        input.name = element.name;
        input.style = 'display:block';
        formIn.append(divIn);
        divIn.append(input);     
    });   
}




