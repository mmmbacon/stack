'use strict'
function Player(name, playerclass, race, spriteMap){

	GameObject.call(this, 0, 0, name, spriteMap)
	this.playerclass = playerclass;
	this.race = race;
	this.damage = 0;
	this.movespeed = 1;
}
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;
Player.prototype.move = function(){

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
Player.prototype.setSprite = function(spriteMap){
	//Temp values for testing
	let pos = new PIXI.Point(35, 35);
	spriteMap.position = pos;
	spriteMap.height = 35;
	spriteMap.width = 35;
	this.spriteMap = spriteMap;
}