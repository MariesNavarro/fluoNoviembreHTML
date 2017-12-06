! function()
{
	"use strict";
	var lava0, lava1;
	// ==== Point constructor ====
	var Point = function(x, y)
	{
		this.x = x;
		this.y = y;
		this.magnitude = x * x + y * y;
		this.computed = 0;
		this.force = 0;
	}
	Point.prototype.add = function(p)
	{
		return new Point(this.x + p.x, this.y + p.y);
	}
	// ==== Ball constructor ====
	var Ball = function(parent)
	{
		this.vel = new Point(
			(Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 0.25), (Math.random() > 0.5 ? 1 : -1) * (0.2 + Math.random() * 1)
		);
		this.pos = new Point(
			parent.width * 0.2 + Math.random() * parent.width * 0.6,
			parent.height * 0.2 + Math.random() * parent.height * 0.6
		);
		this.size = (parent.wh / 15) + Math.random() * (parent.wh / 15);
		this.width = parent.width;
		this.height = parent.height;
	}
	// ==== move balls ====
	Ball.prototype.move = function()
	{
		// ---- interact with pointer ----
		if (pointer.active)
		{
			var dx = pointer.pos.x - this.pos.x;
			var dy = pointer.pos.y - this.pos.y;
			var a = Math.atan2(dy, dx);
			var v = -Math.min(
				10,
				500 / Math.sqrt(dx * dx + dy * dy)
			);
			this.pos = this.pos.add(
				new Point(
					Math.cos(a) * v,
					Math.sin(a) * v
				)
			);
		}
		// ---- bounce borders ----
		if (this.pos.x >= this.width - this.size)
		{
			if (this.vel.x > 0) this.vel.x = -this.vel.x;
			this.pos.x = this.width - this.size;
		}
		else if (this.pos.x <= this.size)
		{
			if (this.vel.x < 0) this.vel.x = -this.vel.x;
			this.pos.x = this.size;
		}
		if (this.pos.y >= this.height - this.size)
		{
			if (this.vel.y > 0) this.vel.y = -this.vel.y;
			this.pos.y = this.height - this.size;
		}
		else if (this.pos.y <= this.size)
		{
			if (this.vel.y < 0) this.vel.y = -this.vel.y;
			this.pos.y = this.size;
		}
		// ---- velocity ----
		this.pos = this.pos.add(this.vel);
	}
	// ==== lavalamp constructor ====
	var LavaLamp = function(width, height, numBalls, c0, c1)
	{
		this.step = 10;
		this.width = width;
		this.height = height;
		this.wh = Math.min(width, height);
		this.sx = Math.floor(this.width / this.step);
		this.sy = Math.floor(this.height / this.step);
		this.paint = false;
		this.metaFill = createRadialGradient(width, height, width, c0, c1);
		this.plx = [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0];
		this.ply = [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1];
		this.mscases = [0, 3, 0, 3, 1, 3, 0, 3, 2, 2, 0, 2, 1, 1, 0];
		this.ix = [1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1];
		this.grid = [];
		this.balls = [];
		this.iter = 0;
		this.sign = 1;
		// ---- init grid ----
		for (var i = 0; i < (this.sx + 2) * (this.sy + 2); i++)
		{
			this.grid[i] = new Point(
				(i % (this.sx + 2)) * this.step, (Math.floor(i / (this.sx + 2))) * this.step
			)
		}
		// ---- create metaballs ----
		for (var i = 0; i < numBalls; i++)
		{
			this.balls[i] = new Ball(this);
		}
	}
	// ==== compute cell force ====
	LavaLamp.prototype.computeForce = function(x, y, idx)
	{
		var force;
		var id = idx || x + y * (this.sx + 2);
		if (x === 0 || y === 0 || x === this.sx || y === this.sy)
		{
			var force = 0.6 * this.sign;
		}
		else
		{
			var cell = this.grid[id];
			var force = 0;
			var i = 0,
				ball;
			while (ball = this.balls[i++])
			{
				force += ball.size * ball.size / (-2 * cell.x * ball.pos.x - 2 * cell.y * ball.pos.y + ball.pos.magnitude + cell.magnitude);
			}
			force *= this.sign
		}
		this.grid[id].force = force;
		return force;
	}
	// ---- compute cell ----
	LavaLamp.prototype.marchingSquares = function(next)
	{
		var x = next[0];
		var y = next[1];
		var pdir = next[2];
		var id = x + y * (this.sx + 2);
		if (this.grid[id].computed === this.iter) return false;
		var dir, mscase = 0;
		// ---- neighbors force ----
		for (var i = 0; i < 4; i++)
		{
			var idn = (x + this.ix[i + 12]) + (y + this.ix[i + 16]) * (this.sx + 2);
			var force = this.grid[idn].force;
			if ((force > 0 && this.sign < 0) || (force < 0 && this.sign > 0) || !force)
			{
				// ---- compute force if not in buffer ----
				force = this.computeForce(
					x + this.ix[i + 12],
					y + this.ix[i + 16],
					idn
				);
			}
			if (Math.abs(force) > 1) mscase += Math.pow(2, i);
		}
		if (mscase === 15)
		{
			// --- inside ---
			return [x, y - 1, false];
		}
		else
		{
			// ---- ambiguous cases ----
			if (mscase === 5) dir = (pdir === 2) ? 3 : 1;
			else if (mscase === 10) dir = (pdir === 3) ? 0 : 2;
			else
			{
				// ---- lookup ----
				dir = this.mscases[mscase];
				this.grid[id].computed = this.iter;
			}
			// ---- draw line ----
			var ix = this.step / (
				Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 2]) + (y + this.ply[4 * dir + 2]) * (this.sx + 2)].force) - 1) /
				Math.abs(Math.abs(this.grid[(x + this.plx[4 * dir + 3]) + (y + this.ply[4 * dir + 3]) * (this.sx + 2)].force) - 1) + 1
			);
			ctx.lineTo(
				this.grid[(x + this.plx[4 * dir + 0]) + (y + this.ply[4 * dir + 0]) * (this.sx + 2)].x + this.ix[dir] * ix,
				this.grid[(x + this.plx[4 * dir + 1]) + (y + this.ply[4 * dir + 1]) * (this.sx + 2)].y + this.ix[dir + 4] * ix
			);
			this.paint = true;
			// ---- next ----
			return [
				x + this.ix[dir + 4],
				y + this.ix[dir + 8],
				dir
			];
		}
	}
	LavaLamp.prototype.renderMetaballs = function()
	{
		var i = 0,
			ball;
		while (ball = this.balls[i++]) ball.move();
		// ---- reset grid ----
		this.iter++;
		this.sign = -this.sign;
		this.paint = false;
		ctx.fillStyle = this.metaFill;
		ctx.beginPath();
		// ---- compute metaballs ----
		i = 0;
		ctx.shadowBlur = 50;
		ctx.shadowColor = "black";
		while (ball = this.balls[i++])
		{
			// ---- first cell ----
			var next = [
				Math.round(ball.pos.x / this.step),
				Math.round(ball.pos.y / this.step), false
			];
			// ---- marching squares ----
			do {
				next = this.marchingSquares(next);
			} while (next);
			// ---- fill and close path ----
			if (this.paint)
			{
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				this.paint = false;
			}
		}
	}
	// ---- gradients ----
	var createRadialGradient = function(w, h, r, c0, c1)
	{
		var gradient = ctx.createRadialGradient(
			w / 2, h / 2, 0,
			w / 2, h / 2, r
		);
		gradient.addColorStop(0, c0);
		gradient.addColorStop(1, c1);
		return gradient;
	}
	// ==== main loop ====
	var run = function()
	{
		requestAnimationFrame(run);
		ctx.clearRect(0, 0, screen.width, screen.height);
		lava0.renderMetaballs();
		lava1.renderMetaballs();
	}
	// ---- canvas ----
	var screen = ge1doot.screen.init("screen", null, true),
		ctx = screen.ctx,
		pointer = screen.pointer.init();
	screen.resize();
	// ---- create LavaLamps ----
	lava0 = new LavaLamp(screen.width, screen.height, 10, "#ffc821", "#fa0000");
	lava1 = new LavaLamp(screen.width, screen.height, 10, "#ffc821", "#fa0000");
	// ---- start engine ----
	run();
}();