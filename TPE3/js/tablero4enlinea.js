export class Tablero {
    constructor(ctx, columnas, filas, canvas) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas; 
        this.fichaRadio = 30;
        this.espColumnas = 75;
        this.espFilas = 70;
        this.offsetX = 50;
        this.offsetY = 50;
        this.tablero = [];

        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                this.tablero[i][j] = null; 
            }
        }

        this.fichaRojaImg = 'img/ferrari.png';
        this.fichaAzulImg = 'img/williams.png';

        this.iniciarTablero(); // Llama al método para dibujar el tablero
    }

    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Asegúrate de usar el ancho y alto del canvas

        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                this.ctx.beginPath();
                this.ctx.arc(
                    this.offsetX + col * this.espColumnas,
                    this.offsetY + fila * this.espFilas,
                    this.fichaRadio,
                    0,
                    2 * Math.PI
                );
                this.ctx.fillStyle = this.tablero[fila][col] || '#ddd';
                this.ctx.fill();
                this.ctx.closePath();
            }
        }
    }

    iniciarTablero() {
        this.dibujarTablero();
        const columnaExtra = this.columnas; 

        this.dibujarFichas(columnaExtra, 0, 'red', this.fichaRojaImg, 'darkred');
        this.dibujarFichas(columnaExtra, 1, 'red', this.fichaRojaImg, 'darkred');
        this.dibujarFichas(columnaExtra, 2, 'red', this.fichaRojaImg, 'darkred');

        this.dibujarFichas(columnaExtra + 1, 0, 'blue', this.fichaAzulImg, 'darkblue');
        this.dibujarFichas(columnaExtra + 1, 1, 'blue', this.fichaAzulImg, 'darkblue');
        this.dibujarFichas(columnaExtra + 1, 2, 'blue', this.fichaAzulImg, 'darkblue');
    }

    dibujarFichas(col, fila, color, imgSrc, borderColor) {
        const imgSize = 60;
        const x = this.offsetX + col * this.espColumnas + this.espColumnas / 2; 
        const y = this.offsetY + fila * this.espFilas + this.espFilas / 2; 

        // Circulo
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.fichaRadio, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();

        // Borde
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.fichaRadio, 0, 2 * Math.PI);
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 5;
        this.ctx.stroke();
        this.ctx.closePath();

        const fichaImg = new Image();
        fichaImg.src = imgSrc;

        fichaImg.onload = () => {
            const size = imgSize * 0.7; 
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.fichaRadio, 0, 2 * Math.PI);
            this.ctx.clip();
            
            this.ctx.drawImage(fichaImg, x - size / 2, y - size / 2, size, size);
            this.ctx.restore();
        };
    }
}
