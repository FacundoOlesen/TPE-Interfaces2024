import { Tablero } from './tablero.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas=[]
    let fondoJuego = new Image();
    fondoJuego.src = "./img/tablero.png";
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
        const createdCanvas = document.querySelector("#gameCanvas")


        function drawFigures(){
            for (let i = 0; i < arrFichas.length; i++) {
                arrFichas[i].draw();
            }
        }

        function onMouseDown(e) {
            e.preventDefault(); 

            isMouseDown = true
            if (lastClickedFigure != null)
                lastClickedFigure = null


            let clickFig = findClickedFigure(e.clientX, e.clientY)
            if (clickFig != null) 
                lastClickedFigure = clickFig
        }

        function onMouseMove(e) {
            e.preventDefault(); 

            if (isMouseDown && lastClickedFigure != null) {
                // Obtén el desplazamiento del canvas respecto a la ventana
                let rect = tablero.ctx.canvas.getBoundingClientRect();
        
                // Ajusta las coordenadas del clic en función de la posición del canvas
                let canvasX = e.clientX - rect.left;
                let canvasY = e.clientY - rect.top;
        
                // Actualiza la posición del círculo en función de las coordenadas ajustadas
                lastClickedFigure.setPos(canvasX, canvasY);
        
                // Redibuja el tablero y todos los círculos
                tablero.dibujarTablero();
        
                drawFigures()
            }
        }


        function onMouseUp(e) {
            e.preventDefault(); 

            isMouseDown = false
        }

        function findClickedFigure(x, y) {
            for (let i = 0; i < arrFichas.length; i++) {
                const element = arrFichas[i]
                if (element.isPointInside(x, y))
                    return element
            }
        }


        createdCanvas.addEventListener('mousedown', onMouseDown, false)
        createdCanvas.addEventListener('mousemove', onMouseMove, false)
        createdCanvas.addEventListener('mouseup', onMouseUp, false)


        tablero.cargarFichas(ctx);
    });

});