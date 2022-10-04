'use strict'
let elements = document.getElementsByTagName('img');
let body = document.getElementsByTagName('body');
let zIndexValue = 1;
console.log(body)
window.addEventListener('load',function(EO){
    EO = EO||window.Event;
    for(let i = 0; i < elements.length;i++){
        let element = elements[i];
        element.style.left = element.offsetLeft+'px';
        element.style.top = element.offsetTop+'px';
        element.style.padding = '0px' 
    }
    for(let i= 0; i <elements.length;i++){
        let element = elements[i];
        element.style.position = 'absolute';
        element.onmousedown = elemMousedown;
        element.onmouseup = elemMouseup;
        function elemMousedown(EO){
            EO = EO||window.Event;
            EO.preventDefault();
            console.log('нажал');
            let downX = EO.pageX - EO.target.offsetLeft;
            let downY = EO.pageY - EO.target.offsetTop;
            let elemTarg = EO.target; 
            elemTarg.style.zIndex = zIndexValue++;
            window.onmousemove = elemMMove;
            
            function elemMMove(EO){
                EO = EO||window.Event;
                EO.preventDefault();
                console.log('движение');
                elemTarg.style.top = (EO.pageY-downY) +'px';
                elemTarg.style.left = (EO.pageX-downX) +'px';
                elemTarg.style.cursor = 'move';    
            }   
        }

        function elemMouseup(EO){
            EO = EO||window.Event;
            EO.preventDefault(); 
            window.onmousemove = null;
            EO.target.style.cursor ='default';
            console.log('отпустил')    
        }  


    }

},false);




