var gameState = "start";
var term = 0;
var energy = 100;
var num = 12;

function preload(){
	battlefieldLongerBg = loadImage("battlefield_longer_bg.png");
	battlefieldLongBg = loadImage("battlefield_long_bg.png");
	battlefieldMediumBg = loadImage("battlefield_medium_bg.png");
	storyBg = loadImage("story_bg.png");
	warBg = loadImage("war_bg.jpeg");
	endBg = loadImage("end_bg.jpeg")
	
	redButtonImg = loadImage("red_button.png");
	greenButtonImg = loadImage("green_button.png");
	yellowButtonImg = loadImage("yellow_button.png");
	
	easyPreview = loadImage("easy_preview.png");
	mediumPreview = loadImage("medium_preview.png");
	hardPreview = loadImage("hard_preview.png");

	helicopterImg = loadImage("helicopter.png");
	packageImg = loadImage("package.png");
	energyLevelBarImg = loadImage("energy_level_bar.png");

	fireballImg = loadImage("fireball_img.png");
	lightningImg = loadImage("lightning_img.png");
	boosterImg = loadImage("booster.png");

	keySound = loadSound("key_sound.mp3");
	clickSound = loadSound("click_sound.mp3");
	chooseSong = loadSound("break_free_song.mp3");
	endSong = loadSound("end_song.mp3");
	happySong = loadSound("happy_song.mp3");
	breakFreeSong = loadSound("choose_song.mp3");
	startSong = loadSound("start_music.mp3");
}

function setup() {
	createCanvas(1400,800);
	
	helicopter = createSprite(200,200,100,100);
	helicopter.addImage(helicopterImg);
	helicopter.scale = 0.85;

	packageObj = createSprite();
	packageObj.addImage(packageImg);
	packageObj.scale = 0.25;

	fireballsGroup = createGroup();
	lightningGroup = createGroup();
	boostersGroup = createGroup();

	startSong.play();
}

function draw() {

  if(gameState === "start"){
	background(storyBg);
	textSize(67);
	textFont("Georgia");
	stroke(random(0,255),random(0,255),random(0,255));
	strokeWeight(7);
	fill(255);
	text("A Battle Above the Field",10,100);

	if(keyDown("space")){
		startSong.stop();
		clickSound.play();
		gameState = "choose";
		chooseSong.play();
	}
	
  }

  if(gameState === "choose"){
	  background(warBg);
	  textSize(67);
	  textFont("Georgia");
	  stroke(random(0,255),random(0,255),random(0,255));
  	  strokeWeight(7);
	  fill(255);
	  text("Choose the level of difficulty:",250,200);
	  
	  image(greenButtonImg,150,300,250,250);
	  textSize(42);
	  stroke("darkgreen");
	  strokeWeight(10);
	  fill("lightgreen");
	  text("Easy",230,425);

	  image(yellowButtonImg,550,300,250,250);
	  stroke("orange");
	  strokeWeight(10);
	  fill("yellow");
	  text("Medium",597.5,425);

	  image(redButtonImg,950,300,250,250);
	  stroke("maroon");
	  strokeWeight(10);
	  fill("lightpink");
	  text("Hard",1025,425);

	  if(mouseX <= 375 && mouseX >= 175 && mouseY >= 315 && mouseY <= 515){
		image(easyPreview,130,530,300,250);
		easyInvisible = createSprite(275,410,150,150);
		easyInvisible.visible = false;
		if(mousePressedOver(easyInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "easyPlay";
			breakFreeSong.play();
		}
	  }
	  if(mouseX >= 575 && mouseX <= 775 && mouseY >= 315 && mouseY <= 515){
		image(mediumPreview,520,530,300,250);
		mediumInvisible = createSprite(675,410,150,150);
		mediumInvisible.visible = false;
		if(mousePressedOver(mediumInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "mediumPlay";
			breakFreeSong.play();
		}
	  }
	  if(mouseX >= 975 && mouseX <= 1175 && mouseY >= 315 && mouseY <= 515){
		image(hardPreview,920,530,300,250);
		hardInvisible = createSprite(1075,410,150,150);
		hardInvisible.visible = false;
		if(mousePressedOver(hardInvisible)){
			chooseSong.stop();
			clickSound.play();
			gameState = "hardPlay";
			breakFreeSong.play();
		}
	  }
	  
  }

  if(gameState === "easyPlay"){
	background(235,235,235);
	image(battlefieldMediumBg,-500,0,10000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 9350){
		num = num+0.0075;

		helicopter.velocityX = num;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningEasy();
		spawnFireballsEasy();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			gameState = "end";
			breakFreeSong.stop();
			endSong.play();
		}
		
	} 
	
	else {
		
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",9540,200);
		text("the package!",9590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
			breakFreeSong.stop();
			happySong.play();
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				happySong.stop();
				chooseSong.play();

				gameState = "choose";

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;
				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();

				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "mediumPlay"){
	background(235,235,235);
	image(battlefieldLongBg,-500,0,20000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 19350){
		num = num+0.0075;
		
		helicopter.velocityX = num;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningMedium();
		spawnFireballsMedium();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			gameState = "end";
			breakFreeSong.stop();
			endSong.play();
		}
		
	} else {
		
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",19540,200);
		text("the package!",19590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
			breakFreeSong.stop();
			happySong.play();
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				happySong.stop();
				chooseSong.play();

				gameState = "choose";

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;
				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();
		
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "hardPlay"){
	background(235,235,235);
	image(battlefieldLongerBg,-500,0,40000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 39350){
		num = num+0.0075;

		helicopter.velocityX = num;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningHard();
		spawnFireballsHard();
		spawnBoosters();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(boostersGroup.isTouching(helicopter)){
			energy+=0.5;
		}

		if(energy <= 0){
			gameState = "end";
			breakFreeSong.stop();
			endSong.play();
		}
		
	} else {
		
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",39540,200);
		text("the package!",39590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
			breakFreeSong.stop();
			happySong.play();
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				happySong.stop();
				chooseSong.play();

				gameState = "choose";

				energy = 100;
				term = 0;
				helicopter.x = 200;
				num = 12;
				fireballsGroup.destroyEach();
				lightningGroup.destroyEach();
				boostersGroup.destroyEach();
		
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "end"){
	  background(endBg);
	  helicopter.y = 200;
	  energy = 100;
	  term = 0;
	  num = 12;
	  fireballsGroup.destroyEach();
	  lightningGroup.destroyEach();
	  boostersGroup.destroyEach();
	  helicopter.x = 200;
	  packageObj.x = helicopter.x+10;
	  packageObj.y = helicopter.y+10;
	  camera.position.x = width/2;
	  if(keyDown("r")){
		  gameState = "choose";
		  endSong.stop();
		  chooseSong.play();
	  }
	  textFont("Impact");
	  textSize(75);
	  fill(255);
	  text("Press r to play again...",400,700);
  }

}

function spawnFireballsEasy(){
	if(frameCount % 40 === 0 && helicopter.x <= 8400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.3;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningEasy(){
	if(frameCount % 80 === 0 && helicopter.x <= 8400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/12;
		lightning.scale = random(1,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsMedium(){
	if(frameCount % 35 === 0 && helicopter.x <= 18400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.35;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningMedium(){
	if(frameCount % 75 === 0 && helicopter.x <= 18400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/helicopter.velocityX;
		lightning.scale = random(1.25,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsHard(){
	if(frameCount % 30 === 0 && helicopter.x <= 38400){
		fireball = createSprite(helicopter.x+700,random(250,800));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/helicopter.velocityX;
		fireball.scale = 0.375;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningHard(){
	if(frameCount % 70 === 0 && helicopter.x <= 38400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/helicopter.velocityX;
		lightning.scale = random(1.3,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnBoosters(){
	if(frameCount % 200 === 0 && helicopter.x <= 38400){
		booster = createSprite(helicopter.x+700,random(50,750));
		booster.addImage(boosterImg);
		booster.lifetime = width/helicopter.velocityX;
		booster.scale = 0.25;
		boostersGroup.add(booster);
	}
}