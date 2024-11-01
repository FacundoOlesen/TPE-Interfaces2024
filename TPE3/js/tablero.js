import { Circulo } from './circulo.js';

let cellSize = 60;

export class Tablero {
    constructor(ctx, columnas, filas, fichaRadio, espColumnas, espFilas, offsetX, offsetY) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.arrFichas = [];
        this.fichaRadio = fichaRadio;
        this.espColumnas = espColumnas;
        this.espFilas = espFilas;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.fondoJuego = new Image();
        this.fondoJuego.src = "./img/fondotablero.jpg";
        this.fondoJuego.onload = () => {
            this.dibujarTablero();
        };
    }

    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.drawImage(this.fondoJuego, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas;
                const casillero = new Circulo(this.ctx, x, y, this.fichaRadio, 'white');
                casillero.draw();
            }
        }
    }

    cargarFichas() {
        const fichasImg = ["./img/ferrari.png", "./img/williams.png"].map(src => {
            const img = new Image();
            img.src = src;
            return new Promise(resolve => (img.onload = () => resolve(img)));
        });
    
        Promise.all(fichasImg).then(([ferrariImg, williamsImg]) => {
            this.crearFichaGrupo(ferrariImg, 'red', 20, 1);
            this.crearFichaGrupo(williamsImg, 'lightblue', 720, 2); 
        });
    }

    crearFichaGrupo(img, color, startX, playerNumber) {
        let posX = startX + cellSize / 2;
        let posY = 200;
        let posXMenuJugador = posX;
        let posYMenuJugador = 230; 

        // dibujamos la "carta" del jugador
        this.dibujarCuadroGrupo(posXMenuJugador, posYMenuJugador, playerNumber);

        // creamos ficha principal
        this.crearFichaEnPila(posX, posY + 30, img, color, true); 

        // creamos fichas adicionales para simular la pila
        for (let i = 1; i <= 5; i++) {
            this.crearFichaEnPila(posX, posY + 30 + i * 10, img, color, false); 
        }
    }

    dibujarCuadroGrupo(posX, posY, playerNumber) {
        const squareWidth = cellSize + 50; 
        const squareHeight = 180; 
        const squareX = posX - squareWidth / 2; 
        const squareY = posY - squareHeight / 2; 

        // fondo de fichas (cuadrado)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; 
        this.roundRect(this.ctx, squareX, squareY, squareWidth, squareHeight, 15); 
        
        // nombre de jugador
        this.ctx.fillStyle = 'white'; 
        this.ctx.font = "bold 15px 'Nunito', sans-serif"; 
        this.ctx.textAlign = 'center'; 
        this.ctx.fillText(`Jugador ${playerNumber}`, squareX + squareWidth / 2, squareY + 30); 

    }

    roundRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
    }

    crearFichaEnPila(posX, posY, img, color, isDraggable) {
        const ficha = new Circulo(this.ctx, posX, posY, this.fichaRadio, color);
        ficha.setImage(img.src);
        ficha.draggable = isDraggable;
        ficha.opacity = isDraggable ? 1 : 0.3; 
        this.arrFichas.push(ficha);
        ficha.draw();
    }
}
