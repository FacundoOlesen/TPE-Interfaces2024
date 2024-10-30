// Circulo.js
export class Circulo {
    constructor(ctx, x, y, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.image = null;
        this.xInicial = x;
        this.yInicial = y;
    }

    setImage(src) {
        this.image = new Image();
        this.image.src = src;
    }

    draw() {
        const ctx = this.ctx;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        if (this.image && this.image.complete) {
            ctx.save(); 
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip(); 

            ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
            ctx.restore(); 
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    isPointInside(px, py) {
        return Math.sqrt((px - this.x) ** 2 + (py - this.y) ** 2) < this.radius;
    }
}
