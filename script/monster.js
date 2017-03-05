function NormalMonster(data) {

	this.x = data.x;
	this.y = data.y;
	this.width = data.width;
	this.height = data.height;

	this.ax = data.ax;
	this.ay = data.ay;
	this.awidth = data.awidth;
	this.ascope = this.awidth - this.width;

	this.rect = new Rect(this.x, this.y, this.width, this.height);

	this.name = data.name;
	this.count = data.count;

	this.is_right = data.is_right;
	this.is_move = data.is_move;
	this.is_stand = false;
	this.is_die = false;
	this.is_hit = false;
	this.is_finish = false;
	this.can_die = true;

	this.move_animation = data.move_animation;
	this.stand_animation = data.stand_animation;
	this.die_animation = data.die_animation;
	this.hit_animation = data.hit_animation;
	this.curr_res;

	this.speed = window.monsters_attr[this.name].speed;
	this.min_magic_attack = window.monsters_attr[this.name].min_magic_attack;
	this.max_magic_attack = window.monsters_attr[this.name].max_magic_attack;

	this.min_attack = window.monsters_attr[this.name].min_attack;
	this.max_attack = window.monsters_attr[this.name].max_attack;

	this.curr_hp = window.monsters_attr[this.name].max_hp;
	this.max_hp = window.monsters_attr[this.name].max_hp;

	this.is_draw_info = false;

	this.physicsAttack = function(player_defense) {
		var num = parseInt(Math.random() * (this.max_attack - this.min_attack + 1) + this.min_attack - player_defense / 3);
		if (num < 1) num = 1;
		return num;
	}

	this.hit = function(attack_hp) {
		if (this.is_die) return;

		this.is_hit = true;
		this.is_draw_info = true;
		this.curr_hp -= attack_hp;
		if (this.curr_hp < 0) {
			this.curr_hp = 0;
		}
	}

	this.checkCanDie = function() {
		if (!this.can_die) return;
		if (this.curr_hp == 0) {
			this.is_die = true;
			this.is_hit = false;
		}
	}

	this.update = function(ajust_speed_x, ajust_speed_y) {
		this.updateState();
		this.updateX(ajust_speed_x);
		this.updateY(ajust_speed_y);
		this.updateRect();

		this.ai();
	}

	this.updateState = function() {

		if (this.is_hit) {
			this.is_move = false;
			this.is_stand = false;
			this.is_die = false;
			this.curr_res = this.hit_animation.getCurrFrame();
			if (this.hit_animation.is_finish) {
				this.is_move = true;
				this.is_hit = false;
				this.hit_animation.reset();
			}
		} else if (this.is_die) {
			this.is_stand = false;
			this.is_move = false;
			this.curr_res = this.die_animation.getCurrFrame();
			if (this.die_animation.is_finish) {
				this.is_finish = true;
			}

		} else if (this.is_move) {
			this.is_stand = false;
			this.is_hit = false;
			this.is_die = false;
			this.curr_res = this.move_animation.getCurrFrame();
		} else {
			this.is_move = false;
			this.is_hit = false;
			this.is_die = false;
			this.curr_res = this.stand_animation.getCurrFrame();
		}
	}

	this.updateX = function(ajust_speed_x) {
		this.x += ajust_speed_x;
		this.ax += ajust_speed_x;

		if (this.is_move) {
			if (this.is_right) {
				if (this.x < this.ax + this.ascope) {
					this.x += this.speed;
				} else {
					this.is_right = !this.is_right;
				}
			} else if (!this.is_right) {
				if (this.x > this.ax) {
					this.x -= this.speed;
				} else {
					this.is_right = !this.is_right;
				}
			}
		}
	}

	this.updateY = function(ajust_speed_y) {
		this.ay += ajust_speed_y;
		this.y = this.ay - this.curr_res.height;
	}

	this.updateRect = function() {
		this.rect.x = this.x;
		this.rect.y = this.y;
	}

	this.checkCollision = function(rect, can_hit) {
		if (can_hit && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.ai = function() {
		var random_num = parseInt(Math.random() * 512);
		if (random_num % 250 == 0) {
			this.is_move = false;
		}

		if (random_num % 60 == 0) {
			this.is_move = true;
		}

		if (15 == random_num && this.is_move) {
			this.is_right = !this.is_right;
		}
	}

	this.draw = function(ctx) {
		if (this.is_right) {
			ctx.drawRightImage(this.curr_res, this.x, this.y);
		} else {
			ctx.drawImage(this.curr_res, this.x, this.y);
		}

		if (this.is_draw_info) {
			ctx.save();
			ctx.fillStyle = "yellow";
			ctx.font = "12px liwen";
			ctx.textAlign = "center";
			ctx.textBaseline = "top"
			ctx.fillText(this.name, this.x + this.curr_res.width / 2, this.y + this.curr_res.height + 3);

			ctx.strokeStyle = "orange";
			ctx.fillStyle = "red";
			ctx.fillRect(this.x + this.width / 2 - 30, this.y - 30, 60 * this.curr_hp / this.max_hp, 6);
			ctx.strokeRect(this.x + this.width / 2 - 31, this.y - 31, 62, 8);

			ctx.restore();
		}
	}
}

function SkillAttackMonster(data) {

	this.x = data.x;
	this.y = data.y;
	this.width = data.width;
	this.height = data.height;

	this.ax = data.ax;
	this.ay = data.ay;
	this.awidth = data.awidth;
	this.ascope = this.awidth - this.width;

	this.rect = new Rect(this.x, this.y, this.width, this.height);
	this.attack_rect = data.attack_rect;

	this.name = data.name;
	this.count = data.count;

	this.is_right = data.is_right;
	this.is_move = data.is_move;
	this.is_stand = false;
	this.is_die = false;
	this.is_hit = false;
	this.can_die = true;

	this.is_attack = false;

	this.move_animation = data.move_animation;
	this.stand_animation = data.stand_animation;
	this.die_animation = data.die_animation;
	this.hit_animation = data.hit_animation;
	this.attack_animation = data.attack_animation;

	this.curr_res;

	this.speed = window.monsters_attr[this.name].speed;
	this.min_magic_attack = window.monsters_attr[this.name].min_magic_attack;
	this.max_magic_attack = window.monsters_attr[this.name].max_magic_attack;

	this.min_attack = window.monsters_attr[this.name].min_attack;
	this.max_attack = window.monsters_attr[this.name].max_attack;

	this.min_money = window.monsters_attr[this.name].min_money;
	this.max_monye = window.monsters_attr[this.name].max_money;

	this.curr_hp = window.monsters_attr[this.name].max_hp;
	this.max_hp = window.monsters_attr[this.name].max_hp;

	this.is_draw_info = false;

	this.physicsAttack = function(player_defense) {
		var num = parseInt(Math.random() * (this.max_attack - this.min_attack + 1) + this.min_attack - player_defense / 3);
		if (num < 1) num = 1;
		return num;
	}

	this.hit = function(attack_hp) {
		if (this.is_die) return;
		
		this.is_draw_info = true;

		this.is_hit = true;
		this.is_move = false;
		this.is_attack = false;

		this.curr_hp -= attack_hp;
		if (this.curr_hp < 0) {
			this.curr_hp = 0;
		}
	}
	this.checkCanDie = function() {
		if (!this.can_die) return;
		if (this.curr_hp == 0) {
			this.is_die = true;
			this.is_hit = false;
		}
	}

	this.update = function(map_speed_x, map_speed_y) {
		this.updateState();
		this.updateX(map_speed_x);
		this.updateY(map_speed_y);
		this.updateRect(map_speed_x, map_speed_y);

		this.ai();
	}

	this.updateState = function() {
		if (this.is_hit) {
			this.is_move = false;
			this.is_stand = false;
			this.is_die = false;
			this.curr_res = this.hit_animation.getCurrFrame();
			if (this.hit_animation.is_finish) {
				this.is_move = true;
				this.is_hit = false;
				this.hit_animation.reset();
			}
		} else if (this.is_die) {
			this.is_stand = false;
			this.is_move = false;
			this.curr_res = this.die_animation.getCurrFrame();
			if (this.die_animation.is_finish) {
				this.is_finish = true;
			}
		} else if (this.is_attack) {
			if (this.attack_animation.is_finish) {
				this.is_attack = false;
				this.is_move = true;
			} else {
				this.is_stand = false;
				this.is_move = false;
				this.curr_res = this.attack_animation.getCurrFrame();
			}
		} else if (this.is_move) {
			this.is_stand = false;
			this.is_hit = false;
			this.is_die = false;
			this.curr_res = this.move_animation.getCurrFrame();
		} else if (this.is_hit) {
			this.is_stand = false;
			this.is_die = false;
			this.curr_res = this.hit_animation.getCurrFrame();
		} else {
			this.is_move = false;
			this.is_hit = false;
			this.is_die = false;
			this.curr_res = this.stand_animation.getCurrFrame();
		}
	}

	this.updateX = function(map_speed_x) {
		this.x += map_speed_x;
		this.ax += map_speed_x;

		if (this.is_move) {
			if (this.is_right) {
				if (this.x < this.ax + this.ascope) {
					this.x += this.speed;
				} else {
					this.is_right = !this.is_right;
				}
			} else if (!this.is_right) {
				if (this.x > this.ax) {
					this.x -= this.speed;
				} else {
					this.is_right = !this.is_right;
				}
			}
		}
	}

	this.updateY = function(map_speed_y) {
		//this.y += map_speed_y;
		this.ay += map_speed_y;
		this.y = this.ay - this.curr_res.height;
	}

	this.updateRect = function(map_speed_x, map_speed_y) {
		this.rect.x = this.x;
		this.rect.y = this.y;

		this.attack_rect.y += map_speed_y;	
		if (this.is_right) {
			this.attack_rect.x = this.x + this.width / 2;
		} else {
			this.attack_rect.x = this.x + this.width / 2 - this.attack_rect.width;
		}
	}

	this.checkCollision = function(rect, can_hit) {
		if (can_hit && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.checkSkillAttackCollision = function(rect, is_at_right) {
		if (is_at_right == this.is_right && (this.is_move || this.is_stand)) {
			if (this.attack_rect.collision(rect)) {
				return true;
			}
		}
		return false;
	}

	this.attack = function() {
		this.attack_animation.reset();
		this.is_attack = true;
	}

	this.ai = function() {
		if (this.is_attack) return;

		var random_num = parseInt(Math.random() * 512);
		if (random_num % 250 == 0) {
			this.is_move = false;
		}

		if (random_num % 60 == 0) {
			this.is_move = true;
		}

		if (15 == random_num && this.is_move) {
			this.is_right = !this.is_right;
		}
	}

	this.draw = function(ctx) {
		if (this.is_right) {
			ctx.drawRightImage(this.curr_res, this.x, this.y);
		} else {
			ctx.drawImage(this.curr_res, this.x - this.curr_res.width + this.width, this.y);
		}

		if (this.is_draw_info) {
			ctx.save();
			ctx.fillStyle = "yellow";
			ctx.font = "12px liwen";
			ctx.textAlign = "center";
			ctx.textBaseline = "top"
			ctx.fillText(this.name, this.x + this.curr_res.width / 2, this.y + this.curr_res.height + 3);

			ctx.strokeStyle = "orange";
			ctx.fillStyle = "red";
			ctx.fillRect(this.x + this.width / 2 - 30, this.y - 30, 60 * this.curr_hp / this.max_hp, 6);
			ctx.strokeRect(this.x + this.width / 2 - 31, this.y - 31, 62, 8);

			ctx.restore();
		}
	}
}