'use strict'
const SVGElem=document.getElementById("ClockSVG");
let form = document.forms.diameter;
let valueDiameter = form.elements.diameter_value;
let btn = form.elements.button;
let angleStart = 0; // начальные координаты кружка
const coefficientNumberClock = 0.1;
const coefficientArrowHour = 0.25;
const coefficientArrowMin = 0.35;
const coefficientArrowSec = 0.45;
const coefficientFontSizeTimer = 0.1;
const coefficientFontSizeClock = 0.08;
const coefficientHeghtTimer = 1.5;
const deg = 6;


btn.addEventListener('click',function(EO){
    EO=EO||window.event;
    let enteredText = valueDiameter.value;
    if(!enteredText || enteredText < 200 || enteredText > 800){
       return alert("Введите корректные данные!")
    }
    form.remove();
    let centerClock= enteredText/2;
    SVGElem.setAttribute('width',`${enteredText}`);
    SVGElem.setAttribute('height',`${enteredText}`);
    const circle=
    document.createElementNS("http://www.w3.org/2000/svg",'circle');
    circle.setAttribute("cx",`${centerClock}`);
    circle.setAttribute("cy",`${centerClock}`);
    circle.setAttribute("r",`${centerClock}`);
    circle.setAttribute("fill","goldenrod");
    SVGElem.appendChild(circle);

    let fontsizeTextTimer = enteredText * coefficientFontSizeTimer;
    let fontsizeTextClock = enteredText * coefficientFontSizeClock;

    let i = 1
    while(i < 13){
        angleStart = angleStart + 30;
        let radiusNumberClock = (centerClock)*coefficientNumberClock; 
        let angle = angleStart/180*Math.PI;
        const circleClockNumber = document.createElementNS("http://www.w3.org/2000/svg",'circle');

        // numberClock.textContent = `${i}`;
        // clock.appendChild(numberClock);
        let numberCenterX = centerClock+((centerClock-radiusNumberClock) - (radiusNumberClock))*Math.sin(angle); //центр крухжков
        let numberCenterY = centerClock-((centerClock-radiusNumberClock) - (radiusNumberClock))*Math.cos(angle); //центр крухжков
        console.log(i,numberCenterX,numberCenterY)
        circleClockNumber.setAttribute("cx",`${numberCenterX}`);
        circleClockNumber.setAttribute("cy",`${numberCenterY}`);
        circleClockNumber.setAttribute("r",`${radiusNumberClock}`);
        circleClockNumber.setAttribute("fill","green");
        SVGElem.appendChild(circleClockNumber);
        const circleClockNumberText = document.createElementNS("http://www.w3.org/2000/svg",'text');
        circleClockNumberText.setAttribute("x",Math.round(numberCenterX));
        circleClockNumberText.setAttribute("y",Math.round(numberCenterY+(fontsizeTextClock/4)));
        circleClockNumberText.setAttribute("text-anchor","middle");
        circleClockNumberText.setAttribute("font-size",fontsizeTextClock)
        circleClockNumberText.textContent = `${i}`;
        SVGElem.appendChild(circleClockNumberText);
        i++;
    }
    const arrowG = document.createElementNS("http://www.w3.org/2000/svg",'g');
    SVGElem.appendChild(arrowG);

    const arrowHour = document.createElementNS("http://www.w3.org/2000/svg",'line');
    arrowHour.setAttribute('x1',`${centerClock}`);
    arrowHour.setAttribute('y1',`${centerClock + centerClock*0.1}`);
    arrowHour.setAttribute('x2',`${centerClock}`);
    arrowHour.setAttribute('y2',`${centerClock - (enteredText*coefficientArrowHour)}`);
    arrowHour.setAttribute('stroke','black');
    arrowHour.setAttribute('stroke-width','8');
    arrowHour.setAttribute('transform-origin',  '50% 50%')
    arrowG.appendChild(arrowHour);

    const arrowMin = document.createElementNS("http://www.w3.org/2000/svg",'line');
    arrowMin.setAttribute('x1',`${centerClock}`);
    arrowMin.setAttribute('y1',`${centerClock + centerClock*0.1}`);
    arrowMin.setAttribute('x2',`${centerClock}`);
    arrowMin.setAttribute('y2',`${centerClock - (enteredText*coefficientArrowMin)}`);
    arrowMin.setAttribute('stroke','brown');
    arrowMin.setAttribute('stroke-width','4');
    arrowMin.setAttribute('transform-origin',  '50% 50%')
    arrowG.appendChild(arrowMin);


    const arrowSec = document.createElementNS("http://www.w3.org/2000/svg",'line');
    arrowSec.setAttribute('x1',`${centerClock}`);
    arrowSec.setAttribute('y1',`${centerClock + centerClock*0.1}`);
    arrowSec.setAttribute('x2',`${centerClock}`);
    arrowSec.setAttribute('y2',`${centerClock - (enteredText*coefficientArrowSec)}`);
    arrowSec.setAttribute('stroke','red');
    arrowSec.setAttribute('transform-origin', '50% 50%')
    arrowG.appendChild(arrowSec);

    let textClock = document.createElementNS("http://www.w3.org/2000/svg",'text');
    textClock.setAttribute('x', `${centerClock}`);
    textClock.setAttribute('y',`${centerClock/coefficientHeghtTimer}`);
    textClock.setAttribute("text-anchor","middle");
    textClock.setAttribute("font-size",fontsizeTextTimer);
    SVGElem.appendChild(textClock);


    function clockDate(){
        function r(el, deg) {
            el.setAttribute('transform', `rotate(${deg})`)
        }
        function str0l(val,len) {
            let strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        } 
        let day = new Date();
        let hh = day.getHours();
        let mm = day.getMinutes();
        let ss = day.getSeconds();
        let stringTimer = `${str0l(hh,2)}:${str0l(mm,2)}:${str0l(ss,2)}`
        console.log(`${stringTimer}`)
        r(arrowSec, 6*ss)
        r(arrowMin, 6*mm)
        r(arrowHour, 30*(hh%12) + mm/2)
        textClock.textContent = stringTimer;

    }
    clockDate();
    setInterval(clockDate,1000); 
},false);
