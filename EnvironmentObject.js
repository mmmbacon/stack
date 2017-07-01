'use strict'
function EnvironmentObject(name, solid, labelled){
	GameObject.call(this, 0, 0, name);

	this.anim;
	this.sprite;
	this.frames = [];
	this.solid = solid;
	this.labelled = labelled;
}

EnvironmentObject.prototype.setType = function(type){

	if(type === "Tree"){
		var id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
		this.sprite = new PIXI.Sprite(id["360.png"]);
	}
	if(type === "Rock"){
		var id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
		this.sprite = new PIXI.Sprite(id["337.png"]);
	}
	if(type === "Shop"){
		var id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
		this.sprite = new PIXI.Sprite(id["15.png"]);
	}

}

EnvironmentObject.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;

	this.sprite.position.x = this.x;
	this.sprite.position.y = this.y;
}