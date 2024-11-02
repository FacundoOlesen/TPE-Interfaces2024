import { Tablero } from './tablero.js';
import { Boton } from './btn.js';

document.addEventListener('DOMContentLoaded', () => {
    //elementos de la presentación
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    //contenedor del juego
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let isMouseDown = false;
    let lastClickedFigure = null;


    let inGame = false
    let btns = []

    playButton.addEventListener('click', () => {
        //ocultar elementos de la presentación
        playButton.style.display = 'none';
        gameImage.style.display = 'none';

        //creación del canvas
        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 500;
        contenedorJuego.appendChild(canvas);

        const ctx = canvas.getContext('2d');



        // Llama a la función que dibuja la pantalla de bienvenida del juego
        dibujarBienvenidaJuego();

        function dibujarBienvenidaJuego() {
            // Crea una nueva imagen para usar como fondo de la pantalla de bienvenida
            let fondoJuego = new Image();
            fondoJuego.src = "./img/fondocasillero.jpg";

            // Ejecuta esta función una vez que la imagen de fondo se ha cargado completamente
            fondoJuego.onload = function () {
                // Limpia el canvas antes de dibujar
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                // Dibuja la imagen de fondo en todo el área del canvas
                ctx.drawImage(fondoJuego, 0, 0, ctx.canvas.width, ctx.canvas.height);
                
                // Dibuja una capa semitransparente sobre el fondo para resaltar el texto y los botones
                ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                // Configura la alineación y posición del texto
                ctx.textAlign = 'center';
                ctx.textBaseline = 'center';

                // Crea y dibuja los botones de selección de modo de juego y los agrega a la lista btns
                let btn4Enlinea = new Boton(ctx, 300, 60, "4 en línea", 200, 60);
                btn4Enlinea.dibujar();
                btns.push(btn4Enlinea); // Agrega el botón a la lista de botones

                let btn5Enlinea = new Boton(ctx, 300, 160, "5 en línea", 200, 60);
                btn5Enlinea.dibujar();
                btns.push(btn5Enlinea);

                let btn6Enlinea = new Boton(ctx, 300, 260, "6 en línea", 200, 60);
                btn6Enlinea.dibujar();
                btns.push(btn6Enlinea);

                let btn7Enlinea = new Boton(ctx, 300, 360, "7 en línea", 200, 60);
                btn7Enlinea.dibujar();
                btns.push(btn7Enlinea);
            };
        }

        function drawFigures() {
            // Dibuja todas las figuras en el tablero
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                tablero.arrFichas[i].draw();
            }
        }

        // Función para manejar el evento de "mouse down" (clic del ratón)
        function onMouseDown(e) { 
            let clickFig;
            let rect = ctx.canvas.getBoundingClientRect(); // Obtenemos las coordenadas del canvas
            let canvasX = e.clientX - rect.left; // Coordenada X del clic en el canvas
            let canvasY = e.clientY - rect.top; // Coordenada Y del clic en el canvas

            // Si el juego aún no ha empezado
            if (!inGame) {
                // Detecta si se ha hecho clic en algún botón de modo de juego
                let clickedMode = findClickedFigure(canvasX, canvasY, btns);
                if (clickedMode) {
                    // Si se ha clickeado en un botón, selecciona el modo de juego
                    elegirModo(clickedMode.getTextoBoton()[0]);
                }
            }
            // Si el juego ya ha comenzado y se desea arrastrar una ficha
            else {
                e.preventDefault();
                isMouseDown = true; // Marcamos que se está manteniendo presionado el ratón

                // Restablece la última figura seleccionada
                if (lastClickedFigure) {
                    lastClickedFigure = null;
                }

                // Detecta si se ha hecho clic en alguna ficha
                clickFig = findClickedFigure(e.clientX, e.clientY, tablero.arrFichas);
                // Si se ha seleccionado una ficha, no está ubicada y es el turno correspondiente
                if (clickFig && !clickFig.ubicada && tablero.esTuTurno(clickFig)) {
                    lastClickedFigure = clickFig; // Marca la ficha seleccionada como la última
                }
            }
            return clickFig; // Retorna la figura seleccionada (si la hay)
        }

        // Función para manejar el evento de "mouse move" (movimiento del ratón)
        function onMouseMove(e) {          
            e.preventDefault();
            // Si el ratón está presionado y hay una figura seleccionada
            if (isMouseDown && lastClickedFigure) {
                let rect = tablero.ctx.canvas.getBoundingClientRect(); // Obtenemos las coordenadas del canvas
                let canvasX = e.clientX - rect.left; // Coordenada X del ratón en el canvas
                let canvasY = e.clientY - rect.top; // Coordenada Y del ratón en el canvas

                // Actualiza la posición de la figura seleccionada
                lastClickedFigure.setPos(canvasX, canvasY);

                // Redibuja el tablero y las figuras para mostrar la nueva posición
                tablero.dibujarTablero();
                drawFigures();
            }
        }

        // Función para manejar el evento de "mouse up" (cuando se suelta el ratón)
        function onMouseUp(e) {
            let rect = ctx.canvas.getBoundingClientRect(); // Obtenemos las coordenadas del canvas
            let canvasX = e.clientX - rect.left; // Coordenada X del ratón en el canvas

            e.preventDefault();
            // Si hay una figura seleccionada
            if (lastClickedFigure != undefined) {
                // Intenta colocar la ficha en el tablero en la posición actual
                tablero.ponerFicha(lastClickedFigure, canvasX);
                drawFigures(); // Redibuja las figuras
            }
            isMouseDown = false; // Marca que el ratón ya no está presionado
        }

        

        function findClickedFigure(x, y, arr) {
            // Busca si se ha hecho clic en alguna figura dentro del array
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.isPointInside(x, y))
                    return element;
            }
        }

        function elegirModo(modo) {
            switch (modo) {
                case '4':
                    tablero = new Tablero(ctx, 6, 7, 20, 60, 80.5, 158, 95, 4);
                    break;
                case '5':
                    tablero = new Tablero(ctx, 7, 8, 20, 55, 65, 180, 75,5);
                    break;

                case '6':
                    tablero = new Tablero(ctx, 8, 9, 18, 50, 62, 160, 75,6);
                    break;

                case '7':
                    tablero = new Tablero(ctx, 9, 10, 17, 50, 55, 160, 100,7);
                    break;

                default:
                    break;

            }
            tablero.cargarFichas(ctx);
            inGame = true
        }

        // Activa la función onMouseDown al presionar el ratón sobre el canvas
        canvas.addEventListener('mousedown', onMouseDown, false);

        // Activa onMouseMove al mover el ratón mientras está presionado
        canvas.addEventListener('mousemove', onMouseMove, false);

        // Activa onMouseUp al soltar el botón del ratón
        canvas.addEventListener('mouseup', onMouseUp, false);
    });
});
