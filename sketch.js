
var soloimg;
var solo;
var trex ,trex_running;
var cloudimg;
var cloud;
var cactus1;
var cactus2;
var cactus3;
var cactus4;
var cactus5;
var cactus6;
var pontuacao = 0;
var estado = "play";
var recome;
var gameovr;
var over;
var res;
var die;
var pula;
var check;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
soloimg = loadImage ("ground2.png");
cloudimg = loadImage ("cloud.png");
cactusimg1 = loadImage ("obstacle1.png");
cactusimg2 = loadImage ("obstacle2.png");
cactusimg3 = loadImage ("obstacle3.png");
cactusimg4 = loadImage ("obstacle4.png");
cactusimg5 = loadImage ("obstacle5.png");
cactusimg6 = loadImage ("obstacle6.png");
trexmal = loadAnimation ("trex_collided.png")
gameovr = loadImage ("gameOver.png");
recome = loadImage ("restart.png");
die = loadSound ("die.mp3");
pula = loadSound ("jump.mp3");
check = loadSound ("checkPoint.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  caccctus = new Group ();
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  //trex.setCollider ("rectangle", 0, 0, 40, 50);
  //trex.debug = true;
  trex.addAnimation("running", trex_running);
  trex.addAnimation ("cabo", trexmal);
  trex.scale = 0.5;
  solo = createSprite (10, height / 2, 600, 10);
  solo.addImage ("chao", soloimg);
  solo.scale = 1.2;
  invis = createSprite (10, height / 2 +  10, 600, 5)
  invis.visible = false;
  over = createSprite (width / 2, 80, 300, 100);
  res = createSprite (width / 2, 110, 300, 120);
  res.scale = 0.4;
  over.scale = 0.6;
  over.addImage (gameovr);
  res.addImage (recome);
  res.visible = false;
  over.visible = false;

}

function nuvem (){
 if (frameCount%150==0){
 cloud = createSprite (0, 70, 600, 10);
  cloud.addImage (cloudimg);
  cloud.scale = 0.6;
  cloud.velocityX = 1;
  cloud.y = Math.round(random(90, 160));
  cloud.depth = 1;
  trex.depth = 2;
  cloud.lifetime = 1400;
 }
}

function cactos (){
  if (frameCount%150 == 0){
    cactoss = createSprite (width, height / 2 , 20, 50);
    cactoss.velocityX = -(6 + pontuacao / 100);
    var cactux = Math.round (random (1, 6));
    switch (cactux){
      case 1: cactoss.addImage (cactusimg1);
      cactoss.y = height / 2 - 25;
      cactoss.scale = 0.8;
      break;
      case 2: cactoss.addImage (cactusimg2);
      cactoss.scale = 0.8;
      cactoss.y = height / 2 - 25;
      break;
      case 3: cactoss.addImage (cactusimg3);
      cactoss.y = height / 2 - 25;
      cactoss.scale = 0.8;
      break;
      case 4: cactoss.addImage (cactusimg4);
      cactoss.scale = 0.6;
      cactoss.y = height / 2 - 25;
      break;
      case 5: cactoss.addImage (cactusimg5);
      cactoss.scale = 0.6;
      cactoss.y = height / 2 - 25;
      break;
      case 6: cactoss.addImage (cactusimg6);
      cactoss.scale = 0.5;
      cactoss.y = height / 2 - 25;
      break;
      default: break;
    }
    cactoss.lifetime = 210;
    caccctus.add (cactoss);
  }
}

function draw(){
  background("white")
  drawSprites();

trex.velocityY += 0.5;
trex.collide (invis);
text ("pontuação " + pontuacao, width / 2, 20)

if (estado == "play"){
  pontuacao += Math.round (getFrameRate () / 60)
  nuvem ();
  cactos ();
  if (solo.x < 0){
    solo.x = solo.width /2
  }
  solo.velocityX = -(5 + pontuacao / 100)
  if (keyDown("space")){
    if (trex.y >= height / 2 - 30){
      trex.velocityY = -11;
      pula.play ();
    }
   }
   if (trex.isTouching (caccctus)){
     estado = "gameover";
     die.play ();
     //trex.velocityY = -10;
   }
   if (pontuacao%500 == 0 && pontuacao>0 ){
     check.play ();
   }
console.log (height / 2 + 10);
console.log (trex.y);

}

if (estado == "gameover"){
solo.velocityX = 0;
caccctus.setVelocityXEach (0);
trex.changeAnimation ("cabo");
caccctus.setLifetimeEach (-1);
res.visible = true;
over.visible = true;
trex.velocityY = 0;


}

if (mousePressedOver(res)){
  estado = "play";
  caccctus.destroyEach ();
  trex.changeAnimation ("running");
  res.visible = false;
  over.visible = false;
  pontuacao = 0;
  frameCount = 0;
}

}