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
    posY : 200 ,
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
    posY : 200 ,
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
    posX : 300 - (20/2),
    posY : 200 - (20/2),
    speedX : 2,
    speedY : 2,
    width : 20,
    height: 20,

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
        console.log(racket_left.posY, racket_left.posY + 100, ball.posY);
        console.log(ball.posX, racket_left.posX+racket_left.width)
    }
    if(event.code == 'ControlLeft'){
        racket_left.moveDown();
        console.log(racket_left.posY, racket_left.posY + 100, ball.posY);
        console.log(ball.posX, racket_left.posX+racket_left.width)
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
        console.log(racket_right.posY)
    }
    if(event.code == 'ArrowDown'){
        racket_right.moveDown();
        console.log(racket_right.posY)
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
    racket_left.update(); 
    racket_right.update();

    ball.posY+=ball.speedY;
    ball.posX+=ball.speedX;
    if ( ball.posX< racket_left.posX+racket_left.width &&  ball.posY <= racket_left.posY && ball.posY <= racket_left.posY + 100 ) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_left.width;
        console.log('отбил левый')
    }
    
    if ( ball.posX>racket_right.posX &&  ball.posY < racket_right.posY + 50 && ball.posY > racket_right.posY - 50) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_right.posX -ball.width;
        console.log('отбил прав')

    }
    
    

    if ( ball.posY+ball.height>areaField.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=areaField.height-ball.height;
    }
 
    if ( ball.posY<0 ) {
        ball.speedY=-ball.speedY;
        ball.posY=0;
    }
    if ( ball.posX<0 ) {
        ball.speedX=0;
        ball.speedY = 0
        ball.posX=0;
        
    }
    if ( ball.posX>areaField.width ) {
        ball.speedX=0;
        ball.speedY = 0;
        ball.posX=areaField.width-ball.width;
        
    }
    ball.update();
}

ball.update();
start()
btn_start.addEventListener('click',function(){
    ball.update();
    ball.posX = 300 - 10,
    ball.posY = 200 - 10,
    ball.speedX = 2,
    ball.speedY = 2,
    console.log('rclick')
})
