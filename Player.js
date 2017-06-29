'use strict'
function Player(name, playerclass, race, sprite, UUID){

	GameObject.call(this, 0, 0, name, sprite, UUID)
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
Player.prototype.setSprite = function(sprite){
	if(this.sprite){
		this.sprite.textures = sprite;
	}else{
		this.sprite = sprite;
	}
	
}