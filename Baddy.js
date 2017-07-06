'use strict'

function Baddy(type){
	GameObject.call(this, 0, 0, name);
	this.type;
	this.damage = 0;
	this.health = 10;
	this.movespeed = 1;
	this.anim;
	this.sprite;
	this.frames = [];
}

Baddy.prototype = Object.create(GameObject.prototype);
Baddy.prototype.constructor = Baddy;
Baddy.prototype.move = function(){
}
Baddy.prototype.setName = function(name){

	this.name = name;
}
Baddy.prototype.setType = function(type){
	if(type === "Crab"){
		//set up sprites
		var id = PIXI.loader.resources["monsters/crab1.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 2; i++){
			var val = 'Crab' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}
		this.frames.push(uFrames);

		this.type = type;
		this.anim = new PIXI.extras.AnimatedSprite(uFrames);
		this.anim.animationSpeed = 0.1;
		this.sprite = this.anim;
		this.anim.play();
	}
}
Baddy.prototype.setSprite = function(sprite){
	if(this.sprite){
		this.sprite.textures = sprite;
	}else{
		this.sprite = sprite;
	}	
}
Baddy.prototype.setAnimationState = function(state){
	if (state === "Play"){
		this.anim.play();
	}
	if(state === "Stop"){
		this.anim.stop();
	}
}

Baddy.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;
}
Baddy.prototype.getPosition = function(){
	return {
		x: this.x,
		y: this.y
	}
}
Baddy.prototype.setDirection = function(direction){
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

Baddy.prototype.checkCollisions = function(){

}