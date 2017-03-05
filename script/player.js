function Player(data) {
	this.x = data.x;
	this.y = data.y;

	this.width = data.width;
	this.height = data.height;

	this.fix_x = 0;
	this.fix_y = 0;

	this.jump_curr_height = 0;
	this.jump_max_height = data.jump_max_height;
	this.walk_speed = data.walk_speed;
	this.rope_speed = data.rope_speed;
	this.jump_speed = data.jump_speed;

	// 与地图碰撞的矩形
	this.map_rect = new Rect(this.x + this.width / 3, this.y + this.height, this.width / 3, data.rect_height);
	this.rect = new Rect(this.x, this.y, this.width, this.height);

	// 动画
	this.stand_animation = data.stand_animation;
	this.rope_animation = data.rope_animation;
	this.ladder_animation = data.ladder_animation;
	this.walk_animation = data.walk_animation;
	this.jump_animation = data.jump_animation;
	this.curr_res = data.curr_res; // 当前绘制的图片

	// 当前角色状态判断
	this.is_right = data.is_right; // face right
	this.is_stand = true;
	this.is_walk = false;

	this.is_up = false;
	this.is_down = false;
	this.is_rope = false;
	this.is_ladder = false;
	this.is_stop = false;

	this.is_fall = false;
	this.is_jump = false;

	this.is_skill = false;
	this.skill_action;
	this.is_hide = false;

	this.can_hit = true;
	this.alpha = 1;
	this.is_alpha_to_zero = true;
	this.alpha_count = 0;
	this.alpha_change_time = 10;
	this.max_alpha_count = window.PLAYER_HIT_SAFE_FRAME / this.alpha_change_time;
	this.d_alpha = 1 / this.max_alpha_count ;

	// key
	this.is_key_left_up = true;
	this.is_key_right_up = true;

	this.is_thing = false;
	this.is_get = false;

	this.floor = function(item_y) {
		if (!this.is_fall) return;
		this.y = item_y - this.height;
		this.jump_curr_height = 0;
		this.is_rope = false;
		this.is_fall = false;
	}

	this.rope = function(item_center_x, is_ladder) {
		if (this.is_up && this.is_fall || this.is_down && (this.is_stand || this.is_walk)) {
			this.is_rope = true;
			this.is_ladder = is_ladder;
			this.jump_curr_height = 0;
			this.x = item_center_x - this.width / 2;
		}

		if (!this.is_rope) {
			this.fall();
		}
	}

	this.stop = function() {
		this.is_stop = true;
	}

	this.fall = function() {
		if(this.is_jump) return;
		this.is_fall = true;
		this.is_rope = false;
	}

	this.ropeJump = function() {
		if (!this.is_key_left_up) {
			this.is_walk = true;
			this.is_jump = true;
			this.is_right = false;
			this.is_rope = false;
			this.jump_max_height = 45;
		} else if (!this.is_key_right_up) {
			this.is_walk = true;
			this.is_jump = true;
			this.is_right = true;
			this.is_rope = false;
			this.jump_max_height = 45;
		}
	}

	this.hit = function() {
		this.can_hit = false;
	}

	this.skill = function(skill_action) {
		this.is_skill = true;
		this.skill_action = skill_action;
	}

	this.skillRestore = function() {
		this.is_skill = false;
		this.is_hide = false;
		this.fix_x = 0;
		this.fix_y = 0;
		if(!this.is_key_right_up) {
			this.is_walk = true;
			this.is_right = true;
		} else if (!this.is_key_left_up) {
			this.is_walk = true;
			this.is_right = false;
		}
	}

	this.getMapRect = function() {
		return this.map_rect;
	}

	this.getRect = function() {
		return this.rect;
	}

	this.updateSkill = function(index) {
		this.curr_res = this.skill_action[index].res;
		this.is_hide = this.skill_action[index].is_hide;
		this.fix_x = this.skill_action[index].fix_x;
		this.fix_y = this.skill_action[index].fix_y;
	}

	this.updateState = function() {
		if (this.is_skill) {
			this.is_walk = false;
			this.up = false;
			this.down = false;
		}

		if (this.is_rope) {
			this.is_stand = false;
			this.is_walk = false;
			this.is_jump = false;
			this.is_fall = false;
			if (this.is_up || this.is_down) {
				if (this.is_ladder) { this.curr_res = this.ladder_animation.getCurrFrame();}
				else this.curr_res = this.rope_animation.getCurrFrame();
			}
		} else if (this.is_jump || this.is_fall) {
			if (this.jump_curr_height >= this.jump_max_height) {
				this.is_jump = false;
				this.is_fall = true;
				this.jump_max_height = data.jump_max_height;
			}
			this.is_stand = false;
			this.is_rope = false;
			this.is_down =  false;
			this.curr_res = this.jump_animation.getCurrFrame();

		} else if (this.is_walk) {
			this.is_stand = false;
			this.is_rope = false;
			this.is_jump = false;
			this.is_fall = false;
			this.curr_res = this.walk_animation.getCurrFrame();
			
		} else {
			this.is_stand = true;
			this.is_walk = false;
			this.is_jump = false;
			this.is_fall = false;
			this.is_rope = false;
			this.curr_res = this.stand_animation.getCurrFrame();
		} 
	}

	this.update = function(ajust_speed_x, ajust_speed_y) {
		this.updateState();
		this.updateX(ajust_speed_x);
		this.updateY(ajust_speed_y);
		this.updateRect();
		this.updateAlpha();
	}

	this.updateX = function(ajust_speed_x) {
		this.x += ajust_speed_x;

		// 移动
		if (this.is_walk && !this.is_stop) {
			if (this.is_right && this.x < window.WIDTH - this.width) {
				this.x += this.walk_speed;
			} else if (!this.is_right && this.x > 0) {
				this.x -= this.walk_speed;
			}
		}
	}

	this.updateY = function(ajust_speed_y) {
		this.y += ajust_speed_y;

		// 爬绳子
		if (this.is_rope) {
			if (this.is_up) {
				this.y -= this.rope_speed;
			} else if (this.is_down) {
				this.y += this.rope_speed;
			}
		}

		//  落下
		if (this.is_fall) {
			this.y += this.jump_speed;
		}

		// 跳跃
		if (this.is_jump) {
			this.jump_curr_height += this.jump_speed;
			this.y -= this.jump_speed;
		}
	}

	this.updateRect = function() {
		this.map_rect.x = this.x + this.width / 3;
		this.map_rect.y = this.y + this.height;

		this.rect.x = this.x;
		this.rect.y = this.y;
	}

	this.updateAlpha = function() {
		if (this.can_hit) return;

		if (this.is_alpha_to_zero) {
			this.alpha -= this.d_alpha;
			if (this.alpha < 0.5) {
				this.is_alpha_to_zero = false;
				this.alpha_count++;
			}
		} else {
			this.alpha += this.d_alpha;
			if (this.alpha > 1) {
				this.is_alpha_to_zero = true;
				this.alpha_count++;
				this.alpha = 1;
			}
		}

		if (this.alpha_count > this.alpha_change_time) {
			this.can_hit = true;
			this.alpha_count = 0;
		}
	}

	this.draw = function(ctx) {
		if (this.is_hide) {
			return;
		}
		
		if (!this.can_hit) {
			ctx.save();
			ctx.globalAlpha = this.alpha;
		}

		if (this.is_right) {
			ctx.drawRightImage(this.curr_res, this.x + this.fix_x, this.y + this.fix_y + window.PLAYER_OFFSET_Y);
		} else {
			ctx.drawImage(this.curr_res, this.x + this.fix_x, this.y + this.fix_y + window.PLAYER_OFFSET_Y);
		}
		if (!this.can_hit) {
			ctx.restore()
		}

		if (window.is_draw_rect) {
			ctx.save();
			ctx.fillStyle = "#FF3030";
			ctx.fillRect(this.map_rect.x, this.map_rect.y, this.map_rect.width, this.map_rect.height);
			ctx.restore();
		}
	}

}