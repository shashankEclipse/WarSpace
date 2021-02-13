var canvas;
var player;
var backgroundImg;
var playerImg;
var object1Img , object2Img , object3Img;
var objects;
const PLAY = 1;
const END = 0;
var gameState = PLAY;
var gameOver , gameOverImg;
var score = 0;
var asteroid;
var asteroidImg;
var asteroids;
var score2 = 0;
var lazers, lazerImg;
var restart , restartImg;
var  lazerSound;
var effectImg;
var effect;

function preload(){
    backgroundImg = loadImage("images/Galaxy.png");
    playerImg = loadImage("images/player.png");
    object1Img = loadImage("images/object1.png");
    object2Img = loadImage("images/object2.png");
    object3Img = loadImage("images/objects.png");
    gameOverImg = loadImage("images/gameOver.jpg");
    asteroidImg = loadImage("images/asteroid.png");
    lazerImg = loadImage("images/lazer.png");
    restartImg = loadImage("images/restart.png");
    lazerSound = loadSound("sounds/lazerSound.mp3");
    effectImg = loadImage("images/effect.png");
    
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);

  bg = createSprite(displayWidth/2-10,displayHeight/2,displayWidth+200,displayHeight);
  bg.velocityY = 2;
  
  bg.addImage(backgroundImg);

  player = createSprite(displayWidth/2,displayHeight/2+50);
  player.addImage(playerImg);

  player.setCollider("rectangle",0,0,player.width/2,player.height/2)

  gameOver = createSprite(displayWidth/2,displayHeight/2-200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.7

  restart = createSprite(displayWidth/2,displayHeight/2+100);
  restart.addImage(restartImg);

  objects = new Group();
  asteroids = new Group();
  lazers = new Group();
}

function movement(){

    if(keyDown(LEFT_ARROW)){
      player.x-=10;
    }
    if(keyDown(RIGHT_ARROW)){
      player.x+=10;
    }
}
function spawnAsteroids(){
     if(frameCount % 100 === 0){
      //% divides the frames by 50 and if the reaminder is 0 the if condition works.
     asteroid = createSprite(200,50,20,20);
      asteroid.addImage("ob",asteroidImg);
     
      asteroid.x = Math.round(random(30, displayWidth-100))
      asteroid.velocityY = 5;
      asteroid.scale = 0.2;
      asteroids.add(asteroid);
    
     }
}
function spawnObjects(){
    
    if(frameCount % 100 === 0){
      //% divides the frames by 50 and if the reaminder is 0 the if condition works.
      object = createSprite(200,50,20,20);
      object.addImage("ob",object1Img);
      object.x = Math.round(random(30, displayWidth-100))
      object.velocityY = 5;
      object.scale = 0.2;
      objects.add(object);
            var rand = Math.round(random(1, 3));
      switch (rand) {

        case 1:
          object.addImage("ob", object1Img);
          break;
        case 2:
          object.addImage("ob", object2Img);
          break;
        case 3:
          object.addImage("ob", object3Img);
          break;
        default:
          break;
      }
    }
}
function destroyPlayer(){
  if (objects.isTouching(player)) {
      player.visible =false;
      gameState = END;
 
}
}
  function gameEnd(){

    
    objects.setVelocityYEach(0);
    asteroids.setVelocityYEach(0);
    bg.velocityY = 0;
    restart.visible = true;
    gameOver.visible = true;
    
  

    if(mousePressedOver(restart)){
      console.log("hello");
 
        reset();
        
    }
  }
function reset(){
  console.log("hi");
  
  player.visible = true;
  gameState=PLAY;
  score =0 ;
  objects.destroyEach();
  asteroids.destroyEach();
  bg.velocityY = 2;


  
  
}
function calculateScore(){
  
  score = score + Math.round(getFrameRate() / 40);

  if(lazers.isTouching(asteroids)){
    score2 = score2 + 100;
    // asteroids.destroyEach();
    asteroid.addImage("bo",effectImg);
    asteroid.changeImage("bo",effectImg);
   

  }
}
function  shoot() {
  if(keyDown("f")) {
     lazer = createSprite(400,200,20,50);
     lazer.addImage("lazer", lazerImg);
     lazer.scale = 0.3;
     lazerSound.play();
     
     lazer.velocityY = -10;
     lazer.x = player.x
     lazer.y = player.y
     lazers.add(lazer);

       
      
     } 

}
function draw(){
 background("black");

 //(bbackgroundackgroundImg)
 

  if(gameState=== PLAY){
    restart.visible = false;
    gameOver.visible = false;
    destroyPlayer();
    spawnObjects();
    movement();
    if(bg.y>displayHeight){
      bg.y = displayHeight/2;
      
    }
    calculateScore();
    spawnAsteroids();
    shoot();
  
  }
    else if(gameState===END){
      gameEnd();
    }
 
 drawSprites();
 
 fill("White");
 textFont('Georgia');
 textSize(30);
 text("Score = " + score, 50, 50);
 text("Asteroid points = " + score2, 50, 80);
 
}
