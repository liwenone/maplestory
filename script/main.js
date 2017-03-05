window.resource = new Resource();
window.music_manager = new MusicManager();

window.monster_factory = new MonsterFactory();
window.monster_skill_effect_factory = new MonsterSkillEffectFactory();
window.monster_skill_hit_factory = new MonsterSkillHitFactory();

window.number_factory = new NumberFactory();
window.skill_effect_factory = new SkillEffectFactory();
window.skill_hit_factory = new SkillHitFactory();
window.skill_action_factory = new SkillActionFactory();

window.money_factory = new MoneyFactory();
window.things_factory = new ThingsFactory();
window.tips_factory = new TipsFactory();
window.des_factory = new DesFactory();
window.properties_factory = new PropertiesFactory();

window.skills_attr = new SkillsAttr().getSkillsAttr();
window.player_attr = new PlayerAttr();
window.monsters_attr = new MonstersAttr().getMonstersAttr();

window.percent = new Percent();

function $(id) {
	return document.getElementById(id);
}

window.onload = function() {
	
	$("start_btn").onclick = function() {
		window.switchUI("select");
	}

	$("help_btn").onclick = function() {
		window.switchUI("help");
	}

	$("left_img").onclick = function() {
		start("male");
	}

	$("right_img").onclick = function() {
		start("female");
	}
	
	var canvas = $("canvas");
	var ctx = canvas.getContext("2d");
		ctx.textAlign = "center";
		ctx.textBaseLine = "top";
		ctx.font = "14px 微软雅黑 bold";
		ctx.fillStyle = "black";

	this.thread = setInterval(function() {
		if (window.resource.curr_amount == window.resource.total_amount) {
			clearInterval(thread);
			$("home_audio").play();
			
			version.style.display = "block";
			help_btn.style.display = "block";
			start_btn.style.display = "block";
			
			ctx.drawImage(window.resource.bg["bg"][3], 0, 0, window.WIDTH, window.HEIGHT);
		} else {
			ctx.clearRect(0, 0, window.WIDTH, window.HEIGHT);
			ctx.fillText("正在载入游戏资源，请稍后...  " + (window.resource.curr_amount / window.resource.total_amount * 100).toFixed(2) + "%", window.WIDTH / 2,  window.HEIGHT / 2);
		}
	}, 1000 / window.FPS, false);
	resource.load();
}

window.switchUI = function(e_id) {
	var e = $(e_id);
	if (e.style.display == "none" || e.style.display == "") {
		e.style.display = "block";
	} else {
		e.style.display = "none";
	}
}

window.start = function(gender) {
	document.body.removeChild($("home"));
	document.body.removeChild($("home_audio"));

	if (gender == "male") {
		window.PLAYER_OFFSET_Y = 0;
		window.resource.player = window.resource.male_player;
	} else {
		window.PLAYER_OFFSET_Y = 8;
		window.resource.player = window.resource.female_player;
	}

	var ctx = $("canvas").getContext("2d");
		ctx.drawRightImage = function(img, x, y) {
			ctx.save();
			ctx.translate(x + img.width / 2, y + img.height / 2);
			ctx.scale(-1, 1);
			ctx.drawImage(img, img.width / -2, img.height / -2);
			ctx.restore();
		}
		ctx.roundRect = function(x, y, width, height, radius, fill, stroke) {  
        if (typeof stroke == "undefined") {  
            stroke = true;  
        }  
        if (typeof radius === "undefined") {  
            radius = 5;  
        }  
        this.beginPath();  
        this.moveTo(x + radius, y);  
        this.lineTo(x + width - radius, y);  
        this.quadraticCurveTo(x + width, y, x + width, y + radius);  
        this.lineTo(x + width, y + height - radius);  
        this.quadraticCurveTo(x + width, y + height, x + width - radius, y+ height);  
        this.lineTo(x + radius, y + height);  
        this.quadraticCurveTo(x, y + height, x, y + height - radius);  
        this.lineTo(x, y + radius);  
        this.quadraticCurveTo(x, y, x + radius, y);  
        this.closePath();  
        if (stroke) {  
            this.stroke();  
        }  
        if (fill) {  
            this.fill();  
        }  
};  
  

	var player;
	var backpack;
	var ability;
	var equipment;
	var ui;
	
	initSingle();

	var game_scene = new GameScene(getGameData({position: "红枫树", orientation: window.EAST}), ctx);
	this.onkeyup = function(event) { game_scene.keyUpEvent(event);}
	this.onkeydown = function(event) { game_scene.keyDownEvent(event); }
	this.onmousemove = function(event) {game_scene.mouseMoveEvent(event);}
	this.onmousedown = function(event) {game_scene.mouseDown(event);}
	this.setInterval(function() {
		if (game_scene.is_finish) {
			game_scene = new GameScene(getGameData(game_scene.next_map), ctx);
		}
		game_scene.update();
	}, 1000 / window.FPS, false);

	function getGameData(next_map) {
		var map_basic_data = new MapData(next_map);
			player.x = map_basic_data.player_x;
			player.y = map_basic_data.player_y;

		var map_data = map_basic_data.getMapData();
		var bg_data = {x: 0, y: 0, res: window.resource.bg["bg"][map_basic_data.bg]};

		var scene_obj = {};
			scene_obj.music_src = map_basic_data.music_src;
			scene_obj.backpack = backpack;
			scene_obj.ability = ability;
			scene_obj.equipment = equipment;
			scene_obj.ui = ui;
			scene_obj.player = player;
			scene_obj.map = new Map(map_data);
			scene_obj.bg = new Bg(bg_data);		

			scene_obj.is_open_ability_window = map_basic_data.is_open_ability_window;
			scene_obj.is_open_equipment_window = map_basic_data.is_open_equipment_window;
			scene_obj.is_open_thing_window = map_basic_data.is_open_thing_window;

			scene_obj.doors = map_basic_data.doors;
			scene_obj.normal_monsters_stack = map_basic_data.normal_monsters_stack;
			scene_obj.skill_attack_monsters_stack = map_basic_data.skill_attack_monsters_stack;
		return scene_obj;
	}

	function initSingle() {
		backpack = new Backpack();
		ability = new Ability();
		equipment = new Equipment();
		ui = new UI();

		var player_data = {x: 0, y: 0, width: window.resource.player["stand1"][0].width, height: window.resource.player["stand1"][0].height, 
						   rect_height: 10, is_right: true, curr_res: window.resource.player["stand1"][0],
						   jump_max_height: 120, walk_speed: 8, rope_speed: 8, jump_speed: 15,
						   stand_animation: new Animation(window.resource.player["stand1"], 800),
						   walk_animation: new Animation(window.resource.player["walk1"], 800),
						   jump_animation: new Animation(window.resource.player["jump"], 800),
						   rope_animation: new Animation(window.resource.player["rope"], 500),
						   ladder_animation: new Animation(window.resource.player["ladder"], 500)};
			player_data.defense = 0;
			player_data.min_attack = 1;
			player_data.max_attack = 500;
		player = new Player(player_data);
	}
}