var dino;
var dinocorrendo;
var dinocolisao;

var parede;

var chao;
var chaoImg;
var chaoI;

var nuvem;
var imgNuvem;

var pontos = 0;

var grupoNuvens;
var grupoObstaculo;

var ENCERRAR = 0; 

var JOGAR = 1;

var modoDeJogo = JOGAR;

var imgObs1,imgObs2,imgObs3,imgObs4,imgObs5,imgObs6;
 
var gameOver;
var gameOverI;

var somMorte;
var somPulo;
var somCheckpoint;

var restart;
var restartImagem;

function preload(){
                            dinocorrendo=loadAnimation("trex1.png","trex3.png","trex4.png");
 dinocolisao=loadAnimation("trex_collided.png");
  
   
   chaoImg = loadImage("ground2.png");
  
   imgNuvem = loadImage("nuvenspixels.png");
  
   imgObs1 = loadImage("obstacle1.png");
   imgObs2 = loadImage("obstacle2.png");
   imgObs3 = loadImage("obstacle3.png");
   imgObs4 = loadImage("obstacle4.png");
   imgObs5 = loadImage("obstacle5.png");
   imgObs6 = loadImage("obstacle6.png");
   
   gameOverI = loadImage("gameOver.png");
  
   somMorte = loadSound("die.mp3");
   somPulo = loadSound("jump.mp3");
   somCheckpoint = loadSound("checkPoint.mp3");
  
   restartImagem = loadImage("restart.png");
  
}

function setup(){
  createCanvas(600,300)
    
  
   
  
  
   dino = createSprite(50,260,20,50);
   dino.addAnimation("running",dinocorrendo);
   dino.addAnimation("collided",dinocolisao);
   dino.scale = 0.7
 
   chao = createSprite(300,260,600,20);
   chao.addImage("ground2.png",chaoImg);
   chaoI = createSprite (300,280,600,20);
   chaoI.visible = false;
  
   grupoNuvens = new Group();
   grupoObstaculo = new Group();
  
   dino.setCollider("circle",0,0,40);
   //dino.debug = true;
  
   gameOver = createSprite(300,150);
   gameOver.addImage(gameOverI);
  
   restart = createSprite(300,190);
   restart.addImage(restartImagem);
   restart.scale = 0.5;
}

function draw(){
   background("white"); 
  
    // definições do jogar
if(modoDeJogo ===JOGAR){
     chao.velocityX = -(3+3*pontos/500);
     pontos = pontos + Math.round(frameRate()/60);
     gerarNuvem();
     gerarObstaculos();
  
     gameOver.visible = false
     restart.visible = false
    
    if (keyDown("space") && dino.y > 240) {
      dino.velocityY = -10 ;
      somPulo.play();
 
  }
  
  
    dino.velocityY = dino.velocityY + 0.8;
  
  
    
   if(grupoObstaculo.isTouching(dino)){
      modoDeJogo = ENCERRAR;
      somMorte.play();
   }
  
   //definições do encerrar
}else if(modoDeJogo === ENCERRAR){
     chaoI.velocityX = 0;
     chao.velocityX = 0;
  
     grupoObstaculo.setLifetimeEach(-1);
     grupoNuvens.setLifetimeEach(-1);
  
     grupoObstaculo.setVelocityXEach(0);
     grupoNuvens.setVelocityXEach(0);
  
     dino.changeAnimation("collided",dinocolisao);
  
     gameOver.visible = true
     restart.visible = true
  
     if(mousePressedOver(restart)){
     reset();
     
   }

    
  }
  //text(mouseX + "," + mouseY,mouseX,mouseY);
  
  
  text("pontuação: " + pontos,500,20);
if(pontos > 0 && pontos % 100 == 0 ){
  somCheckpoint.play();
  
  
}
  
  parede = createEdgeSprites();

  if (chao.x<0 ) {
    chao.x = chao.width/2 
    
  
  }
 
   parede = createEdgeSprites();
  
   dino.collide(chaoI);
  
  
  
   drawSprites();
}

function gerarNuvem(){
 
   if(frameCount %60 == 0){
     nuvem = createSprite(570,50,60,40);
     nuvem.scale = 0.3;
     nuvem.velocityX = -(4 + pontos/100);
  
     nuvem.addImage(imgNuvem);
     nuvem.y = Math.round(random(20,80));
  
     nuvem.lifetime = 120;
   
     nuvem.depth = dino.depth;
     dino.depth = dino.depth + 1;
  
     grupoNuvens.add(nuvem);
 }
  
  
}

function gerarObstaculos (){
   if(frameCount %60 == 0)  {
     var obstaculo = createSprite (500,250,10,40);
     obstaculo.velocityX = -(10 + pontos/100);
     obstaculo.scale = 0.5
    
     var rand = Math.round(random(1,6));

    switch(rand){
         
      case 1 : obstaculo.addImage(imgObs1);
         break;
      case 2 : obstaculo.addImage(imgObs2);   
         break; 
      case 3 : obstaculo.addImage(imgObs3);
         break;
      case 4 : obstaculo.addImage(imgObs4);
         break;
      case 5 : obstaculo.addImage(imgObs5);   
         break; 
      case 6 : obstaculo.addImage(imgObs6);
         default: break;
            
  }  
    obstaculo.lifetime = 50;
  
    grupoObstaculo.add(obstaculo);
  } 
  
  
}

function reset(){
  modoDeJogo = JOGAR;
  grupoObstaculo.destroyEach();
  grupoNuvens.destroyEach();
  dino.changeAnimation("running",dinocorrendo);
  pontos = 0
  restart.visible = false
}
