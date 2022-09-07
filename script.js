'use strict'
function HashStorageFunc(){
    var self = this;
    var privatObj = {};
    self.addValue = function(key,value){
        privatObj[key] = value;
    };
    self.getValue = function(key){
        return (key in privatObj) ? privatObj[key] : undefined;
    };
    self.deleteValue = function(key){
        if(key in privatObj){
            delete privatObj[key];
            return true;
        } else {
            return false;
        };
    };
    self.getKeys = function(){
        return Object.keys(privatObj);    
    };

};

let drinkStorage = new HashStorageFunc();

let btnAdd = document.querySelector('.add_inform');
let btnGet = document.querySelector('.get_inform');
let btnDel = document.querySelector('.del_inform');
let btnDrink = document.querySelector('.all_drink');

function informationDrink(){
    let nameDrink;
    let acloholDrink;

    nameDrink = prompt("Название напитка",'');

    let acloholqeust = confirm("Напиток алкогольный? \r\n 'OK' - ДА \r\n 'Отмена' - НЕТ");
    acloholDrink = (acloholqeust)?"Да":"Нет";

    let formylaDrink  = prompt('Введите рецепт приготовления через запятую','') ;
    return drinkStorage.addValue(nameDrink.toUpperCase(),{'алкогольный' : acloholDrink, 'рецепт' : formylaDrink});
}

function getDrink(){
    let nameDrink = prompt("Название напитка",'');
    let drinkInfo = drinkStorage.getValue(nameDrink.toUpperCase());
    if(drinkInfo){
        return alert(`напиток ${nameDrink.toUpperCase()}\r\nалкогольный: ${drinkInfo['алкогольный']}\r\nрецепт приготовления: ${drinkInfo['рецепт']}`);
    } else {
        return alert('Напиток отсутствует')
    }
} 

function delDrink(){
    let nameDrink = prompt("Название напитка",'');
    return alert((drinkStorage.deleteValue(nameDrink.toUpperCase()))?'Напиток удален':'Напиток отсутствует'); 
};

function allDrink(){
    let allDrink = drinkStorage.getKeys();
    return alert((allDrink.length === 0)?'Напитков нет':allDrink.join())
};

btnAdd.addEventListener("click", informationDrink);
btnGet.addEventListener("click", getDrink);
btnDel.addEventListener("click", delDrink);
btnDrink.addEventListener("click", allDrink);

