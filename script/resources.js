function Resource() {
	this.male_player_res_data = [{name: "walk1", total: 4}, 
							{name: "stand1", total: 5},
						    {name: "swingO1", total: 3},
						    {name: "swingO2", total: 3},
						    {name: "swingO3", total: 3},
					        {name: "swingOF", total: 4},
						    {name: "swingPF", total: 4},
						    {name: "stabO1", total: 2},
						    {name: "stabO2", total: 2},
						    {name: "stabOF", total: 3},
						    {name: "stabT1", total: 3},
						    {name: "proneStab", total: 2},
						    {name: "prone", total: 1},
						    {name: "heal", total: 3},
						    {name: "fly", total: 2},
						    {name: "jump", total: 1},
						    {name: "sit", total: 1},
						    {name: "ladder", total: 2},
						    {name: "rope", total: 2}];	

	this.female_player_res_data = [{name: "walk1", total: 4}, 
							{name: "stand1", total: 5},
						    {name: "swingO1", total: 3},
						    {name: "swingO2", total: 3},
						    {name: "swingO3", total: 3},
					        {name: "swingOF", total: 4},
						    {name: "swingPF", total: 4},
						    {name: "stabO1", total: 2},
						    {name: "stabO2", total: 2},
						    {name: "stabOF", total: 3},
						    {name: "stabT1", total: 3},
						    {name: "proneStab", total: 2},
						    {name: "prone", total: 1},
						    {name: "heal", total: 3},
						    {name: "fly", total: 2},
						    {name: "jump", total: 1},
						    {name: "sit", total: 1},
						    {name: "ladder", total: 2},
						    {name: "rope", total: 2}];	

	this.yingzi_res_data = [{name: "special.walk1", total: 4}, 
							{name: "special.stand1", total: 5},
						    {name: "special.swingO1", total: 3},
						    {name: "special.swingO2", total: 3},
						    {name: "special.swingO3", total: 3},
					        {name: "special.swingOF", total: 4},
						    {name: "special.swingPF", total: 4},
						    {name: "special.stabO1", total: 2},
						    {name: "special.stabO2", total: 2},
						    {name: "special.stabOF", total: 3},
						    {name: "special.stabT1", total: 3},
						    {name: "special.proneStab", total: 2},
						    {name: "special.prone", total: 1},
						    {name: "special.heal", total: 3},
						    {name: "special.fly", total: 2},
						    {name: "special.jump", total: 1},
						    {name: "special.sit", total: 1},
						    {name: "special.ladder", total: 2},
						    {name: "special.rope", total: 2},
						    {name: "special.dead", total: 3}];	

	this.bg_res_data = [{name: "bg", total: 4}];
	this.map_res_data = [{name: "m", total: 10}];

	this.effect_res_data = [{name: "pv", total: 8}, 
							{name: "fall", total: 20},
							{name: "icon0", total: 4},
							{name: "icon50", total: 4},
							{name: "icon100", total: 4},
							{name: "icon1000", total: 4},
							{name: "LevelUp2", total: 23},
							{name: "NoCri0", total: 11},
							{name: "NoRed1", total: 10},
							{name: "NoViolet1", total: 10}];
	// monsters
	this.lanwoniu_res_data = [{name: "die1", total: 3},
						 {name: "hit1", total: 1},
						 {name: "move", total: 7},
						 {name: "stand", total: 1}];
	this.moguzai_res_data = [{name: "die1", total: 4},
						 {name: "hit1", total: 1},
						 {name: "move", total: 4},
						 {name: "stand", total: 5}];
	this.jinjidecimogu_res_data = [{name: "die1", total: 7},
							{name: "hit1", total: 1},
							{name: "move", total: 5},
							{name: "stand", total: 3}];
	this.xiaoqingshe_res_data = [{name: "die1", total: 3},
						{name: "hit1", total: 1},
						{name: "move", total: 3},
						{name: "stand", total: 3}];
	this.gangjiashitouren_res_data = [{name: "die1", total: 6},
						{name: "hit1", total: 1},
						{name: "move", total: 12},
						{name: "stand", total: 5}];

	// jump
	this.lvshuilingqiu_res_data = [{name: "die1", total: 4},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "move", total: 7},
							{name: "stand", total: 3}];
	this.piaopiaozhu_res_data = [{name: "die1", total: 3},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "move", total: 3},
							{name: "stand", total: 3}];
	this.zhu_res_data = [{name: "die1", total: 3},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "move", total: 3},
							{name: "stand", total: 3}];
    this.huamogu_res_data = [{name: "die1", total: 4},
						{name: "hit1", total: 1},
						{name: "jump", total: 1},
						{name: "move", total: 3},
						{name: "stand", total: 2}];
	this.chuidizidemao_res_data = [{name: "die1", total: 14},
						{name: "hit1", total: 1},
						{name: "jump", total: 1},
						{name: "move", total: 6},
						{name: "stand", total: 6}];

	// skill
	this.hudie_res_data = [{name: "die1", total: 7},
							{name: "hit1", total: 1},
							{name: "skill1", total: 9},
							{name: "move", total: 4},
							{name: "stand", total: 4}];
	this.shitouren_res_data = [{name: "die1", total: 7},
							{name: "hit1", total: 1},
							{name: "skill1", total: 10},
							{name: "move", total: 4},
							{name: "stand", total: 5}];
    this.heishitouren_res_data = [{name: "die1", total: 7},
							{name: "hit1", total: 1},
							{name: "skill1", total: 9},
							{name: "move", total: 4},
							{name: "stand", total: 5}];
	this.gangtiezhu_res_data = [{name: "die1", total: 2},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "skill1", total: 9},
							{name: "move", total: 3},
							{name: "stand", total: 3}];

	// magic attack 
	this.xingguangjingling_res_data = [{name: "die1", total: 5},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "attack1", total: 16},
							{name: "attack1.info.ball", total: 3},
							{name: "attack1.info.hit", total: 4},
							{name: "move", total: 6},
							{name: "stand", total: 6}];
	this.yueguangjingling_res_data = [{name: "die1", total: 5},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "attack1", total: 16},
							{name: "attack1.info.ball", total: 3},
							{name: "attack1.info.hit", total: 4},
							{name: "move", total: 6},
							{name: "stand", total: 6}];
	this.riguangjingling_res_data = [{name: "die1", total: 5},
							{name: "hit1", total: 1},
							{name: "jump", total: 1},
							{name: "attack1", total: 21},
							{name: "attack1.info.ball", total: 3},
							{name: "attack1.info.hit", total: 4},
							{name: "move", total: 6},
							{name: "stand", total: 6}];

    // physical attack


    // skill effect
    this.erlianji_res_data = [{name: "effect", total: 7}, {name: "hit.0", total: 4}];
    this.huixuanzhan_res_data = [{name: "effect", total: 8}, {name: "hit.0", total: 1}, {name: "hit.1", total: 1}, {name: "hit.2", total: 1}];
    this.luoyezhan_res_data = [{name: "effect", total: 6}, {name: "effect0", total: 6}, {name: "remain", total: 7}, {name: "hit.0", total: 4}];
    this.yingwushunsha_res_data = [{name: "effect", total: 15}, {name: "hit.0", total: 5}];
    this.yingzifenshen_res_data = [{name: "effect", total: 16}, {name: "effect0", total: 11}];
    this.yongshideyizhi_res_data = [{name: "effect", total: 23}];

    // things
    this.things_res_data = [{name: "hong50", total: 1}, {name: "hong150", total: 1}, {name: "hong300", total: 1}, {name: "lan100", total: 1},
    						{name: "fenghuangren", total: 1}, {name: "fengyeren", total: 1}, {name: "guahudao", total: 1}, {name: "shuangyiren", total: 1}, 
    						{name: "heitangshan", total: 1}, {name: "qingmeng", total: 1},
    						{name: "lansewoniuke", total: 1}, {name: "moguyabao", total: 1},  {name: "hudiejie", total: 1},
    						{name: "zhutou", total: 1},  {name: "lvyeqiu", total: 1}, {name: "lvshuilingzhu", total: 1},
    						{name: "cimogugai", total: 1}, {name: "gangtiekuai", total: 1}, {name: "gangtiezhudetizi", total: 1},
    						{name: "gangtiezhukuijiasuikuai", total: 1}, {name: "heishikuai", total: 1}, {name: "shikuai", total: 1},
    						{name: "huamogugai", total: 1}, {name: "huolishenshui", total: 1}, {name: "maopi", total: 1},
    						{name: "xingkuai", total: 1}, {name: "yuekuai", total: 1}, {name: "rikuai", total: 1},
    						{name: "shepi", total: 1}]

    // ui
    this.ui_res_data = [{name: "main_bar", total: 1}, {name: "backpack", total: 13}, {name: "equipment", total: 1}, {name: "ability", total: 3}];

	this.curr_amount = 0;
	this.total_amount = 0;
	this.is_finish = false;

	this.player = [];
	this.male_player = [];
	this.female_player = [];
	this.yingzi = [];
	this.bg = [];
	this.effect = [];
	this.map = [];

	this.lanwoniu = [];
	this.moguzai = [];
	this.jinjidecimogu = [];
	this.xiaoqingshe = [];
	this.gangjiashitouren = [];

	// jump
	this.lvshuilingqiu = [];
	this.piaopiaozhu = [];
	this.zhu = [];
	this.huamogu = [];
	this.chuidizidemao = [];

	// skill
	this.hudie = [];
	this.shitouren = [];
	this.heishitouren = [];
	this.gangtiezhu = [];

	// magic attack
	this.xingguangjingling = [];
	this.yueguangjingling = [];
	this.riguangjingling = [];

	// skill effect
	this.erlianji = [];
    this.huixuanzhan = [];
    this.luoyezhan = [];
    this.yingwushunsha = [];
    this.yingzifenshen = [];
    this.yongshideyizhi = [];

    // things
    this.things = [];

    // ui
    this.ui = [];

	this.calculateTotal = function(res_data) {
		for (var i in res_data) {
			this.total_amount += res_data[i].total;
		}
	}

	this.total = function() {
		this.calculateTotal(this.male_player_res_data);
		this.calculateTotal(this.female_player_res_data);
		this.calculateTotal(this.yingzi_res_data);
		this.calculateTotal(this.bg_res_data);
		this.calculateTotal(this.effect_res_data);
		this.calculateTotal(this.map_res_data);

		this.calculateTotal(this.lanwoniu_res_data);
		this.calculateTotal(this.moguzai_res_data);
		this.calculateTotal(this.jinjidecimogu_res_data);
		this.calculateTotal(this.xiaoqingshe_res_data);
		this.calculateTotal(this.gangjiashitouren_res_data);

		this.calculateTotal(this.lvshuilingqiu_res_data);
		this.calculateTotal(this.piaopiaozhu_res_data);
		this.calculateTotal(this.zhu_res_data);
		this.calculateTotal(this.huamogu_res_data);
		this.calculateTotal(this.chuidizidemao_res_data);

		this.calculateTotal(this.hudie_res_data);
		this.calculateTotal(this.shitouren_res_data);
		this.calculateTotal(this.heishitouren_res_data);
		this.calculateTotal(this.gangtiezhu_res_data);

		this.calculateTotal(this.xingguangjingling_res_data);
		this.calculateTotal(this.yueguangjingling_res_data);
		this.calculateTotal(this.riguangjingling_res_data);

		// skill effect
		this.calculateTotal(this.erlianji_res_data);
		this.calculateTotal(this.huixuanzhan_res_data);
		this.calculateTotal(this.luoyezhan_res_data);
		this.calculateTotal(this.yingwushunsha_res_data);
		this.calculateTotal(this.yingzifenshen_res_data);
		this.calculateTotal(this.yongshideyizhi_res_data);

		// things
		this.calculateTotal(this.things_res_data);

		// ui
		this.calculateTotal(this.ui_res_data);

		// font
		this.total_amount++;
	}

	this.load = function() {
		this.total();
		this.loadFont();

		this.loadResurces(this.male_player, this.male_player_res_data, "character_male");
		this.loadResurces(this.female_player, this.female_player_res_data, "character_female");
		this.loadResurces(this.yingzi, this.yingzi_res_data, "skill/yingzifenshen")
		this.loadResurces(this.bg, this.bg_res_data, "bg");
		this.loadResurces(this.map, this.map_res_data, "map");
		this.loadResurces(this.effect, this.effect_res_data, "effect");

		this.loadResurces(this.lanwoniu, this.lanwoniu_res_data, "monster/lanwoniu");
		this.loadResurces(this.moguzai, this.moguzai_res_data, "monster/moguzai");
		this.loadResurces(this.jinjidecimogu, this.jinjidecimogu_res_data, "monster/jinjidecimogu");
		this.loadResurces(this.xiaoqingshe, this.xiaoqingshe_res_data, "monster/xiaoqingshe");
		this.loadResurces(this.gangjiashitouren, this.gangjiashitouren_res_data, "monster/gangjiashitouren");

		this.loadResurces(this.lvshuilingqiu, this.lvshuilingqiu_res_data, "monster/lvshuilingqiu");
		this.loadResurces(this.piaopiaozhu, this.piaopiaozhu_res_data, "monster/piaopiaozhu");
		this.loadResurces(this.zhu, this.zhu_res_data, "monster/zhu");
		this.loadResurces(this.huamogu, this.huamogu_res_data, "monster/huamogu");
		this.loadResurces(this.chuidizidemao, this.chuidizidemao_res_data, "monster/chuidizidemao");
		// 
		this.loadResurces(this.hudie, this.hudie_res_data, "monster/hudie");
		this.loadResurces(this.heishitouren, this.heishitouren_res_data, "monster/heishitouren");
		this.loadResurces(this.shitouren, this.shitouren_res_data, "monster/shitouren");
		this.loadResurces(this.gangtiezhu, this.gangtiezhu_res_data, "monster/gangtiezhu");

		this.loadResurces(this.xingguangjingling, this.xingguangjingling_res_data, "monster/xingguangjingling");
		this.loadResurces(this.yueguangjingling, this.yueguangjingling_res_data, "monster/yueguangjingling");
		this.loadResurces(this.riguangjingling, this.riguangjingling_res_data, "monster/riguangjingling");

		// skill effect
		this.loadResurces(this.erlianji, this.erlianji_res_data, "skill/erlianji");
		this.loadResurces(this.huixuanzhan, this.huixuanzhan_res_data, "skill/huixuanzhan");
		this.loadResurces(this.luoyezhan, this.luoyezhan_res_data, "skill/luoyezhan");
		this.loadResurces(this.yingwushunsha, this.yingwushunsha_res_data, "skill/yingwushunsha");
		this.loadResurces(this.yingzifenshen, this.yingzifenshen_res_data, "skill/yingzifenshen");
		this.loadResurces(this.yongshideyizhi, this.yongshideyizhi_res_data, "skill/yongshideyizhi");

		// things
		this.loadResurces(this.things, this.things_res_data, "things");

		// ui
		this.loadResurces(this.ui, this.ui_res_data, "ui");
	}

	this.loadFont = function() {
		var parent = this;
		var font = new FontFace("liwen", "url(font/FZMWFont.ttf)", {});
			font.load().then(function (loadedFace) {
			 	document.fonts.add(loadedFace);
			 	document.body.style.fontFamily = "liwen, 微软雅黑";
			 	parent.curr_amount++;
			});
	}

	this.loadResurces = function(res_obj, res_data, dir) {
		var parent = this;
		for (var i = 0; i < res_data.length; i++) {
			var regx_path = dir + "/" + res_data[i].name + "_%.png";
			for (var j = 0; j < res_data[i].total; j++) {
				var path = regx_path.replace("%", j);
				var img = new Image();
					img.src = path;
					img.onload = function() {
						parent.curr_amount++;
					}
				if(!res_obj[res_data[i].name]) {
					res_obj[res_data[i].name] = [];
				}
				res_obj[res_data[i].name].push(img);
			}
		}
	}
}