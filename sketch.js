var bird;
var bg;

var birdImg;

var obstacle_1;
var obstacle_2;
var obstacle_3;

var obstaclesGroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var gameOver,restart;
var gameOverIMG,restartIMG;

var obstacle;
var score;

var gameOverSound;
var startSound;

function preload(){
    bg = loadImage("bg_image.jpg");
    birdImg = loadAnimation("bird_1.png","bird_2.png","bird_3.png","bird_4.png");

    obstacle_1 = loadImage("Obstacle_1.png");
    obstacle_2 = loadImage("Obstacle_2.png");
    obstacle_3 = loadImage("Obstacle_3.png");

    gameOverIMG = loadImage("GameOver.png");
    restartIMG = loadImage("restart.png");

    gameOverSound = loadSOund("game-over-38511.mp3")
    startSound = loadSound("brain-damage-148577.mp3")
}
    
    
function setup() {
    createCanvas(windowWidth,windowHeight);
    bird = createSprite(windowWidth-1000,windowHeight/2,40,40);
    bird.addAnimation('bird',birdImg);

    obstaclesGroup = createGroup();

    bird.setCollider("circle",0,0,20);
    bird.debug = true;

    gameOver = createSprite(windowWidth/2,windowHeight/2,30,30);
    gameOver.addImage('gameOver',gameOverIMG);
    gameOver.visible = false;

    restart = createSprite(windowWidth/2,windowHeight/2+50,30,30);
    restart.addImage('restart',restartIMG);
    restart.visible = false;
    restart.scale = 0.2

    score = 0;
}

function draw() {
    background(bg);

    text("Score: "+ score, 1100,50);

    if(gameState === PLAY){
        spawnObstacle();

        score = score + Math.round(getFrameRate()/60);

        if(obstaclesGroup.isTouching(bird)){
            gameState = END;
        }
    }
    else if(gameState === END){
        obstaclesGroup.setVelocityXEach(0);
        gameOver.visible = true;
        restart.visible = true;
        hideSprite();
        bird.visible = false;

        gameOverSound.play()

        if(mousePressedOver(restart)){
            reset(); 
        }
    }

    if (keyDown(UP_ARROW)){
        bird.y = bird.y-5;
    }
    else if(keyDown(DOWN_ARROW)){
        bird.y += 5;
    }

    drawSprites();
}

function hideSprite(){
    obstaclesGroup.forEach(function(obstacle){
        obstacle.visible = false;
    }) 
}

function reset(){
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    restart.visible = false;
    gameOver.visible = false;
    bird.visible = true;
    bird.changeAnimation('bird',birdImg);
    showSpriteGroup();
}

function showSpriteGroup(){
    obstaclesGroup.forEach(function(obstacle){
        obstacle.visible = true;
})
}

function spawnObstacle() {
    if (frameCount % 50 === 0){
        obstacle = createSprite(1500,Math.round(random(100,500)),10,10);
        obstacle.velocityX = -6;
        
        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: obstacle.addImage(obstacle_1);
                    break;
                    obstacle.scale = 3;
            case 2: obstacle.addImage(obstacle_2);
                    break;
            case 3: obstacle.addImage(obstacle_3);
                    break;
            default: break;
        }
       
        obstaclesGroup.add(obstacle);
    }
}