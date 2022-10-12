'use strict'
let containerClock = document.querySelector('.container_clock');
let form = document.forms.diameter;
let valueDiameter = form.elements.diameter_value;
let btn = form.elements.button;
let angleStart = 0; // начальные координаты кружка
const coefficientNumberClock = 0.1;
const coefficientArrowHour = 0.25;
const coefficientArrowMin = 0.35;
const coefficientArrowSec = 0.45;
const coefficientTimerClockWidth = 0.35;
const coefficientTimerClockHight = 0.20;
const coefficientFontSizeTimer = 0.1;
const coefficientFontSizeClock = 0.08;
const deg = 6;


btn.addEventListener('click',function(EO){
    EO=EO||window.event;
    let enteredText = valueDiameter.value;
    if(!enteredText || enteredText < 200 || enteredText > 800){
       return alert("Введите корректные данные!")
    }
    form.remove();
    let valueDiameterpx = `${enteredText}px `;
    let divClock = document.createElement('div');
    divClock.className = 'clock';
    containerClock.appendChild(divClock);
    let clock = document.querySelector('.clock')
    clock.style.cssText = `border-radius:50%; height: ${valueDiameterpx}; width: ${valueDiameterpx}; position: relative; background-color: goldenrod;`

    const clockCenterX = clock.offsetLeft+clock.offsetWidth/2;
    const clockCenterY = clock.offsetTop+clock.offsetHeight/2;
   
    let fontsizeTextTimer = enteredText * coefficientFontSizeTimer;
    let fontsizeTextClock = enteredText * coefficientFontSizeClock;



    let i = 1
    while(i < 13){
        angleStart = angleStart + 30;
        let radiusNumberClock = enteredText*coefficientNumberClock; 
        let heightNumberClockpx = radiusNumberClock +'px'; //высота кругов в пх
        let weightNumberClockpx= radiusNumberClock +'px'; //ширина кругов в пх
        let angle = angleStart/180*Math.PI;
        let numberClock = document.createElement('div');
        numberClock.style.cssText = `position: absolute; height: ${heightNumberClockpx} ; width: ${weightNumberClockpx}; border-radius:50%; background-color: green; display: flex; align-items: center; justify-content: center; font-size: ${fontsizeTextClock + 'px'}`;
        numberClock.textContent = `${i}`;
        clock.appendChild(numberClock);
        let numberCenterX = clockCenterX+((enteredText/2) - (radiusNumberClock))*Math.sin(angle); //центр крухжков
        let numberCenterY = clockCenterY-((enteredText/2) - (radiusNumberClock))*Math.cos(angle); //центр крухжков
        numberClock.style.left = Math.round(numberCenterX-numberClock.offsetWidth/2)+'px';
        numberClock.style.top = Math.round(numberCenterY-numberClock.offsetHeight/2)+'px';
        i++;
    }
    
    let hour = document.createElement('div');
    let heightArrowHour = (enteredText)*coefficientArrowHour;
    let heightArrowHourPx= heightArrowHour +'px';
    hour.style.cssText =`position: absolute;width: 8px; height:${heightArrowHourPx};background-color: black; 
    border-radius: 4px ; transform-origin: 50% 90%;`; 
    hour.style.top = ((enteredText/2)-(heightArrowHour*0.9)) +'px'; // 0.9 - 90% в transform-origin: 50% 90%
    hour.style.left = (clockCenterX-4) +'px';// центр стрелки
    clock.appendChild(hour);


    let min = document.createElement('div');
    let heightArrowMin = (enteredText)*coefficientArrowMin;
    min.style.cssText =`position: absolute;width: 6px; height: ${heightArrowMin+'px'};background-color: brown; 
    border-radius: 3px ; transform-origin: 50% 90%;`; 
    min.style.top = ((enteredText/2)-(heightArrowMin*0.9)) +'px'; // 0.9 - 90% в transform-origin: 50% 90%
    min.style.left = (clockCenterX-3) +'px'; // центр стрелки
    clock.appendChild(min);



    let sec = document.createElement('div');
    let heightArrowSec = (enteredText) * coefficientArrowSec;
    sec.style.cssText =`position: absolute;width: 2px; height: ${heightArrowSec + 'px'};background-color: red; 
    border-radius: 1px ; transform-origin: 50% 90%;`;
    sec.style.top = ((enteredText/2)-(heightArrowSec*0.9)) +'px'; // 0.9 - 90% в transform-origin: 50% 90%
    sec.style.left = (clockCenterX-1) +'px'; // центр стрелки
    clock.appendChild(sec);

    let timerClock = document.createElement('div');
    let widthtimerClock = enteredText * coefficientTimerClockWidth;
    let heighttimerClock = enteredText * coefficientTimerClockHight;
    timerClock.style.cssText = `position: absolute; width: ${widthtimerClock+'px'}; height:${heighttimerClock +'px'}; top: 25%; left:33%; text-align: center; font-size: ${fontsizeTextTimer + 'px'}`
    clock.appendChild(timerClock);


    function clockDate(){
        let day = new Date();
        let hh = day.getHours();
        let mm = day.getMinutes();
        let ss = day.getSeconds();
        // console.log(day)

        function str0l(val,len) {
            let strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }  

        hour.style.transform = `rotateZ(${(hh* 30) + (mm*deg/12)}deg)`;
        min.style.transform = `rotateZ(${mm * deg}deg)`;
        sec.style.transform = `rotateZ(${ss * deg}deg)`;
        let stringTimer = `${str0l(hh,2)}:${str0l(mm,2)}:${str0l(ss,2)}`
        console.log(`${stringTimer}`)
        timerClock.textContent = stringTimer;
        
    }
     
    clockDate();
    setInterval(clockDate,1000);
},false);
