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
	this.tickTime = Date.now();
	this.direction = 180;
	this.target;
	
	this.movementPatterns = "LR";
	this.movePattern = "LR";
}

Baddy.prototype = Object.create(GameObject.prototype);
Baddy.prototype.constructor = Baddy;
Baddy.prototype.setType = function(type){
	this.type = type;
}
Baddy.prototype.setAnimationState = function(state){
	if (state === "Neutral"){
		//set up sprites
		this.state = "Neutral";
		var id = PIXI.loader.resources["monsters/CrabAggro.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'Crab' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}

		this.anim = new PIXI.extras.AnimatedSprite(uFrames);
		this.anim.animationSpeed = 0.05;
		this.container.children[0] = this.anim;
		this.container.children[0].anchor.set(0.5, 0.5);
		this.anim.play();
	}
	if (state === "Aggro"){

		this.state = "Aggro"
		//set up sprites
		
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
Baddy.prototype.setNewCollisionZone = function(radius){
	var circle = new PIXI.Graphics();
	//circle.beginFill(0x9966FF);
	//circle.drawCircle(this.x, this.y, radius);
	//circle.endFill();
	//this.container.addChild(circle);
	//stage.addChild(this.container);
}
Baddy.prototype.setTarget = function(target){
	this.target = target;
}

Baddy.prototype.Update = function(){
	
	if(this.state === "Neutral"){
		//roam
		if(this.movePattern == "LR"){
			this.move(this.direction, 0.5);
			if((Date.now() - this.tickTime) > 1000 ){
				//flip direction 180 - L/R
				console.log("tick");
				this.direction += 180 ;
				this.tickTime = Date.now();
			}
		}
		

	}else if(this.state === "Aggro"){
		//get targeted player entity
		if(this.target){
			this.direction = Math.atan((this.container.children[0].x - player.container.children[0].x)/(this.container.children[0].y - player.container.children[0].y)) * (180/Math.PI) + 180; 
			this.move(this.direction, 0.5)
		}
		//see if player is in range every x tick
		if((Date.now() - this.tickTime) > 1000 ){
		}
	}
}
