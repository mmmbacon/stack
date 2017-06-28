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

var player;

let Update = function(){
	if (running){
		window.requestAnimationFrame(Update);

		//render currentScene
		if(sm.currentScene){
			if(sm.currentScene.stage){
				if(player){
					if(controls.up.isDown){
						player.spriteMap.y -= 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.down.isDown){
						player.spriteMap.y += 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.left.isDown){
						player.spriteMap.x -= 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.right.isDown){
						player.spriteMap.x += 1 * player.movespeed;
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
		.load(setup)

	function setup(){

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
		let sprite = new PIXI.Sprite(PIXI.loader.resources["stacky.png"].texture);
		player = new Player('drizzt', 'rogue', 'dark elf');
		player.setSprite(sprite);
		sm.addObjectToScene(currentScene, player);

		//For all gameobjects in scene, add to stage
		for(var i in sm.currentScene.objects){
			stage.addChild(sm.currentScene.objects[i].spriteMap)
		}

		Update(currentScene, player);
	}

	
}

Init();