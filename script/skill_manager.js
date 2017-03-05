function SkillEffectFactory() {
	this.createSkillEffect = function(player, fix_x, fix_y, res, delay, key_frame, type, name, max_skill_count, max_monster_count) {
		var data = {};
			data.x = player.x;
			data.y = player.y;

			data.name = name;

			data.fix_x = fix_x;
			data.fix_y = fix_y;
			data.is_right = player.is_right;

			data.animation = new Animation(res, delay, key_frame);
			data.width = res[0].width;
			data.height = res[0].height;

			data.player_width = player.width;
			data.player_height = player.height;
			data.type = type;
		return new SkillEffect(data);
	}

	this.getSkillEffect = function(player, name) {
		switch(name) {
			case "二连击":
				return this.createSkillEffect(player, -50, -20, window.resource.erlianji["effect"], 600, 3, 1, name, 2, 2);
				break;
			case "回旋斩":
				return this.createSkillEffect(player, -50, -10, window.resource.huixuanzhan["effect"], 600, 1, 1, name, 6, 1);
				break;
			case "落叶斩0":
				return this.createSkillEffect(player, -70, 0, window.resource.luoyezhan["effect"], 650, 0, 0, name);
			case "落叶斩1":
				return this.createSkillEffect(player, -90, 10, window.resource.luoyezhan["effect0"], 150, 0 ,0, name);
			case "落叶斩2":
				return this.createSkillEffect(player, -135, 10, window.resource.luoyezhan["remain"], 500, 6, 2, name, 1, 1);
			case "影舞瞬杀":
				return this.createSkillEffect(player, -165, -60, window.resource.yingwushunsha["effect"], 800, 7, 1, name, 2, 3);
			case "影子分身0":
				 return this.createSkillEffect(player, -160, -70, window.resource.yingzifenshen["effect"], 600, 0, 0, name);
			case "影子分身1":
				return this.createSkillEffect(player, -160, -45, window.resource.yingzifenshen["effect0"], 600, 0, 0, name);
			case "勇士的意志":
				return this.createSkillEffect(player, -153, -287, window.resource.yongshideyizhi["effect"], 800, 0, 0, name);
		}
	}

}

function SkillEffect(data) {
	this.type = data.type;
	this.x = data.x;
	this.y = data.y;

	this.name = data.name;

	this.fix_x = data.fix_x;
	this.fix_y = data.fix_y;

	this.width = data.width;
	this.height = data.height;

	this.skill_count = 0;
	this.max_skill_count = window.skills_attr[this.name].max_skill_count;

	this.monster_count = 0;
	this.max_monster_count = window.skills_attr[this.name].max_monster_count;

	this.player_width = data.player_width;
	this.player_height = data.player_height;

	this.is_right = data.is_right;
	this.rect = this.is_right ? new Rect(this.x + this.player_width + this.fix_x, this.y + this.fix_y, this.width, this.height) : 
				new Rect(this.x - this.width - this.fix_x, this.y + this.fix_y, this.width, this.height);

	this.animation = data.animation;
	this.curr_res;

	this.min_attack = window.skills_attr[this.name].attack_percent * window.player_attr.min_attack;
	this.max_attack = window.skills_attr[this.name].attack_percent * window.player_attr.max_attack;
	this.is_ignore_defense = window.skills_attr[this.name].is_ignore_defense;
	this.power_hit = window.skills_attr[this.name].power_hit;

	this.skillAttack = function(monster_defense) {
		if (this.is_ignore_defense) monster_defense = 0;
		var power_hit = false;
		var num = parseInt(Math.random() * (this.max_attack - this.min_attack + 1) + this.min_attack - monster_defense / 3);
		if (window.percent.gen(window.player_attr.power_hit + this.power_hit)) {
			num = parseInt(num * 1.5);
			power_hit = true;
		}
		if(num < 1) num = 1;
		return {attack: num, power_hit: power_hit};
	}

	this.checkCollision = function(rect) {
		if (this.animation.getIsFlagFrame() && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.getIsFinish = function() {
		return this.animation.is_finish;
	}

	this.update = function(player_x, player_y) {
		this.x = player_x;
		this.y = player_y;

		if (this.is_right) {
			this.rect.x = this.x + this.player_width + this.fix_x;
		} else {
			this.rect.x = this.x - this.width - this.fix_x;
		}
		this.rect.y = this.y + this.fix_y;
		this.curr_res = this.animation.getCurrFrame();
	}

	this.updateState = function(map_speed_x, map_speed_y) {
		this.x += map_speed_x;
		this.y += map_speed_y;
		this.curr_res = this.animation.getCurrFrame();
	}

	this.draw = function(ctx) {
		if (this.is_right) {
			ctx.drawRightImage(this.curr_res, this.x + this.player_width + this.fix_x, this.y + this.fix_y);
		} else {
			ctx.drawImage(this.curr_res, this.x - this.width - this.fix_x, this.y + this.fix_y);
		}
	}
}

function SkillHitFactory() {
	this.createSkillHit = function(is_right, monster, position, res, delay) {
		var data = {};
			data.is_right = is_right;
			data.animation = new Animation(res, delay, 0);
			data.width = data.animation.res[0].width;
			data.height = data.animation.res[0].height;
			if (0 == position) {
				data.x = monster.x + monster.width / 2 - data.width / 2;
				data.y = monster.y + monster.height / 2 - data.height / 2; 
			} else if (1 == position) {
				if (is_right) {
					data.x = monster.x - data.width / 2;
					data.y = monster.y + monster.height - data.height;
				} else {
					data.x = monster.x + monster.width - data.width / 2;
					data.y = monster.y + monster.height - data.height;
				}
			}
		return new SkillHit(data);
	}

	this.getSkillHit = function(name, is_right, monster) {
		switch(name) {
			case "落叶斩2":
				return this.createSkillHit(is_right, monster, 0, window.resource.luoyezhan["hit.0"], 500);
			case "影舞瞬杀":
				return this.createSkillHit(is_right, monster, 0, window.resource.yingwushunsha["hit.0"], 500);
			case "二连击":
				return this.createSkillHit(is_right, monster, 0, window.resource.erlianji["hit.0"], 200);
			case "回旋斩":
				var random = parseInt(Math.random() * 3);
				var res;
				switch(random) {
					case 0:
						res = "hit.0";
						break;
					case 1:
						res = "hit.1";
						break;
					case 2:
						res = "hit.2";
						break;
				}
				return this.createSkillHit(is_right, monster, 1, window.resource.huixuanzhan[res], 200);
		}
	}
}

function SkillHit(data) {
	this.x = data.x;
	this.y = data.y;

	this.width = data.width;
	this.height = data.height;

	this.animation = data.animation;
	this.curr_res;
	this.is_right = data.is_right;

	this.update = function(ajust_speed_x, ajust_speed_y) {
		this.x += ajust_speed_x;
		this.y += ajust_speed_y;

		this.curr_res = this.animation.getCurrFrame();
	}

	this.getIsFinish = function() {
		return this.animation.is_finish;
	}

	this.draw = function(ctx) {
		if (this.is_right) {
			ctx.drawRightImage(this.curr_res, this.x, this.y);
		} else {
			ctx.drawImage(this.curr_res, this.x, this.y);
		}
	}
}

function SkillActionFactory() {

	this.createActionItem = function(player, fix_y, is_hide, res) {
		return {fix_x: player.is_right ? 0 : (res == null ? 0 : player.width - res.width), fix_y: fix_y, is_hide: is_hide, res: res};
	}

	// 7
	this.erLianJi = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][1]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][1]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][2]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][2]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["swingO1"][2]));

			return skill_actions;
	}

	// 8
	this.huiXuanZhan = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["stabO2"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["stabO2"][1]));
			skill_actions.push(this.createActionItem(player, 30, false, window.resource.player["proneStab"][0]));
			skill_actions.push(this.createActionItem(player, 30, false, window.resource.player["proneStab"][1]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["stabO2"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["stabO2"][1]));
			skill_actions.push(this.createActionItem(player, 30, false, window.resource.player["proneStab"][0]));
			skill_actions.push(this.createActionItem(player, 30, false, window.resource.player["proneStab"][1]));

		return skill_actions;
	}

	this.yingWuShunSha = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));

			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

		return skill_actions;
	}

	this.yongShiDeYiZhi = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

		return skill_actions;
	}

	this.yingZiFenShen0 = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			return skill_actions;
	}

	this.yingZiFenShen1 = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));
			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			skill_actions.push(this.createActionItem(player, 0, false, window.resource.player["heal"][0]));

			return skill_actions;
	}

	this.luoYeZhan0 = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));

			return skill_actions;
	}

	this.luoYeZhan1 = function(player) {
		var skill_actions = [];
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));
			skill_actions.push(this.createActionItem(player, 0, true, null));

			
		return skill_actions;
	}

	this.luoYeZhan2 = function(player) {
		var skill_actions = [];
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: 3, is_hide: false, res: window.resource.player["swingO3"][0]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: 3, is_hide: false, res: window.resource.player["swingO3"][0]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});

			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});

			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
			skill_actions.push({fix_x: player.is_right ? 0 : -61, fix_y: -10, is_hide: false, res: window.resource.player["swingOF"][3]});
		return skill_actions;
	}

	this.getSkillAction = function(player, name) {
		switch(name) {
			case "二连击":
				return this.erLianJi(player);
			case "回旋斩":
				return this.huiXuanZhan(player);
			case "影舞瞬杀":
				return this.yingWuShunSha(player);
			case "勇士的意志":
				return this.yongShiDeYiZhi(player);
			case "影子分身0":
				return this.yingZiFenShen0(player);
			case "影子分身1":
				return this.yingZiFenShen0(player);
			case "落叶斩0":
				return this.luoYeZhan0(player);
			case "落叶斩1":
				return this.luoYeZhan1(player);
			case "落叶斩2":
				return this.luoYeZhan2(player);
		}
	}
}

function SkillManager(player, normal_monsters, skill_monsters, map, scene) {
	this.player = player;
	this.name;

	this.normal_monsters = normal_monsters;
	this.skill_monsters = skill_monsters;

	this.map = map;

	this.is_start = false;
	this.is_finish = true;

	this.effect = [];

	this.xy_luoyezhan = {};
	this.luoyezhan_monster;

	this.is_skill_first_attack = true;
	this.is_less_mp = false;

	this.checkCanSkill = function(name) {
		if (window.player_attr.curr_mp < window.skills_attr[name].mp) {
			return false;
		} else {
			window.player_attr.curr_mp -= window.skills_attr[name].mp;
			return true;
		}
	}

	this.preSkill = function(name, tips) {
		this.name = name;

		if (name == "落叶斩1") {
			var rect_luoyezhan;
			if (this.player.is_right) {
				rect_luoyezhan = new Rect(this.player.x, this.player.y - this.player.height / 2, 300, 5 * this.player.height / 2);
			} else {
				rect_luoyezhan = new Rect(this.player.x - 300 + this.player.width, this.player.y - this.player.height / 2, 300, 5 * this.player.height / 2);
			}
			if (this.checkLuoYeZhan(rect_luoyezhan)) {
				this.preLuoYeZhan();
			} else {
				return;
			}
		}
		if(!this.checkCanSkill(this.name)){
			window.tips_factory.getTip(null, 3, tips);
			return;
		}

		this.is_start = true;
	}

	this.startSkill = function() {
		this.is_start = false;
		this.is_finish = false;

		this.player.skill(window.skill_action_factory.getSkillAction(this.player, this.name));

		if (this.name == "落叶斩1") {
			this.effect.push(window.skill_effect_factory.getSkillEffect(this.player, "落叶斩0"));
			this.player.x = this.xy_luoyezhan.x;
			this.player.y = this.xy_luoyezhan.y;
			this.effect.unshift(window.skill_effect_factory.getSkillEffect(this.player, this.name));
		} else {
			this.effect.push(window.skill_effect_factory.getSkillEffect(this.player, this.name));
		}

	}

	this.update = function() {
		this.effect[0].update(this.player.x, this.player.y);
		this.player.updateSkill(this.effect[0].animation.curr_frame);

		if ((this.name == "落叶斩1" || this.name == "落叶斩2") && this.effect[1]) {
			this.effect[1].updateState(scene.ajust_speed_x, scene.ajust_speed_y);
			if (this.effect[1].getIsFinish()) {
				this.effect.splice(1, 1);
			}
		}
	}

	this.endSkill = function() {
		if (this.name == "影子分身0") {
			this.name = "影子分身1";
			this.effect = [];
			this.effect.push(window.skill_effect_factory.getSkillEffect(this.player, this.name));
			this.player.skill(window.skill_action_factory.getSkillAction(this.player, this.name));
		} else if (this.name == "落叶斩1") {
			this.name = "落叶斩2";
			this.effect[0] = window.skill_effect_factory.getSkillEffect(this.player, this.name);
			this.player.skill(window.skill_action_factory.getSkillAction(this.player, this.name));
		} else {
			this.effect = [];
			this.is_finish = true;
			this.player.skillRestore();
		}
	}

	this.getIsEnd = function() {
		return this.effect[0].getIsFinish();
	}

	this.checkMonsterCollision = function() {
		var num_items = [];
		if (this.effect[0].type == 0 || this.effect[0].skill_count > this.effect[0].max_skill_count) {
			return num_items;
		}

		if (this.effect[0].skill_count == this.effect[0].max_skill_count) {
			for (var i in this.normal_monsters) {
				this.normal_monsters[i].flag = "";
				this.normal_monsters[i].can_die = true;
			}
			for (var i in this.skill_monsters) { 
				this.skill_monsters[i].flag = "";
				this.skill_monsters[i].can_die = true;
			}
			this.effect[0].skill_count++;
			this.is_skill_first_attack = true;
			return num_items;
		}

		if (this.name == "落叶斩2") {
			this.effect[0].skill_count++;
			num_items.push({level: this.effect[0].skill_count, monster: this.luoyezhan_monster});
		} else if (this.effect[0].skill_count == 0) {
			for (var i in this.normal_monsters) {
				var monster = this.normal_monsters[i];
				if (!monster.is_die && 
					this.effect[0].monster_count < this.effect[0].max_monster_count &&
					this.effect[0].checkCollision(monster.rect)) {
					
					if (this.is_skill_first_attack) {
						this.is_skill_first_attack = false;
						this.effect[0].skill_count++;
					}

					monster.flag = this.name;
					monster.can_die = false;
					this.effect[0].monster_count++;
					num_items.push({level: this.effect[0].skill_count, monster: monster});
				}
			}

			for (var i in this.skill_monsters) {
				var monster = this.skill_monsters[i];
				if (!monster.is_die && 
					this.effect[0].monster_count < this.effect[0].max_monster_count &&
					this.effect[0].checkCollision(monster.rect)) {
					
					if (this.is_skill_first_attack) {
						this.is_skill_first_attack = false;
						this.effect[0].skill_count++;
					}

					monster.flag = this.name;
					monster.can_die = false;
					this.effect[0].monster_count++;
					num_items.push({level: this.effect[0].skill_count, monster: monster});
				}
			}

		} else {
			this.effect[0].skill_count++;
			for (var i in this.normal_monsters) {
				var monster = this.normal_monsters[i];
				if (!monster.is_die && monster.flag == this.name) {
					num_items.push({level: this.effect[0].skill_count, monster: monster});
				}
			}

			for (var i in this.skill_monsters) {
				var monster = this.skill_monsters[i];
				if (!monster.is_die && monster.flag == this.name) {
					num_items.push({level: this.effect[0].skill_count, monster: monster});
				}
			}
		}

		return num_items;
	}

	this.checkLuoYeZhan = function(rect_luoyezhan) {
		var monsters = [];
		for (var i in this.normal_monsters) {
			if (!this.normal_monsters[i].is_die && this.normal_monsters[i].checkCollision(rect_luoyezhan, true)) {
				monsters.push(this.normal_monsters[i]);
			}
		}

		for (var i in this.skill_monsters) {
			if (!this.skill_monsters[i].is_die && this.skill_monsters[i].checkCollision(rect_luoyezhan, true)) {
				monsters.push(this.skill_monsters[i]);
			}
		}

		if (monsters.length != 0) {
			var min_distance = 800 * 800, index = 0;
			var player_center_x = this.player.x + this.player.width / 2;
			var player_center_y = this.player.y + this.player.height / 2;
			for (var i in monsters) {
				var monster_center_x = monsters[i].x + monsters[i].width / 2;
				var monster_center_y = monsters[i].y + monsters[i].height / 2;
				var distance = Math.pow(player_center_x - monster_center_x, 2) + Math.pow(player_center_y - monster_center_y, 2);
				if (distance < min_distance) {
					index = i;
					min_distance = distance;
				}
			}
			this.luoyezhan_monster = monsters[index];
			return true;
		} else {
			return false;
		}
	}

	this.preLuoYeZhan = function() {
		var x0 = this.player.x, x1;
		var y0 = this.player.y - this.player.height / 3, y1 = this.player.y + 2 * this.player.height;
		
		var items0 = [], items1 = [];
		if (!this.player.is_right) {
			x1 = this.player.x - 300 + this.player.width;
			var rect = new Rect(x1, y0, 300, y1 - y0);
			for(var i in this.map.map_items) {
				var item = this.map.map_items[i];
				if (item.type == 0 && item.rect.x < x1 && item.rect.x + item.rect.width > x1 && item.rect.y > y0 && item.rect.y < y1) {
					items0.push(item);
				} else if(item.type == 0 && item.rect.collision(rect)) {
					items1.push(item);
				}
			}		

			var choose_item = null;
			if (items0.length != 0) {
				var player_center_y = this.player.y + this.player.height / 2;
				var min_y = Math.abs(items0[0].rect.y - player_center_y), index = 0;
				for (var i in items0) {
					var temp = Math.abs(items0[i].rect.y - player_center_y);
					if (temp < min_y) {
						index = i;
						min_y = temp;
					}
				}
				choose_item = items0[index];
				if (x1 + this.player.width / 3 > choose_item.x + choose_item.width) {
					this.xy_luoyezhan.x = choose_item.x + choose_item.width - 2 * this.player.width / 3;
				} else {
					this.xy_luoyezhan.x = this.player.x - 300 + this.player.width;
				}
				this.xy_luoyezhan.y = choose_item.rect.y - this.player.height;
			} else if (items1.length != 0) {
				var min_x = items1[0].rect.x, index = 0;
				for (var i in items1) {
					if (items1[i].rect.x < min_x) {
						index = i;
						min_x = items1[i].rect.x;
					}
				}
				choose_item = items1[index];
				this.xy_luoyezhan.x = choose_item.rect.x - this.player.width / 3;
				this.xy_luoyezhan.y = choose_item.rect.y - this.player.height;
			} else {
				this.xy_luoyezhan.x = this.player.x - 300 + this.player.width;
				this.xy_luoyezhan.y = this.player.y;
			}
			if (this.xy_luoyezhan.x < 0) {
				this.xy_luoyezhan.x = 0;
			}

		} else {
			x1 = this.player.x;
			var rect = new Rect(x1, y0, 300, y1 - y0)
			for(var i in this.map.map_items) {
				var item = this.map.map_items[i];
				if (item.type == 0 && item.rect.x  < x1 + 300 && item.rect.x + item.rect.width  > x1 + 300 && item.rect.y > y0 && item.rect.y < y1) {
					items0.push(item);
				} else if(item.type == 0 && item.rect.collision(rect)) {
					items1.push(item);
				}
			}		

			var choose_item = null;
			if (items0.length != 0) {
				var player_center_y = this.player.y + this.player.height / 2;
				var min_y = Math.abs(items0[0].rect.y - player_center_y), index = 0;
				for (var i in items0) {
					var temp = Math.abs(items0[i].rect.y - player_center_y);
					if (temp < min_y) {
						index = i;
						min_y = temp;
					}
				}
				
				choose_item = items0[index];
				if (x1 + 300 + this.player.width / 3 > choose_item.x + choose_item.width) {
					this.xy_luoyezhan.x = choose_item.x + choose_item.width - 2 * this.player.width / 3;
				} else {
					this.xy_luoyezhan.x =  this.player.x + 300;
				}
				this.xy_luoyezhan.y = choose_item.rect.y - this.player.height;
			} else if (items1.length != 0) {
				var max_x = items1[0].rect.x + items1[0].rect.width, index = 0;
				for (var i in items1) {
					if (items1[i].rect.x + items1[0].rect.width > max_x) {
						index = i;
						max_x = items1[i].rect.x + items1[0].rect.width;
					}
				}
				choose_item = items1[index];
				this.xy_luoyezhan.x = choose_item.rect.x + choose_item.rect.width - 2 * this.player.width / 3;
				this.xy_luoyezhan.y = choose_item.rect.y - this.player.height;
			} else {
				this.xy_luoyezhan.x = this.player.x + 300;
				this.xy_luoyezhan.y = this.player.y;
			}
			if (this.xy_luoyezhan.x + this.player.width > window.WIDTH) {
				this.xy_luoyezhan.x = window.WIDTH - this.player.width;
			}

		}
		
	}
}