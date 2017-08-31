'use strict'

function Baddy(type){
	GameObject.call(this, 0, 0, name);
	this.type;
	this.damage = 0;
	this.health = 10;
	this.movespeed = 1;
	this.vision = 50;
	this.anim;
	this.frames = [];
	this.state = "Neutral";
	this.tickTime = Date.now();
	this.target;
	this.direction = 0;
	
	this.movementPatterns = "LR";
	this.movePattern = "LR";

	//Debug
	this.line = new PIXI.Graphics();
	
	stage.addChild(this.line);

	//Set Up Sprites

	var id = PIXI.loader.resources["monsters/CrabAggro.json"].textures; 

	var uFrames = [];
	for (var i = 1; i < 3; i++){
		var val = 'Crab' + i + '.png';
		uFrames.push(PIXI.Texture.fromFrame(val));
	}
	this.anim = new PIXI.extras.AnimatedSprite(uFrames);
	this.container.children[0] = this.anim;
	this.container.children[0].anchor.set(0.5, 0.5);
}

Baddy.prototype = Object.create(GameObject.prototype);
Baddy.prototype.constructor = Baddy;
Baddy.prototype.setType = function(type){
	this.type = type;
}
Baddy.prototype.setAnimationState = function(state){
	if (state === "Neutral"){

		this.state = "Neutral";
		this.anim.animationSpeed = 0.05;
		this.anim.play();
	}
	if (state === "Aggro"){

		this.state = "Aggro"
		this.anim.animationSpeed = 0.15;
		this.anim.play();
	}
	if(state === "Stop"){
		this.anim.stop();
	}
}
Baddy.prototype.setState = function(state){
	this.state = state;
}

Baddy.prototype.setTarget = function(target){
	this.target = target;
}

Baddy.prototype.Update = function(){

	this.x = this.container.children[0].x;
	this.y = this.container.children[0].y;

	this.line.clear();
	

	let y = this.x - player.container.children[0].x;
	let x = this.y - player.container.children[0].y;
	let h = Math.sqrt( x*x + y*y );

	if(h < this.vision){
		this.line.lineStyle(1, 0xf3a33f);
		this.line.alpha = 1;
		this.line.moveTo(player.container.children[0].x, player.container.children[0].y);
		this.line.lineTo(this.x, this.y);
		this.setAnimationState("Aggro");
		this.direction = Math.atan2((this.container.children[0].y - player.container.children[0].y),(this.container.children[0].x - player.container.children[0].x));
		this.move(this.direction + Math.PI, 0.75);	
	}else{
		this.setAnimationState("Neutral");
		if(this.movePattern == "LR"){
			this.move(this.direction, 0.5);
			if((Date.now() - this.tickTime) > 1000 ){
				//flip direction 180 - L/R
				if(this.direction == 0){
					this.direction = Math.PI;
				}else{
					this.direction = 0;
				}
				this.tickTime = Date.now();
			}
		}
	}
}
