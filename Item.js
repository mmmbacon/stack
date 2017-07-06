'use strict'
function Item(name, solid, interactive, labelText){
	GameObject.call(this, 0, 0, name);

	this.type;
	this.damage;
	this.health;
	this.value;
	this.container.children[0];
	this.solid = solid;
	this.label;
	this.labelText = labelText;
	this.labelVisible = false;
	this.interactive = interactive;
}

Item.prototype = Object.create(GameObject.prototype);
Item.prototype.constructor = Item;

Item.prototype.setType = function(type){

	if(type === "Loot"){
		this.type = type;
		var id = PIXI.loader.resources["items16x16/items16x16.json"].textures;
		this.container.children[0] = new PIXI.Sprite(id["E19.png"]);
	}
}
Item.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;

	this.container.children[0].position.x = this.x;
	this.container.children[0].position.y = this.y;
}
Item.prototype.labelCreate = function(){

	if(!this.labelVisible){
		let style = new PIXI.TextStyle({
			fill: 'black',
			fontSize: 10
		});
		this.label = new PIXI.Text(this.labelText, style);
		this.label.position.x = this.container.children[0].position.x + 12;
		this.label.position.y = this.container.children[0].position.y - 12;
		stage.addChild(this.label);
		this.labelVisible = true;
	}
	
}
Item.prototype.labelDestroy = function(){

	if(this.labelVisible){
		stage.removeChild(this.label);
		this.labelVisible = false;
	}
	
}