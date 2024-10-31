import { Circulo } from './circulo.js';

let cellSize = 60;

export class Tablero {
    constructor(ctx, columnas, filas, arrFichas) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.arrFichas = arrFichas
        this.fichaRadio = 30;
        this.espColumnas = 83.5;
        this.espFilas = 80.5;
        this.offsetX = 50;
        this.offsetY = 50;;
        this.tablero = Array.from({ length: filas }, () => Array(columnas).fill(null));
        this.dibujarTablero()
    }

    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas;
                const casillero = new Circulo(this.ctx, x, y, this.fichaRadio, 'white');
                casillero.draw();
            }
        }

        let fondoJuego = new Image();
        fondoJuego.src = "./img/tablero.png";
        let cellSize = 60;
        const anchoTablero = 10 * cellSize;

        this.ctx.drawImage(fondoJuego, 0, 0, anchoTablero, this.ctx.canvas.height);
    }

    cargarFichas(ctx) {
        let fichasImg = [new Image(), new Image()];
        fichasImg[0].src = "./img/ferrari.png";
        fichasImg[1].src = "./img/williams.png";

        let loadedCount = 0;
        fichasImg.forEach((img, index) => {
            img.onload = () => { // Cambiado a función de flecha
                loadedCount++;
                if (loadedCount === fichasImg.length) {
                    this.crearFichas(ctx, fichasImg[0], 'red', 0);
                    this.crearFichas(ctx, fichasImg[1], 'lightblue', 1);
                }
            };
        });
    }

    crearFichas(ctx, img, color, n) {
        let margin = 10;
        let startX = 630;
        let startY = 250;
        let rows = 3;
        let cols = 1;

        for (let row = 0; row < rows; row++) {
            let posX = startX + n * (cellSize + margin) + cellSize / 2;
            let posY = startY + row * (cellSize + margin) + cellSize / 2;
            let circle = new Circulo(ctx, posX, posY, cellSize / 2, color);
            circle.setImage(img.src);
            this.arrFichas.push(circle);
            circle.draw();
        }
    }
}
