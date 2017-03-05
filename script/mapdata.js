function MapData(next_map) {
	this.x = 0;
	this.y = 0;
	this.res;
	this.left_fix = 0;
	this.right_fix = 0;
	this.up_fix = 0;
	this.down_fix = 0;

	this.music_src;

	this.player_x = 0;
	this.player_y = 0;

	this.position = next_map.position;
	this.orientation = next_map.orientation;

	this.map_items = [];

	this.is_open_ability_window = next_map.is_open_ability_window;
	this.is_open_equipment_window = next_map.is_open_equipment_window;
	this.is_open_thing_window = next_map.is_open_thing_window;


	// public
	this.bg;
	this.doors = [];
	this.normal_monsters_stack = [];
	this.skill_attack_monsters_stack = [];

	this.createItem = function(type, offset_x, offset_y, width, height, stop) {
		switch (type) {
			case 0:
			case 1:
			case 2:
				return {type: type, rect: new Rect(this.x + offset_x, this.y + offset_y, width, height)};
			case 3:
				return {type: type, rect: new Rect(this.x + offset_x, this.y + offset_y, width, height), stop_right: stop};
		}
	}

	this.createDoor = function(x, y, next_map, orientation) {
		var data = {x: this.x + x, y: this.y + y, next_map: next_map, width: window.resource.effect["pv"][0].width , height: window.resource.effect["pv"][0].height, orientation: orientation, animation: new Animation(window.resource.effect["pv"], 1000)};
		return new Door(data);
	}

	this.addToNormalMonstersStack = function(ax, ay, awidth, amount, name) {
		for (var i = 0; i < amount; i++) {
			this.normal_monsters_stack.push(new NormalMonstersStackItem(this.x + ax, this.y + ay, awidth, parseInt(window.WAIT_FRAME * 3 * Math.random()), name));
		}
	}

	this.addToSkillAttackMonstersStack = function(ax, ay, awidth, amount, name) {
		for (var i = 0; i < amount; i++) {
			this.skill_attack_monsters_stack.push(new SkillAttackMonstersStackItem(this.x + ax, this.y + ay, awidth, parseInt(window.WAIT_FRAME * 3 * Math.random()), name));
		}

	}

	this.getMapData = function() {
		return {x: this.x, y: this.y, res: this.res, left_fix: this.left_fix, right_fix: this.right_fix, up_fix: this.up_fix, down_fix: this.down_fix, map_items: this.map_items};
	}

	this.hongFengShu = function() {
		this.music_src = "sheshoucun";
		this.bg = 0;

		this.x = -140;
		this.y = -420;
		this.res = window.resource.map["m"][0];

		this.player_x = 350;
		this.player_y = 355;

		this.doors.push(this.createDoor(650, 745, "哼唱小道", window.WEST));

		this.map_items.push(this.createItem(0, 290, 875, 500, 20));
		this.map_items.push(this.createItem(3, 270, 200, 20, 800, false));
		this.map_items.push(this.createItem(3, 790, 200, 20, 800, true));
	}

	this.hengChangXiaoDao = function() {
		this.music_src = "sheshoucun";
		this.bg = 0;

		switch(this.orientation) {
			case window.WEST:
				this.x = -20;
				this.y = 0;
				this.player_x = 50;
				this.player_y = 300;
				break;
			case window.EAST:
				this.x = -265;
				this.y = 0;
				this.player_x = 585;
				this.player_y = 300;
				break;
		}

		this.res = window.resource.map["m"][1];

		this.left_fix = -20;
		this.width_fix = 20;
		this.up_fix = 0;
		this.down_fix = -100;

		// doors
		this.doors.push(this.createDoor(820, 270, "三岔路", window.WEST));

		// monsters_stack
		this.addToNormalMonstersStack(0, 405, 1080, 3, "蓝蜗牛");
		this.addToNormalMonstersStack(0, 405, 1080, 3, "蘑菇仔");

		// map items
		this.map_items.push(this.createItem(0, 0, 405, 1080, 20));
	}

	this.sanChaLu = function() {
		this.music_src = "sheshoucun";
		this.bg = 0;

		switch(this.orientation) {
			case window.WEST:
				this.x = 0;
				this.y = -600;
				this.player_x = 50;
				this.player_y = 320;
				break;
			case window.EAST:
				this.x = -900;
				this.y = -600;
				this.player_x = 675;
				this.player_y = 320;
				break;
			case window.NORTH:
				this.x = 0;
				this.y = -100;
				this.player_x = 225;
				this.player_y = 230;
		}
		this.res = window.resource.map["m"][2];

		this.left_fix = -10;
		this.right_fix = 10;
		this.down_fix = 100;

		this.doors.push(this.createDoor(30, 870, "哼唱小道", window.EAST));
		this.doors.push(this.createDoor(1550, 870, "散步路", window.WEST));
		this.doors.push(this.createDoor(200, 300, "精灵森林", window.EAST));

		// monsters_stack
		this.addToNormalMonstersStack(650, 375, 320, 2, "进击的刺蘑菇");
		this.addToNormalMonstersStack(110, 430, 495, 3, "进击的刺蘑菇");
		this.addToNormalMonstersStack(1010, 315, 580, 5, "进击的刺蘑菇");

		this.addToNormalMonstersStack(0, 998, 1710, 4, "猪");
		this.addToNormalMonstersStack(0, 998, 1710, 4, "漂漂猪");
		this.addToNormalMonstersStack(740, 730, 860, 5, "绿水灵球");

		this.map_items.push(this.createItem(0, 0, 998, 1710, 20));
		this.map_items.push(this.createItem(0, 385, 965, 85, 20));
		this.map_items.push(this.createItem(0, 475, 910, 85, 20));
		this.map_items.push(this.createItem(0, 560, 850, 90, 20));
		this.map_items.push(this.createItem(0, 650, 790, 90, 20));
		this.map_items.push(this.createItem(0, 740, 730, 860, 20));
		this.map_items.push(this.createItem(0, 650, 375, 320, 20));
		this.map_items.push(this.createItem(0, 1010, 315, 580, 20));
		this.map_items.push(this.createItem(0, 110, 430, 495, 20));
		this.map_items.push(this.createItem(1, 1065, 315, 20, 335)); // 绳子
		this.map_items.push(this.createItem(3, 475, 930, 20, 45, true));
		this.map_items.push(this.createItem(3, 560, 880, 20, 45, true));
		this.map_items.push(this.createItem(3, 650, 810, 20, 45, true));
		this.map_items.push(this.createItem(3, 740, 750, 20, 45, true));
	}

	this.sanBuLu = function() {
		this.music_src = "sheshoucun";
		this.bg = 0;

		switch(this.orientation) {
			case window.WEST:
				this.x = -20;
				this.y = 0;
				this.player_x = 50;
				this.player_y = 300;
				break;
			case window.EAST:
				this.x = -595;
				this.y = 0;
				this.player_x = 630;
				this.player_y = 300;
				break;
		}

		this.res = window.resource.map["m"][3];

		this.left_fix = -20;
		this.width_fix = 20;
		this.up_fix = 0;
		this.down_fix = -100;

		// doors
		this.doors.push(this.createDoor(50, 260, "三岔路", window.EAST));
		this.doors.push(this.createDoor(1200, 260, "打猎场", window.NORTH));

		// monsters_stack
		this.addToNormalMonstersStack(0, 395, 1400, 5, "蝴蝶");
		this.addToNormalMonstersStack(0, 395, 1400, 3, "漂漂猪");

		// map items
		this.map_items.push(this.createItem(0, 0, 395, 1400, 20));
	}

	this.daLieChang = function() {
		this.music_src = "xunlianchang";
		this.bg = 0;

		switch(this.orientation) {
			case window.NORTH:
				this.x = -320;
				this.y = 0;
				this.player_x = 355;
				this.player_y = 120;
				break;
			case window.EAST:
				this.x = -820;
				this.y = -400;
				this.player_x = 625;
				this.player_y = 290;
				break;
		}

		this.res = window.resource.map["m"][4];

		this.left_fix = -10;
		this.width_fix = 10;
		this.up_fix = 0;
		this.down_fix = 0;

		// doors
		this.doors.push(this.createDoor(650, 80, "散步路", window.EAST));
		this.doors.push(this.createDoor(1420, 660, "石头人寺院I", window.WEST));

		this.addToNormalMonstersStack(345, 450, 750, 4, "花蘑菇");
		this.addToNormalMonstersStack(345, 690, 750, 6, "小青蛇");
		this.addToNormalMonstersStack(260, 930, 930, 5, "吹笛子的猫");
		this.addToNormalMonstersStack(0, 1170, 1620, 10, "钢铁猪");
		// map items
		this.map_items.push(this.createItem(0, 520, 210, 400, 20));
		this.map_items.push(this.createItem(0, 345, 270, 130, 20));
		this.map_items.push(this.createItem(0, 345, 330, 130, 20));
		this.map_items.push(this.createItem(0, 465, 380, 100, 20));
		this.map_items.push(this.createItem(0, 345, 450, 750, 20));

		this.map_items.push(this.createItem(0, 345, 690, 750, 20));
		this.map_items.push(this.createItem(0, 390, 615, 90, 20));
		this.map_items.push(this.createItem(0, 935, 550, 90, 20));
		this.map_items.push(this.createItem(0, 885, 615, 60, 20));
		this.map_items.push(this.createItem(0, 1000, 615, 60, 20));

		this.map_items.push(this.createItem(0, 165, 510, 120, 20));
		this.map_items.push(this.createItem(0, 165, 570, 120, 20));
		this.map_items.push(this.createItem(0, 165, 750, 120, 20));
		this.map_items.push(this.createItem(0, 165, 810, 120, 20));

		this.map_items.push(this.createItem(0, 260, 930, 930, 20));
		this.map_items.push(this.createItem(0, 310, 865, 90, 20));
		this.map_items.push(this.createItem(0, 1000, 865, 60, 20));
		this.map_items.push(this.createItem(0, 1120, 865, 60, 20));
		this.map_items.push(this.createItem(0, 1050, 800, 90, 20));
		this.map_items.push(this.createItem(0, 1150, 750, 130, 20));

		this.map_items.push(this.createItem(0, 1150, 990, 130, 20));
		this.map_items.push(this.createItem(0, 1150, 1050, 130, 20));
		this.map_items.push(this.createItem(0, 1410, 790, 100, 20));
		this.map_items.push(this.createItem(0, 1395, 815, 100, 20));
		this.map_items.push(this.createItem(0, 1370, 840, 100, 20));
		this.map_items.push(this.createItem(0, 1330, 870, 300, 20));

		this.map_items.push(this.createItem(0, 0, 1170, 1620, 20));
		this.map_items.push(this.createItem(0, 1270, 1100, 90, 20));

		this.map_items.push(this.createItem(1, 870, 210, 20, 170));
		this.map_items.push(this.createItem(1, 680, 450, 20, 170));
		this.map_items.push(this.createItem(1, 880, 690, 20, 160));
		this.map_items.push(this.createItem(1, 510, 930, 20, 160));
		this.map_items.push(this.createItem(1, 980, 930, 20, 160));

		this.map_items.push(this.createItem(2, 960, 450, 20, 60));
		this.map_items.push(this.createItem(2, 1065, 690, 20, 60));
	}

	this.shiTouRenShiYuanI = function() {
		this.music_src = "xunlianchang";
		this.bg = 0;

		switch(this.orientation) {
			case window.WEST:
				this.x = 0;
				this.y = -200;
				this.player_x = 100;
				this.player_y = 350;
				break;
			case window.EAST:
				this.x = -720;
				this.y = -200;
				this.player_x = 672;
				this.player_y = 350;
				break;
		}

		this.res = window.resource.map["m"][5];

		this.left_fix = -10;
		this.width_fix = 10;
		this.up_fix = 80;
		this.down_fix = 0;

		// doors
		this.doors.push(this.createDoor(80, 515, "打猎场", window.EAST));
		this.doors.push(this.createDoor(1370, 515, "石头人寺院II", window.WEST));

		this.addToNormalMonstersStack(0, 645, 1520, 4, "石头人");
		this.addToNormalMonstersStack(0, 645, 1520, 4, "黑石头人");
		this.addToNormalMonstersStack(150, 460, 1090, 4, "石头人");
		this.addToNormalMonstersStack(360, 320, 690, 3, "黑石头人");
		this.addToNormalMonstersStack(480, 145, 455, 2, "石头人");

		// map items
		this.map_items.push(this.createItem(0, 0, 645, 1530, 20));
		this.map_items.push(this.createItem(0, 150, 460, 1090, 20));
		this.map_items.push(this.createItem(0, 360, 320, 690, 20));
		this.map_items.push(this.createItem(0, 480, 145, 455, 20));

		this.map_items.push(this.createItem(0, 1055, 220, 130, 20));
		this.map_items.push(this.createItem(0, 1330, 280, 230, 20));

		this.map_items.push(this.createItem(1, 243, 460, 20, 100));
		this.map_items.push(this.createItem(1, 938, 460, 20, 100));
		this.map_items.push(this.createItem(1, 482, 320, 20, 80));
		this.map_items.push(this.createItem(1, 837, 140, 20, 100));
		this.map_items.push(this.createItem(1, 1363, 280, 20, 180));
	}

	this.shiTouRenShiYuanII = function() {
		this.music_src = "xunlianchang";
		this.bg = 0;

		switch(this.orientation) {
			case window.WEST:
				this.x = -10;
				this.y = -150;
				this.player_x = 265;
				this.player_y = 300;
				break;
			case window.NORTH:
				this.x = -600;
				this.y = 0;
				this.player_x = 405;
				this.player_y = 180;
				break;
		}

		this.res = window.resource.map["m"][6];

		this.left_fix = -10;
		this.width_fix = 20;
		this.up_fix = 80;
		this.down_fix = 0;

		// doors
		this.doors.push(this.createDoor(250, 440, "石头人寺院I", window.EAST));
		this.doors.push(this.createDoor(980, 150, "小黑屋", window.WEST));

		this.addToNormalMonstersStack(0, 820, 1890, 7, "钢甲石头人");
		this.addToNormalMonstersStack(0, 820, 1890, 3, "黑石头人");
		this.addToNormalMonstersStack(320, 690, 410, 1, "石头人");
		this.addToNormalMonstersStack(585, 727, 585, 2, "钢甲石头人");
		this.addToNormalMonstersStack(1030, 626, 320, 1, "石头人");
		this.addToNormalMonstersStack(1500, 725, 320, 1, "黑石头人");
		this.addToNormalMonstersStack(1290, 575, 450, 2, "钢甲石头人");

		// map items
		this.map_items.push(this.createItem(0, 120, 575, 500, 20));
		this.map_items.push(this.createItem(0, 20, 655, 440, 20));
		this.map_items.push(this.createItem(0, 320, 690, 410, 20));
		this.map_items.push(this.createItem(0, 80, 625, 90, 20));
		this.map_items.push(this.createItem(0, 0, 820, 1890, 20));

		this.map_items.push(this.createItem(0, 585, 727, 585, 20));
		this.map_items.push(this.createItem(0, 1030, 626, 320, 20));
		this.map_items.push(this.createItem(0, 1200, 647, 450, 20));
		this.map_items.push(this.createItem(0, 1500, 725, 320, 20));
		this.map_items.push(this.createItem(0, 1290, 575, 450, 20));

		this.map_items.push(this.createItem(0, 790, 280, 670, 20));

		this.map_items.push(this.createItem(1, 480, 690, 20, 80));
		this.map_items.push(this.createItem(1, 1402, 645, 20, 100));

		this.map_items.push(this.createItem(2, 1378, 280, 20, 250));
	}

	this.xiaoHeiWu = function() {
		this.music_src = "xunlianchang";
		this.bg = 0;

		this.x = 0;
		this.y = 0;
		this.player_x = 65;
		this.player_y = 305;

		this.res = window.resource.map["m"][7];

		// doors
		this.doors.push(this.createDoor(40, 270, "石头人寺院II", window.NORTH));

		this.map_items.push(this.createItem(0, 0, 453, 1890, 20));
		this.map_items.push(this.createItem(0, 0, 405, 250, 20));
		this.map_items.push(this.createItem(0, 50, 428, 220, 20));
	}

	this.jingLingSenLin = function() {
		this.music_src = "tiankongzhicheng";
		this.bg = 2;

		switch(this.orientation) {
			case window.EAST:
				this.x = -1675;
				this.y = 0;
				this.player_x = 600;
				this.player_y = 230;
				break;
		}

		this.res = window.resource.map["m"][8];
   
		this.left_fix = -60;
		this.width_fix = 10;
		this.up_fix = 0;
		this.down_fix = 0;

		// doors
		this.doors.push(this.createDoor(2250, 180, "三岔路", window.NORTH));

		// monsters
		this.addToSkillAttackMonstersStack(1835, 670, 350, 2, "星光精灵");
		this.addToSkillAttackMonstersStack(575, 493, 935, 6, "月光精灵");
		this.addToSkillAttackMonstersStack(430, 733, 1400, 8, "日光精灵");
		this.addToSkillAttackMonstersStack(660, 250, 667, 5, "星光精灵");
		// map items 
		this.map_items.push(this.createItem(0, 2100, 310, 400, 20));
		this.map_items.push(this.createItem(0, 1835, 370, 220, 20));
		this.map_items.push(this.createItem(0, 1835, 670, 350, 20));
		this.map_items.push(this.createItem(0, 2190, 610, 350, 20));

		this.map_items.push(this.createItem(0, 430, 733, 1400, 20));
		this.map_items.push(this.createItem(0, 575, 493, 935, 20));

		this.map_items.push(this.createItem(0, 660, 250, 667, 20));

		this.map_items.push(this.createItem(0, 390, 370, 125, 20));
		this.map_items.push(this.createItem(0, 330, 670, 100, 20));
		this.map_items.push(this.createItem(0, 0, 613, 340, 20));

		this.map_items.push(this.createItem(3, 2185, 630, 20, 50, true));
		this.map_items.push(this.createItem(3, 1830, 690, 20, 50, true));
		this.map_items.push(this.createItem(3, 325, 630, 20, 50, false));
		this.map_items.push(this.createItem(3, 415, 690, 20, 50, false));

		this.map_items.push(this.createItem(2, 1980, 370, 20, 210));
		this.map_items.push(this.createItem(2, 1040, 250, 20, 210));
		this.map_items.push(this.createItem(1, 765, 493, 20, 160));
		this.map_items.push(this.createItem(1, 1198, 493, 20, 160));
		this.map_items.push(this.createItem(1, 413, 370, 20, 230));
	}

	switch(this.position) {
		case "红枫树":
			this.hongFengShu();
			break;
		case "哼唱小道":
			this.hengChangXiaoDao();
			break;
		case "三岔路":
			this.sanChaLu();
			break;
		case "散步路":
			this.sanBuLu();
			break;
		case "打猎场":
			this.daLieChang();
			break;
		case "石头人寺院I":
			this.shiTouRenShiYuanI();
			break;
		case "石头人寺院II":
			this.shiTouRenShiYuanII();
			break;
		case "小黑屋":
			this.xiaoHeiWu();
			break;
		case "精灵森林":
			this.jingLingSenLin();
			break;
	}
}