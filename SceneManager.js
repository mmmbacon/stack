'use strict'
function SceneManager(){
	this.scenes = [];
	this.currentScene;
}
SceneManager.prototype.addObjectToScene = function(scene,object, collidable){

	if(scene){
		for (var i in this.scenes){
			if(this.scenes[i].name === scene.name ){

				this.scenes[i].objects.push(object);

				if(collidable){
					this.scenes[i].collisionObjects.push(object);
				}

				stage.addChild(object.sprite);

				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.addUIObjectToScene = function(scene,object){

	if(scene){
		for (var i in this.scenes){
			if(this.scenes[i].name === scene.name ){
				this.scenes[i].uiObjects.push(object);
				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.createNewScene = function(name, stage){
	
	let scene = new Scene(name, [], [], [], [], stage);

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
SceneManager.prototype.generateLevel = function(imgsrc, scene){

	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");

	canvas.width = 1024 / 16;
	canvas.height = 1024 / 16;

	let img = new Image();
	img.src = imgsrc;

	//Terrain Loader
	img.onload = function () {
	    ctx.drawImage(img, 0, 0);
	    let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
	    let data = imgData.data;
	    let pixArray = [];
	    let ay = [];
	    let ax = [];
	    let pix = [];
	    let spriteArray = [];
	    let container = new PIXI.Container();
	    let xx = 0;

	    //Iterates through a png file and generates a pixel array for later parsing by the level generator.
	    for (let y = 0; y < canvas.height; y++){
	    	ax = [];
	    	for (let x = 0; x < canvas.width; x++){
	    		for (let i = 0; i < 4; i++){
	    			pix.push(data[ i + xx ]);
	    		}
	    		ax.push({
	    			color: pix,
	    			position: {
	    				x: x * 16,
	    				y: y * 16
	    			}
	    		});
	    		pix = [];
	    		xx = xx + 4;
	    	}
	    	
	    	ay.push(ax)
	    }
	    pixArray.push(ay);

	    populate(scene); 

	    function populate(scene){
	    	//render pixels as Sprites
	    	for (let y in pixArray){
	    		for (let x in pixArray[y]){
	    			for(let pix in pixArray[y][x]){

	    				//RED PIXELS
	    				if(arraysEqual(pixArray[y][x][pix].color, [237,28,36,255]) ){
	    					let id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
	    					let sprite = new PIXI.Sprite(id["7.png"]);
	    					sprite.position.x = pixArray[y][x][pix].position.x;
	    					sprite.position.y = pixArray[y][x][pix].position.y;
	    					container.addChild(sprite);
	    				}

	    				//BLUE PIXELS - Water - Collidable
	    				if(arraysEqual(pixArray[y][x][pix].color, [0,162,232,255]) ){

	    					let e = new EnvironmentObject("Water", true, false, "");
	    					let id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
	    					e.sprite = new PIXI.Sprite(id["90.png"]);
	    					e.sprite.position.x = pixArray[y][x][pix].position.x;
	    					e.sprite.position.y = pixArray[y][x][pix].position.y;
	    					scene.collisionObjects.push(e);
	    					stage.addChild(e.sprite);
	    				}

	    				//BROWN PIXELS
	    				if(arraysEqual(pixArray[y][x][pix].color, [185,122,87,255]) ){
	    					let id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
	    					let sprite = new PIXI.Sprite(id["70.png"]);
	    					sprite.position.x = pixArray[y][x][pix].position.x;
	    					sprite.position.y = pixArray[y][x][pix].position.y;
	    					container.addChild(sprite);
	    				}
	    			}
	    		}
	    	}
	    }

	    stage.addChildAt(container,0);

	    function arraysEqual(a, b) {
	      if (a === b) return true;
	      if (a == null || b == null) return false;
	      if (a.length != b.length) return false;

	      for (var i = 0; i < a.length; ++i) {
	        if (a[i] !== b[i]) return false;
	      }
	      return true;
	    }
	};	                
	                

}
SceneManager.prototype.getCurrentScene = function(){
	return this.currentScene;
}
SceneManager.prototype.updateObject = function(object){
	let id = object.id;
}
