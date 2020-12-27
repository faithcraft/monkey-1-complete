
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var monkey , monkey_running, monkey_collided;

var banana ,bananaImage, obstacle, obstacleImage

var FoodGroup, obstacleGroup, ground, invisibleGround,groundImage;

var survivletime = 0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  
 
  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(80,310,20,20);
  monkey.addAnimation("running",monkey_running);  
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,9000,20);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
  invisibleGround = createSprite(400, 350,900,20);
  invisibleGround.visible = false;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  
  
  
  
}


function draw() {
   background(255);
  text("survivle time: "+ score, 500,50);

    
  
  if (gamestate === PLAY){
    
    if(keyDown("space"))
    {
      monkey.velocityY = -10;
    }
      
  monkey.velocityY = monkey.velocityY + 0.8
  
   if (ground.x < 0){
      ground.x = ground.width/2;
     
    }
    
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/10);
    
    if(obstacleGroup.isTouching(monkey)){
        gamestate = END;
    }
    
  spawnRocks();
  spawnBananas();
    
  }
  
  monkey.collide(invisibleGround);
  
  if(gamestate === END)
  {
    obstacleGroup.setVelocityXEach(0)
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0); 
  }
  
  
  drawSprites();
}

function spawnBananas()

{
   if (frameCount % 60 === 0) {
  var banana = createSprite(1000,150,10,10);
  banana.velocityX = -5;
  banana.scale = 0.1;
  banana.addImage(bananaImage);
  
  FoodGroup.add(banana);
   }
}

function spawnRocks()
{
  if(frameCount % 150 === 0 )
  {
  obstacle = createSprite(1000,305,10,10);
  obstacle.velocityX = -5;
  obstacle.scale = 0.2;
  obstacle.addImage(obstacleImage);
    
  obstacleGroup.add(obstacle);
  }
}