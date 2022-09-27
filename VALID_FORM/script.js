'use strict'
const frmTag = document.forms['INFO'];
const inpAutor = frmTag.elements["author"];
const inpTitle = frmTag.elements["title"];
const inpAddres = frmTag.elements["addres"];
const inpDate = frmTag.elements["startdate"];
const inpPersons = frmTag.elements["persons"];
const inpEmail = frmTag.elements["user_mail"];
const inpRubric = frmTag.elements["rubric"];
const inpPublic = frmTag.elements["public"];
const inpComments = frmTag.elements["comments"];
const inpArticle = frmTag.elements["article"];

//массив текстовх инпутов
let  elemsText =[inpAutor,inpTitle,inpAddres,inpPersons,inpEmail,inpArticle,inpDate];


// Проверка на пустую строку и оповещение об ошибке 
function alertMassege(element){
    if(!element.value){
        let tdParent = element.parentNode;
        if(!element.nextSibling){      
            let massege = document.createElement('span');
            massege.style.color = "red";
            massege.innerText = "Введите корректные данные!";
            tdParent.appendChild(massege);
            
        }
        return true;
    } else {
        if(element.nextSibling){
            element.nextSibling.remove();
        }
        return false;
    }
}


function alertMassegeRadio(element){
    let temp = 0;
    element.forEach((el)=>{
        if(!el.checked){
            temp++;
        }
    })
    let mas_rasdio = document.querySelector('.mas_radio');
    if(temp === element.length){
        if(!mas_rasdio){
            let tdParent = element[0].parentNode;
            let massege = document.createElement('span');
            massege.className = 'mas_radio'
            massege.style.color = "red";
            massege.innerText = "Сделайте выбор!";
            tdParent.appendChild(massege);
        }
        return true;
    } else {
        if(mas_rasdio){
            mas_rasdio.remove();
        }
        return false;
    }
        
}

function alertMassegeChek(element){
    let tdParent = element.parentNode;
    let mas_check = document.querySelector('.mas_check');
    if(!element.checked){
        if(!mas_check){
            let massege = document.createElement('span');
            massege.className = 'mas_check'
            massege.style.color = "red";
            massege.innerText = "Вы согласны?";
            tdParent.appendChild(massege);
        }
        return true;
    } else {
        if(element.checked){
            if(mas_check){
                mas_check.remove();
            }
        }
        return false;
    }
}

function alertMassegeOption(element){
    let tdParent = element.parentNode;
    console.log(tdParent) 
    let mas_option = document.querySelector('.mas_option')
    if(element.value == 2){
        if(!mas_option){
            let massege = document.createElement('span');
            massege.className = 'mas_option'
            massege.style.color = "red";
            massege.innerText = "Сделайте правильный выбор!";
            tdParent.appendChild(massege);
        };
        return true;     
    } else {
        if(element.value !== 2){
            if(mas_option){
                mas_option.remove();
            }
        }
        return false;
    }    
}

elemsText.forEach(element => {
    element.addEventListener('focusout',function(EO){
        EO = EO||window.Event;
        alertMassege(this);    
    },false);    
});
inpPublic[1].parentNode.addEventListener('click',function(EO){
        EO = EO||window.Event;
        alertMassegeRadio(inpPublic);    
},false);
inpComments.addEventListener('click',function(EO){
    EO = EO||window.Event;
    alertMassegeChek(this);    
},false);
inpRubric.addEventListener('focusout',function(EO){
    EO = EO||window.Event;
    alertMassegeOption(this)
},false);



frmTag.addEventListener('submit',function(eo){
    eo=eo||window.event;
    elemsText.forEach(element => {
            alertMassege(element);       
    });
    alertMassegeRadio(inpPublic);
    alertMassegeChek(inpComments);
    alertMassegeOption(inpRubric);

    try{
        if(alertMassege(inpAutor)){
            inpAutor.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpTitle)){
            inpTitle.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpAddres)){
            inpAddres.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpDate)){
            inpDate.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpPersons)){
            inpPersons.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpEmail)){
            inpEmail.focus();
            eo.preventDefault(); 
            return;   
        }
        if(alertMassege(inpArticle)){
            inpArticle.focus();
            eo.preventDefault(); 
            return;   
        }
        if (alertMassegeOption(inpRubric)) {
            inpRubric.focus();
            eo.preventDefault();
            return;
        }
        if(alertMassegeRadio(inpPublic)){
            inpPublic[0].parentNode.scrollIntoView()
            eo.preventDefault(); 
            return;   
        }
        if(alertMassegeChek(inpComments)){
            inpComments.parentNode.scrollIntoView();
            eo.preventDefault(); 
            return;   
        }

    }
    catch ( ex ) {
        alert('Извините, что-то пошло не так, перепроверьте заполненные формы!');
        eo.preventDefault();
    }   
},false);




// console.log(inpPublic)
// const btn = document.querySelector('.Btn');

// btn.addEventListener('click',function(EO){
//     EO = EO||window.Event;
//     alertMassegeOption(inpRubric)
      
// },false);




