import { Circulo } from './circulo.js';

export class Tablero {
    constructor(ctx, columnas, filas) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.fichaRadio = 30; 
        this.espColumnas = 75; 
        this.espFilas = 70; 
        this.offsetX = 50;
        this.offsetY = 50; 
        this.tablero = Array.from({ length: filas }, () => Array(columnas).fill(null));

        this.dibujarTablero();
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
    }
}
