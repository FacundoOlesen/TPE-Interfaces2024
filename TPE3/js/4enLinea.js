import { Tablero } from './tablero.js';
import { Circulo } from './circulo.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas = [];

    let fondoJuego = new Image();
    fondoJuego.src = "./img/tablero.png";
    let cellSize = 60;
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
        tablero = new Tablero(ctx, 7, 6);
        const createdCanvas = document.querySelector("#gameCanvas")


        function onMouseDown(e) {
            isMouseDown = true

            if (lastClickedFigure != null)
                lastClickedFigure = null


            let clickFig = findClickedFigure(e.clientX, e.clientY)
            if (clickFig != null) {
                lastClickedFigure = clickFig
            }
            console.log(lastClickedFigure)

            console.log(e.clientX)
            console.log(e.clientY)

            if (lastClickedFigure != null)
                lastClickedFigure.draw()

                
        }

        function onMouseMove(e) {
            if (isMouseDown && lastClickedFigure != null) {
                // Obtén el desplazamiento del canvas respecto a la ventana
                const rect = tablero.ctx.canvas.getBoundingClientRect();
        
                // Ajusta las coordenadas del clic en función de la posición del canvas
                const canvasX = e.clientX - rect.left;
                const canvasY = e.clientY - rect.top;
        
                // Actualiza la posición del círculo en función de las coordenadas ajustadas
                lastClickedFigure.setPos(canvasX, canvasY);
        
                // Redibuja el tablero y todos los círculos
                tablero.dibujarTablero();
        
                for (let i = 0; i < arrFichas.length; i++) {
                    if (arrFichas[i] !== lastClickedFigure) {
                        arrFichas[i].draw();
                    }
                }
        
                // Redibuja el círculo movido
                lastClickedFigure.draw();
            }
        }
        

        function onMouseUp(e) {
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


        cargarFichas(ctx);
    });

    function cargarFichas(ctx) {
        let fichasImg = [new Image(), new Image()];
        fichasImg[0].src = "./img/ferrari.png"; 
        fichasImg[1].src = "./img/williams.png"; 

        let loadedCount = 0;
        fichasImg.forEach((img, index) => {
            img.onload = function () {
                loadedCount++;
                if (loadedCount === fichasImg.length) {
                    fichas(ctx, arrFichas, fichasImg[0], 'red', 0); 
                    fichas(ctx, arrFichas, fichasImg[1], 'lightblue', 1); 
                }
            };
        });
    }

    function fichas(ctx, arrFichas, img, color, n) {
        let margin = 10;
        let startX = 630; 
        let startY = 250;
        let rows = 3; 
        let cols = 1; 

        for (let row = 0; row < rows; row++) {
            let posX = startX + n * (cellSize + margin) + cellSize / 2;
            let posY = startY + row * (cellSize + margin) + cellSize / 2;
            let circle = new Circulo(ctx, posX, posY, cellSize / 2, color); 
            circle.setImage(img.src); 
            arrFichas.push(circle);
            circle.draw(); 
        }
    }




});