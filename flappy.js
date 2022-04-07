
const player = document.querySelector('#player');
const hole = document.querySelector('#hole');
const scorekeeper = document.querySelector('#scorekeeper');
const highscore = document.querySelector('#highscore');
 



let highScore = localStorage.getItem('highScore');
console.log('highScore', highScore);


highscore.innerHTML = highScore;
let flapping = false;
let flapCount = 0;
let score = 0;
let hit = false;


document.addEventListener('keyup', function(){
    flapping = true;
})


setInterval(function(){
    if(flapping)
    {
        if(flapCount < 4){
            move(-6);
        }
        if(flapCount < 10){
            move(-4);
        }
        if(flapCount < 15){
            move(-2);
        }

        flapCount++;
        if(flapCount > 20){
            flapCount = 0;
            flapping = false;
        }
    }
    else
    {
        move(3);
    }

    hitDetection();

}, 10);


hole.addEventListener('animationiteration', function(){

    const random = Math.random()*300;
    hole.style.top = random + 'px';


    if(hit){
        if(score > highScore){
            localStorage.setItem('highScore', score);
        }
        score =0;
    }else{
        score++;
        scorekeeper.innerHTML = score;
    }

    hit = false;

})



function getStyle(element, prop){
    return parseInt(window.getComputedStyle(element)
    .getPropertyValue(prop));

}

function move(number){
    const computed = getStyle(player, 'top');
    if(computed + number < 460 && computed + number > 0)
    {
     player.style.top = (computed + number) + 'px';
    } 

   
}

function getObjectStyles(element){
    return{
        left: getStyle(element, 'left'),
        top: getStyle(element, 'top'),
        right: getStyle(element,'left')+ getStyle(element, 'width'),
        bottom: getStyle(element, 'top')+ getStyle(element, 'height'),
    }
}
function hitDetection(){
    const holeData = getObjectStyles(hole);
    if(holeData.left < 40){
        const playerData =getObjectStyles(player);
       if(
           playerData.top < holeData.top || playerData.bottom > holeData.bottom){
           console.log('got hit');
           hit = true;
       }
    }
}