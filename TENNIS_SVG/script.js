const btn_start = document.getElementById('btn_svg');
const gameField = document.getElementById('game_field');
const racket_left_field = document.createElementNS("http://www.w3.org/2000/svg",'rect');
const racket_right_field = document.createElementNS("http://www.w3.org/2000/svg",'rect');
const ball_field = document.createElementNS("http://www.w3.org/2000/svg",'circle');
const scoreText = document.querySelector('.score')
const heighRacket = 100;
let countLeftplayer = 0;
let countRightplayer = 0;
let randomArr = [2,-2,3,-3,4,-4];


const areaField = {
    width:600,
    height:400

}

btn_start.setAttribute('width','50');
btn_start.setAttribute('height','25');

const btn_content = document.createElementNS("http://www.w3.org/2000/svg",'rect');
btn_content.setAttribute('x','0');
btn_content.setAttribute('y','0');
btn_content.setAttribute('width','50');
btn_content.setAttribute('height','25');
btn_content.setAttribute('fill','grey');
btn_content.setAttribute("cursor","pointer");
btn_start.appendChild(btn_content);
const btn_text = document.createElementNS("http://www.w3.org/2000/svg",'text');
btn_text.setAttribute('x','25');
btn_text.setAttribute('y','15');
btn_text.setAttribute("text-anchor","middle");
btn_text.setAttribute("cursor","pointer");
btn_text.setAttribute("font-size",'12.5')
btn_text.textContent = 'Start!';
btn_start.appendChild(btn_text);

gameField.setAttribute('width',`${areaField.width}`);
gameField.setAttribute('height',`${areaField.height}`);

const field = document.createElementNS("http://www.w3.org/2000/svg",'rect');
field.setAttribute('x','0');
field.setAttribute('y','0');
field.setAttribute('width',`${areaField.width}`);
field.setAttribute('height',`${areaField.height}`);
field.setAttribute('fill','green');
field.setAttribute('stroke','black');
gameField.appendChild(field);

const racket_left = {
    width : 10,
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
    positionRacket_left : function(){
        racket_left_field.setAttribute('x',`${racket_left.posX}`);
        racket_left_field.setAttribute('y',`${racket_left.posY}`);     
    }
    
}
const racket_right = {
    width : 10,
    height : heighRacket,
    speedY : 0,
    posX : areaField.width - 10,// 10(ширина ракетки)
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
    positionRacket_right : function(){
        racket_right_field.setAttribute('x',`${racket_right.posX}`);
        racket_right_field.setAttribute('y',`${racket_right.posY}`);     
    }


   

}
const ball={
    posX : 300,// центр
    posY : 200,// центр
    speedX : 0,
    speedY : 0,
    width : 20,
    height: 20,
    radius: 10,

    positin_ball : function(){
        ball_field.setAttribute("cx",`${ball.posX}`);
        ball_field.setAttribute("cy",`${ball.posY}`);    
    }
}


racket_left_field.setAttribute('width',`${racket_left.width}`);
racket_left_field.setAttribute('height',`${racket_left.height}`);
racket_left_field.setAttribute('fill','black');
gameField.appendChild(racket_left_field);



racket_right_field.setAttribute('width',`${racket_right.width}`);
racket_right_field.setAttribute('height',`${racket_right.height}`);
racket_right_field.setAttribute('fill','black');
gameField.appendChild(racket_right_field);


ball_field.setAttribute("r",`${ball.radius}`);
ball_field.setAttribute("fill","red");
gameField.appendChild(ball_field);

document.addEventListener('keydown',function(event){
    if(event.code == 'ShiftLeft'){
        racket_left.moveUP();
        console.log(racket_left.posY, racket_left.posY + heighRacket, ball.posY);
    }
    if(event.code == 'ControlLeft'){
        racket_left.moveDown();
        console.log(racket_left.posY, racket_left.posY + heighRacket, ball.posY);
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


function tick(){
    ball.posY+=ball.speedY;
    ball.posX+=ball.speedX;

    ball.positin_ball();
    racket_left.positionRacket_left();
    racket_right.positionRacket_right();

    

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



    if (ball.posX - ball.radius < racket_left.posX + racket_left.width &&   ball.posY - ball.radius < racket_left.posY + heighRacket &&  ball.posY + ball.radius > racket_left.posY - ball.radius  ) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_left.width+ball.radius;
        console.log('отбил левый')
    }
    
    if ( ball.posX + ball.radius >racket_right.posX && ball.posY + ball.radius < racket_right.posY + heighRacket  &&  ball.posY + ball.radius > racket_right.posY - ball.radius) {
        ball.speedX=-ball.speedX;
        ball.posX= racket_right.posX - ball.radius ;
        console.log('отбил прав')

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