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
						var buttonpressed = true;
					}
					if(controls.down.isDown){
						player.sprite.y += 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.left.isDown){
						player.sprite.x -= 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.right.isDown){
						player.sprite.x += 1 * player.movespeed;
						var buttonpressed = true;
					}
					if(controls.up.isUp && controls.down.isUp && controls.left.isUp && controls.right.isUp){
						anim.stop();
					}else{
						anim.play();
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
		.add("scout_red/scout_red.json")
		.load(setup)

	function setup(){

		var id = PIXI.loader.resources["scout_red/scout_red.json"].textures; 

		var uFrames = [];
		for (var i = 0; i < 2; i++){
			var val = 'u' + i + '.png';
			uFrames.push(PIXI.Texture.fromFrame(val));
		}

		var dFrames = [];
		for (var i = 0; i < 2; i++){
			var val = 'd' + i + '.png';
			dFrames.push(PIXI.Texture.fromFrame(val));
		}

		var lFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'l' + i + '.png';
			lFrames.push(PIXI.Texture.fromFrame(val));
		}

		var rFrames = [];
		for (var i = 0; i < 4; i++){
			var val = 'r' + i + '.png';
			rFrames.push(PIXI.Texture.fromFrame(val));
		}

		anim = new PIXI.extras.AnimatedSprite(uFrames);
		anim.animationSpeed = 0.1;
		anim.play();

		//Setup Controls
		let up = Controls(87),
			down = Controls(83),
			left = Controls(65),
			right = Controls(68);

		controls.up.press = function() {
		  player.setSprite(uFrames);
		};
		controls.down.press = function() {
		  player.setSprite(dFrames);
		};
		controls.left.press = function() {
		  player.setSprite(lFrames);
		};
		controls.right.press = function() {
		  player.setSprite(rFrames);
		};

		//Set current scene
		let scene = sm.createNewScene('scene1', stage);
		sm.setCurrentScene(scene);
		let currentScene = sm.getCurrentScene();

		//Create generic player for testing
		player = new Player('drizzt', 'rogue', 'dark elf');
		player.setSprite(anim);
		sm.addObjectToScene(currentScene, player);

		//For all gameobjects in scene, add to stage
		for(var i in sm.currentScene.objects){
			stage.addChild(sm.currentScene.objects[i].sprite);
		}

		Update(currentScene, player);
	}
}

Init();