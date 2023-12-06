var  backgroundImg,bg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop,obsTop1,obsTop2
var obstacleBottom,obsBottom1,obsBottom2,obsBottom3
var gameOver,gameOverImg
var restart, restartImg
var coins=0;

var score=0;
var c,cImg
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
backgroundImg = loadImage("assets/bg.png")
//bg=loadImage("assets/bg1.jpg")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
obsTop1=loadImage("assets/obsTop1.png")
obsTop2=loadImage("assets/obsTop2.png")
obsBottom1=loadImage("assets/obsBottom1.png")
obsBottom2=loadImage("assets/obsBottom2.png")
obsBottom3=loadImage("assets/obsBottom3.png")
gameOverImg= loadImage("assets/gameOver.png")
restartImg = loadImage("assets/restart.png")
cImg=loadImage("assets/coins.png")
}

function setup(){
createCanvas(windowWidth,windowHeight);

 //bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
//bg.addImage(bgImg)
//backgroundImg.scale = 2;
//bg.velocityX=-(6 + 3*score/100);

//creating top and bottom grounds
bottomGround = createSprite(width/2,height-10,width,125);
bottomGround.visible = false;
//bottomGround.velocityX = -(6 + 3*score/100);

topGround = createSprite(width/2,5,width,10);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(50,height-500,50,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.3;
balloon.debug = true;

topObstaclesGroup = new Group();
bottomObstaclesGroup = new Group();
barGroup = new Group();
coinsGroup=new Group()
//creating game over and restart sprites
gameOver = createSprite(width/2,height/2- 50);
restart = createSprite(width/2,height/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;
restart.addImage(restartImg);
restart.scale = 0.7;
gameOver.visible = false;
restart.visible = false;

}

function draw() {
  
 background(backgroundImg);

 //if(gameState === START){
//balloon.visible=false;
//obstacleBottom.visible=false;
//obstacleTop.visible=false;
//score=0;
 //}

          //making the hot air balloon jump
          if(gameState === PLAY){

            //making the hot air balloon jump
            if(keyDown("space")) {
              balloon.velocityY = -8 ;
              
            }
          //adding gravity
           balloon.velocityY = balloon.velocityY+2;


           if(topObstaclesGroup.isTouching(balloon) || balloon.isTouching(topGround)
||balloon.isTouching(bottomGround)|| bottomObstaclesGroup.isTouching(balloon)){

  gameState=END;


}

 }
 if(balloon.isTouching(coinsGroup)){
  for(var i=0;i<coinsGroup.length;i++){     
      
   if(coinsGroup[i].isTouching(balloon)){
        coinsGroup[i].destroy()
        coins=coins+1;
        
       
        } 
  
  }
}

if(coins===20){
  gameState=END
  textFont("algerian")
  textSize(80);
  fill("red");
text("YOU WON!!!!!!",600,600);
}


  if(gameState === END) 
    {
          gameOver.visible = true;
          gameOver.depth = gameOver.depth+1
          restart.visible = true;
          restart.depth = restart.depth+1
          balloon.visible=false;
          //all sprites should stop moving in the END state
          balloon.velocityX = 0;
          balloon.velocityY = 0;
          topObstaclesGroup.setVelocityXEach(0);
          bottomObstaclesGroup.setVelocityXEach(0);
          barGroup.setVelocityXEach(0);
          coinsGroup.setVelocityXEach(0);
           
          coinsGroup.destroyEach();
          topObstaclesGroup.destroyEach();
          bottomObstaclesGroup.destroyEach();
          //setting -1 lifetime so that obstacles don't disappear in the END state
          //topObstaclesGroup.setLifetimeEach(-10);
          //bottomObstaclesGroup.setLifetimeEach(-10);
          coinsGroup.setVisibleEach(false);
          topObstaclesGroup.setVisibleEach(false);
          bottomObstaclesGroup.setVisibleEach(false);
          barGroup.setVisibleEach(false);
          balloon.y = 300;
          
         
          //resetting the game
          if(mousePressedOver(restart)) 
          {
                reset();
          }

    } 
    spawnObstaclesTop();
    spawnObstaclesbBottom();
    spawnCoins();
           Bar();
        drawSprites();
          
  
         Score();      
}
function reset()
{
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  topObstaclesGroup.destroyEach();
  bottomObstaclesGroup.destroyEach();
  topObstaclesGroup.setVisibleEach(true);
  bottomObstaclesGroup.setVisibleEach(true);
  coinsGroup.setVisibleEach(true);
  balloon.visible=true;
  score=0;
  coins=0;
}
function spawnObstaclesTop(){
  if(World.frameCount % 70===0){
    obstacleTop=createSprite(400,height-600,40,50);
    obstacleTop.scale=0.2;
    obstacleTop.velocityX=-6;
    //obstacleTop.setCollider("rectangle",0,0,300,200)

    obstacleTop.y=Math.round(random(200,400));

    var rand=Math.round(random(1,2));
    switch(rand){
      case 1: obstacleTop.addImage(obsTop1);
             break;
      case 2: obstacleTop.addImage(obsTop2);
             break;
      default:break;       
    }
    obstacleTop.debug=true
    obstacleTop.lifetime=100;
    balloon.depth=balloon.depth+1;

    topObstaclesGroup.add(obstacleTop);
  }
}
function spawnObstaclesbBottom(){
if(World.frameCount % 60===0){
  obstacleBottom=createSprite(400,height-50,40,50);
  obstacleBottom.scale=0.2;
  obstacleBottom.velocityX=-6;
  obstacleBottom.addImage(obsBottom1);
  obstacleBottom.debug=true
// obstacleBottom.setCollider("rectangle",0,0,450,1250)

  //obstacleBottom.y=Math.round(random(400,00));

  var rand=Math.round(random(1,3));
  switch(rand){
    case 1: obstacleBottom.addImage(obsBottom1);
           break;
    case 2: obstacleBottom.addImage(obsBottom2);
           break;
    case 3: obstacleBottom.addImage(obsBottom3);
           break;

    default:break;       
  }
  obstacleBottom.lifetime=100;
  balloon.depth=balloon.depth+1;
  bottomObstaclesGroup.add(obstacleBottom);
}
}

function Bar(){
  if(World.frameCount%60===0){
    var bar=createSprite(400,height-200,10,1200);
    bar.velocityX=-5;
    bar.depth=balloon.depth;
    bar.lifetime=70;
    bar.visible=false;

    barGroup.add(bar);
  }
}
function Score(){
  if(balloon.isTouching(barGroup)){
    score=score+1;
  }
  
  textFont("algerian")
  textSize(30);
  fill("red");
text("Score:"+score,200,60);
}
function spawnCoins(){
  if(World.frameCount % 60===0){
   c=createSprite(400,height-50,40,50);
    c.scale=0.1;
    c.velocityX=-4;
    c.addImage(cImg);
    c.y=Math.round(random(100,600));
    
    //c.lifetime=100;
    balloon.depth=balloon.depth+1;
    coinsGroup.add(c);
  }
  
  textFont("algerian")
  textSize(30);
  fill("red");
text("Coins:"+coins,600,60);
  }
  
