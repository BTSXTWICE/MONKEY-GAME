var PLAY= 1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var survivalTime= 0;
var ground;
var score=0;
var invisibleGround;

function preload(){
  
  //loading animation
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  //loading image
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  // creating sprites
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10);
 ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup= createGroup();
  obstacleGroup= createGroup();
   
  invisibleGround=createSprite(399,348,900,10);
  
 monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  
}


function draw() {
background(200);
  
  // giving the function for survivalTime
  stroke("white");
  textSize(20);
  fill("white");
 text("score:"+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
if(gameState===PLAY){
  
  // giving monkey gravity
monkey.velocityY=monkey.velocityY+0.8;
  
  //  monkey jump when space is pressed 
  if(keyDown("space")&& monkey.y >=250){
  monkey.velocityY=-12;
}

  // endless run
  if(ground.x<0){
   ground.x=ground.width/2;

  }
  
// to make monkey attached with ground

  console.log(monkey.x);

  obstacles()
  banana()
  
  invisibleGround.visible=false;
  
  
  if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
    score=score+1
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END
}
}
  else if(gameState===END){
  monkey.setVelocityxEach=0;
      ground.setVelocityXEach=0;
      FoodGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-2);
    obstacleGroup.setLifetimeEach(-2);
  
}

 
  
  monkey.debug= false;
  
monkey.collide(ground);
drawSprites();
}
  
// functions for banana
function banana(){
  if(frameCount%80==0){
    var banana=createSprite(600,120,40,10);
    banana.y= Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale= 0.1;
    banana.velocityX= -6;
    banana.lifetime=200;
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
    FoodGroup.add(banana);
  }
}

//functions for obstacle
function obstacles(){
  if(frameCount% 300==0){
    var obstacle = createSprite(600,315,10,40);
   obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-3;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}



