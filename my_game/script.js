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

const grav = 0.3;
const  hit = 10;
// canvasField.width = pageWidth * coeffWidth;   
// canvasField.height = pageHeight * coeffWidth;


CVS.width = 1024;
CVS.height = 576;

context.fillRect(0,0,CVS.width, CVS.height);


// спрайт анимации
class Sprite {
    constructor({position,imgSrc,scale = 1, framesMax = 1,offset = {x:0,y:0}}){
        this.position = position;
        this.width = 50
        this.height = 150
        this.image = new Image();
        this.image.src = imgSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.frameCurr = 0;
        this.framesElapsed=0
        this.framesHold=5
        this.offset = offset
    }
    view(){
        context.drawImage(
            this.image,
            this.frameCurr * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax )* this.scale,
            this.image.height * this.scale
        )        
    }
    animateFrm(){
        this.framesElapsed++;
        if(this.framesElapsed % this.framesHold === 0){
            if(this.frameCurr < this.framesMax-1) {
                this.frameCurr++
            } else {
                this.frameCurr = 0;
            }  
        }
    }
    update(){
        this.view()
        this.animateFrm()
    }
}


//спрайт игрока
class Player extends Sprite{
    constructor({
        position,
        speed,
        color,
        vector,
        imgSrc,
        scale = 1,
        framesMax = 1,
        offset = {x:0,y:0},
        sprites,
        attackArm ={offset:{}, width: undefined, height: undefined} 
    }){
        super({
            position,
            imgSrc,
            scale,
            framesMax,
            offset   
        })
        this.speed = speed;
        this.height = 150;
        this.width = 50;
        this.health = 100;
        this.frameCurr = 0;
        this.framesElapsed=0;
        this.framesHold=5;
        this.vector = vector
        this.attackArm = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackArm.offset, 
            width: attackArm.width,
            height: attackArm.height     
        };
        this.vector = vector
        this.color = color;
        this.attack = false
        this.sprites = sprites

        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imgSrc    
        }
        console.log(this.sprites)

    }

    update(){
        this.view();
        this.animateFrm();
        this.attackArm.position.x = this.position.x + this.attackArm.offset.x
        this.attackArm.position.y = this.position.y + this.attackArm.offset.y

        // context.fillRect(this.attackArm.position.x, this.attackArm.position.y, this.attackArm.width, this.attackArm.height)
        
        this.position.x += this.speed.x
        this.position.y +=  this.speed.y ;
        if(this.position.y + this.height +this.speed.y >= CVS.height - 96){
            this.speed.y = 0;
            this.position.y =  330;
        } else {
            this.speed.y += grav;
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
        x:0,
        y:0
    },
    speed : {
       x:0,
       y:0
    },
    offset: {
        x: 0,
        y: 0
      },
    
    color: 'red',
    vector: 0,

    scale:2.5,
    offset:{
        x: 165,
        y: 110
    },
    imgSrc: 'img/king/idle1.png',
    framesMax:8,
    sprites:{
        idle:{
            imgSrc: 'img/king/idle1.png',
            framesMax:8   
        },
        run:{
            imgSrc: 'img/king/Run.png',
            framesMax:8       
        },
        jump:{
            imgSrc: 'img/king/Jump.png',
            framesMax:3      
        },
        fall:{
            imgSrc: 'img/king/Fall.png',
            framesMax:2  
        },
        attack:{
            imgSrc: 'img/king/Attack1.png',
            framesMax:4 
        }
    },
    attackArm:{
        offset:{
            x:60,
            y:60    
        },
        width:160,
        height:60
    }
        

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
    vector:70,
    scale:2.5,
    offset:{
        x: 250,
        y: 165
    },
    imgSrc: 'img/assasin/idle2.png',
    sprites:{
        idle:{
            imgSrc: 'img/assasin/idle2.png',
            framesMax:4   
        },
        run:{
            imgSrc: 'img/assasin/Run.png',
            framesMax:8       
        },
        jump:{
            imgSrc: 'img/assasin/Jump.png',
            framesMax:2      
        },
        fall:{
            imgSrc: 'img/assasin/Fall.png',
            framesMax:2  
        },
        attack:{
            imgSrc: 'img/assasin/Attack1.png',
            framesMax:4 
        }
    },
    attackArm:{
        offset:{
            x:-220,
            y:40 
        },
        width:190,
        height:80
    }
    


});

//бэкграунд
const backgrnd = new Sprite({
    position:{
        x:0,
        y:0
    },
    imgSrc:'img/background.png',
    scale: 1.28,
    framesMax: 1,
    

})

// выбор анимации в зависимости от действия

function  choiceSprite(sprite,player){
    if(player.image ===  player.sprites.attack.image && player.frameCurr < player.sprites.attack.framesMax-1) return
    switch(sprite){
        case 'run':
            if( player.image !== player.sprites.run.image ){
                player.image = player.sprites.run.image
                player.framesMax = player.sprites.run.framesMax
                player.frameCurr = 0      
            }
        break
        case 'idle':
            if( player.image !== player.sprites.idle.image ){
                player.image = player.sprites.idle.image
                player.framesMax = player.sprites.idle.framesMax
                player.frameCurr = 0    
            }    
        break
        case 'jump':
            if( player.image !== player.sprites.jump.image ){
                player.image = player.sprites.jump.image
                player.framesMax = player.sprites.jump.framesMax
                player.frameCurr = 0      
            } 
        break
        case 'fall':
            if( player.image !== player.sprites.fall.image ){
                player.image = player.sprites.fall.image
                player.framesMax = player.sprites.fall.framesMax
                player.frameCurr = 0      
            } 
        break
        case 'attack':
            if( player.image !== player.sprites.attack.image ){
                player.image = player.sprites.attack.image
                player.framesMax = player.sprites.attack.framesMax
                player.frameCurr = 0      
            } 
        break
    }
}

// обработчики ударов и передвижения
document.addEventListener('keydown',(EO)=>{
    EO=EO||window.event;
    console.log(EO.key)
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
    context.fillRect(0,0,CVS.width,CVS.height);
    
    // Игрок1
    // атакует
    if(Player1.attack == true){
        choiceSprite('attack',Player1)
    }  
    //стоит
    if(Player1.speed.x == 0){
        choiceSprite('idle',Player1)
    }
    //бежит
    if(Player1.speed.x !== 0){
        choiceSprite('run',Player1)
    }
    //прыжок
    if(Player1.speed.y < 0){
        choiceSprite('jump',Player1)
    }
    //падение
    if(Player1.speed.y > 0){
        choiceSprite('fall',Player1)
    }

    

    //Игрок 2
    //бежит
    if(Player2.speed.x !== 0){
        choiceSprite('run',Player2)
    }
    // атакует
    if(Player2.attack == true){
        choiceSprite('attack',Player2)
    }  
    //стоит
    if(Player2.speed.x == 0){
        choiceSprite('idle',Player2)
    }
     //прыжок
     if(Player2.speed.y < 0){
        choiceSprite('jump',Player2)
    }
    //падение
    if(Player2.speed.y > 0){
        choiceSprite('fall',Player2)
    }

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



