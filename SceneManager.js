'use strict'
function SceneManager(){
	this.scenes = [];
	this.currentScene;
}
SceneManager.prototype.addObjectToScene = function(scene,object){

	if(scene){
		for (var i in this.scenes){
			if(this.scenes[i].name === scene.name ){
				this.scenes[i].objects.push(object)
				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.createNewScene = function(name, stage){
	
	let scene = new Scene(name, [], stage);

	this.scenes.push(scene);

	return scene;
}
SceneManager.prototype.getScene = function(name){
	if(name){
		for (var i in this.scenes){
			if(this.scenes[i].name === name ){
				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.getSceneIndex = function(name){

	function findScene(e){
		return e == name
	}

	return this.scenes.findIndex(findScene);
}
SceneManager.prototype.setCurrentScene = function(scene){
	this.currentScene = scene;

	return this.currentScene;
}
SceneManager.prototype.getCurrentScene = function(){
	return this.currentScene;
}
SceneManager.prototype.updateObject = function(object){
	let id = object.id;
}