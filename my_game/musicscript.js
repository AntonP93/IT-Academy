const clickAudio=new Audio();
clickAudio.src = './music/Music.ogg'
const clickAudioHit=new Audio();
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