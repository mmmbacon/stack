'use strict'

function Baddy(type){
	GameObject.call(this, 0, 0, name);
	this.type;
	this.damage = 0;
	this.health = 10;
	this.movespeed = 1;
	this.anim;
	this.frames = [];
	this.state = "Neutral";
}

Baddy.prototype = Object.create(GameObject.prototype);
Baddy.prototype.constructor = Baddy;
Baddy.prototype.setType = function(type){
	this.type = type;
}
Baddy.prototype.setAnimationState = function(state){
	if (state === "Neutral"){
		//set up sprites
		var id = PIXI.loader.resources["monsters/CrabNeutral.json"].textures; 
		this.container.children[0] = new PIXI.Sprite(id["Crab1.png"])
		this.container.children[0].anchor.set(0.5, 0.5);
	}
	if (state === "Aggro"){
		//set up sprites
		var id = PIXI.loader.resources["monsters/CrabAggro.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'Crab' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}

		this.type = type;
		this.anim = new PIXI.extras.AnimatedSprite(uFrames);
		this.anim.animationSpeed = 0.1;
		this.container.children[0] = this.anim;
		this.container.children[0].anchor.set(0.5, 0.5);
		this.anim.play();
	}
	if(state === "Stop"){
		this.anim.stop();
	}
}
Baddy.prototype.setState = function(state){
	this.state = state;
}
Baddy.prototype.setNewCollisionZone = function(radius){
	var circle = new PIXI.Graphics();
	circle.drawCircle(this.x, this.y, radius);
	this.container.addChild(circle);
}