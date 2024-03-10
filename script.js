//Game Board
let gameBoard;
let gameBoardWidth = 360;
let gameBoardHeight = 640;
let context;

//character we playing
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

let obstacle= [];
let obstacleWidth = 64;
let obstacleHeight = 512;
let obstacleX = gameBoardWidth;
let obstacleY = 0;


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

    requestAnimationFrame(update);
}

//Game loop
function update(){
    requestAnimationFrame(update);
    context.clearRect(0,0,gameBoard.width,gameBoard.height);

    //char
    context.drawImage(charCanvas,char.x,char.y,char.width,char.height);

}