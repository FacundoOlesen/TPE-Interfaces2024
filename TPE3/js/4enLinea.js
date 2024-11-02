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

        function onMouseDown(e) {
            // Inicializa la variable para la figura que se ha clickeado
            let clickFig;
            
            // Obtiene las coordenadas del canvas en relación con la ventana del navegador
            let rect = ctx.canvas.getBoundingClientRect();
            // Calcula la posición del clic en el canvas restando las coordenadas del canvas a las del clic
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;
        
            // Verifica si el juego no ha comenzado; si es así, permite seleccionar un modo de juego
            if (!inGame) {
                // Llama a la función findClickedFigure para determinar si se ha hecho clic en un botón de modo
                let clickedMode = findClickedFigure(canvasX, canvasY, btns);
                
                // Si se ha clickeado en un modo de juego, se selecciona el modo correspondiente
                if (clickedMode) elegirModo(clickedMode.getTextoBoton()[0]);
            } 
            // Si el juego ya ha comenzado, se habilita la funcionalidad de arrastre de fichas
            else {
                // Previene el comportamiento predeterminado del evento
                e.preventDefault();
                // Indica que el botón del ratón está presionado
                isMouseDown = true;
                // Reinicia la variable para la última figura clickeada a null
                lastClickedFigure = null;
        
                // Busca la figura que se ha clickeado en el tablero
                clickFig = findClickedFigure(e.clientX, e.clientY, tablero.arrFichas);
                
                // Verifica si se ha clickeado en una figura que no está ubicada y si es el turno del jugador
                if (clickFig && !clickFig.ubicada && tablero.esTuTurno(clickFig)) {
                    // Almacena la figura clickeada como la última figura clickeada
                    lastClickedFigure = clickFig;
                }
            }
            // Devuelve la figura clickeada (puede ser undefined si no hay figura)
            return clickFig;
        }        

        function onMouseMove(e) {    
            e.preventDefault(); // Previene el comportamiento predeterminado del evento
            
            // Verifica si el botón del ratón está presionado y hay una figura seleccionada
            if (isMouseDown && lastClickedFigure) {
                // Obtiene las coordenadas del canvas en relación con la ventana del navegador
                let rect = tablero.ctx.canvas.getBoundingClientRect();
                // Calcula la nueva posición del ratón en el canvas restando las coordenadas del canvas a las del clic
                let canvasX = e.clientX - rect.left;
                let canvasY = e.clientY - rect.top;
        
                // Establece la nueva posición de la figura seleccionada en las coordenadas del ratón
                lastClickedFigure.setPos(canvasX, canvasY);
                // Redibuja el tablero para reflejar la nueva posición de las fichas
                tablero.dibujarTablero();
                // Dibuja las figuras en su nueva posición
                drawFigures();
            }
        }
        

        function onMouseUp(e) {
            // Obtiene las coordenadas del canvas en relación con la ventana del navegador
            let rect = ctx.canvas.getBoundingClientRect();
            // Calcula la posición final en el canvas donde se suelta el mouse
            let canvasX = e.clientX - rect.left;
        
            e.preventDefault(); // Previene el comportamiento predeterminado del evento
        
            // Verifica si hay una figura seleccionada que se ha clickeado anteriormente
            if (lastClickedFigure != undefined) {
                // Coloca la ficha en la posición final en el tablero utilizando la figura clickeada
                tablero.ponerFicha(lastClickedFigure, canvasX);
                // Dibuja las figuras en el tablero después de haber colocado la ficha
                drawFigures();
            }
            // Indica que el botón del ratón ha sido soltado, finalizando la acción de arrastre
            isMouseDown = false;
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
             // Configura el tablero según el modo de juego seleccionado
            switch (modo) {
                case '4':
                    tablero = new Tablero(ctx, 6, 7, 20, 60, 80.5, 158, 95);
                    break;
                case '5':
                    tablero = new Tablero(ctx, 7, 8, 20, 55, 65, 180, 75);
                    break;

                case '6':
                    tablero = new Tablero(ctx, 8, 9, 18, 50, 62, 160, 75);
                    break;

                case '7':
                    tablero = new Tablero(ctx, 9, 10, 17, 50, 55, 160, 100);
                    break;

                default:
                    console.log("Modo no válido");
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
