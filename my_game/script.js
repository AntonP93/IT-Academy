const CVS = document.querySelector('.field');
const context = CVS.getContext('2d');
const healthPlayer1 = document.querySelector('.health_player1');
const healthPlayer2 = document.querySelector('.health_player2');
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;
const timerRound = 60;
console.log(healthPlayer1,healthPlayer2)
const coeffWidth = 0.8;
const coeffhight = 0.65;

const grav = 0.2;
const  hit = 10;
// canvasField.width = pageWidth * coeffWidth;   
// canvasField.height = pageHeight * coeffWidth;



CVS.width = 1024;
CVS.height = 576;

context.fillRect(0,0,CVS.width, CVS.height);
// let img_CVS = new Image


class Sprite {
    constructor({position,imgSrc,scale = 1, framesMax = 1}){
        this.image = new Image();
        this.position = position;
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurr = 0;
        this.framesElapsed=0
        this.framesHold=5
    }
    view(){
        context.drawImage(
            this.image,
            this.frameCurr * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax )* this.scale,
            this.image.height * this.scale
        )        
    }

    update(){
        this.view();
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurr < this.framesMax-1) {
                this.frameCurr++
            } else {
                this.frameCurr = 0;
            }  
        }
        
    }
}


//спрайт игрока
class Player extends Sprite{
    constructor({position,speed,color,vector,imgSrc,scale = 1, framesMax = 1}){
        super({
            position,
            imgSrc,
            scale,
            framesMax,   
        })
        this.speed = speed;
        this.height = 150;
        this.width = 50;
        this.health = 100;
        this.frameCurr = 0;
        this.framesElapsed=0;
        this.framesHold=5;
        this.attackArm = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 120,
            height: 50 
            
        };
        this.vector = vector
        this.color = color;
        this.attack = false
    }

    view(){
        context.fillStyle = this.color;
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        if(this.attack){
        context.fillStyle = 'green';
        context.fillRect(this.attackArm.position.x,this.attackArm.position.y, this.attackArm.width,this.attackArm.height)
        }
    }

    update(){
        this.view();
        this.attackArm.position.x = this.position.x - this.vector
        this.attackArm.position.y = this.position.y
        this.speed.y += grav;
        this.position.x += this.speed.x
        this.position.y +=  this.speed.y ;
        if(this.position.y + this.height > CVS.height - 50){
            this.speed.y = 0;
            this.position.y =  CVS.height - 200
        }
        if(this.position.x < 0){
            this.speed.x = 0;
            this.position.x = 0;
        }
        if(this.position.x + this.width > CVS.width){
            this.speed.x = 0;
            this.position.x = CVS.width-this.width;    
        }    
    }
    attacking(){
        this.attack = true
        setTimeout(()=>{
            this.attack = false
        },100)
    }
    hit(){
        this.health = this.health - hit;
    }
}


// характеристика игрока 1
const Player1 = new Player({
    position: {
        x:50,
        y:0
    },
    speed : {
       x:0,
       y:0
    },
    color: 'red',
    vector: 0

});
// характеристика игрока 2
const Player2 = new Player({
    position: {
        x:800,
        y:0
    },
    speed : {
       x:0,
       y:0
    },
    color: 'brown',
    vector:70

});

//бэкграунд
const backgrnd = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:'img/MK_background.jpg',
    scale: 0.86,
    framesMax: 1,
    

})

// обработчики ударов и передвижения
document.addEventListener('keydown',(EO)=>{
    EO=EO||window.event;
    switch(EO.key) {
        case 'd':
  
            Player1.speed.x = 5;
        break
        case 'a':
  
            Player1.speed.x = -5;
        break 
        case 'w':

            Player1.speed.y = -10;
        break 
        case 'ArrowRight':

            Player2.speed.x = 5;
        break
        case 'ArrowLeft':

            Player2.speed.x = -5;
        break
        case 'ArrowUp':

            Player2.speed.y = -10;
        break
        case 's':

            Player1.attacking();
        break
        case 'ArrowDown':

            Player2.attacking();
        break

    }
   
})

document.addEventListener('keyup',(EO)=>{
    EO=EO||window.event;
    switch(EO.key) {
        case 'd':

            Player1.speed.x = 0;
        break
        case 'a':

            Player1.speed.x = 0;
        break
        case 'ArrowRight':

            Player2.speed.x = 0;
        break
        case 'ArrowLeft':

            Player2.speed.x = 0;
        break
        case 's':

            Player1.attack = false;
        break
        case 'ArrowDown':
  
            Player2.attack = false;
        break     
    }    
    }
   
)

//анимация движения
function tick(){
    context.fillStyle = 'black'
    context.fillRect(0,0,CVS.width,CVS.height);

    backgrnd.update();
    
    Player1.update();
    Player2.update();

    //регистрация удара
    if(Player1.attackArm.position.x + Player1.attackArm.width>= Player2.position.x && Player1.attackArm.position.x <= Player2.position.x + Player2.width && Player1.attackArm.position.y + Player1.attackArm.height >= Player2.position.y && Player1.attackArm.position.y <= Player2.position.y + Player2.height && Player1.attack ){
        console.log('hitPlayer1')
        Player2.hit()
        healthPlayer2.style.width = Player2.health+'%';
        Player1.attack = false;
    }
    if(Player2.attackArm.position.x + Player2.attackArm.width>= Player1.position.x && Player2.attackArm.position.x <= Player1.position.x + Player1.width && Player2.attackArm.position.y + Player2.attackArm.height >= Player1.position.y && Player2.attackArm.position.y <= Player1.position.y + Player1.height && Player2.attack ){
        console.log('hitPlayer2')
        Player1.hit()
        healthPlayer1.style.width = Player1.health+'%';
        Player2.attack = false;
    }
    requestAnimationFrame(tick);
}
requestAnimationFrame(tick);


// function start(){
//     requestAnimationFrame(tick);
// };



