'use strict'
function GameObject(x,y,name){
	this.x = x;
	this.y = y;
	this.container = new PIXI.Container();
	this.name = name;
	this.UUID = generateUUID();

	function generateUUID () { // Public Domain/MIT
	    var d = new Date().getTime();
	    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
	        d += performance.now(); //use high-precision timer if available
	    }
	    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	        var r = (d + Math.random() * 16) % 16 | 0;
	        d = Math.floor(d / 16);
	        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	    });
	}
}

GameObject.prototype.setName = function(name){
	this.name = name;
}
GameObject.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;

	this.container.children[0].position.x = this.x;
	this.container.children[0].position.y = this.y;
	
}
GameObject.prototype.move = function(angle, speed){

	let movX = Math.cos( angle ) * speed;
	let movY = Math.sin( angle ) * speed;

	this.container.children[0].position.x += movX;
	this.container.children[0].position.y += movY;
}
GameObject.prototype.getPosition = function(){
	return {
		x: this.x,
		y: this.y
	}
}
GameObject.prototype.setSprite = function(sprite){
	if(this.container.children[0]){
		this.container.children[0].textures = sprite;
	}else{
		this.container.addChild = sprite;
	}	
}


