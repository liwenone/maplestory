function SkillsAttr() {
	this.erLianJi = {
		attack_percent: 1.3,
		max_skill_count: 2,
		max_monster_count: 2,
		is_ignore_defense: false,
		power_hit: 0,
		mp: 0
	};

	this.luoYeZhan0 = {
		attack_percent: 0,
		max_skill_count: 0,
		max_monster_count: 0,
		is_ignore_defense: false,
		power_hit: 0,
		mp: 1
	};
	this.luoYeZhan1 = {
		attack_percent: 0,
		max_skill_count: 0,
		max_monster_count: 0,
		is_ignore_defense: false,
		power_hit: 0,
		mp: 1
	};

	this.luoYeZhan2 = {
		attack_percent: 4.5,
		max_skill_count: 1,
		max_monster_count: 1,
		is_ignore_defense: true,
		power_hit: 0.2,
		mp: 1
	};

	this.huiXuanZhan = {
		attack_percent: 0.8,
		max_skill_count: 6,
		max_monster_count: 1,
		is_ignore_defense: false,
		power_hit: 0,
		mp: 1
	};

	this.yingWuShunSha = {
		attack_percent: 3,
		max_skill_count: 2,
		max_monster_count: 4,
		is_ignore_defense: false,
		power_hit: 0.1,
		mp: 1
	};


	this.yingZiFenShen0 = {
		attack_percent: 0,
		max_skill_count: 0,
		max_monster_count: 0,
		mp: 0
	};
	this.yingZiFenShen1 = {
		attack_percent: 0,
		max_skill_count: 0,
		max_monster_count: 0,
		mp: 0
	};

	this.yongShiDeYiZhi = {
		attack_percent: 0,
		max_skill_count: 0,
		max_monster_count: 0,
		mp: 0
	};

	this.getSkillsAttr = function() {
		var skills = [];
			skills["二连击"] = this.erLianJi;
			skills["落叶斩0"] = this.luoYeZhan0;
			skills["落叶斩1"] = this.luoYeZhan1;
			skills["落叶斩2"] = this.luoYeZhan2;
			skills["回旋斩"] = this.huiXuanZhan;
			skills["影舞瞬杀"] = this.yingWuShunSha;

			skills["影子分身0"] = this.yingZiFenShen0;
			skills["影子分身1"] = this.yingZiFenShen1;
			skills["勇士的意志"] = this.yongShiDeYiZhi;
		return skills;
	}
}

function PlayerAttr() {
	this.level = 1;
	this.level_exp = [15, 34, 57, 92, 135, 372, 560, 840, 1242, 1490, 1788, 2145, 2574, 
					   3088, 3705, 4446, 5335, 6402, 7682, 9218, 11061, 13273, 15927, 19112,
					   22934, 27520, 33024, 39628, 47553, 51357, 55465, 59902, 64694, 69869, 75458,
					   81494, 88013, 999999999];
	this.max_hp = 50;
	this.curr_hp = this.max_hp;
	this.max_mp = 30;
	this.curr_mp = this.max_mp;
	this.curr_exp = 0;
	this.max_exp = this.level_exp[0]; 

	this.money = 0;

	this.update = function() {
		var attack = this.basic_attack;
		var defense = this.basic_defense;
		var magic_defense = this.basic_magic_defense;
		var power_hit = this.basic_power_hit;
		if (this.weapon != null) {
			attack += this.weapon.properties.attack;
			defense += this.weapon.properties.defense;
			magic_defense += this.weapon.properties.magic_defense;
			power_hit += this.weapon.properties.power_hit;
		} 
		if (this.clothes != null) {
			attack += this.clothes.properties.attack;
			defense += this.clothes.properties.defense;
			magic_defense += this.clothes.properties.magic_defense;
			power_hit += this.clothes.properties.power_hit;
		}
		this.max_attack = parseInt(((this.LUK * this.weapon_up_fix) + (this.STR + this.DEX) / 4) * attack / 25);
		this.min_attack = parseInt(((this.LUK * this.weapon_down_fix * this.weapon_proficiency) + (this.STR + this.DEX) / 4) * attack / 25);
		this.power_hit = parseFloat((power_hit  + this.level / 500).toFixed(2));
		this.defense = defense + (this.level - 1) * 3 + (this.STR - 4) * 4 + (this.DEX - 4) * 2;
		this.magic_defense = magic_defense + (this.level - 1) * 3 + (this.DEX - 4) * 2 + (this.INT - 4) * 4;
	}

	this.point = 0;
	this.STR = 4;
	this.DEX = 4;
	this.INT = 4;
	this.LUK = 4;

	this.basic_attack = 10;
	this.weapon_up_fix = 1.0;
	this.weapon_down_fix = 0.9;
	this.weapon_proficiency = 0.15;

	this.max_attack;
	this.min_attack;
	this.power_hit = 0;
	this.defense = 0;
	this.magic_defense = 0;

	this.basic_power_hit = 0.2;
	this.basic_defense = 1;
	this.basic_magic_defense = 1;
	this.work = "飞侠";

	this.physic_hit = "-";
	this.magic_hit = "-";

	this.physic_avoid = "-";
	this.magic_avoid = "-";

	this.weapon = null;
	this.clothes = null;
	this.update();
}

function MonstersAttr() {
	this.lanWoNiu = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 2,
		max_attack: 5,
		defense: 0,
		max_hp: 24,
		exp: 4,
		things: []
	}
	this.lanWoNiu.things["金币"] = {type: 0, min: 3, max: 8, percent: 0.8};
	this.lanWoNiu.things["蓝色蜗牛壳"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.lanWoNiu.things["红色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.lanWoNiu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.lanWoNiu.things["刮胡刀"] = {type: 1, percent: 0.1};

	this.moGuZai = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 4,
		max_attack: 8,
		defense: 3,
		max_hp: 45,
		exp:5,
		things: []
	}
	this.moGuZai.things["金币"] = {type: 0, min: 5, max: 12, percent: 0.8};
	this.moGuZai.things["蘑菇芽孢"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.moGuZai.things["红色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.moGuZai.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.moGuZai.things["刮胡刀"] = {type: 1, percent: 0.1};

	this.jinJiDeCiMoGu = {
		speed: 5,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 45,
		max_attack: 55,
		defense: 36,
		max_hp: 240,
		exp: 35,
		things: []
	}
	this.jinJiDeCiMoGu.things["金币"] = {type: 0, min: 30, max: 50, percent: 0.8};
	this.jinJiDeCiMoGu.things["刺蘑菇盖"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.jinJiDeCiMoGu.things["橙色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.jinJiDeCiMoGu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.jinJiDeCiMoGu.things["青梦"] = {type: 1, percent: 0.1};

	this.xiaoQingShe = {
		speed: 5,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 32,
		max_attack: 53,
		defense: 30,
		max_hp: 350,
		exp: 42,
		things: []
	}
	this.xiaoQingShe.things["金币"] = {type: 0, min: 40, max: 60, percent: 0.8};
	this.xiaoQingShe.things["橙色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.xiaoQingShe.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.xiaoQingShe.things["蛇皮"] = {type: 3, min: 1, max: 1, percent: 0.8};

	this.gangJiaShiTouRen = {
		speed: 2,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 1750,
		max_attack: 2350,
		defense: 3333,
		max_hp: 9999,
		exp: 1000,
		things: []
	}
	this.gangJiaShiTouRen.things["金币"] = {type: 0, min: 1200, max: 1800, percent: 0.8};
	this.gangJiaShiTouRen.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.gangJiaShiTouRen.things["活力神水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.gangJiaShiTouRen.things["凤凰刃"] = {type: 1, percent: 0.1};
	this.gangJiaShiTouRen.things["黑唐衫"] = {type: 1, percent: 0.1};
	this.gangJiaShiTouRen.things["钢铁块"] = {type: 3, min: 1, max: 1, percent: 0.7};

	this.lvShuiLingQiu = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 14,
		max_attack: 25,
		defense: 14,
		max_hp: 240,
		exp: 28,
		things: []
	}
	this.lvShuiLingQiu.things["金币"] = {type: 0, min: 20, max: 30, percent: 0.8};
	this.lvShuiLingQiu.things["绿水灵珠"] = {type: 3, min: 1, max: 1, percent: 0.3};
	this.lvShuiLingQiu.things["绿液球"] = {type: 3, min: 1, max: 1, percent: 0.8};
	this.lvShuiLingQiu.things["红色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.lvShuiLingQiu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.lvShuiLingQiu.things["枫叶刃"] = {type: 1, percent: 0.1};

	this.piaoPiaoZhu = {
		speed: 4,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 32,
		max_attack: 45,
		defense: 15,
		max_hp: 320,
		exp: 32,
		things: []
	}
	this.piaoPiaoZhu.things["金币"] = {type: 0, min: 26, max: 34, percent: 0.8};
	this.piaoPiaoZhu.things["蝴蝶结"] = {type: 3, min: 1, max: 1, percent: 0.8};
	this.piaoPiaoZhu.things["橙色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.piaoPiaoZhu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.piaoPiaoZhu.things["青梦"] = {type: 1, percent: 0.1};

	this.zhu = {
		speed: 4,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 32,
		max_attack: 45,
		defense: 15,
		max_hp: 280,
		exp: 30,
		things: []
	}
	this.zhu.things["金币"] = {type: 0, min: 26, max: 34, percent: 0.8};
	this.zhu.things["猪头"] = {type: 3, min: 1, max: 1, percent: 0.8};
	this.zhu.things["红色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.zhu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.zhu.things["青梦"] = {type: 1, percent: 0.1};

	this.huDie = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 40,
		max_attack: 56,
		defense: 30,
		max_hp: 520,
		exp: 42,
		things: []
	}
	this.huDie.things["金币"] = {type: 0, min: 45, max: 65, percent: 0.8};
	this.huDie.things["橙色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.huDie.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};

	this.huaMoGu = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 50,
		max_attack: 65,
		defense: 42,
		max_hp: 640,
		exp: 50,
		things: []
	}
	this.huaMoGu.things["金币"] = {type: 0, min: 52, max: 63, percent: 0.8};
	this.huaMoGu.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.huaMoGu.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.huaMoGu.things["花蘑菇盖"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.huaMoGu.things["黑唐衫"] = {type: 1, percent: 0.1};


	this.chuiDiZiDeMao = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 56,
		max_attack: 70,
		defense: 60,
		max_hp: 720,
		exp: 56,
		things: []
	}
	this.chuiDiZiDeMao.things["金币"] = {type: 0, min: 80, max: 98, percent: 0.8};
	this.chuiDiZiDeMao.things["猫皮"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.chuiDiZiDeMao.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.chuiDiZiDeMao.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.chuiDiZiDeMao.things["双翼刃"] = {type: 1, percent: 0.1};

	this.shiTouRen = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 85,
		max_attack: 105,
		defense: 72,
		max_hp: 1200,
		exp: 102,
		things: []
	}
	this.shiTouRen.things["金币"] = {type: 0, min: 100, max: 120, percent: 0.8};
	this.shiTouRen.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.shiTouRen.things["活力神水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.shiTouRen.things["石块"] = {type: 3, min: 1, max: 1, percent: 0.7};

	this.heiShiTouRen = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 95,
		max_attack: 125,
		defense: 96,
		max_hp: 1500,
		exp: 120,
		things: []
	}
	this.heiShiTouRen.things["金币"] = {type: 0, min: 120, max: 150, percent: 0.8};
	this.heiShiTouRen.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.heiShiTouRen.things["活力神水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.heiShiTouRen.things["黑石块"] = {type: 3, min: 1, max: 1, percent: 0.7};

	this.gangTieZhu = {
		speed: 3,
		min_magic_attack: 0,
		max_magic_attack: 0,
		min_attack: 210,
		max_attack: 260,
		defense: 1200,
		max_hp: 4500,
		exp: 250,
		things: []
	}
	this.gangTieZhu.things["金币"] = {type: 0, min: 200, max: 300, percent: 0.8};
	this.gangTieZhu.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.gangTieZhu.things["钢铁猪的蹄子"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.gangTieZhu.things["钢铁猪盔甲碎片"] = {type: 3, min: 1, max: 1, percent: 0.3};
	this.gangTieZhu.things["活力神水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.gangTieZhu.things["凤凰刃"] = {type: 1, percent: 0.1};

	this.xingGuangJingLing = {
		speed: 3,
		min_magic_attack: 100,
		max_magic_attack: 120,
		min_attack: 60,
		max_attack: 80,
		defense: 65,
		max_hp: 560,
		exp: 72,
		things: []
	}
	this.xingGuangJingLing.things["金币"] = {type: 0, min: 70, max: 90, percent: 0.8};
	this.xingGuangJingLing.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.xingGuangJingLing.things["星光精灵的碎块"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.xingGuangJingLing.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.xingGuangJingLing.things["枫叶刃"] = {type: 1, percent: 0.1};

	this.yueGuangJingLing = {
		speed: 3,
		min_magic_attack: 120,
		max_magic_attack: 140,
		min_attack: 80,
		max_attack: 100,
		defense: 85,
		max_hp: 720,
		exp: 80,
		things: []
	}
	this.yueGuangJingLing.things["金币"] = {type: 0, min: 90, max: 110, percent: 0.8};
	this.yueGuangJingLing.things["月光精灵的碎块"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.yueGuangJingLing.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.yueGuangJingLing.things["蓝色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.yueGuangJingLing.things["双翼刃"] = {type: 1, percent: 0.1};

	this.riGuangJingLing = {
		speed: 3,
		min_magic_attack: 154,
		max_magic_attack: 187,
		min_attack: 85,
		max_attack: 105,
		defense: 100,
		max_hp: 960,
		exp: 88,
		things: []
	}
	this.riGuangJingLing.things["金币"] = {type: 0, min: 100, max: 120, percent: 0.8};
	this.riGuangJingLing.things["日光精灵的碎块"] = {type: 3, min: 1, max: 1, percent: 0.7};
	this.riGuangJingLing.things["白色药水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.riGuangJingLing.things["活力神水"] = {type: 2, min: 1, max: 3, percent: 0.3};
	this.riGuangJingLing.things["黑唐衫"] = {type: 1, percent: 0.1};

	this.getMonstersAttr = function() {
		var monsters_attr = [];
			monsters_attr["蓝蜗牛"] = this.lanWoNiu;
			monsters_attr["蘑菇仔"] = this.moGuZai;
			monsters_attr["进击的刺蘑菇"] = this.jinJiDeCiMoGu;
			monsters_attr["小青蛇"] = this.xiaoQingShe;
			monsters_attr["钢甲石头人"] = this.gangJiaShiTouRen;
			monsters_attr["绿水灵球"] = this.lvShuiLingQiu;
			monsters_attr["漂漂猪"] = this.piaoPiaoZhu;
			monsters_attr["猪"] = this.zhu;
			monsters_attr["花蘑菇"] = this.huaMoGu;
			monsters_attr["吹笛子的猫"] = this.chuiDiZiDeMao;
			monsters_attr["蝴蝶"] = this.huDie;
			monsters_attr["石头人"] = this.shiTouRen;
			monsters_attr["黑石头人"] = this.heiShiTouRen;
			monsters_attr["钢铁猪"] = this.gangTieZhu;
			monsters_attr["星光精灵"] = this.xingGuangJingLing;
			monsters_attr["月光精灵"] = this.yueGuangJingLing;
			monsters_attr["日光精灵"] = this.riGuangJingLing;

		return monsters_attr;
	}
}
