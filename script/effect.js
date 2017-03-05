function Door(data) {
	this.x = data.x;
	this.y = data.y
	this.animation = data.animation;

	this.next_map = data.next_map;
	this.orientation = data.orientation;

	this.width = data.width;
	this.height = data.height;

	this.curr_res = this.animation.getCurrFrame();
	this.rect = new Rect(this.x + this.width / 3, this.y + this.height / 3, this.width / 3, this.height); 

	this.update = function(dx, dy) {
		this.updateX(dx);
		this.updateY(dy);
		this.updateRect();

		this.curr_res = this.animation.getCurrFrame();
	}

	this.updateX = function(dx) {
		this.x += dx;
	}

	this.updateY = function(dy) {
		this.y +=dy;
	}

	this.updateRect = function() {
		this.rect.x = this.x + this.width / 3;
		this.rect.y = this.y + this.height / 3;
	}

	this.checkCollision = function(rect, is_up) {
		if (is_up && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.draw = function(ctx) {
		ctx.drawImage(this.curr_res, this.x, this.y);
	}
}

function NumberFactory() {

	this.createNumber = function(num, center_x, y, level, res, type) {
		var data = {};
			data.speed = 2;
			data.max_height = 80;
			data.type = type;

		var nums_width = 0;
			data.no = [];
			while (num != 0) {
				var index = num % 10;
				var img = res[index];
				nums_width += 3 * img.width / 4;
				data.no.unshift(img);
				num = parseInt(num / 10);
			}
			data.x = center_x - nums_width / 2 + parseInt(Math.random() * 10);
			data.y = y - level * res[0].height;
		return new Number(data);
	}

	this.getNumber = function(type, num, center_x, y, level) {
		switch(type) {
			case window.RED:
				return this.createNumber(num, center_x, y, level, window.resource.effect["NoRed1"], type);
			case window.CRI:
				return this.createNumber(num, center_x, y, level, window.resource.effect["NoCri0"], type);
			case window.VIOLET:
				return this.createNumber(num, center_x, y, level, window.resource.effect["NoViolet1"], type);
		}
	}
}

function Number(data) {
	this.x = data.x;
	this.y = data.y;
	this.no = data.no;
	this.type = data.type;

	this.speed = data.speed;
	this.alpha = 1;

	this.is_finish = false;

	this.update = function(map_speed_x, map_speed_y) {
		this.updateX(map_speed_x);
		this.updateY(map_speed_y);
		this.updateState();
	}

	this.updateX = function(map_speed_x) {
		this.x += map_speed_x;
	}

	this.updateY = function(map_speed_y) {
		this.y += map_speed_y;
		this.y -= this.speed;
	}

	this.updateState = function() {
		if (this.alpha < 0.3) {
			this.is_finish = true;
		}
		this.alpha -= (1.01 - this.alpha) / 11;
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;

		if (this.type == window.CRI) {
			ctx.drawImage(window.resource.effect["NoCri0"][10], this.x - window.resource.effect["NoCri0"][10].width / 2, this.y - window.resource.effect["NoCri0"][10].height / 4);
		}

		var offset_x = 0;
		for (var i = 0; i < this.no.length; i++) {
			if (i == 0) {
				ctx.drawImage(this.no[i], this.x - this.no[i].width * 0.1, this.y - this.no[i].height * 0.1, this.no[i].width * 1.2, this.no[i].height * 1.2);
			} else {
				ctx.drawImage(this.no[i], this.x + offset_x, this.y);
			}
			offset_x += 3 * this.no[i].width / 4;
		}

		ctx.restore();
	}
}

function MoneyFactory() {

	this.createMoney = function(monster, money, res) {
		var data = {};
			data.x = monster.x + monster.width / 2;
			data.y = monster.y + 2 * monster.height / 3;
			data.width = res[0].width;
			data.height = res[0].height;

			data.name = "金币";
			data.money = money;
			data.animation = new Animation(res, 300, 0);

			data.max_fly_height = parseInt(60 + Math.random() * 30);;
			data.fly_speed = 8;
			data.max_float_height = parseInt(7 + Math.random() * 4);
			data.float_speed = 0.2;
			data.max_count = 150000 / window.INTERVAL;

			data.trace_speed = 10;

		return new Money(data);
	}

	this.getMoney = function(monster) {
		var money_data = window.monsters_attr[monster.name].things["金币"];

		var money = parseInt(Math.random() * (money_data.max - money_data.min + 1) + money_data.min);

		if (money < 50) {
			return this.createMoney(monster, money, window.resource.effect["icon0"]);
		} else if (money < 100) {
			return this.createMoney(monster, money, window.resource.effect["icon50"]);
		} else if (money < 1000) {
			return this.createMoney(monster, money, window.resource.effect["icon100"]);
		} else {
			return this.createMoney(monster, money, window.resource.effect["icon1000"]);
		}
	}
}

function Money(data) {
	this.x = data.x - data.width / 2;
	this.y = data.y;

	this.type = 0;
	this.width = data.width;
	this.height = data.height;
	this.name = data.name;

	this.money = data.money;

	this.fly_speed = data.fly_speed;
	this.max_fly_height = data.max_fly_height;
	this.curr_fly_height = 0;
	this.float_speed = data.float_speed;
	this.max_float_height = data.max_float_height;
	this.curr_float_height = 0;

	this.alpha = 1;
	this.is_finish = false;
	this.is_time_finish = false;
	this.is_fly_finish = false;
	this.is_fall = false;
	this.is_float_up = false;

	this.curr_count = 0;
	this.max_count = data.max_count;

	this.animation = data.animation;
	this.map_rect = new Rect(this.x, this.y + this.height, this.width, 5);
	this.rect = new Rect(this.x, this.y, this.width, this.height);

	this.is_get = false;
	this.trace_speed = data.trace_speed;

	this.tracePlayer = function(player_center_x, player_center_y, map_speed_x, map_speed_y) {
		this.x += map_speed_x;
		this.y += map_speed_y;

		var angle = Math.atan2(player_center_y - this.y - this.height / 2, player_center_x - this.x - this.width / 2);
		var x_speed = Math.cos(angle) * this.trace_speed;
		var y_speed = Math.sin(angle) * this.trace_speed;
		this.x += x_speed;
		this.y += y_speed;

		if (player_center_x - 10 < this.x + this.width / 2 && this.x + this.width / 2 < player_center_x + 10 && player_center_y - 10 < this.y + this.height / 2 && this.y + this.height / 2 < player_center_y + 10) {
			this.is_finish = true;
		}
		this.curr_res = this.animation.getCurrFrame();
	}

	this.update = function(map_speed_x, map_speed_y) {
		this.updateX(map_speed_x);
		this.updateY(map_speed_y);
		this.updateState();
	}

	this.updateX = function(map_speed_x) {
		this.x += map_speed_x;
		this.map_rect.x += map_speed_x;
		this.rect.x += map_speed_x;
	}

	this.updateY = function(map_speed_y) {
		this.y += map_speed_y;
		this.map_rect.y += map_speed_y ;
		this.rect.y += map_speed_y;

		if (this.is_fly_finish) {
			if (this.is_float_up) {
				this.float_speed = -(this.curr_float_height + this.max_float_height) / 18;
			} else {
				this.float_speed = (this.max_float_height - this.curr_float_height) / 18;
			}

			if (this.is_float_up && this.float_speed > -data.float_speed) {
				this.float_speed = -data.float_speed;
			} else if (!this.is_float_up && this.float_speed < data.float_speed) {
				this.float_speed = data.float_speed;
			}

			this.y += this.float_speed;
			this.map_rect.y += this.float_speed;
			this.rect.y += this.float_speed;
			this.curr_float_height += this.float_speed;

			if (Math.abs(this.curr_float_height) >= this.max_float_height) {
				this.curr_float_height = 0;
				this.is_float_up = !this.is_float_up;
			}
		} else {
			this.y -= this.fly_speed;
			this.map_rect.y -= this.fly_speed;
			this.rect.y -= this.fly_speed;
			this.curr_fly_height += this.fly_speed;
			if (this.curr_fly_height > this.max_fly_height) {
				this.curr_fly_height = 0;
				this.is_fall = true;
				this.fly_speed = -this.fly_speed;
			}
		}
	}

	this.checkMapCollision = function(map_items) {
		for (i in map_items) {
			if (map_items[i].type == 0 && this.is_fall && map_items[i].rect.collision(this.map_rect)) {
				this.is_fall = false;
				return true;
			}
		}
		return false;
	}

	this.checkPlayerCollision = function(rect, is_thing) {
		if (this.is_fly_finish && is_thing && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.float = function() {
		this.is_fly_finish = true;
	}

	this.updateState = function() {
		if (this.is_fly_finish) {
			this.curr_count++;
			if (this.curr_count > this.max_count) {
				if (this.alpha < 0.3) {
					this.is_time_finish = true;
				}
				this.alpha -= (1.01 - this.alpha) / 11;
			}
		}

		this.curr_res = this.animation.getCurrFrame();
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.drawImage(this.curr_res, this.x, this.y - 5);
		ctx.restore();
	}
}

function ThingsFactory() {
	this.createThing = function(monster, type, amount, res, name) {
		var data = {};
			data.x = monster.x + monster.width / 2;
			data.y = monster.y + monster.height / 2;
			data.width = res[0].width;
			data.height = res[0].height;

			data.type = type;
			data.amount = amount;
			data.name = name;
			data.animation = new Animation(res, 1000, 0);

			data.max_fly_height = parseInt(60 + Math.random() * 30);
			data.fly_speed = 8;
			data.max_float_height = parseInt(7 + Math.random() * 4);;
			data.float_speed = 0.2;
			data.max_count = 100000 / window.INTERVAL;

			data.trace_speed = 10;

		return new Thing(data);
	}

	this.getThings = function(monster, things) {
		var things_data = window.monsters_attr[monster.name].things;

		var temp_things = [];
		for (var i in things_data) {
			if (window.percent.gen(things_data[i].percent)) {
				if (things_data[i].type == 0) {
					temp_things.push(window.money_factory.getMoney(monster));
				} else {
					var amount = parseInt(Math.random() * (things_data[i].max - things_data[i].min + 1) + things_data[i].min);
					temp_things.push(this.createThing(monster, things_data[i].type, amount, this.getRes(i), i));
				}
			}
		}

		if (temp_things.length > 0) {
			var half_width = temp_things[0].width * temp_things.length / 2;
			var monster_center_x = monster.x + monster.width / 2;

			var start_x = monster_center_x - half_width;

			var width = 0;
			for (var i in temp_things) {
				temp_things[i].x = start_x + width;
				temp_things[i].map_rect.x = temp_things[i].x;
				temp_things[i].rect.x = temp_things[i].x;
				width += temp_things[i].width;
				things.push(temp_things[i]);
			}
		}
	}

	this.getRes = function(name) {
		switch(name) {
			case "蓝色蜗牛壳":
				return window.resource.things["lansewoniuke"];
			case "蘑菇芽孢":
				return window.resource.things["moguyabao"];
			case "绿液球":
				return window.resource.things["lvyeqiu"];
			case "绿水灵珠":
				return window.resource.things["lvshuilingzhu"];
			case "刺蘑菇盖":
				return window.resource.things["cimogugai"];
			case "猪头":
				return window.resource.things["zhutou"];
			case "蝴蝶结":
				return window.resource.things["hudiejie"];
			case "钢铁块":
				return window.resource.things["gangtiekuai"];
			case "钢铁猪的蹄子":
				return window.resource.things["gangtiezhudetizi"];
			case "钢铁猪盔甲碎片":
				return window.resource.things["gangtiezhukuijiasuikuai"];
			case "黑石块":
				return window.resource.things["heishikuai"];
			case "石块":
				return window.resource.things["shikuai"];
			case "花蘑菇盖":
				return window.resource.things["huamogugai"];
			case "猫皮":
				return window.resource.things["maopi"];
			case "星光精灵的碎块":
				return window.resource.things["xingkuai"];
			case "月光精灵的碎块":
				return window.resource.things["yuekuai"];
			case "日光精灵的碎块":
				return window.resource.things["rikuai"];
			case "蛇皮":
				return window.resource.things["shepi"];

			case "红色药水":
				return window.resource.things["hong50"];
			case "橙色药水":
				return window.resource.things["hong150"];
			case "白色药水":
				return window.resource.things["hong300"];
			case "蓝色药水":
				return window.resource.things["lan100"];
			case "活力神水":
				return window.resource.things["huolishenshui"];

			case "青梦":
				return window.resource.things["qingmeng"];
			case "黑唐衫":
				return window.resource.things["heitangshan"];
			case "刮胡刀":
				return window.resource.things["guahudao"];
			case "凤凰刃":
				return window.resource.things["fenghuangren"];
			case "双翼刃":
				return window.resource.things["shuangyiren"];
			case "枫叶刃":
				return window.resource.things["fengyeren"];
		}
	}
}

function Thing(data) {
	this.x = data.x;
	this.y = data.y;

	this.width = data.width;
	this.height = data.height;

	this.type = data.type;
	this.amount = data.amount;
	this.name = data.name;

	this.fly_speed = data.fly_speed;
	this.max_fly_height = data.max_fly_height;
	this.curr_fly_height = 0;
	this.float_speed = data.float_speed;
	this.max_float_height = data.max_float_height;
	this.curr_float_height = 0;

	this.alpha = 1;
	this.is_finish = false;
	this.is_time_finish = false;
	this.is_fly_finish = false;
	this.is_fall = false;
	this.is_float_up = false;

	this.curr_count = 0;
	this.max_count = data.max_count;

	this.animation = data.animation;
	this.map_rect = new Rect(this.x, this.y + this.height, this.width, 5);
	this.rect = new Rect(this.x, this.y, this.width, this.height);

	this.is_get = false;
	this.trace_speed = data.trace_speed;

	this.rotate_angle = 0;

	this.tracePlayer = function(player_center_x, player_center_y, map_speed_x, map_speed_y) {
		this.x += map_speed_x;
		this.y += map_speed_y;

		var angle = Math.atan2(player_center_y - this.y - this.height / 2, player_center_x - this.x - this.width / 2);
		var x_speed = Math.cos(angle) * this.trace_speed;
		var y_speed = Math.sin(angle) * this.trace_speed;
		this.x += x_speed;
		this.y += y_speed;

		if (player_center_x - 10 < this.x + this.width / 2 && this.x + this.width / 2 < player_center_x + 10 && player_center_y - 10 < this.y + this.height / 2 && this.y + this.height / 2 < player_center_y + 10) {
			this.is_finish = true;
		}
		this.curr_res = this.animation.getCurrFrame();
	}

	this.update = function(map_speed_x, map_speed_y) {
		this.updateX(map_speed_x);
		this.updateY(map_speed_y);
		this.updateState();
	}

	this.updateX = function(map_speed_x) {
		this.x += map_speed_x;
		this.map_rect.x += map_speed_x;
		this.rect.x += map_speed_x;
	}

	this.updateY = function(map_speed_y) {
		this.y += map_speed_y;
		this.map_rect.y += map_speed_y ;
		this.rect.y += map_speed_y;

		if (this.is_fly_finish) {
			if (this.is_float_up) {
				this.float_speed = -(this.curr_float_height + this.max_float_height) / 18;
			} else {
				this.float_speed = (this.max_float_height - this.curr_float_height) / 18;
			}

			if (this.is_float_up && this.float_speed > -data.float_speed) {
				this.float_speed = -data.float_speed;
			} else if (!this.is_float_up && this.float_speed < data.float_speed) {
				this.float_speed = data.float_speed;
			}

			this.y += this.float_speed;
			this.map_rect.y += this.float_speed;
			this.rect.y += this.float_speed;
			this.curr_float_height += this.float_speed;

			if (Math.abs(this.curr_float_height) >= this.max_float_height) {
				this.curr_float_height = 0;
				this.is_float_up = !this.is_float_up;
			}
		} else {
			this.y -= this.fly_speed;
			this.map_rect.y -= this.fly_speed;
			this.rect.y -= this.fly_speed;
			this.curr_fly_height += this.fly_speed;
			if (this.curr_fly_height > this.max_fly_height) {
				this.curr_fly_height = 0;
				this.is_fall = true;
				this.fly_speed = -this.fly_speed;
			}
		}
	}

	this.checkMapCollision = function(map_items) {
		for (i in map_items) {
			if (map_items[i].type == 0 && this.is_fall && map_items[i].rect.collision(this.map_rect)) {
				this.is_fall = false;
				return true;
			}
		}
		return false;
	}

	this.checkPlayerCollision = function(rect, is_thing) {
		if (this.is_fly_finish && is_thing && this.rect.collision(rect)) {
			return true;
		} else {
			return false;
		}
	}

	this.float = function() {
		this.is_fly_finish = true;
	}

	this.updateState = function() {
		if (this.is_fly_finish) {
			this.curr_count++;
			if (this.curr_count > this.max_count) {
				if (this.alpha < 0.3) {
					this.is_time_finish = true;
				}
				this.alpha -= (1.01 - this.alpha) / 11;
			}
		}
		if (this.is_fall || !this.is_fly_finish) {
			this.rotate_angle += 60 * Math.PI / 180;
		}

		this.curr_res = this.animation.getCurrFrame();
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		if (this.is_fall || !this.is_fly_finish) {
			ctx.save();
			ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
			ctx.rotate(this.rotate_angle);
			ctx.drawImage(this.curr_res, this.width / -2, this.height / -2);
			ctx.restore();
		} else {
			ctx.drawImage(this.curr_res, this.x, this.y - 5);
		}
		ctx.restore();
	}
}

function TipsFactory() {
	this.base_y = window.HEIGHT - 70;
	this.base_dy = 15;

	this.createExpTip = function(exp) {
		return new Tip("得到经验(+" + exp + ")", 6);
	}

	this.createThingTip = function(tip_data) {
		switch(tip_data.type) {
			case 0:
				return new Tip("得到金币(+" + tip_data.money + ")", 0);
			case 1:
				return new Tip("得到装备(" + tip_data.name +")", 1);
			case 2:
				var tip = "";
				if (tip_data.amount > 1) {
					tip = "得到" + tip_data.name + "(+" + tip_data.amount + "个)";
				} else {
					tip = "得到" + tip_data.name;
				}
				return new Tip(tip, 2);
			case 3: 
				var tip = "";
				if (tip_data.amount > 1) {
					tip = "得到" + tip_data.name + "(+" + tip_data.amount + "个)";
				} else {
					tip = "得到" + tip_data.name;
				}
				return new Tip(tip, 3);
		}
	}

	this.createFullTip = function() {
		return new Tip("无法捡取物品,背包已满", 5);
	}

	this.createSkillTip = function() {
		return new Tip("MP不足，无法使用技能", 5);
	}

	this.getTip = function(tip_data, type, tips) {
		switch(type) {
			case 0:
				tips.unshift(this.createExpTip(window.monsters_attr[tip_data.name].exp));
				break;
			case 1:
				tips.unshift(this.createThingTip(tip_data));
				break;
			case 2:
				tips.unshift(this.createFullTip());
				break;
			case 3:
				tips.unshift(this.createSkillTip());
				break;
		}
		for(var i in tips) {
			tips[i].y = this.base_y - this.base_dy * i;
		}
	}

}

function Tip(text, type) {
	this.text = text;
	this.type = type;
	this.x = window.WIDTH - 10;
	this.y = 0;

	this.alpha = 1;
	this.d_alpha = 0.008;
	this.is_finish = false;

	this.update = function() {
		this.alpha -= this.d_alpha;
		if (this.alpha < 0.1) {
			this.is_finish = true;
		}
	}

	this.draw = function(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;

		var text_color;
		switch(this.type) {
			case 0:
				text_color = "orange";
				break;
			case 1:
				text_color = "white";
				break;
			case 2:
				text_color = "#ADFF2F";
				break;
			case 3: 
				text_color = "#ADD8E6";
				break;
			case 4:
				text_color = "green";
				break;
			case 5:
				text_color = "red";
				break;
			case 6:
				text_color = "yellow";
				break;
		}
		ctx.fillStyle = text_color;
		ctx.font = "12px liwen";
		ctx.textAlign = "right";
		ctx.fillText(this.text, this.x, this.y);
		ctx.restore();
	}
}

function CheckPlayer () {
	this.checkLevelUp = function() {
		if (window.player_attr.curr_exp >= window.player_attr.max_exp) {
			return true;
		} else {
			return false;
		}
	}

	this.levelUp = function() {
		window.player_attr.level++;
		window.player_attr.curr_exp = window.player_attr.curr_exp - window.player_attr.max_exp;
		window.player_attr.max_exp = window.player_attr.level_exp[window.player_attr.level - 1];
		window.player_attr.max_hp += parseInt(Math.random() * 5) + 20;
		window.player_attr.max_mp += parseInt(Math.random() * 3) + 14;
		window.player_attr.curr_hp = window.player_attr.max_hp;
		window.player_attr.curr_mp = window.player_attr.max_mp;

		window.player_attr.point += 5;
		window.player_attr.defense += 3;
		window.player_attr.magic_defense += 3; 
	}
}

function LevelUpEffect(player) {
	this.animation = new Animation(window.resource.effect["LevelUp2"], 2000, 0);
	this.curr_res;

	this.x = player.x + player.width / 2 - this.animation.res[0].width / 2;
	this.y = player.y + player.height - this.animation.res[0].height;
	this.is_finish = false;

	this.update = function(player) {
		this.x = player.x + player.width / 2 - this.animation.res[0].width / 2;;
		this.y = player.y + player.height - this.animation.res[0].height;

		this.curr_res = this.animation.getCurrFrame();
		if (this.animation.is_finish) {
			this.is_finish = true;
		}
	}

	this.draw = function(ctx) {
		ctx.drawImage(this.curr_res, this.x, this.y);
	}
}