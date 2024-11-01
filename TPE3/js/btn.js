export class Boton {
    constructor(ctx, x, y, textoBoton, ancho, alto) {
        this.ctx = ctx;
        this.textoBoton = textoBoton;
        this.posX = x;
        this.posY = y;
        this.ancho = ancho;
        this.alto = alto;
        this.radius = 12; 
        this.color = '#5535f7'; 
        this.colorTexto = 'white'; 
    }

    dibujar() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(this.posX + this.radius, this.posY);
        this.ctx.lineTo(this.posX + this.ancho - this.radius, this.posY);
        this.ctx.quadraticCurveTo(this.posX + this.ancho, this.posY, this.posX + this.ancho, this.posY + this.radius);
        this.ctx.lineTo(this.posX + this.ancho, this.posY + this.alto - this.radius);
        this.ctx.quadraticCurveTo(this.posX + this.ancho, this.posY + this.alto, this.posX + this.ancho - this.radius, this.posY + this.alto);
        this.ctx.lineTo(this.posX + this.radius, this.posY + this.alto);
        this.ctx.quadraticCurveTo(this.posX, this.posY + this.alto, this.posX, this.posY + this.alto - this.radius);
        this.ctx.lineTo(this.posX, this.posY + this.radius);
        this.ctx.quadraticCurveTo(this.posX, this.posY, this.posX + this.radius, this.posY);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = this.colorTexto;
        this.ctx.font = "bold 20px 'Nunito', sans-serif"; 
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(
            this.textoBoton,
            this.posX + this.ancho / 2,
            this.posY + this.alto / 2
        );
    }

    getTextoBoton() {
        return this.textoBoton;
    }

    isPointInside(x, y) {
        return x >= this.posX && x <= (this.posX + this.ancho) && y >= this.posY && y <= (this.posY + this.alto);
    }
}
