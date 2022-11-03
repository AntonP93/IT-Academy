const CVS = document.querySelector('.field');
const context = CVS.getContext('2d');

const pageWidth = document.documentElement.scrollWidth
const pageHeight = document.documentElement.scrollHeight

const coeffWidth = 0.8;
const coeffhight = 0.65;

const grav = 0.2;

// canvasField.width = pageWidth * coeffWidth;   
// canvasField.height = pageHeight * coeffWidth;



CVS.width = 1024;
CVS.height = 576;

context.fillRect(0,0,CVS.width, CVS.height);


class Sprite{
    constructor({position,speed}){
        this.position = position;
        this.speed = speed ;
        this.height = 150;
        this.width = 50;
    }

    view(){
        context.fillStyle = 'green';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update(){
        this.view();
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
}

const Player1 = new Sprite({
    position: {
        x:50,
        y:0
    },
    speed : {
       x:0,
       y:0
    },
});

const Player2 = new Sprite({
    position: {
        x:800,
        y:0
    },
    speed : {
       x:0,
       y:0
    },
});


document.addEventListener('keydown',(EO)=>{
    EO=EO||window.event;
    switch(EO.key) {
        case 'd':
            console.log(EO.key)
            Player1.speed.x = 2;
        break
        case 'a':
            console.log(EO.key)
            Player1.speed.x = -2;
        break 
        case 'ArrowRight':
            console.log(EO.key)
            Player2.speed.x = 2;
        break
        case 'ArrowLeft':
            console.log(EO.key)
            Player2.speed.x = -2;
        break      
    }
   
})

document.addEventListener('keyup',(EO)=>{
    EO=EO||window.event;
    switch(EO.key) {
        case 'd':
            console.log(EO.key)
            Player1.speed.x = 0;
        break
        case 'a':
            console.log(EO.key)
            Player1.speed.x = 0;
        break
        case 'ArrowRight':
            console.log(EO.key)
            Player2.speed.x = 0;
        break
        case 'ArrowLeft':
            console.log(EO.key)
            Player2.speed.x = 0;
        break     
    }    
    }
   
)

function tick(){
    console.log('go')
    context.fillStyle = 'black'
    context.fillRect(0,0,CVS.width,CVS.height);
    Player1.update();
    Player2.update();
    requestAnimationFrame(tick);
}

requestAnimationFrame(tick);


// function start(){
//     requestAnimationFrame(tick);
// };



