function GameScene(scene_obj, ctx) {
	window.music_manager.playMusic(scene_obj.music_src);

	this.equipment = scene_obj.equipment;
	this.backpack = scene_obj.backpack;
	this.ability = scene_obj.ability;
	this.backpack.equipment = this.equipment;
	this.ui = scene_obj.ui;

	this.player = scene_obj.player;
	this.map = scene_obj.map;
	this.bg = scene_obj.bg;

	this.doors = scene_obj.doors;
	this.ctx = ctx;

	this.is_finish = false;
	this.next_map;

	this.normal_monsters_stack = scene_obj.normal_monsters_stack;
	this.normal_monsters = [];
	this.curr_normal_stack = 0;

	this.skill_attack_monsters_stack = scene_obj.skill_attack_monsters_stack;
	this.skill_attack_monsters = [];
	this.curr_skill_effect_attack_stack = 0;

	this.skill_attack_monster_effects = [];
	this.skill_hit_monster = [];

	this.nos = [];

	this.ajust_speed_x = 0;
	this.ajust_speed_y = 0;

	this.skill_manager = new SkillManager(this.player, this.normal_monsters, this.skill_attack_monsters, this.map, this);
	this.skill_hit = [];

	this.things = [];
	this.tips = [];

	this.is_open_thing_window = scene_obj.is_open_thing_window;
	this.is_open_ability_window = scene_obj.is_open_ability_window;
	this.is_open_equipment_window = scene_obj.is_open_equipment_window;
	this.check_player = new CheckPlayer();

	this.level_up = null;

	this.keyDownEvent = function(event) {
		switch (event.keyCode) {
			case 16: // shift
				this.backpack.addMp();
				break;
			case 17: // ctrl
				this.backpack.addHp();
				break;
			case 50:
				this.is_open_thing_window = !this.is_open_thing_window;
				this.backpack.mouse_point.index = -1;
				this.backpack.select_point.index = -1;
				this.backpack.count = 0;
				break;
			case 51:
				this.is_open_ability_window = !this.is_open_ability_window;
				break;
			case 52:
				this.is_open_equipment_window = !this.is_open_equipment_window;
				this.equipment.mouse_point.index = -1;
				break;
			case 83:
				if (this.player.is_skill) return;
				this.player.is_thing = true;
				break;
			case 68: // jump
				if (this.player.is_rope) {
					this.player.ropeJump();
				} else if (this.player.is_jump || this.player.is_fall) {
					return;
				} else {
					this.player.is_jump = true;
				}
				break;
			case 37: // left
				this.player.is_key_left_up = false;
				if (this.player.is_rope || this.player.is_skill) return;
				this.player.is_right = false;
				this.player.is_walk = true;
				break;
			case 38:
				if (this.player.is_skill) return;
				this.player.is_up = true;
				break;
			case 39: // right
				this.player.is_key_right_up = false;
				if (this.player.is_rope || this.player.is_skill) return;
				this.player.is_right = true;
				this.player.is_walk = true;
				break;
			case 40:
				if (this.player.is_skill) return;
				this.player.is_down = true;
				break;
			case 70: // g
				if (!this.player.is_skill && !this.player.is_rope) {
					this.skill_manager.preSkill("二连击", this.tips);
				}
				break;
			case 81: // q
				if (!this.player.is_skill && !this.player.is_rope) {
					this.skill_manager.preSkill("勇士的意志", this.tips);
				} 
				break;
			case 87: // w
				if (!this.player.is_skill && !this.player.is_rope) {
					this.skill_manager.preSkill("影子分身0", this.tips);
				}
				break;
			case 71:
				if (!this.player.is_skill && !this.player.is_rope) {
					this.skill_manager.preSkill("影舞瞬杀", this.tips);
				}
				break;
			case 82:
				if (!this.player.is_skill && !this.player.is_rope) {
					this.skill_manager.preSkill("回旋斩", this.tips);
				} 
				break;
			case 84:
				if (!this.player.is_skill && !this.player.is_rope ) { //&& this.checkLuoYeZhan()) {
					this.skill_manager.preSkill("落叶斩1", this.tips);
				} 
				break;
		}
	}

	this.keyUpEvent = function(event) {
		switch (event.keyCode) {
			case 83:
				this.player.is_thing = false;
				break;
			case 37: // left
				this.player.is_walk = false;
				this.player.is_key_left_up = true;
				break;
			case 38:
				this.player.is_up = false;
				break;
			case 39: // right
				this.player.is_walk = false;
				this.player.is_key_right_up = true;
				break;
			case 40:
				this.player.is_down = false;
				break;
		}
	}

	this.mouseMoveEvent = function(event) {
		if (this.is_open_thing_window) {
			this.backpack.checkItemCollision(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop);
		}
		if (this.is_open_equipment_window) {
			this.equipment.mouseHover(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop);
		}
	}

	this.mouseDown = function(event) {
		if (this.is_open_thing_window) {
			this.backpack.changeType(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop, true);
			this.backpack.checkItemSelect(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop, true);
			this.backpack.checkMenuSelect(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop, true);
		}

		if (this.is_open_ability_window) {
			this.ability.addPoint(event.pageX - window.canvas.offsetLeft, event.pageY - window.canvas.offsetTop, true);
		}
	}

	this.getNextMap = function() {
		return next_map;
	}
	
	this.update = function() {
		this.checkMapCollision();
		this.checkDoorCollision();
		this.checkSkillAttackCollision();
		this.checkPlayerCollision();
		this.checkMonsterCollision();

		this.checkMonsterIsDie();

		this.checkPlayerSkill();

		this.genThings();

		this.removeItem();

		this.genMonsters();

		this.adjustXY();
		this.draw();
	}

	this.adjustXY = function() {
		if (this.player.x > window.WIDTH / 2  + this.player.width && this.map.isRightMovable()) {
			this.ajust_speed_x = (window.WIDTH / 2 - this.player.x) / 20;
			if (this.player.is_walk) {
				this.ajust_speed_x = -this.player.walk_speed;
			}
		} else if (this.player.x < window.WIDTH / 2 - this.player.width && this.map.isLeftMovable()) {
			this.ajust_speed_x = (window.WIDTH / 2 - this.player.x) / 20;
			if (this.player.is_walk) {
				this.ajust_speed_x = this.player.walk_speed;
			}
		} else {
			this.ajust_speed_x = 0;
		}

		if (this.player.y < window.HEIGHT / 3 && this.map.isUpMovable() ) {
			this.ajust_speed_y = (window.HEIGHT / 3 - this.player.y) / 15
			if (this.player.is_rope && this.player.is_up) {
				this.ajust_speed_y = this.player.rope_speed;
			}
		} else if (this.player.y > window.HEIGHT / 2 && this.map.isDownMovable()) {
			this.ajust_speed_y = (window.HEIGHT / 2 - this.player.y) / 15;
			if (this.player.is_rope && this.player.is_down) {
				this.ajust_speed_y = -this.player.rope_speed;
			}
		} else {
			this.ajust_speed_y = 0;
		}

		this.player.update(this.ajust_speed_x, this.ajust_speed_y);
		this.map.update(this.ajust_speed_x, this.ajust_speed_y);

		for (var i in this.doors) {
			this.doors[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.normal_monsters) {
			this.normal_monsters[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.skill_attack_monsters) {
			this.skill_attack_monsters[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}


		for (var i in this.normal_monsters_stack) {
			this.normal_monsters_stack[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.skill_attack_monsters_stack) {
			this.skill_attack_monsters_stack[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.skill_attack_monster_effects) {
			this.skill_attack_monster_effects[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.skill_hit_monster) {
			this.skill_hit_monster[i].update(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2);
		}

		for (var i in this.nos) {
			this.nos[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		if (!this.skill_manager.is_finish) {
			this.skill_manager.update();
		}

		for (var i in this.skill_hit) {
			this.skill_hit[i].update(this.ajust_speed_x, this.ajust_speed_y);
		}

		for (var i in this.things) {
			if (this.things[i].is_get) {
				this.things[i].tracePlayer(this.player.x + this.player.width / 2, this.player.y + 2 * this.player.height / 3, this.ajust_speed_x, this.ajust_speed_y);
			} else {
				this.things[i].update(this.ajust_speed_x, this.ajust_speed_y);
			}
		}

		for (var i in this.tips) {
			this.tips[i].update();
		}

		if (this.level_up) {
			this.level_up.update(this.player);
		}

		this.ui.update();
	}

	this.checkMapCollision = function() {
		var result = this.map.checkCollision(this.player.getMapRect(), this.player.is_down);
		if (result.is_floor) {
			this.player.floor(result.foor_item.rect.y);
		} else if (result.is_rope) {
			this.player.rope(result.rope_item.rect.width / 2 + result.rope_item.rect.x, false);
		} else if (result.is_ladder) {
			this.player.rope(result.ladder_item.rect.width / 2 + result.ladder_item.rect.x, true);
		}

		if (result.is_stop && (this.player.is_right == result.stop_item.stop_right)) {
			this.player.is_stop = true;
		} else {
			this.player.is_stop = false;
		}

		if (!result.is_floor && !result.is_rope && !result.is_stop && !result.is_ladder) {
			this.player.fall();
		}

		for (var i in this.things) {
			if (this.things[i].checkMapCollision(this.map.map_items)) {
				this.things[i].float();
			}
		}
	}

	this.checkDoorCollision = function() {
		for(var i in this.doors) {
			if (this.doors[i].checkCollision(this.player.getMapRect(), this.player.is_up)) {
				this.is_finish = true;
				this.next_map = {position: this.doors[i].next_map, orientation: this.doors[i].orientation, is_open_thing_window: this.is_open_thing_window,
					is_open_ability_window: this.is_open_ability_window, is_open_equipment_window: this.is_open_equipment_window};
				this.player.is_up = false;
			}
		}
	}

	this.checkSkillAttackCollision = function() {
		for (var i in this.skill_attack_monsters) {
			var temp = this.skill_attack_monsters[i];
			if (temp.checkSkillAttackCollision(this.player.getRect(), this.player.x > temp.x) && !temp.is_attack) {
				temp.attack();
			}
			if (temp.is_attack && temp.attack_animation.getIsFlagFrame()) {
				this.skill_attack_monster_effects.push(window.monster_skill_effect_factory.getSkillEffect(temp, this.player.x + this.player.width / 2, this.player.y + this.player.height / 2));  
			}
		}
	}

	this.checkPlayerCollision = function() {
		for (var i in this.normal_monsters) {
			if (this.normal_monsters[i].checkCollision(this.player.getRect(), this.player.can_hit && !this.player.is_skill)) {
				this.player.hit();
				var attack = this.normal_monsters[i].physicsAttack(window.player_attr.defense);
				window.player_attr.curr_hp -= attack;
				if (window.player_attr.curr_hp < 0) window.player_attr.curr_hp = 0;
				this.nos.push(window.number_factory.getNumber(window.VIOLET, attack, this.player.x + this.player.width / 2, this.player.y, 1));
			}
		}

		for (var i in this.skill_attack_monsters) {
			if (this.skill_attack_monsters[i].checkCollision(this.player.getRect(), this.player.can_hit && !this.player.is_skill)) {
				this.player.hit();
				var attack = this.skill_attack_monsters[i].physicsAttack(window.player_attr.defense);
				window.player_attr.curr_hp -= attack;
				if (window.player_attr.curr_hp < 0) window.player_attr.curr_hp = 0;
				this.nos.push(window.number_factory.getNumber(window.VIOLET, attack, this.player.x + this.player.width / 2, this.player.y, 1));
			}
		}

		for (var i in this.skill_attack_monster_effects) {
			if (this.skill_attack_monster_effects[i].checkCollision(this.player.getRect(), this.player.can_hit && !this.player.is_skill)) {
				this.player.hit();
				var magic_attack = this.skill_attack_monster_effects[i].magicAttack(window.player_attr.magic_defense);
				window.player_attr.curr_hp -= magic_attack;
				if (window.player_attr.curr_hp < 0) window.player_attr.curr_hp = 0;

				this.skill_hit_monster.push(window.monster_skill_hit_factory.getSkillHit(this.skill_attack_monster_effects[i].name, this.player.x + this.player.width / 2, this.player.y + this.player.height / 2));
				this.nos.push(window.number_factory.getNumber(window.VIOLET, magic_attack, this.player.x + this.player.width / 2, this.player.y, 1));
				this.skill_attack_monster_effects.splice(i, 1);
			}
		}

		var is_has_add = false;
		for (var i in this.things) {
			if (!this.player.is_get && !this.things[i].is_get && this.things[i].checkPlayerCollision(this.player.getRect(), this.player.is_thing)) {
				if (this.things[i].type == 0) {
					this.things[i].is_get = true;
					this.player.is_get = true;
					break;
				} else {
					if (this.backpack.checkCanAdd(this.things[i])) {
						this.things[i].is_get = true;
						this.player.is_get = true;
						break;
					} else {
						if (is_has_add == false) {
							window.tips_factory.getTip(this.things[i], 2, this.tips);
							is_has_add = true;
						}
						//this.player.is_thing = false;
					}
				}
			}
		}
		if (is_has_add) {
			this.player.is_thing = false;
		}
	}

	this.checkPlayer = function() {
		if(this.check_player.checkLevelUp()) {
			this.check_player.levelUp();
			this.level_up = new LevelUpEffect(this.player);
		}
	}

	this.checkMonsterCollision = function() {
		if (this.skill_manager.is_finish) return;
		var num_items = this.skill_manager.checkMonsterCollision();

		for (var i in num_items) {
			var skill_hurt = this.skill_manager.effect[0].skillAttack(window.monsters_attr[num_items[i].monster.name].defense); 
			this.nos.push(window.number_factory.getNumber(skill_hurt.power_hit ? window.CRI : window.RED, skill_hurt.attack, num_items[i].monster.x + num_items[i].monster.width / 2, num_items[i].monster.ay - num_items[i].monster.height, num_items[i].level));
			num_items[i].monster.hit(skill_hurt.attack);
			this.skill_hit.push(window.skill_hit_factory.getSkillHit(this.skill_manager.name, this.player.is_right, num_items[i].monster));
		}
	}

	this.checkMonsterIsDie = function() {
		for (var i in this.normal_monsters) {
			this.normal_monsters[i].checkCanDie();
		}
		for (var i in this.skill_attack_monsters) {
			this.skill_attack_monsters[i].checkCanDie();
		}
	}

	this.checkPlayerSkill = function() {
		if (this.skill_manager.is_start) {
			this.skill_manager.startSkill();
		}
	}

	this.removeItem = function() {
		for (var i in this.skill_attack_monster_effects) {
			if(this.skill_attack_monster_effects[i].is_finish) {
				this.skill_attack_monster_effects.splice(i, 1);
			}
		}

		for (var i in this.skill_hit_monster) {
			if (this.skill_hit_monster[i].getIsFinish()) {
				this.skill_hit_monster.splice(i, 1);
			}
		}

		for (var i in this.nos) {
			if (this.nos[i].is_finish) {
				this.nos.splice(i, 1);
			}
		}

		for (var i in this.skill_attack_monsters) {
			var monster = this.skill_attack_monsters[i];
			if (monster.is_finish) {
				window.tips_factory.getTip(this.skill_attack_monsters[i], 0, this.tips);
				window.player_attr.curr_exp += window.monsters_attr[this.skill_attack_monsters[i].name].exp;
				this.skill_attack_monsters_stack.push(new SkillAttackMonstersStackItem(monster.ax, monster.ay, monster.awidth, monster.count, monster.name));
				this.skill_attack_monsters.splice(i, 1);
			}
		}

		for (var i in this.normal_monsters) {
			var monster = this.normal_monsters[i];
			if (monster.is_finish) {
				window.tips_factory.getTip(this.normal_monsters[i], 0, this.tips);
				window.player_attr.curr_exp += window.monsters_attr[this.normal_monsters[i].name].exp;
				var temp = new NormalMonstersStackItem(monster.ax, monster.ay, monster.awidth, monster.count, monster.name);
				this.normal_monsters_stack.push(temp);
				this.normal_monsters.splice(i, 1);
			}
		}
		this.checkPlayer();

		if (!this.skill_manager.is_finish && this.skill_manager.getIsEnd()) {
			this.skill_manager.endSkill();
		}

		for (var i in this.skill_hit) {
			if (this.skill_hit[i].getIsFinish()) {
				this.skill_hit.splice(i, 1);
			}
		}

		for (var i in this.things) {
			if (this.things[i].is_finish) {
				window.tips_factory.getTip(this.things[i], 1, this.tips);
				if (this.things[i].type == 0) {
					window.player_attr.money += this.things[i].money;
				} else {
					this.backpack.add(this.things[i]);
				}
				this.things.splice(i, 1);
				this.player.is_get = false;
			} else if (this.things[i].is_time_finish) {
				this.things.splice(i, 1);
			}
		}

		for (var i in this.tips) {
			if (this.tips[i].is_finish) {
				this.tips.splice(i, 1);
			}
		}

		if (this.level_up != null && this.level_up.is_finish) {
			this.level_up = null;
		}
	}

	this.genMonsters = function() {
		if (this.normal_monsters_stack.length > 0) {
			this.normal_monsters_stack[this.curr_normal_stack].count++;
			if (this.normal_monsters_stack[this.curr_normal_stack].count > window.WAIT_FRAME) {
				this.normal_monsters.push(window.monster_factory.getNormalMonster(this.normal_monsters_stack[this.curr_normal_stack]));
				this.normal_monsters_stack.splice(this.curr_normal_stack, 1);
				this.curr_normal_stack = parseInt(Math.random() * this.normal_monsters_stack.length);
			}
		}
		if (this.skill_attack_monsters_stack.length > 0) {
			this.skill_attack_monsters_stack[this.curr_skill_effect_attack_stack].count++;
			if (this.skill_attack_monsters_stack[this.curr_skill_effect_attack_stack].count > window.WAIT_FRAME) {
				this.skill_attack_monsters.push(window.monster_factory.getSkillAttackMonster(this.skill_attack_monsters_stack[this.curr_skill_effect_attack_stack]));
				this.skill_attack_monsters_stack.splice(this.curr_skill_effect_attack_stack, 1);
				this.curr_skill_effect_attack_stack = parseInt(Math.random() * this.skill_attack_monsters_stack.length);
			}
		}
	}

	this.genThings = function() {
		for (var i in this.normal_monsters) {
			if (this.normal_monsters[i].is_die && this.normal_monsters[i].die_animation.getIsFlagFrame()) {
				window.things_factory.getThings(this.normal_monsters[i], this.things);
			}
		}

		for (var i in this.skill_attack_monsters) {
			if (this.skill_attack_monsters[i].is_die && this.skill_attack_monsters[i].die_animation.getIsFlagFrame()) {
				window.things_factory.getThings(this.skill_attack_monsters[i], this.things);
			}
		}

	}

	this.draw = function() {
		this.ctx.clearRect(0, 0, window.WIDTH, window.HEIGHT);
		this.bg.draw(this.ctx);
		this.map.draw(this.ctx);

		for (var i in this.normal_monsters) {
			this.normal_monsters[i].draw(ctx);
		}

		for (var i in this.skill_attack_monsters) {
			this.skill_attack_monsters[i].draw(ctx);
		}

		for (var i in this.skill_attack_monster_effects) {
			this.skill_attack_monster_effects[i].draw(ctx);
		}

		this.player.draw(this.ctx);

		for (var i in this.things) {
			this.things[i].draw(ctx);
		}

		for (var i in this.skill_hit_monster) {
			this.skill_hit_monster[i].draw(ctx);
		}

		for (var i in this.skill_hit) {
			this.skill_hit[i].draw(ctx);
		}

		if (!this.skill_manager.is_finish) {
			for (var i in this.skill_manager.effect) {
				this.skill_manager.effect[i].draw(ctx);
			}
		}

		if (this.level_up) {
			this.level_up.draw(ctx);
		}

		for (var i in this.nos) {
			this.nos[i].draw(ctx);
		}

		for (var i in this.doors) {
			this.doors[i].draw(ctx);
		}

		for (var i in this.tips) {
			this.tips[i].draw(ctx);
		}

		if (this.is_open_ability_window) {
			this.ability.draw(ctx);
		}

		if (this.is_open_thing_window) {
			this.backpack.draw(ctx);
		}

		if (this.is_open_equipment_window) {
			this.equipment.draw(ctx);
		}

		this.ui.draw(ctx);
	}
}
