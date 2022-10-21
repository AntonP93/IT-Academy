const field_CVS = document.getElementById('field_CVS');
const scoreText = document.getElementById('score');
const btn_start = document.getElementById('start_game')
const heighRacket = 100;
let countLeftplayer = 0;
let countRightplayer = 0;
let randomArr = [2,-2,3,-3,4,-4];

const areaField = {
    width:600,
    height:400

}

const racket_left = {
    width : 20,
    height : heighRacket,
    speedY : 0,
    posX : 0,
    posY : 200 -(heighRacket/2) ,
    moveDown : function(){
        this.speedY = 5;
    },
    moveUP : function(){
        this.speedY = -5;
    },
    noMove : function(){
        this.speedY = 0;
    },   
}
const racket_right = {
    width : 20,
    height : heighRacket,
    speedY : 0,
    posX : areaField.width - 20,// 10(ширина ракетки)
    posY : 200 -(heighRacket/2) ,
    moveDown : function(){

        this.speedY = 5;
    },
    moveUP : function(){
        this.speedY = -5;
    },
    noMove : function(){
        this.speedY = 0;
    },
}
const ball={
    posX : 300,// центр
    posY : 200,// центр
    speedX : 0,
    speedY : 0,
    width : 20,
    height: 20,
    radius: 10,
}



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//



document.addEventListener('keydown',function(event){
    if(event.code == 'ShiftLeft'){
        racket_left.moveUP();
    }
    if(event.code == 'ControlLeft'){
        racket_left.moveDown();
    }   
},true)

document.addEventListener('keyup',function(event){
    if(event.code == 'ShiftLeft'){
        racket_left.noMove();        
    }
    if(event.code == 'ControlLeft'){
        racket_left.noMove();
    }
},true)

document.addEventListener('keydown',function(event){
    if(event.code == 'ArrowUp'){
        racket_right.moveUP();
    }
    if(event.code == 'ArrowDown'){
        racket_right.moveDown();
    }
},true)
document.addEventListener('keyup',function(event){
    if(event.code == 'ArrowUp'){
        racket_right.noMove();    
    }
    if(event.code == 'ArrowDown'){
        racket_right.noMove();
    }
},true)

let context = field_CVS.getContext('2d');
field_CVS.width = areaField.width;
field_CVS.height = areaField.height;





function tick(){

    ball.posY+=ball.speedY;
    ball.posX+=ball.speedX;

    context.fillStyle = "green";
    context.fillRect(0,0,field_CVS.width,field_CVS.height);

    context.fillStyle = "black";
    context.fillRect(racket_left.posX,racket_left.posY,racket_left.width,racket_left.height);
    context.fillRect(racket_right.posX,racket_right.posY,racket_right.width,racket_right.height);


    context.beginPath();
    context.arc(ball.posX,ball.posY,ball.radius,2 * Math.PI,false)
    context.fillStyle = "red";
    context.fill();
    context.closePath();


    

    racket_left.posY += racket_left.speedY; 
    if(racket_left.posY > 300){
        racket_left.posY = 300;
        racket_left.speedY = 0;
    } else if(racket_left.posY < 0){
        racket_left.posY = 0;
        racket_left.speedY = 0;
    }
    racket_right.posY += racket_right.speedY;
    if(racket_right.posY > 300){
        racket_right.posY = 300;
        racket_right.speedY = 0;
    } else if(racket_right.posY < 0){
        racket_right.posY = 0;
        racket_right.speedY = 0;
    }



    if ( ball.posY+ball.radius>areaField.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=areaField.height-ball.radius;
    }
 
    if ( ball.posY- ball.radius<0 ) {
        ball.speedY=-ball.speedY;
        ball.posY= ball.radius;
    }
    if ( ball.posX - ball.radius<0 ) {
        ball.speedX=0;
        ball.speedY = 0
        ball.posX=ball.radius;
        countRightplayer++;
        scoreText.innerHTML = `${countLeftplayer}:${countRightplayer}`
        
    }
    if ( ball.posX + ball.radius>areaField.width ) {
        ball.speedX=0;
        ball.speedY = 0;
        ball.posX=areaField.width-ball.radius;
        countLeftplayer++;
        scoreText.innerHTML = `${countLeftplayer}:${countRightplayer}`
    }



    if (ball.posX - ball.radius < racket_left.posX + racket_left.width &&   ball.posY - ball.radius < racket_left.posY + heighRacket &&  ball.posY + ball.radius > racket_left.posY) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_left.width+ball.radius;
    }
    
    if ( ball.posX + ball.radius >racket_right.posX && ball.posY - ball.radius < racket_right.posY + heighRacket  &&  ball.posY + ball.radius > racket_right.posY ) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_right.posX - ball.radius ;


    }    

}

tick();
start();
function start(){
    setInterval(tick,25);
};

btn_start.addEventListener('click',function(EO){
    EO.preventDefault();
    ball.posX = 300,
    ball.posY = 200,
    ball.speedX = randomArr[randomNum(0,5)],
    ball.speedY = randomArr[randomNum(0,5)]
})
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}  
