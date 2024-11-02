import { Circulo } from './circulo.js';
import { Casillero } from './casillero.js';

let cellSize = 60; // Tamaño de cada celda en el tablero

export class Tablero {
    constructor(ctx, filas, columnas, fichaRadio, espFilas, espColumnas, offsetX, offsetY) { //tablero = new Tablero(ctx, 6, 7, 20, 60, 80.5, 158, 95);
        // Inicializa las propiedades del tablero
        this.ctx = ctx; // Contexto del canvas para dibujar
        this.columnas = columnas; // Número de columnas en el tablero
        this.filas = filas; // Número de filas en el tablero
        this.arrFichas = []; // Arreglo para almacenar las fichas
        this.casilleros = []; // Arreglo para almacenar los casilleros
        this.fichaRadio = fichaRadio; // Radio de las fichas
        this.espColumnas = espColumnas; // Espacio entre columnas
        this.espFilas = espFilas; // Espacio entre filas
        this.offsetX = offsetX; // Desplazamiento en el eje X
        this.offsetY = offsetY; // Desplazamiento en el eje Y

        // Carga de las imágenes de fondo
        this.fondoJuego = new Image();
        this.fondoJuego.src = "./img/fondocasillero.jpg"; // Imagen de fondo del juego

        this.fondoCasillero = new Image();
        this.fondoCasillero.src = "./img/fondotablero.jpg"; // Imagen de fondo del tablero

        // Dibuja el tablero una vez que ambas imágenes estén cargadas
        this.fondoJuego.onload = this.fondoCasillero.onload = () => {
            if (this.fondoJuego.complete && this.fondoCasillero.complete) {
                this.dibujarTablero();
            }
        };

        this.addCasilleros(); // Inicializa los casilleros en el tablero
        this.turno = 0; // Indica el turno actual (0 o 1)
        this.turnos = {}; // Objeto para almacenar los turnos de los jugadores

        // Temporizador
        this.tiempoMaximoTurno = 60; // Tiempo máximo por turno en segundos
        this.tiempoRestente = this.tiempoMaximoTurno; // Tiempo restante en el turno
        this.intervaloTemporizador = null; // Almacena el intervalo del temporizador

        this.iniciarTemporizador(); // Inicia el temporizador
    }


    dibujarTablero() {
        // Limpia el canvas antes de redibujar
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        // Dibuja la imagen de fondo del juego
        this.ctx.drawImage(this.fondoJuego, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        
        this.dibujarTemporizador(); // Dibuja el temporizador en el tablero

        // Calcula las dimensiones y posición del tablero
        const tableroAncho = this.columnas * this.espColumnas;
        const tableroAlto = this.filas * this.espFilas;
        const tableroX = this.offsetX - 40; // Posición X del tablero
        const tableroY = this.offsetY - 30; // Posición Y del tablero
        const borderRadius = 20; // Radio para esquinas redondeadas
        
        // Crea un borde redondeado para el área del tablero
        this.ctx.beginPath();
        this.ctx.moveTo(tableroX + borderRadius, tableroY);
        this.ctx.arcTo(tableroX + tableroAncho, tableroY, tableroX + tableroAncho, tableroY + borderRadius, borderRadius);
        this.ctx.arcTo(tableroX + tableroAncho, tableroY + tableroAlto, tableroX + tableroAncho - borderRadius, tableroY + tableroAlto, borderRadius);
        this.ctx.arcTo(tableroX, tableroY + tableroAlto, tableroX, tableroY + tableroAlto - borderRadius, borderRadius);
        this.ctx.arcTo(tableroX, tableroY, tableroX + borderRadius, tableroY, borderRadius);
        this.ctx.closePath();
        
        // Recorta y dibuja la imagen dentro del área redondeada
        this.ctx.save();
        this.ctx.clip(); // Recorta el área
        this.ctx.drawImage(this.fondoCasillero, tableroX, tableroY, tableroAncho, tableroAlto); // Dibuja el fondo del casillero
        this.ctx.restore(); // Restaura el contexto original

        // Dibuja el borde del fondo de los casilleros
        this.ctx.lineWidth = 2; // Ancho de la línea del borde
        this.ctx.strokeStyle = 'rgba(66, 16, 244, 0.8)'; // Color del borde
        this.ctx.stroke(); // Dibuja el borde

        // Dibuja un rectángulo oscuro sobre el fondo
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Color del rectángulo
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); // Rellena el rectángulo
        
        // Dibuja todos los casilleros en el tablero
        for (let i = 0; i < this.casilleros.length; i++) {
            this.casilleros[i].draw(); // Dibuja cada casillero
        }

        this.toggleCuadroTurno(); // Dibuja el cuadro del turno actual
    }
    
    dibujarTemporizador() {
        // Borramos el área donde se dibuja el temporizador
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, 60); // Asumiendo que el temporizador se dibuja en la parte superior
    
        this.ctx.fillStyle = 'white'; // Establecemos el color del texto
        this.ctx.font = "bold 24px 'Nunito', sans-serif"; // Definimos la fuente
        this.ctx.textAlign = 'center'; // Centramos el texto
        this.ctx.fillText(`Tiempo restante: ${this.tiempoRestante}s`, this.ctx.canvas.width / 2, 40); // Dibujamos el texto
    }
    
    iniciarTemporizador() {
        clearInterval(this.intervaloTemporizador);
        this.tiempoRestante = this.tiempoMaximoTurno;
        this.intervaloTemporizador = setInterval(() => {
            this.tiempoRestante--;
            if (this.tiempoRestante <= 0) {
                this.cambiarTurno();
            } else {
                this.dibujarTemporizador(); // Solo redibuja el temporizador
            }
        }, 1000);
    }
    cambiarTurno() {
        clearInterval(this.intervaloTemporizador);
        this.turno = this.turno === 0 ? 1 : 0;
        this.iniciarTemporizador();
        
        // Redibuja el tablero ya que hay un cambio de turno
        this.dibujarTablero();
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
        for (let i = this.casilleros.length - 1; i >= 0; i--) {
            let c = this.casilleros[i];
            if (x > c.x - c.radius && x < c.x + c.radius && !c.ocupado) {
                ficha.setPos(c.x, c.y);
                ficha.ubicada = true;
                c.setOcupado(true);
                // Cambia el turno y reinicia el temporizador
                this.turno = this.turno === 0 ? 1 : 0;
                this.iniciarTemporizador(); // Reinicia el temporizador
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
