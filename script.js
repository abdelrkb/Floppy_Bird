//----------------
//Game Board
//----------------
let gameBoard;
let gameBoardWidth = 360;
let gameBoardHeight = 640;
let context;

//----------------
//Character
//----------------
let charWidth = 34;
let charHeight = 24;
let charX = gameBoardWidth/8;
let charY = gameBoardHeight/2;
let charCanvas;

let char = {
    x : charX,
    y : charY,
    width : charWidth,
    height : charHeight,
}

//----------------
//Obstacles
//----------------
let obstacle= [];
let obstacleWidth = 64;
let obstacleHeight = 512;
let obstacleX = gameBoardWidth;
let obstacleY = 0;
let topObstacleImg;
let bottomObstacleImg;

//----------------
//Physics
//----------------
let movementGravity = 0.4; 
let movementX = -2; //Obstacle speed movement
let movementY = 0; 

//----------------
//Game Parameters
//----------------
let gameOver = false;
let score = 0;

//----------------
//Chargement du jeu
//----------------
window.onload = function() {
    //Game Board
    gameBoard = document.getElementById("gameBoard");
    gameBoard.width = gameBoardWidth;
    gameBoard.height = gameBoardHeight;
    context = gameBoard.getContext("2d");

    //Character
    charCanvas = new Image();
    charCanvas.src = "assets/flappybird.png"
    charCanvas.onload = function(){
        context.drawImage(charCanvas,char.x,char.y,char.width,char.height);
    }

    topObstacleImg = new Image();
    topObstacleImg.src = "assets/toppipe.png";
    bottomObstacleImg = new Image();
    bottomObstacleImg.src = "assets/bottompipe.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1500);
    document.addEventListener("keydown", moveChar)
}

//Game loop
function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0,0,gameBoard.width,gameBoard.height);

    //char
    movementY += movementGravity;
    char.y = Math.max(char.y + movementY, 0);
    context.drawImage(charCanvas,char.x,char.y,char.width,char.height);

    if (char.y > gameBoard.height){
        gameOver = true;
    }

    //Obstacle
    for (let i = 0; i< obstacle.length; i++){
        let obs = obstacle[i];
        obs.x += movementX;
        context.drawImage(obs.img,obs.x,obs.y,obs.width,obs.height);

        if (Collision(char, obs)){
            gameOver = true;
        }

        if (!obs.checked && char.x > obs.x + obs.width ){
            score += 0.5;
            obs.checked = true;
        }
    }

    while (obstacle.length > 0 && obstacle[0].x < 0 - obstacleWidth){
        obstacle.shift();
    }

    context.fillStyle = "white"
    context.font = "45px sans-serif"
    context.fillText(score, 5, 45)


    if (gameOver){
        context.fillText("GAME OVER", 45, 360)
    }

}

function placeObstacle(){
    if (gameOver){
        return;
    }
    console.log("placeObstacle")
    passThrough = gameBoard.height/4;
    let randomObsY = obstacleY - obstacleHeight/4 - Math.random()*(obstacleHeight/2);
    let topObstacle ={
        img : topObstacleImg,
        x : obstacleX,
        y : randomObsY,
        width : obstacleWidth,
        height : obstacleHeight,
        checked : false
    }
    
    obstacle.push(topObstacle);
    let bottomObstacle={
        img : bottomObstacleImg,
        x : obstacleX,
        y : randomObsY + obstacleHeight + passThrough,
        width : obstacleWidth,
        height : obstacleHeight,
        checked : false

    }
    obstacle.push(bottomObstacle);

}

function Collision(cPos, oPos){
    return cPos.x < oPos.x + oPos.width &&
        cPos.x + cPos.width > oPos.x && 
        cPos.y < oPos.y + oPos.height &&
        cPos.y + cPos.height > oPos.y;
}

function moveChar(e) {
    if (e.code == "Space" || e.code == "ArrowUp") {
        //jump
        movementY = -6;

        //reset game
        if (gameOver) {
            char.y = charY;
            obstacle = [];
            score = 0;
            gameOver = false;
        }
    }
}
