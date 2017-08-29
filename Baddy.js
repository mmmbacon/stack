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

	this.line = new PIXI.Graphics();
	
	stage.addChild(this.line);
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

	this.line.clear();
	this.line.lineStyle(1, 0xf3a33f);
	this.line.alpha = 1;
	this.line.moveTo(player.container.children[0].x, player.container.children[0].y);
	this.line.lineTo(this.container.children[0].x, this.container.children[0].y);
	
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

			var px = player.container.children[0].x;
			var py = player.container.children[0].y;
			var deltaX = this.container.children[0].x - px;
			var deltaY = this.container.children[0].y - py;
		}

		if(this.container.children[0].x - player.container.children[0].x > 0 ){
			this.direction = Math.acos((this.container.children[0].x - player.container.children[0].x)/(this.container.children[0].y - player.container.children[0].y)) * (180/Math.PI) + 180; 
			this.move(this.direction, 0.2);
		}else{

		}

		if(this.container.children[0].y - player.container.children[0].y < 0 ){
			this.direction = Math.acos((this.container.children[0].x - player.container.children[0].x)/(this.container.children[0].y - player.container.children[0].y)) * (180/Math.PI) + 180; 
			this.move(this.direction, 0.2);
		}else{

		}
		
	}
}
