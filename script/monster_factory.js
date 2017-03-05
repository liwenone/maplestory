function MonsterFactory() {
	this.createNormalMonsterData = function(ax, ay, awidth, res, name, hit_delay, die_delay, move_delay, stand_delay) {
		var is_right = Math.random() > 0.5 ? true : false;
		var is_move = Math.random() > 0.5 ? true : false;

		var count = parseInt(window.WAIT_FRAME * Math.random());

		var width = res["stand"][0].width;
		var height = res["stand"][0].height;
		var x = ax + parseInt((Math.random() * (awidth - width)));
		var y = ay - height;

		var hit_animation = new Animation(res["hit1"], hit_delay);
		var die_animation = new Animation(res["die1"], die_delay, 0);
		var move_animation = new Animation(res["move"], move_delay);
		var stand_animation = new Animation(res["stand"], stand_delay);
		return {ax: ax, ay: ay, awidth: awidth, // 活动范围
				x: x, y: y, width: width, height: height, // 位置属性
				is_right: is_right, is_move: is_move, count: count, // 怪物状态属性
				name: name,
				hit_animation: hit_animation, die_animation: die_animation, move_animation: move_animation, stand_animation: stand_animation // 动画
			};
	}

	this.getNormalMonster = function(data) {
		switch(data.name) {
			case "蓝蜗牛":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.lanwoniu, data.name,
										 500, 900, 900, 900));
			case "蘑菇仔":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.moguzai, data.name, 
										500, 600, 600, 600));
			case "进击的刺蘑菇":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.jinjidecimogu, data.name, 
									500, 600, 500, 600));
			case "小青蛇":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.xiaoqingshe, data.name, 
									500, 600, 400, 500));
			case "钢甲石头人":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.gangjiashitouren, data.name, 
									500, 600, 1500, 1000));

			case "绿水灵球":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.lvshuilingqiu, data.name, 
									500, 600, 600, 600));
			case "漂漂猪":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.piaopiaozhu, data.name, 
									500, 600, 400, 500));
			case "猪":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.zhu, data.name, 
									500, 600, 400, 500));
			case "花蘑菇":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.huamogu, data.name, 
									500, 600, 400, 500));
			case "吹笛子的猫":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.chuidizidemao, data.name, 
									500, 600, 400, 500));

			case "蝴蝶":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.hudie, data.name, 
									500, 600, 400, 500));
			case "石头人":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.shitouren, data.name, 
									500, 600, 800, 800));
			case "黑石头人":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.heishitouren, data.name, 
									500, 600, 800, 800));
			case "钢铁猪":
				return new NormalMonster(this.createNormalMonsterData(data.ax, data.ay, data.awidth, window.resource.gangtiezhu, data.name, 
									500, 600, 400, 500));
		}
	}

	this.createSkillAttackMonsterData = function(ax, ay, awidth, res, name, hit_delay, die_delay, move_delay, stand_delay, attack_delay, flag_frame, attack_effect_delay, attack_hit_delay, attack_width, attack_height) {
		var is_right = Math.random() > 0.5 ? true : false;
		var is_move = Math.random() > 0.5 ? true : false;

		var count = parseInt(window.WAIT_FRAME * Math.random());

		var width = res["stand"][0].width;
		var height = res["stand"][0].height;
		var x = ax + parseInt((Math.random() * (awidth - width)));
		var y = ay - height;

		var hit_animation = new Animation(res["hit1"], hit_delay);
		var die_animation = new Animation(res["die1"], die_delay, 0);
		var move_animation = new Animation(res["move"], move_delay);
		var stand_animation = new Animation(res["stand"], stand_delay);

		var attack_animation = new Animation(res["attack1"], attack_delay, flag_frame);
		var data =  {ax: ax, ay: ay, awidth: awidth, // 活动范围
				x: x, y: y, width: width, height: height, // 位置属性
				is_right: is_right, is_move: is_move, count: count, // 怪物状态属性
				name: name,
				attack_rect: new Rect(x + width / 2, y + height / 2 - attack_height / 2, attack_width, attack_height / 2 + height / 2),
				hit_animation: hit_animation, die_animation: die_animation, move_animation: move_animation, stand_animation: stand_animation,
				attack_animation: attack_animation// 动画
			};
		return data;
	}

	this.getSkillAttackMonster = function(data) {
		switch(data.name) {
			case "星光精灵":
				return new SkillAttackMonster(this.createSkillAttackMonsterData(data.ax, data.ay, data.awidth, window.resource.xingguangjingling, data.name,
										 500, 
										 900, 
										 900, 
										 900, 
										 1500, 6,
										 1000, 
										 400, 
										 200, 200));
			case "月光精灵":
				return new SkillAttackMonster(this.createSkillAttackMonsterData(data.ax, data.ay, data.awidth, window.resource.yueguangjingling, data.name,
										 500, 
										 900, 
										 900, 
										 900, 
										 1500, 6,
										 1000, 
										 400, 
										 250, 200));
			case "日光精灵":
				return new SkillAttackMonster(this.createSkillAttackMonsterData(data.ax, data.ay, data.awidth, window.resource.riguangjingling, data.name,
										 500, 
										 900, 
										 900, 
										 900, 
										 1500, 6,
										 1000, 
										 400, 
										 250, 200));
		}
	}
}