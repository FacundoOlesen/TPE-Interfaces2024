export class Boton {
    constructor(ctx, x, y, textoBoton, ancho, alto) {
        this.ctx = ctx;
        this.textoBoton = textoBoton;
        this.posX = x;
        this.posY = y;
        this.ancho = ancho;
        this.alto = alto;
    
    }

    dibujar() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.posX, this.posY, this.ancho, this.alto);
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.font = "25px Sans-Serif";
        this.ctx.fillText(
            this.textoBoton,
            this.posX + this.ancho / 2,
            this.posY + this.alto / 2
        );
    }

    getTextoBoton() {
        return this.textoBoton
    }

    isPointInside(x, y) {
        return x >= this.posX && x <= (this.posX + this.ancho) && y >= this.posY && y <= (this.posY + this.alto);
    }
}
