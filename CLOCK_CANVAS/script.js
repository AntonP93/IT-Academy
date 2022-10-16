let form = document.forms.diameter;
let valueDiameter = form.elements.diameter_value;
let btn = form.elements.button;
let angleStart = 0; // начальные координаты кружка
const coefficientNumberClock = 0.1;
const coefficientArrowHour = 0.5;
const coefficientArrowMin = 0.7;
const coefficientArrowSec = 0.90;
const coefficientFontSizeTimer = 0.1;
const coefficientFontSizeClock = 0.08;
const coefficientHeghtTimer = 0.4;
const deg = 6;


btn.addEventListener('click',function(EO){
    EO=EO||window.event;
    let enteredText = valueDiameter.value;
    let radius = enteredText/2;
    if(!enteredText || enteredText < 200 || enteredText > 800){
       return alert("Введите корректные данные!")
    }
    form.remove();
    let cvs = document.getElementById('clockCVS');
    let context = cvs.getContext('2d');
    cvs.width = enteredText;
    cvs.height = enteredText;
    context.translate(radius,radius);

    
    function createClock(){
        context.arc(0,0,radius,2 * Math.PI,false);
        context.fillStyle = "goldenrod";
        context.fill();


        let fontsizeTextTimer = (enteredText * coefficientFontSizeTimer)+'px';
        let fontsizeTextClock = (enteredText * coefficientFontSizeClock)+'px';

        i = 1;
        while(i < 13){
            angleStart = angleStart - 30;
            let radiusNumberClock = radius*coefficientNumberClock; 
            let angle = angleStart/180*Math.PI;
            let numberCenterX = -((radius-radiusNumberClock) - (radiusNumberClock))*Math.sin(angle); //центр крухжков
            let numberCenterY =-((radius-radiusNumberClock) - (radiusNumberClock))*Math.cos(angle); //центр крухжков
            context.beginPath();
            context.arc(numberCenterX,numberCenterY,radiusNumberClock,2 * Math.PI,false)
            context.fillStyle = 'green';
            context.fill()
            
            context.font = `${fontsizeTextClock} Arial`;
            context.fillStyle = 'black';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillText(`${i}`,numberCenterX,numberCenterY); 
            
            i++;
        }
        
        
        let day = new Date();
        let hh = day.getHours();
        let mm = day.getMinutes();
        let ss = day.getSeconds();
        
        let lengthHour = -(coefficientArrowHour * radius);
        let lenghtMin = -(coefficientArrowMin * radius);
        let lenghtSec = -(coefficientArrowSec * radius);

        let angle_hh =  30*(hh%12) + mm/2;
        let angle_min = deg*mm;
        let angle_sec = deg*ss;

        //минутная стрелка 
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'orange';
        context.lineWidth = 3;
        context.moveTo(0,0);
        context.lineTo( lenghtMin*Math.cos(Math.PI/2 + angle_min*(Math.PI/180)),lenghtMin*Math.sin(Math.PI/2 + angle_min*(Math.PI/180)));
        context.closePath();
        context.stroke();
        

        //часовая стрелка 
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'black';
        context.lineWidth = 6;
        context.moveTo(0,0);
        context.lineTo( lengthHour*Math.cos(Math.PI/2 + angle_hh*(Math.PI/180)),lengthHour*Math.sin(Math.PI/2 + angle_hh*(Math.PI/180)));
        context.closePath();
        context.stroke();
        

        //секундная стрелка
        context.lineCap = 'round';
        context.beginPath();
        context.strokeStyle = 'red';
        context.lineWidth = 1;
        context.moveTo(0,0);
        context.lineTo( lenghtSec*Math.cos(Math.PI/2 + angle_sec*(Math.PI/180)),lenghtSec*Math.sin(Math.PI/2 + angle_sec*(Math.PI/180)));
        context.closePath();
        context.stroke();

        function str0l(val,len) {
            let strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }  
        
        let stringTimer = `${str0l(hh,2)}:${str0l(mm,2)}:${str0l(ss,2)}`;

        //таймер на часах
        context.font = `${fontsizeTextTimer} Arial`;
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`${stringTimer}`, 0, -radius*coefficientHeghtTimer); 

        
        console.log(`${stringTimer}`)
    
    }
    createClock();

    setInterval(createClock,1000);

},false);
