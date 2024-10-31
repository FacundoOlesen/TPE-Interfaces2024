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

        let borderColor;
        if (this.color === 'red') {
            borderColor = 'darkred';
        } else if (this.color === 'lightblue') {
            borderColor = 'darkblue';
        }
        else {
            borderColor = this.color;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.fill();

        if (this.image && this.image.complete) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.clip();

            const imageSize = this.radius * 0.8 +20;
            ctx.drawImage(this.image, this.x - imageSize / 2, this.y - imageSize / 2, imageSize, imageSize);
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
