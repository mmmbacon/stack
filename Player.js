'use strict'
function Player(name){

	GameObject.call(this, 0, 0, name);
	this.playerclass;
	this.race;
	this.damage = 0;
	this.movespeed = 1;
	this.anim;
	this.frames = [];
	this.collidingObjects = [];
	this.items = [];
}
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
Player.prototype.setRace = function(race){

	this.race = race;
}
Player.prototype.setClass = function(playerClass){
	if(playerClass === "Scout"){
		//set up sprites
		var id = PIXI.loader.resources["scout_red/SCOUT_RED.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'PU' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(uFrames);

		var dFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'PD' + i + '.png';
			dFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(dFrames);

		var lFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'PL' + i + '.png';
			lFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(lFrames);

		var rFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'PR' + i + '.png';
			rFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(rFrames);

		this.class = playerClass;
		this.anim = new PIXI.extras.AnimatedSprite(dFrames);
		this.anim.animationSpeed = 0.1;
		this.container.children[0] = this.anim;
		this.anim.play();
	}
}
Player.prototype.setAnimationState = function(state){
	if (state === "Play"){
		this.anim.play();
	}
	if(state === "Stop"){
		this.anim.stop();
	}
}
Player.prototype.setDirection = function(angle){

	if(angle < Math.PI/4 || angle > Math.PI/4*-1){
		this.container.children[0].textures = this.frames[3];
	}

	if(angle > Math.PI/4 || angle < Math.PI/4*-1){
		this.container.children[0].textures = this.frames[2];
	}

	if(angle > Math.PI/4 && angle < Math.PI/4*3){
		this.container.children[0].textures = this.frames[1];
	}

	if(angle < Math.PI/4*-1 && angle > Math.PI/4*-3){
		this.container.children[0].textures = this.frames[0];
	}

	console.log(angle)
}

Player.prototype.checkCollisions = function(){

	//check for collisions with enemies
	for (var i in sm.currentScene.enemyObjects){
		if(!bump.hit(this.container.children[0], sm.currentScene.enemyObjects[i].container.children, true, true, false, function(col, enemy){

			function findObject(r){
				return r.container.children[0] === enemy;
			}

			var target = sm.currentScene.enemyObjects.find(findObject);

			target.setAnimationState("Aggro");
			target.setTarget(player);

		}));
	}
	
	//Check for collisions with environment objects
	for (var i in sm.currentScene.collisionObjects){ //collision objects could be broken down into more categories later to improve performance
		if(!bump.hit(this.container.children[0], sm.currentScene.collisionObjects[i].container.children, sm.currentScene.collisionObjects[i].solid, false, true)){
			if(sm.currentScene.collisionObjects[i].interactive === true){
				let a = sm.currentScene.collisionObjects[i];
				a.labelDestroy();
			}
		}else{
			if(sm.currentScene.collisionObjects[i].interactive === true){
				let a = sm.currentScene.collisionObjects[i];
				a.labelCreate();
			}
		}
			
	}	
}

