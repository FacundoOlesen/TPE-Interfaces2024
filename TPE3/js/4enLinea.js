import { Tablero } from './tablero.js';
import { Circulo } from './circulo.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas = [];
    let cellSize = 60;

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

        let fondoJuego = new Image();
        fondoJuego.src = "./img/tablero.png";
        fondoJuego.onload = function() {
            const anchoTablero = 10 * cellSize;

            ctx.drawImage(fondoJuego, 0, 0, anchoTablero, canvas.height); 

            tablero.dibujarTablero(); 

            cargarFichas(ctx); 
        };
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
