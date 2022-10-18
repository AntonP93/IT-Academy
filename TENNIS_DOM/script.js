let btn_start = document.querySelector('.start_game');
let gameField = document.querySelector('.game_field');
let game_ball = document.createElement('div');
let racket_left_field = document.createElement('div');

let racket_right_field = document.createElement('div');


const areaField = {
    width:600,
    height:400

}
const racket_left = {
    width : 10,
    height : 100,
    speedY : 0,
    posX : 0,
    posY : 200,
    moveDown : function(){
        this.speedY = 5;
    },
    moveUP : function(){
        this.speedY = -5;
    },
    noMove : function(){
        this.speedY = 0;
    },
    update : function() {
        
        racket_left_field.style.top= this.posY+"px",
        racket_left_field.style.left = this.posX +'px'
        // ballElem.style.top=this.posY+"px";
    }
}
const racket_right = {
    width : 10,
    height : 100,
    speedY : 0,
    posX : areaField.width - 10,// 10(ширина ракетки)
    posY : 200,
    moveDown : function(){

        this.speedY = 5;
    },
    moveUP : function(){
        this.speedY = -5;
    },
    noMove : function(){
        this.speedY = 0;
    },
    update : function() {
        
        racket_right_field.style.top= this.posY+"px",
        racket_right_field.style.left = this.posX +'px'
        // ballElem.style.top=this.posY+"px";
    }

}
const ball={
    posX : 30,
    posY : 30,
    speedX : 5,
    speedY : 5,
    width : 25,
    height: 25,

    update : function() {
        game_ball.style.left=this.posX+"px";
        game_ball.style.top=this.posY+"px";
    }
}


racket_right_field.style.cssText = `position : absolute; background-color: black; width: ${racket_right.width}px; height: ${racket_right.height}px;`
gameField.appendChild(racket_right_field);

racket_left_field.style.cssText = `position : absolute; background-color: black; width: ${racket_left.width}px; height: ${racket_left.height}px;`
gameField.appendChild(racket_left_field);

racket_right.update();
racket_left.update();


gameField.style.cssText = `position: relative; width: ${areaField.width}px; height: ${areaField.height}px; margin-top: 10px;
border: solid black 1px;  background-color: green`;
game_ball.style.cssText = `position : absolute; background-color: red; width: ${ball.width}px; height: ${ball.height}px; border-radius: 50%;`;
gameField.appendChild(game_ball);

document.addEventListener('keydown',function(event){
    if(event.code == 'ShiftLeft'){
        racket_left.moveUP();
        console.log('нажал shift')
    }
    if(event.code == 'ControlLeft'){
        racket_left.moveDown();
        console.log('нажал ctrl')
    }
    
},true)

document.addEventListener('keyup',function(event){
    if(event.code == 'ShiftLeft'){
        racket_left.noMove();
        console.log('del shift')
        
    }
    if(event.code == 'ControlLeft'){
        racket_left.noMove();
        console.log('del ctrl') 
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


function start(){
    setInterval(tick,30);
};

function tick(){
    
    
    if(racket_left.posY > 0 && racket_left.posY < 300  ){
        racket_left.posY += racket_left.speedY;  
    }
    racket_right.posY += racket_right.speedY;
    racket_left.update(); 
    racket_right.update();


    ball.posX+=ball.speedX;
    if ( ball.posX+ball.width>areaField.width ) {
        ball.speedX=-ball.speedX;
        ball.posX=areaField.width-ball.width;
    }
    
    if ( ball.posX<0 ) {
        ball.speedX=-ball.speedX;
        ball.posX=0;
    }

    ball.posY+=ball.speedY;

    if ( ball.posY+ball.height>areaField.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=areaField.height-ball.height;
    }
 
    if ( ball.posY<0 ) {
        ball.speedY=-ball.speedY;
        ball.posY=0;
    }
    ball.update();
}

ball.update();

start()


