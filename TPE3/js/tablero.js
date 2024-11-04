import { Circulo } from './circulo.js';
import { Casillero } from './casillero.js';
import { Boton } from './btn.js';

let cellSize = 60;

export class Tablero {
    constructor(ctx, filas, columnas, fichaRadio, espFilas, espColumnas, offsetX, offsetY, cantFichasWin) {
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
        this.cantFichasWin = cantFichasWin
        this.fondoJuego = new Image();
        this.fondoJuego.src = "./img/fondocasillero.jpg";
        this.botonDeReinicio;
        this.ganadorMostrado = false;
        this.imagenFicha1 = "./img/ferrari.png"; 
        this.imagenFicha2 = "./img/williams.png";

        
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

        //temporizador
        this.tiempoMaximoTurno = 20;
        this.tiempoRestente = this.tiempoMaximoTurno;
        this.intervaloTemporizador = null;

        this.iniciarTemporizador();

    }

    setImagenFicha1(imagenFicha1){
        this.imagenFicha1 = imagenFicha1;
    }

    setImagenFicha2(imagenFicha2){
        this.imagenFicha2 = imagenFicha2;
    }

    dibujarTablero() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // dibujamos la imagen de fondo
        this.ctx.drawImage(this.fondoJuego, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        this.dibujarTemporizador();

        const tableroAncho = 560;
        const tableroAlto = 360;
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

        // borde del fondo de los casilleros
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'rgba(66, 16, 244, 0.8)';
        this.ctx.stroke();

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let fila = 0; fila < this.filas; fila++) {
            for (let col = 0; col < this.columnas; col++) {
                this.casilleros[fila][col].draw()
            }
        }

        this.botonDeReinicio = new Boton(this.ctx, 710, 10, "Reinicio", 80, 50);
        this.botonDeReinicio.dibujar();

        this.toggleCuadroTurno();
        this.cargarFichas(this.ctx);
    }

    clicEnReinicio(x, y){
        return this.botonDeReinicio.isPointInside(x, y);
    }

    reiniciarTablero(){
        this.arrFichas = [];
        this.dibujarTablero();
        this.addCasilleros();
        this.turno = 0
        this.turnos = {};
        clearInterval(this.intervaloTemporizador);
        //temporizador
        this.tiempoMaximoTurno = 20;
        this.tiempoRestente = this.tiempoMaximoTurno;
        this.ganadorMostrado = false;

        this.iniciarTemporizador();
    }

    dibujarTemporizador() {
        const text = `Tiempo restante: ${this.tiempoRestante}s`;
        const padding = 10;
        const rectWidth = 300;
        const rectHeight = 40;
        const xPos = (this.ctx.canvas.width - rectWidth) / 2;
        const yPos = 10;

        // obtenemos la imagen del fondo del canvas en el area del temporizador
        const fondoTemporal = this.ctx.getImageData(xPos - padding, yPos - padding, rectWidth + padding * 2, rectHeight + padding * 2);
        this.ctx.putImageData(fondoTemporal, xPos - padding, yPos - padding);

        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.roundRect(xPos, yPos, rectWidth, rectHeight, 10);
        this.ctx.fill();

        // cuando queden 5 segundos, ponemos el texto en rojo
        this.ctx.fillStyle = this.tiempoRestante <= 5 ? 'red' : 'white';
        this.ctx.font = "bold 24px 'Nunito', sans-serif";
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, this.ctx.canvas.width / 2, yPos + rectHeight / 1.5);
    }

    iniciarTemporizador() {
        clearInterval(this.intervaloTemporizador);
        this.tiempoRestante = this.tiempoMaximoTurno;
        this.intervaloTemporizador = setInterval(() => {
            this.tiempoRestante--;
            if (this.tiempoRestante <= 0) {
                this.cambiarTurno();
                this.cargarFichas();
            } else {
                this.dibujarTemporizador();
            }
        }, 1000);
    }

    cambiarTurno() {
        clearInterval(this.intervaloTemporizador);
        this.turno = this.turno === 0 ? 1 : 0;
        this.iniciarTemporizador();

        // redibuja el tablero cuando hay un cambio de turno
        this.dibujarTablero(true);
    }

    addCasilleros() {
        for (let fila = 0; fila < this.filas; fila++) {
            this.casilleros[fila] = []
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas;
                const casillero = new Casillero(this.ctx, x, y, this.fichaRadio, 'white', fila, col);
                this.casilleros[fila][col] = casillero
            }
        }
    }

    cargarFichas() {
        const fichasImg = [this.imagenFicha1, this.imagenFicha2].map(src => {
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

    ponerFicha(ficha, x, y) {
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            for (let col = this.columnas - 1; col >= 0; col--) {
                let c = this.casilleros[fila][col];
                if (x > c.x - c.radius && x < c.x + c.radius && y <= 90 && !c.ocupado) {
                    // Colocamos la ficha y actualizamos su estado
                    ficha.setPos(c.x, c.y);
                    ficha.ubicada = true;
                    c.setOcupado(true);
                    c.setJugador(ficha);
                    
                    // Dibujar la ficha en el tablero antes de verificar la victoria
                    this.dibujarTablero();
    
                    // Cambiar el turno antes de verificar la victoria
                    this.turno = this.turno === 0 ? 1 : 0;
                    this.iniciarTemporizador();
    
                    // Ahora verificamos si esta jugada causa una victoria
                    this.checkDiagonal(ficha, c);
                    this.checkDiagonalInvertida(ficha, c);
                    this.checkVertical(ficha, c);
                    this.checkHorizontal(ficha, c);
    
                    return;
                }
            }
        }
    }
    
    checkVertical(ficha, casillero) {
        let c = 0
        for (let filas = this.filas - 1; filas >= 0; filas--) {
            if (this.esIgual(this.casilleros[filas][casillero.col], ficha))
                c++
            else c = 0
            if (c == this.cantFichasWin) {
                this.mostrarGanador(this.turno ? 1 : 2);//mostramos ganador
                return;
            }
            
        }
    }

    checkHorizontal(ficha, casillero) {
        let c = 0
        for (let col = this.columnas - 1; col >= 0; col--) {
            if (this.esIgual(this.casilleros[casillero.fila][col], ficha))
                c++
            else c = 0
            if (c == this.cantFichasWin) {
                this.mostrarGanador(this.turno ? 1 : 2);
                return;
            }
            
            
            
        }
    }

    checkDiagonal(ficha, casillero) {
        let col = casillero.col
        let c = -1
        if (casillero.fila != this.filas - 1) {
            let fila = casillero.fila
            for (let column = casillero.col; column >= 0 && fila < this.filas; column--, fila++) {
                col = this.casilleros[fila][column].col
                if (this.esIgual(this.casilleros[fila][col], ficha))
                    c++
            }
        }

        let aux = casillero.col
        for (let fila = casillero.fila; fila >= 0 && aux < this.columnas; fila--, aux++) {
            if (this.esIgual(this.casilleros[fila][aux], ficha))
                c++
        }

        if (c == this.cantFichasWin) {
            this.mostrarGanador(this.turno ? 1 : 2);
            return;
        }
        
    }

    checkDiagonalInvertida(ficha, casillero) {
        let col = casillero.col
        let c = -1
        if (casillero.fila != this.filas - 1) {
            let fila = casillero.fila
            for (let column = casillero.col; column < this.columnas && fila < this.filas; column++, fila++) {
                col = this.casilleros[fila][column].col
                if (this.esIgual(this.casilleros[fila][col], ficha))
                    c++
            }
        }

        let aux = casillero.col
        for (let fila = casillero.fila; fila >= 0 && aux >= 0; fila--, aux--) {
            if (this.esIgual(this.casilleros[fila][aux], ficha))
                c++
        }

        if (c == this.cantFichasWin) {
            this.mostrarGanador(this.turno ? 1 : 2);
            return;
        }}
        

    esIgual(sigCasillero, fichaAPoner) {
        return sigCasillero.getJugador().getColor() == fichaAPoner.getColor()
    }
    mostrarGanador(jugador) {
        if (this.ganadorMostrado) return; 
    
        const x = this.offsetX - 40; 
        const y = this.offsetY - 30; 
        const anchoCasilleros = 560; 
        const altoCasilleros = 360; 
    
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        this.ctx.fillRect(x, y, anchoCasilleros, altoCasilleros);
    
        this.ctx.fillStyle = 'white';
        this.ctx.font = "bold 38px 'Nunito', sans-serif";
        this.ctx.textAlign = 'center';
    
        const yTexto = y + altoCasilleros + 40; 
    
        const mensaje = `¡Jugador ${jugador} ha ganado!`;
        this.ctx.fillText(mensaje, x + anchoCasilleros / 2, yTexto);
    
        clearInterval(this.intervaloTemporizador);
        this.ganadorMostrado = true; 
    }
    crearFichaGrupo(img, color, startX) {
        let posX = startX + cellSize / 2;
        let posY = 200;
        let cantFichas = (this.filas * this.columnas) / 2 // Habria que usar esta variable en el for asi tenemos todas las fichas

        // creamos fichas adicionales para simular la pila
        for (let i = 0; i < 6; i++) {
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
        this.turnos[this.arrFichas[this.arrFichas.length - 1].getColor()] = 1;
    }

    toggleCuadroTurno() {
        let colorTurno = 'rgba(66, 16, 244, 0.8)'
        if (this.turno == 0) {
            this.dibujarCuadroGrupo(720 + cellSize / 2, 230, '2', 'rgba(0, 0, 0, 0.8)');
            this.dibujarCuadroGrupo(20 + cellSize / 2, 230, '1', colorTurno);
        }
        else {
            this.dibujarCuadroGrupo(720 + cellSize / 2, 230, '2', colorTurno);
            this.dibujarCuadroGrupo(20 + cellSize / 2, 230, '1', 'rgba(0, 0, 0, 0.8)');
        }
    }

    esTuTurno(ficha) {
        return this.turno == this.turnos[ficha.getColor()]

    }
    dibujarFichas() {
        // Recorre todas las fichas en arrFichas y las dibuja en sus posiciones actuales
        this.arrFichas.forEach(ficha => {
            if (ficha.ubicada) {
                ficha.draw();
            }
        });
    }
}
