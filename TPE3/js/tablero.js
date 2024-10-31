import { Circulo } from './circulo.js';

let cellSize = 60;

export class Tablero {
    constructor(ctx, columnas, filas, arrFichas) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.arrFichas = arrFichas;
        this.fichaRadio = 25;
        this.espColumnas = 73.5;
        this.espFilas = 70.5;
        this.offsetX = 180;
        this.offsetY = 80;

        this.fondoJuego = new Image();
        this.fondoJuego.src = "./img/fondotablero.jpg";
        this.fondoJuego.onload = () => {
            this.dibujarTablero();
        };
    }

    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Dibujar imagen de fondo
        this.ctx.drawImage(this.fondoJuego, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // le damos opacidad a la imagen de fondo
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // Dibujar las casillas del tablero encima del fondo oscuro
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas;
                const casillero = new Circulo(this.ctx, x, y, this.fichaRadio, 'white');
                casillero.draw();
            }
        }
    }

    cargarFichas(ctx) {
        let fichasImg = ["./img/ferrari.png", "./img/williams.png"].map(src => {
            let img = new Image();
            img.src = src;
            return new Promise(resolve => (img.onload = () => resolve(img)));
        });
    
        Promise.all(fichasImg).then(([ferrariImg, williamsImg]) => {
            this.crearFichas(ctx, ferrariImg, 'red', 0, 20);
            this.crearFichas(ctx, williamsImg, 'lightblue', 1, 720);
        });
    }

    crearFichas(ctx, img, color, side, startX) {
        let margin = 10;
        let startY = 200;
        let rows = 3;

        for (let row = 0; row < rows; row++) {
            let posX = startX + cellSize / 2;
            let posY = startY + row * (cellSize + margin) + cellSize / 2;
            let circle = new Circulo(ctx, posX, posY, cellSize / 2, color);
            circle.setImage(img.src);
            this.arrFichas.push(circle);
            circle.draw();
        }
    }
}
