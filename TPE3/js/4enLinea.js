import { Tablero } from './tablero.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas = [];
    let isMouseDown = false;
    let lastClickedFigure = null;


    let modo = 4    
    let columnas = 7
    let filas = 6
    let fichaRadio = 28
    let espFilas = 80.5
    let espColumnas = 79.5
    let offsetX = 158;
    let offsetY = 55;

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        gameImage.style.display = 'none';


        

        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 500;
        contenedorJuego.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        switch (modo) {
            case 5:
                columnas = 8;
                filas = 7;
                fichaRadio = 24;
                espColumnas = 68.5;
                espFilas = 74.5;
                offsetX = 138;
                offsetY = 46;
                break;

            case 6:
                columnas = 9;
                filas = 8;
                fichaRadio = 22;
                espColumnas = 61.5;
                espFilas = 63.5;
                offsetX = 146;
                offsetY = 37;
                break;

            case 7:
                columnas = 10;
                filas = 7;
                fichaRadio = 20.5;
                espColumnas = 65.5;
                espFilas = 62.5;
                offsetX = 120;
                offsetY = 53;
                break;

            default:
                console.log("Modo no válido");
                break;
        }

        tablero = new Tablero(ctx, columnas, filas, arrFichas, fichaRadio, espFilas, espColumnas, offsetX, offsetY);

        function drawFigures() {
            for (let i = 0; i < arrFichas.length; i++) {
                arrFichas[i].draw();
            }
        }

        function onMouseDown(e) {
            e.preventDefault(); 
            isMouseDown = true;
            if (lastClickedFigure) lastClickedFigure = null;

            let clickFig = findClickedFigure(e.clientX, e.clientY);
            if (clickFig) lastClickedFigure = clickFig;
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
            e.preventDefault(); 
            isMouseDown = false;
        }

        function findClickedFigure(x, y) {
            for (let i = 0; i < arrFichas.length; i++) {
                const element = arrFichas[i];
                if (element.isPointInside(x, y)) return element;
            }
        }

        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mouseup', onMouseUp, false);

        tablero.cargarFichas(ctx);
    });
});
