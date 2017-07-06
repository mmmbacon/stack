'use strict'
function Scene(name, objects, collisionObjects, playerObjects, uiObjects, stage){
	this.name = name;
	this.objects = objects;
	this.collisionObjects = collisionObjects;
	this.playerObjects = playerObjects;
	this.uiObjects = uiObjects;
	this.stage = stage;
}