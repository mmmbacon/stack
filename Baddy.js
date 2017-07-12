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
		this.state = "Neutral";
		var id = PIXI.loader.resources["monsters/CrabAggro.json"].textures; 

		var uFrames = [];
		for (var i = 1; i < 3; i++){
			var val = 'Crab' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}

		this.anim = new PIXI.extras.AnimatedSprite(uFrames);
		this.anim.animationSpeed = 0;
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

Baddy.prototype.Update = function(){
	
	if(this.state === "Neutral"){
		//walk around
		let currentPos = {x: this.x, y: this.y};

		for (var x = 0; x > -64; x--){
			this.setPosition(this.x-0.01, this.y-0);
			if(this.x)
		}

	}else if(this.state === "Aggro"){
		//chase player
	}
}
