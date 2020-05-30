var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//vars for moving virus
var x = canvas.width;
var y = canvas.height - 30;
var dx = 1;

//vars for jump human
var xHum = canvas.height -20;
var yHum = canvas.width/2;
var dxHum = 1;

//Score
var score=0;

//event Handler
var spacePressed = false;
document.addEventListener("keyup",keyDownHandler,false);

function keyDownHandler(e){
    if(e.keyCode === 32 && xHum === canvas.height - 20){
        spacePressed=true;
    }
}

//draw of static red block
function drawHuman() {
    ctx.beginPath();
    ctx.rect(canvas.width/2, xHum, 20, 20
    ); //TODO change with pic of human
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

//draw of moving green block
function drawVirus() {
    ctx.beginPath();
    ctx.rect(x, y, 20, 50); //TODO change with pic of virus
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
}

function updateScore() {
    //TODO count score
    score+=1;
    document.getElementById("score").innerHTML="Score is " + score;
}
function collision() {
    //detect if human touches virus
    if((yHum > x-1 && yHum < x+21 && xHum+20> y)||(yHum+20 > x && yHum+20 < x+20 && xHum+20> y)){
      // console.log("Collision at " + x + " " + yHum);
      document.getElementById("label").innerText="Game Over";
        clearInterval(timer)
    }
}
var speed = 5;
function faster() {
    //make game faster with every point
    clearInterval(timer)
    speed *=0.9
    timer = setInterval(draw, speed);
    console.log(speed)
}

//set Jump parameters
var jumpHeight = 0;
var jumpSpeed = 2;
var goingUp = false;
function draw() {

    //clear all drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //jump logic
    if(jumpHeight<=0){
        xHum=canvas.height-20;
    }
    else{
        if(goingUp){
            xHum = xHum - jumpSpeed;
            if(xHum < canvas.height - 20 - jumpHeight){
                goingUp=false;
            }
        }
        else{
            xHum = canvas.height - 20 - jumpHeight;
            jumpHeight = jumpHeight-jumpSpeed;
        }
    }
    //Speed up
    if (x + dx < 0) {
        faster();
        updateScore();
    }
    //Checks Collision
    collision();
    //print objects
    drawVirus();
    drawHuman();

    //checks if spacebar is pressed and goes up and down
    if(spacePressed  ){
        jumpHeight=90;
        spacePressed=false;
        goingUp = true;
    }

    //if virus at left end, then move back to right end
    if (x + dx < 0) {
        x = canvas.width;
    }

    //change x value => change pos of Virus
    x -= dx;
}



//calls draw ever 10 mil.secs
timer = setInterval(draw, speed);