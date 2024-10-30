import { Circulo } from './circulo.js';

export class Tablero {
    constructor(ctx, columnas, filas) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.fichaRadio = 40; 
        this.espColumnas = 83.5; 
        this.espFilas = 80.5; 
        this.offsetX = 50; // Ajusta si es necesario
        this.offsetY = 50; // Ajusta si es necesario
        this.tablero = Array.from({ length: filas }, () => Array(columnas).fill(null));
    }

    dibujarTablero() {
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
