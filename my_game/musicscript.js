const clickAudio=new Audio(); // музыка
clickAudio.src = './music/Music.ogg'
const clickAudioHit=new Audio(); //удар
clickAudioHit.src = './music/Hit.ogg'
function clickSound() {
    clickAudio.play();
    clickAudioHit.play();
    clickAudioHit.pause();
}
function soundHit(){
    clickAudioHit.currentTime=0; // в секундах
    clickAudioHit.play(); 
    console.log('sound')  
}