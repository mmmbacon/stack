'use strict'
function Player(name){

	GameObject.call(this, 0, 0, name);
	this.playerclass;
	this.race;
	this.damage = 0;
	this.movespeed = 1;
	this.anim;
	this.sprite;
	this.frames = [];
}
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
Player.prototype.move = function(){
}
Player.prototype.setName = function(name){

	this.name = name;
}
Player.prototype.setRace = function(race){

	this.race = race;
}
Player.prototype.setClass = function(playerClass){
	if(playerClass === "Scout"){
		//set up sprites
		var id = PIXI.loader.resources["scout_red/SCOUT_RED.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'U' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(uFrames);

		var dFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'D' + i + '.png';
			dFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(dFrames);

		var lFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'L' + i + '.png';
			lFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(lFrames);

		var rFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'R' + i + '.png';
			rFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(rFrames);

		this.class = playerClass;
		this.anim = new PIXI.extras.AnimatedSprite(dFrames);
		this.anim.animationSpeed = 0.1;
		this.sprite = this.anim;
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
Player.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;
}
Player.prototype.getPosition = function(){
	return {
		x: this.x,
		y: this.y
	}
}
Player.prototype.setDirection = function(direction){
	if(direction === "Up"){
		this.sprite.textures = this.frames[0];
	}
	if(direction === "Down"){
		this.sprite.textures = this.frames[1];
	}
	if(direction === "Left"){
		this.sprite.textures = this.frames[2];
	}
	if(direction === "Right"){
		this.sprite.textures = this.frames[3];
	}
}
Player.prototype.setSprite = function(sprite){
	if(this.sprite){
		this.sprite.textures = sprite;
	}else{
		this.sprite = sprite;
	}	
}
Player.prototype.checkCollisions = function(){

	for (var i in sm.currentScene.collisionObjects){
		if(bump.hit(this.sprite, sm.currentScene.collisionObjects[i].sprite, sm.currentScene.collisionObjects[i].solid, true, false)){
			if(sm.currentScene.collisionObjects[i].name === "Tree"){
				
			}
		}

		if(bump.hit(this.sprite, sm.currentScene.collisionObjects[i].sprite, sm.currentScene.collisionObjects[i].solid, true, false)){
			if(sm.currentScene.collisionObjects[i].name === "Shop"){
				
			}
		}
	}
	
}