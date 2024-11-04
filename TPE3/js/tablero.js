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
        this.botonDeMenu;
        this.ganadorMostrado = false;
        this.imagenFicha1 = "./img/ferrari.png"; 
        this.imagenFicha2 = "./img/williams.png";

        
        // img para cada casillero
        this.fondoCasillero = new Image();
        this.fondoCasillero.src = "./img/fondotablero2.jpg";

        this.fondoJuego.onload = this.fondoCasillero.onload = () => {
            if (this.fondoJuego.complete && this.fondoCasillero.complete) {
                this.dibujarTablero();
                this.cargarFichas(this.ctx);
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
        this.dibujarHints();


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
        
        this.botonDeMenu=new Boton(this.ctx, 10, 10, "Menú",80, 50);
        this.botonDeMenu.dibujar();

        this.botonDeReinicio = new Boton(this.ctx, 710, 10, "Reinicio", 80, 50);
        this.botonDeReinicio.dibujar();
        
        this.toggleCuadroTurno();
    }
    dibujarHints() {
        const hintColor = 'yellow';
        const arrowHeight = 10;
        const arrowWidth = 15;
    
        let opacity = 1; // Opacidad inicial para el parpadeo
        let decreasing = true; // Controla el aumento/disminución de la opacidad
    
        const animateHints = () => {
            const hintWidth = 558; // Mantenemos el ancho del hint
            const hintHeight = 20; // Altura del hint
            const borderRadius = 20; // Radio de los bordes
    
            // Coordenadas del rectángulo de hints
            const hintX = this.offsetX - 38;
            const hintY = this.offsetY - 30;
    
            // Creando un fondo redondeado para el hint
            this.ctx.beginPath();
            this.ctx.moveTo(hintX + borderRadius, hintY); // Esquina superior izquierda
            this.ctx.lineTo(hintX + hintWidth - borderRadius, hintY); // Línea horizontal superior
            this.ctx.arcTo(hintX + hintWidth, hintY, hintX + hintWidth, hintY + borderRadius, borderRadius); // Esquina superior derecha
            this.ctx.lineTo(hintX + hintWidth, hintY + hintHeight); // Línea vertical derecha
            this.ctx.arc(borderRadius + hintX, borderRadius + hintY, borderRadius, Math.PI, Math.PI * 1.5); // Esquina superior izquierda
            this.ctx.closePath();
    
            // Llenamos el fondo del hint
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
            this.ctx.fill();
    
            // Dibuja el borde
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'rgba(66, 16, 244, 0.1)'; // Color del borde
            this.ctx.stroke();
    
            // Calcular el espacio entre flechas
            const totalHintsWidth = this.columnas * this.espColumnas; // Ancho total ocupado por las flechas
            const startX = hintX + (hintWidth - totalHintsWidth) / 2; // Ajustar el inicio para centrar
    
            // Dibujar flechas
            for (let col = 0; col < this.columnas; col++) {
                const x = startX + col * this.espColumnas + this.espColumnas / 2; // Posición centrada
                const y = this.offsetY - arrowHeight - 14;
    
                this.ctx.globalAlpha = opacity;
                this.ctx.fillStyle = hintColor;
    
                // Dibujamos la flecha
                this.ctx.beginPath();
                this.ctx.moveTo(x - arrowWidth / 2, y);
                this.ctx.lineTo(x + arrowWidth / 2, y);
                this.ctx.lineTo(x, y + arrowHeight);
                this.ctx.closePath();
                this.ctx.fill();
            }
    
            // Ajustamos la opacidad para la animación
            if (decreasing) {
                opacity -= 0.05;
                if (opacity <= 0.3) decreasing = false;
            } else {
                opacity += 0.05;
                if (opacity >= 1) decreasing = true;
            }
    
            this.ctx.globalAlpha = 1; // Restauramos la opacidad
    
            requestAnimationFrame(animateHints);
        };
    
        animateHints(); // Inicia la animación
    }
    
    
    

    clickEnMenu(x,y){
        return this.botonDeMenu.isPointInside(x, y);
    }
    
    clicEnReinicio(x, y){
        return this.botonDeReinicio.isPointInside(x, y);
    }

    reiniciarTablero(){
        this.arrFichas = [];
        
        this.addCasilleros();
        this.turno = 0
        this.turnos = {};
        clearInterval(this.intervaloTemporizador);
        //temporizador
        this.tiempoMaximoTurno = 20;
        this.tiempoRestente = this.tiempoMaximoTurno;
        this.ganadorMostrado = false;

        this.iniciarTemporizador();
        this.dibujarTablero();
    }


    
    dibujarTemporizador() {
        const text = `${this.tiempoRestante}`;
        const padding = 10;
        const rectWidth = 60;
        const rectHeight = 40;
        const xPos = 375;
        const yPos = 10;
    
        // Guardamos la sección del fondo antes de dibujar el temporizador
        const fondoTemporal = this.ctx.getImageData(xPos - padding, yPos - padding, rectWidth + padding * 2, rectHeight + padding * 2);
    
        // Borramos cualquier trazo anterior y restauramos el fondo guardado
        this.ctx.putImageData(fondoTemporal, xPos - padding, yPos - padding);
    
        // Dibujamos el rectángulo del temporizador
        this.ctx.fillStyle = 'black';
        this.ctx.beginPath();
        this.ctx.roundRect(xPos, yPos, rectWidth, rectHeight, 10);
        this.ctx.fill();
    
        // Cambiamos el color del texto a rojo si el tiempo restante es menor o igual a 5
        this.ctx.fillStyle = this.tiempoRestante <= 5 ? 'red' : 'white';
        this.ctx.font = "38px 'Digital-7'";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    
        // Colocamos el texto del temporizador en el centro del rectángulo
        this.ctx.fillText(text, xPos + rectWidth / 2, yPos + rectHeight / 2);
    }
    
    
    iniciarTemporizador() {
        this.dibujarTemporizador();

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
        this.dibujarFichas()
       
    }

    addCasilleros() {
        for (let fila = 0; fila < this.filas; fila++) {
            this.casilleros[fila] = []
            for (let col = 0; col < this.columnas; col++) {
                const x = this.offsetX + col * this.espColumnas;
                const y = this.offsetY + fila * this.espFilas+18;
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
                    this.efectoGravedad(ficha, c.x, c.y , c)
                    ficha.ubicada = true;
                    c.setOcupado(true);
                    c.setJugador(ficha);
                    
                    // Dibujar la ficha en el tablero antes de verificar la victoria
    
                    // Cambiar el turno antes de verificar la victoria
                    this.turno = this.turno == 0 ? 1 : 0;
                    this.iniciarTemporizador();
                    this.dibujarTablero();

                    // Ahora verificamos si esta jugada causa una victoria

                    return;
                }
            }
        }
    }

    winChecks(ficha, c){
                    this.checkDiagonal(ficha, c);
                    this.checkDiagonalInvertida(ficha, c);
                    this.checkVertical(ficha, c);
                    this.checkHorizontal(ficha, c);
    }
   

    efectoGravedad(ficha, x, y ,c) {
        const velocidadCaida = 5;
        const gravityEffect = () => {
            if (ficha.y < y) {
                ficha.setPos(x, ficha.y + velocidadCaida)
                this.dibujarTablero()
                this.drawFigures()
                requestAnimationFrame(gravityEffect);
            }

            else{
                ficha.setPos(x, y)
                this.drawFigures()
                this.winChecks(ficha, c)

            }
            
        };
        gravityEffect();
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
        this.toggleCuadroTurno('rgba(0, 0, 0, 120)')
        this.turno = -1
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

    toggleCuadroTurno(colorTurno = 'rgba(66, 16, 244, 0.8)') {
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

    drawFigures() {
        for (let i = 0; i < this.arrFichas.length; i++) {
            this.arrFichas[i].draw();
        }
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
