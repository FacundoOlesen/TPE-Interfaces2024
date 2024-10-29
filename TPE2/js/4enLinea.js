import { Tablero } from './tablero4enlinea.js'; 
document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        gameImage.style.display = 'none';

        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800; 
        canvas.height = 500; 
        contenedorJuego.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        const tablero = new Tablero(ctx, 7, 6, canvas);
    });
});

