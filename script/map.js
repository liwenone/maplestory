function Map(data) {
	this.x = data.x;
	this.y = data.y;
	this.res = data.res;
	this.map_items = data.map_items;

	this.left_fix = data.left_fix;
	this.up_fix = data.up_fix;
	this.width = data.res.width - data.right_fix;
	this.height = data.res.height - data.down_fix;

	this.isLeftMovable = function() {
		if (this.x < this.left_fix) {
			return true;
		} else {
			return false;
		}
	}

	this.isRightMovable = function() {
		if (this.width + this.x + this.left_fix > window.WIDTH) {
			return true;
		} else {
			return false;
		}
	}

	this.isUpMovable = function() {
		if (this.y < this.up_fix) {
			return true;
		} else {
			return false;
		}
	}

	this.isDownMovable = function() {
		if (this.height + this.y > window.HEIGHT) {
			return true;
		} else {
			return false;
		}
	}

	this.update = function(dx, dy) {
		this.updateX(dx);
		this.updateY(dy);
	}

	this.updateX = function(dx) {
		this.x += dx;
		for (var i in this.map_items) {
			this.map_items[i].rect.x +=dx;
		}
	}

	this.updateY = function(dy) {
		this.y +=dy;
		for (var i in this.map_items) {
			this.map_items[i].rect.y += dy;
		}
	}

	// 检测玩家与地图碰撞
	this.checkCollision = function(rect, is_down, is_fall) {
		var result = {is_floor: false, foor_item: null, is_rope: false, rope_item: null, is_stop: false, stop_item: null, is_ladder: false, ladder_item: null};
		for (var i in this.map_items) {
			var item = this.map_items[i];
			if (this.map_items[i].rect.collision(rect)) {
				switch(item.type) {
					case 0:
						result.is_floor = true;
						result.foor_item = item;
						break;
					case 1:
						result.is_rope = true;
						result.rope_item = item;
						if (is_down)
							result.is_floor = false;
					 	break;
					case 2:
						result.is_ladder = true;
						result.ladder_item = item;
						if (is_down) result.is_floor = false;
						break;
					case 3:
						result.is_stop = true;
						result.stop_item = item;
						break;
				}
				
			}
		}
		return result;
	}

	this.draw = function(ctx) {
		ctx.drawImage(this.res, this.x, this.y);

		if (window.is_draw_rect) {
			ctx.save();
			for (var i in this.map_items) {
				var item = this.map_items[i];
				if (item.type == 1 || item.type == 2) {
					ctx.fillStyle = "#B8860B";
				} else {
					ctx.fillStyle = "#9BCD9B";
				}
				ctx.fillRect(item.rect.x, item.rect.y, item.rect.width, item.rect.height);
			}
			ctx.restore();
		}
	}
}