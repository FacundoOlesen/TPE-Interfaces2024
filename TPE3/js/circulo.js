export class Circulo {
    constructor(ctx, x, y, radius, color) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.image = null;
        this.relativeSrc=null;
        this.xInicial = x;
        this.yInicial = y;
        this.ubicada=false;
        this.seleccionada=false;
    }

    setImage(src) {
        this.image = new Image();
        this.image.src = src;
        this.relativeSrc = src; // Guarda la ruta relativa
    }

    getImage(){
        return this.image.src;
    }

    getRelativeSrc(){
        return this.relativeSrc;
    }

    clearCanvas() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 1220, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    

    draw() {
        this.clearCanvas()
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
        ctx.strokeStyle = this.seleccionada ? '#bf930d' : borderColor;
        ctx.lineWidth = 10;
        ctx.stroke();

        ctx.fillStyle = this.seleccionada ? '#D4AF37' : this.color;
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

    getPos() {
        return {
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.x
    }

    getPosY() {
        return this.y
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setUbicada(bool){
        this.ubicada=bool
    }

    getColor(){
        return this.color
    }

    isPointInside(x, y) {
        let rect = this.ctx.canvas.getBoundingClientRect();
    
        let canvasX = x - rect.left;
        let canvasY = y - rect.top;
    
        let _x = this.x - canvasX;
        let _y = this.y - canvasY;
        
        return Math.sqrt(_x * _x + _y * _y) < this.radius;
    }
    
    getSeleccionada(){
        return this.seleccionada;
    }

    setSeleccionada(bool){
        this.seleccionada=bool;
    }
}