import { Tablero } from './tablero.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas = [];
    let isMouseDown = false;
    let lastClickedFigure = null;

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        gameImage.style.display = 'none';

        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 500;
        contenedorJuego.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        tablero = new Tablero(ctx, 7, 6, arrFichas);

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
