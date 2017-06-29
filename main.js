'use strict'
let running = true;
var renderer = new PIXI.autoDetectRenderer(256, 256,{antialias: false, transparent: false, resolution: 1});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var sm = new SceneManager();

var controls = {
	up: Controls(87),
	down: Controls(83),
	left: Controls(65),
	right: Controls(68),
}

var player, spriteMap;

let Update = function(){
	if (running){
		window.requestAnimationFrame(Update);

		//render currentScene
		if(sm.currentScene){
			if(sm.currentScene.stage){
				if(player){
					if(controls.up.isDown){
						player.spriteMap.y -= 1 * player.movespeed;
						player.setSprite(spriteMap[0]);
						var buttonpressed = true;
					}
					if(controls.down.isDown){
						player.spriteMap.y += 1 * player.movespeed;
						player.setSprite(spriteMap[1]);
						var buttonpressed = true;
					}
					if(controls.left.isDown){
						player.spriteMap.x -= 1 * player.movespeed;
						player.setSprite(spriteMap[2]);
						var buttonpressed = true;
					}
					if(controls.right.isDown){
						player.spriteMap.x += 1 * player.movespeed;
						player.setSprite(spriteMap[3]);
						var buttonpressed = true;
					}
				}
				renderer.render(sm.currentScene.stage);
			}
		}
	}
}

let Init = function(){

	//Load all images
	PIXI.loader
		.add("stacky.png")
		.add("scout_red/scout_red.json")
		.load(setup)

	function setup(){

		var id = PIXI.loader.resources["scout_red/scout_red.json"].textures; 

		spriteMap = [];

		spriteMap[0] = new PIXI.Sprite(id["36.png"]);
		spriteMap[1] = new PIXI.Sprite(id["1.png"]);
		spriteMap[2] = new PIXI.Sprite(id["13.png"]);
		spriteMap[3] = new PIXI.Sprite(id["24.png"]);


		//Setup Controls
		let up = Controls(87),
			down = Controls(83),
			left = Controls(65),
			right = Controls(68);

		//Set current scene
		let scene = sm.createNewScene('scene1', stage);
		sm.setCurrentScene(scene);
		let currentScene = sm.getCurrentScene();

		//Create generic player for testing
		player = new Player('drizzt', 'rogue', 'dark elf');
		player.setSprite(spriteMap[1]);
		sm.addObjectToScene(currentScene, player);

		//For all gameobjects in scene, add to stage
		for(var i in sm.currentScene.objects){
			stage.addChild(sm.currentScene.objects[i].spriteMap)
		}

		Update(currentScene, player);
	}

	
}

Init();