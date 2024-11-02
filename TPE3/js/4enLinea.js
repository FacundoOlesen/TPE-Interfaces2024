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

    let helperPos
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



        dibujarBienvenidaJuego();

        function dibujarBienvenidaJuego() {
            let fondoJuego = new Image();
            fondoJuego.src = "./img/fondocasillero.jpg";

            fondoJuego.onload = function () {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.drawImage(fondoJuego, 0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'center';

                let btn4Enlinea = new Boton(ctx, 300, 60, "4 en línea", 200, 60);
                btn4Enlinea.dibujar();
                btns.push(btn4Enlinea);

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
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                tablero.arrFichas[i].draw();
            }
        }

        function onMouseDown(e) {
            let clickFig;
            let rect = ctx.canvas.getBoundingClientRect();
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;

            if (!inGame) {
                let clickedMode = findClickedFigure(canvasX, canvasY, btns);
                if (clickedMode) {
                    elegirModo(clickedMode.getTextoBoton()[0]);
                }
            }
            else {
                e.preventDefault();
                isMouseDown = true;

                if (lastClickedFigure)
                    lastClickedFigure = null;

                clickFig = findClickedFigure(e.clientX, e.clientY, tablero.arrFichas);
                if (clickFig && !clickFig.ubicada && tablero.esTuTurno(clickFig)) {
                    lastClickedFigure = clickFig;
                    helperPos = lastClickedFigure.getPos()
                }
            }
            return clickFig;
        }

        function onMouseMove(e) {
            e.preventDefault();
            if (isMouseDown && lastClickedFigure) {
                let rect = tablero.ctx.canvas.getBoundingClientRect();
                let canvasX = e.clientX - rect.left;
                let canvasY = e.clientY - rect.top;

                lastClickedFigure.setPos(canvasX, canvasY);

                tablero.dibujarTablero();
                drawFigures();
            }
        }

        function onMouseUp(e) {
            let rect = ctx.canvas.getBoundingClientRect();
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;

            e.preventDefault();
            if (lastClickedFigure != undefined) {
                tablero.ponerFicha(lastClickedFigure, canvasX, canvasY)
                if (!lastClickedFigure.ubicada) {
                    lastClickedFigure.setPos(helperPos.x, helperPos.y)
                    tablero.dibujarTablero()
                }
                drawFigures()
            }
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
            switch (modo) {
                case '4':
                    tablero = new Tablero(ctx, 6, 7, 20, 60, 80.5, 158, 95, 4);
                    break;
                case '5':
                    tablero = new Tablero(ctx, 7, 8, 20, 55, 65, 180, 75, 5);
                    break;

                case '6':
                    tablero = new Tablero(ctx, 8, 9, 18, 50, 62, 160, 75, 6);
                    break;

                case '7':
                    tablero = new Tablero(ctx, 9, 10, 17, 50, 55, 160, 100, 7);
                    break;

                default:
                    break;

            }
            tablero.cargarFichas(ctx);
            inGame = true
        }

        canvas.addEventListener('mousedown', onMouseDown, false);

        canvas.addEventListener('mousemove', onMouseMove, false);

        canvas.addEventListener('mouseup', onMouseUp, false);
    });
});
