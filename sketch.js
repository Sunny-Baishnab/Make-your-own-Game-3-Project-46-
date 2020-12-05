

var bullet , enemy;

var score = 0;

var gameState = "serve";
function preload()
{
	spaceRangerImg = loadImage("1NOYbJA.png");
	spaceBackgroundImg = loadImage("depositphotos_3846803-Space-background.jpg");
	enemyImg = loadImage("cw3-enemyship7-3.png");
	specialEnemyImg = loadImage("F5S4.png");
	asteroidImg = loadImage("354-3542393_meteor-png-meteor-transparent-background.png");
	enemyGroup = new Group();
	bulletGroup = new Group();
	bullet1Group = new Group();
	specialEnemyGroup = new Group();
	enemybulletGroup = new Group();
	asteroidGroup = new Group();
}

function setup() {
	createCanvas(800, 700);

	spaceRanger = createSprite(400,550,50,50);
	spaceRanger.addImage(spaceRangerImg);
	spaceRanger.scale = 0.4;

}


function draw() {
  rectMode(CENTER);
  background(spaceBackgroundImg);
  drawSprites();
  
  
  if(gameState === "serve"){
	  textSize(40);
	  fill("white");
	  text("Press S to  Start",300,350);
	  text("Be Aware of Special enemies",200,400);
	  text("If You Touch them you will die",200,450);
	  text("and also be aware of asteroid!!",200,500);
  }

  if(keyDown("S")&&gameState === "serve"){
	  gameState = "play";
  }

  if(gameState === "play"){

  	enemyship();
  	specialenemyship();
  	asteroidStone();


	if(keyDown("LEFT_ARROW")){
		spaceRanger.x-=5;
	}

	if(keyDown("RIGHT_ARROW")){
		spaceRanger.x+=5;
	}

	if(keyDown("space")){
		bullet();
	}

	for(var i = 0;i<enemyGroup.length;i++){
		if(enemyGroup.get(i).isTouching(bulletGroup)||enemyGroup.get(i).isTouching(bullet1Group)){
			enemyGroup.get(i).destroy();
			bulletGroup.destroyEach();
			bullet1Group.destroyEach();
			score = score+1;
		}
 	}
  	
	 

  	textSize(20);
  	fill("white");
	  text("Score: "+score,400,20);
	  
	if(spaceRanger.isTouching(asteroidGroup)||spaceRanger.isTouching(specialEnemyGroup)){
		gameState = "end";
	}  
  }

  if(gameState === "end"){
	  asteroidGroup.destroyEach();
	  specialEnemyGroup.destroyEach();
	  enemyGroup.destroyEach();
	  bullet1Group.destroyEach();
	  bulletGroup.destroyEach();

	  textSize(40);
	  fill("red");
	  text("GAME OVER!!",300,350);
	  text("Press R to Replay",300,500);
	  if(score<100){
		  text("Don't Worry",300,400);
		  text("Try Again",300,450);
	  }

	  if(score>=100){
		  text("WELL DONE",300,400);
	  }
  }
    
  if(keyDown("R")&&gameState === "end"){
	  score = 0;
	  gameState = "serve";
  }
}

function bullet(){
	if(frameCount%9===0){
		var bullet = createSprite(spaceRanger.x-30,spaceRanger.y,10,30);
		bullet.velocityY = -6;
		bullet.shapeColor = "yellow";
		bullet.lifetime = 116.67;
		bulletGroup.add(bullet);

		var bullet1 = createSprite(spaceRanger.x+30,spaceRanger.y,10,30);
		bullet1.velocityY = -6;
		bullet1.shapeColor = "yellow";
		bullet1.lifetime = 116.67;
		bullet1Group.add(bullet1)
	}

	
}

function enemyship(){
	if(frameCount%20===0){
		enemy = createSprite(Math.round(random(10,700)),0,50,50);
		enemy.addImage(enemyImg);
		enemy.scale = 0.5;
		enemy.velocityY = 4;
		enemy.lifetime = 175;
		enemyGroup.add(enemy);
	}
   
}

function specialenemyship(){
	if(frameCount%100===0){
		specialEnemy = createSprite(Math.round(random(10,700)),0,50,50);
		specialEnemy.addImage(specialEnemyImg);
		specialEnemy.scale = 0.5;
		specialEnemy.velocityY = 3;
		specialEnemy.lifetime = 175;
		specialEnemyGroup.add(specialEnemy);
	
		if(frameCount%9===0){
			var enemybullet = createSprite(specialEnemy.x,specialEnemy.y+10,10,30);
			enemybullet.velocityY = -6;
			enemybullet.shapeColor = "yellow";
			enemybullet.lifetime = 116.67;
			enemybulletGroup.add(enemybullet);

		}
	}
}

function asteroidStone(){
	if(frameCount%150===0){
		asteroid = createSprite(Math.round(random(10,700)),0,50,50);
		asteroid.addImage(asteroidImg);
		asteroid.scale = 0.1;
		asteroid.velocityY = 6;
		asteroid.lifetime = 116;
		asteroidGroup.add(asteroid);
	}
}
