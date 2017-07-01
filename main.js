'use strict'
let running = true;
var renderer = new PIXI.autoDetectRenderer(256, 256,{antialias: false, transparent: false, resolution: 1});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var sm = new SceneManager();
let bump = new Bump(PIXI);

const PLAYERCOLLIDABLEOBJECTS = [
	{"name" : "Tree"}
]

var controls = {
	up: Controls(87),
	down: Controls(83),
	left: Controls(65),
	right: Controls(68),
}

var player, spriteMap, anim;

let Update = function(){
	if (running){
		window.requestAnimationFrame(Update);

		//render currentScene
		if(sm.currentScene){
			if(sm.currentScene.stage){
				if(player){
					if(controls.up.isDown){
						player.sprite.y -= 1 * player.movespeed;
					}
					if(controls.down.isDown){
						player.sprite.y += 1 * player.movespeed;
					}
					if(controls.left.isDown){
						player.sprite.x -= 1 * player.movespeed;
					}
					if(controls.right.isDown){
						player.sprite.x += 1 * player.movespeed;
					}
					if(controls.up.isUp && controls.down.isUp && controls.left.isUp && controls.right.isUp){
						player.setAnimationState("Stop")
					}else{
						player.setAnimationState("Play")
					}
				}
				renderer.render(sm.currentScene.stage);
			}
		}

		player.checkCollisions();
	}
}

let Init = function(){

	//Load all images
	PIXI.loader
		.add("scout_red/SCOUT_RED.json")
		.add("blocks16x16/blocks16x16.json")
		.load(setup)

	function setup(){

		//Set current scene
		let scene = sm.createNewScene('scene1', stage);
		sm.setCurrentScene(scene);
		let currentScene = sm.getCurrentScene();

		//Create generic player for testing
		player = new Player("Drizzt");
		player.setClass("Scout");
		player.setRace("Dark-Elf");
		sm.addObjectToScene(currentScene, player);

		//Create generic tree for collision testing
		let tree = new EnvironmentObject("Tree", true);
		tree.setType("Tree");
		tree.setPosition(50,50);
		sm.addObjectToScene(currentScene, tree, true);

		let rock = new EnvironmentObject("Rock", true);
		rock.setType("Rock");
		rock.setPosition(75,80);
		sm.addObjectToScene(currentScene, rock);

		let shop = new EnvironmentObject("Shop", true);
		shop.setType("Shop");
		shop.setPosition(30,30)
		sm.addObjectToScene(currentScene, shop, true);

		//Set controls on player
		controls.up.press = function() {
		  player.setDirection("Up");
		};
		controls.down.press = function() {
		  player.setDirection("Down");
		};
		controls.left.press = function() {
		  player.setDirection("Left");
		};
		controls.right.press = function() {
		  player.setDirection("Right");
		};

		//For all gameobjects in scene, add to stage
		for(var i in sm.currentScene.objects){
			stage.addChild(sm.currentScene.objects[i].sprite);
		}

		Update(currentScene, player);
	}
}

let Collision = function(a,b){
	bump.hitTestRectangle(a,b);
}

Init();