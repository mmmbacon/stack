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

				stage.addChild(object.container.children[0]);

				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.addEnemyToScene = function(scene,object){

	if(scene){
		for (var i in this.scenes){
			if(this.scenes[i].name === scene.name ){

				this.scenes[i].objects.push(object);

				this.scenes[i].enemyObjects.push(object);

				stage.addChild(object.container.children[0]);

				return this.scenes[i];
			}
		}
	}
}
SceneManager.prototype.addPlayerToScene = function(scene,object){

	if(scene){
		for (var i in this.scenes){
			if(this.scenes[i].name === scene.name ){

				this.scenes[i].objects.push(object);

				this.scenes[i].playerObjects.push(object);

				stage.addChild(object.container.children[0]);

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
	    	
	    	ay.push(ax);
	    }
	    pixArray.push(ay);

	    populate(scene); 

	    function populate(scene){
	    	//render pixels as Sprites
	    	for (let y = 0; y < pixArray.length; y++){
	    		for (let x = 0; x < pixArray[y].length; x++){
	    			for(let pix = 0; pix < pixArray[y][x].length; pix++){

	    				console.log(pixArray[0][0][0].color);

	    				//RED PIXELS
	    				if(arraysEqual(pixArray[y][x][pix].color, [237,28,36,255]) ){
	    					let id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
	    					let sprite = new PIXI.Sprite(id["7.png"]);
	    					sprite.position.x = pixArray[y][x][pix].position.x;
	    					sprite.position.y = pixArray[y][x][pix].position.y;
	    					container.addChild(sprite);
	    					console.log(container);
	    				}

	    				//BLUE PIXELS - Water - Collidable
	    				if(arraysEqual(pixArray[y][x][pix].color, [0,162,232,255]) ){

	    					let e = new EnvironmentObject("Water", false, false);
	    					e.setType("Water");
	    					let id = PIXI.loader.resources["blocks16x16/blocks16x16.json"].textures;
	    					e.container.children[0] = new PIXI.Sprite(id["90.png"]);

	    					//Undefined or Not water
	    					if(pixArray[y][x][pix-1] === undefined || !arraysEqual(pixArray[y][x][pix-1].color, [0,162,232,255])){ //check left side
	    						if(pixArray[y][x-1] === undefined || !arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["480.png"]);
	    						}else if(pixArray[y][x+1] === undefined || !arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["483.png"]);
	    						}else if(pixArray[y][x][pix+1] === undefined || !arraysEqual(pixArray[y][x][pix+1].color, [0,162,232,255])){
	    							if(arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255]) && arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){
		    							e.solid = true;
		    							e.container.children[0] = new PIXI.Sprite(id["30.png"]);
		    						}
	    						}else{
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["91.png"])
	    						}
	    					}else if(pixArray[y][x][pix+1] === undefined || !arraysEqual(pixArray[y][x][pix+1].color, [0,162,232,255])){ //check right side
	    						if(pixArray[y][x-1] === undefined || !arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["482.png"])
	    						}else if(pixArray[y][x+1] === undefined || !arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["481.png"]);
	    						}else{
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["92.png"])
	    						}
	    					}

	    					//If its Water
	    					else if(!arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255]) && !arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){ //check top and bot for land
	    						e.solid = true;
	    						e.container.children[0] = new PIXI.Sprite(id["60.png"])
	    					}else if(arraysEqual(pixArray[y][x][pix-1].color, [0,162,232,255]) && arraysEqual(pixArray[y][x][pix+1].color, [0,162,232,255])){ //water on both sides (top/bottom shores)
	    						if(pixArray[y][x-1] === undefined || !arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["61.png"])
	    						}else if(pixArray[y][x+1] === undefined || !arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["62.png"])
	    						}else{
	    							e.container.children[0] = new PIXI.Sprite(id["90.png"]);
	    						}
	    					}else if(arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255]) && arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){ //water on top and bottom (left/right shores)
	    						if(pixArray[y][x][pix-1] === undefined || !arraysEqual(pixArray[y][x][pix-1].color, [0,162,232,255])){
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["91.png"])
	    						}else{
	    							e.solid = true;
	    							e.container.children[0] = new PIXI.Sprite(id["92.png"]);
	    						}
	    					}else if(!arraysEqual(pixArray[y][x][pix-1].color, [0,162,232,255]) //water on all four sides
	    								&& !arraysEqual(pixArray[y][x][pix+1].color, [0,162,232,255]) 
	    								&& !arraysEqual(pixArray[y][x-1][pix].color, [0,162,232,255]) 
	    								&& !arraysEqual(pixArray[y][x+1][pix].color, [0,162,232,255])){ 
	    						e.solid = true;
	    						e.container.children[0] = new PIXI.Sprite(id["0.png"]);
	    					}

	    					e.container.children[0].position.x = pixArray[y][x][pix].position.x;
	    					e.container.children[0].position.y = pixArray[y][x][pix].position.y;
	    					scene.collisionObjects.push(e);
	    					container.addChild(e.container.children[0]);
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

	    //Search Tool
	    function arraysEqual(a, b) {

	      if (a === b){
	      	return true;
	      }
	      if (a == null || b == null){
	      	return false;
	      }
	      if (a.length != b.length){
	      	return false;
	      } 

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
