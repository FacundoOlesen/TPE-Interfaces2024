import { Tablero } from './tablero.js';
import { Circulo } from './circulo.js';

document.addEventListener('DOMContentLoaded', () => {
    //elementos de la presentación
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    //contenedor del juego
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let arrFichas = [];
    let cellSize = 60;

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
        let fichasImg = ["./img/ferrari.png", "./img/williams.png"].map(src => {
            let img = new Image();
            img.src = src;
            return new Promise(resolve => (img.onload = () => resolve(img)));
        });
    
        Promise.all(fichasImg).then(([ferrariImg, williamsImg]) => {
            fichas(ctx, arrFichas, ferrariImg, 'red', 0);
            fichas(ctx, arrFichas, williamsImg, 'lightblue', 1);
        });
    }

    function fichas(ctx, arrFichas, img, color, n) {
        let margin = 10;
        let startX = 630; 
        let startY = 250;
        let rows = 3;

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
