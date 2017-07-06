'use strict'
function EnvironmentObject(name, solid, interactive, labelText){
	GameObject.call(this, 0, 0, name);

	this.anim;
	this.type;
	this.sprite;
	this.frames = [];
	this.solid = solid;
	this.label;
	this.labelText = labelText;
	this.labelVisible = false;
	this.interactive = interactive;
}

EnvironmentObject.prototype.setType = function(type){

	if(type === "Tree"){
		this.type = type;
		var id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
		this.sprite = new PIXI.Sprite(id["360.png"]);
	}
	if(type === "Rock"){
		this.type = type;
		var id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
		this.sprite = new PIXI.Sprite(id["337.png"]);
	}
	if(type === "Shop"){
		this.type = type;
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
EnvironmentObject.prototype.labelCreate = function(){

	if(!this.labelVisible){
		let style = new PIXI.TextStyle({
			fill: 'black',
			fontSize: 10
		});
		this.label = new PIXI.Text(this.labelText, style);
		this.label.position.x = this.sprite.position.x + 12;
		this.label.position.y = this.sprite.position.y - 12;
		stage.addChild(this.label);
		this.labelVisible = true;
	}
	
}
EnvironmentObject.prototype.labelDestroy = function(){

	if(this.labelVisible){
		stage.removeChild(this.label);
		this.labelVisible = false;
	}
	
}
