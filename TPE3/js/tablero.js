import { Circulo } from './circulo.js';
import { Casillero } from './casillero.js';

let cellSize = 60;

export class Tablero {
    constructor(ctx, filas, columnas, fichaRadio, espFilas, espColumnas, offsetX, offsetY) {
        this.ctx = ctx;
        this.columnas = columnas;
        this.filas = filas;
        this.arrFichas = [];
        this.casilleros = [];
        this.fichaRadio = fichaRadio;
        this.espColumnas = espColumnas;
        this.espFilas = espFilas;
        this.offsetX = offsetX;
        this.offsetY = offsetY;

        this.fondoJuego = new Image();
        this.fondoJuego.src = "./img/fondocasillero.jpg";

        // img para cada casillero
        this.fondoCasillero = new Image();
        this.fondoCasillero.src = "./img/fondotablero.jpg";

        this.fondoJuego.onload = this.fondoCasillero.onload = () => {
            if (this.fondoJuego.complete && this.fondoCasillero.complete) {
                this.dibujarTablero();
            }
        };

        this.addCasilleros();
        this.turno = 0
        this.turnos = {};
     
    }


    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // dibujamos la imagen de fondo
        this.ctx.drawImage(this.fondoJuego, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        const tableroAncho = this.columnas * this.espColumnas;
        const tableroAlto = this.filas * this.espFilas;
        const tableroX = this.offsetX - 40;
        const tableroY = this.offsetY - 30;
        const borderRadius = 20; 
    
        // creamos un borde redondeado
        this.ctx.beginPath();
        this.ctx.moveTo(tableroX + borderRadius, tableroY);
        this.ctx.arcTo(tableroX + tableroAncho, tableroY, tableroX + tableroAncho, tableroY + borderRadius, borderRadius);
        this.ctx.arcTo(tableroX + tableroAncho, tableroY + tableroAlto, tableroX + tableroAncho - borderRadius, tableroY + tableroAlto, borderRadius);
        this.ctx.arcTo(tableroX, tableroY + tableroAlto, tableroX, tableroY + tableroAlto - borderRadius, borderRadius);
        this.ctx.arcTo(tableroX, tableroY, tableroX + borderRadius, tableroY, borderRadius);
        this.ctx.closePath();
    
        //recortamos y dibujamos la imagen dentro del área redondeada
        this.ctx.save();
        this.ctx.clip();
        this.ctx.drawImage(this.fondoCasillero, tableroX, tableroY, tableroAncho, tableroAlto);
        this.ctx.restore();
    
        // Dibujar el borde alrededor de la imagen de fondo de los casilleros
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgba(66, 16, 244, 0.8)';
        this.ctx.stroke();
    
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    
        for (let i = 0; i < this.casilleros.length; i++) {
            this.casilleros[i].draw();
        }
    
        this.toggleCuadroTurno();
    }
    
    


    addCasilleros() {
        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas;
                const casillero = new Casillero(this.ctx, x, y, this.fichaRadio, 'white');
                this.casilleros.push(casillero)
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
            this.crearFichaGrupo(ferrariImg, 'red', 20);
            this.crearFichaGrupo(williamsImg, 'lightblue', 720);
            this.cargarTurnos()
        });

    }



    ponerFicha(ficha, x) {
        this.turnos[ficha.getColor()]
        for (let i = this.casilleros.length - 1; i >= 0; i--) {
            let c = this.casilleros[i]
            if (x > c.x - c.radius && x < c.x + c.radius && !c.ocupado) {
                ficha.setPos(c.x, c.y)
                ficha.ubicada = true
                c.setOcupado(true)
                this.turno == 0 ? this.turno = 1 : this.turno = 0
                this.dibujarTablero();
                break;
            }
        }
    }

    crearFichaGrupo(img, color, startX) {
        let posX = startX + cellSize / 2;
        let posY = 200;
        let cantFichas= (this.filas*this.columnas) /2 // Habria que usar esta variable en el for asi tenemos todas las fichas

        // creamos fichas adicionales para simular la pila
        for (let i = 0; i <6 ; i++) {
            this.crearFichaEnPila(posX, posY + 30 + i * 10, img, color, false);
        }

    }

    dibujarCuadroGrupo(posX, posY, playerNumber, colour) {
        const squareWidth = cellSize + 50;
        const squareHeight = 180;
        const squareX = posX - squareWidth / 2;
        const squareY = posY - squareHeight / 2;

        // fondo de fichas (cuadrado)
        this.ctx.fillStyle = colour;
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


    cargarTurnos() {
        this.turnos[this.arrFichas[0].getColor()] = 0;
        this.turnos[this.arrFichas[this.arrFichas.length-1].getColor()] = 1;
    }

    toggleCuadroTurno(){
        let colorTurno = 'rgba(66, 16, 244, 0.8)'
        if(this.turno == 0){
            this.dibujarCuadroGrupo(720 + cellSize / 2, 230, '2', 'rgba(0, 0, 0, 0.8)');
            this.dibujarCuadroGrupo(20 + cellSize / 2, 230, '1' , colorTurno);
        }
        else{
            this.dibujarCuadroGrupo(720 + cellSize / 2, 230, '2' , colorTurno);       
            this.dibujarCuadroGrupo(20 + cellSize / 2, 230, '1', 'rgba(0, 0, 0, 0.8)');
        }
    }

    esTuTurno(ficha){
        console.log(this.arrFichas)
       return this.turno == this.turnos[ficha.getColor()]  

    }
}
