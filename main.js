'use strict'
let running = true;
let renderer = new PIXI.autoDetectRenderer(1024, 1024,{antialias: false, transparent: false, resolution: 1});
document.body.appendChild(renderer.view);
let stage = new PIXI.Container();
let sm = new SceneManager();
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

					let angle = Math.atan2(navigator.getGamepads()[0].axes[1], navigator.getGamepads()[0].axes[0]);

					//Set Deadzone
					if(navigator.getGamepads()[0].axes[1] > 0.5 || 
						navigator.getGamepads()[0].axes[1] < -0.5 || 
						navigator.getGamepads()[0].axes[0] > 0.5 || 
						navigator.getGamepads()[0].axes[0] < -0.5)
					{
						player.setAnimationState("Play");
						player.move(angle,player.movespeed);
						player.setDirection(angle);
					}else{
						player.setAnimationState("Stop");
					}
						
					

					/*if(controls.up.isDown){
						player.move(Math.PI+Math.PI/2, player.movespeed);
					}
					if(controls.down.isDown){
						player.move(Math.PI/2, player.movespeed);
					}
					if(controls.left.isDown){
						player.move(Math.PI, player.movespeed);
					}
					if(controls.right.isDown){
						player.move(0, player.movespeed);
					}*/
					/*if(controls.up.isUp && controls.down.isUp && controls.left.isUp && controls.right.isUp){
						player.setAnimationState("Stop")
					}else{
						player.setAnimationState("Play")
					}*/
				}
				renderer.render(sm.currentScene.stage);
			}
		}

		if(player){
			player.checkCollisions();
		}

		for (var i in sm.currentScene.enemyObjects){
			sm.currentScene.enemyObjects[i].Update();
		}
	}
}

let Init = function(){

	//Load all images
	PIXI.loader
		.add("scout_red/SCOUT_RED.json")
		.add("blocks16x16/blocks16x16.json")
		.add("items16x16/items16x16.json")
		.add("monsters/CrabAggro.json")
		.add("monsters/CrabNeutral.json")
		.add("buildings/shop1.png")
		.load(setup)

	function setup(){

		//Set current scene
		let scene = sm.createNewScene('scene1', stage);
		sm.setCurrentScene(scene);
		let currentScene = sm.getCurrentScene();
		sm.generateLevel('levels/world1.png', currentScene)

		//Create generic tree for collision testing
		let tree = new EnvironmentObject("Tree", true, false);
		tree.setType("Tree");
		tree.setPosition(7*16, 0*16);
		sm.addObjectToScene(currentScene, tree, true);

		let rock = new EnvironmentObject("Rock", true, false);
		rock.setType("Rock");
		rock.setPosition(2*16, 7*16);
		sm.addObjectToScene(currentScene, rock, true);

		let shop = new EnvironmentObject("Shop", false, true, "Shop [Press E]");
		shop.setType("Shop");
		shop.setPosition(3*16, 8*16);
		sm.addObjectToScene(currentScene, shop, true);

		let item = new Item("Loot", false, true, "Loot [Press E]");
		item.setType("Loot");
		item.setPosition(4*16, 8*16);
		sm.addObjectToScene(currentScene, item, true);

		//Create generic player for testing
		player = new Player("Drizzt");
		player.setClass("Scout");
		player.setRace("Dark-Elf");
		sm.addPlayerToScene(currentScene, player);

		let monster1 = new Baddy("Crab", 5*16, 5*16);
		monster1.setType("Crab");
		monster1.setAnimationState("Neutral");
		monster1.setPosition(3*16,6*16);
		sm.addEnemyToScene(currentScene, monster1);

		//Set controls on player
		/*controls.up.press = function() {
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
		};*/

		Update();
	}
}

Init();