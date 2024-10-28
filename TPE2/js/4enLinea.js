const playButton = document.getElementById('playButton');
const gameCanvas = document.getElementById('gameCanvas');
const gameImage = document.getElementById('gameImage');
const ctx = gameCanvas.getContext('2d');

playButton.addEventListener('click', () => {
    playButton.classList.add('hidden');
    gameImage.classList.add('hidden');
    
    gameCanvas.classList.remove('hidden');
    gameCanvas.classList.add('show');

    iniciarTablero(); 
});

let columnas = 7;
let filas = 6;
const fichaRadio = 30;
const espColumnas = 75;
const espFilas = 70;
const offsetX = 50;
const offsetY = 50;

const tablero = [];

for (let i = 0; i < filas; i++) {
    tablero[i] = [];
    for (let j = 0; j < columnas; j++) {
        tablero[i][j] = null; 
    }
}
function dibujarTablero() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    
    for (let fila = 0; fila < filas; fila++) {
        for (let col = 0; col < columnas; col++) {
            ctx.beginPath();
            ctx.arc(
                offsetX + col * espColumnas,
                offsetY + fila * espFilas,
                fichaRadio,
                0,
                2 * Math.PI
            );
            ctx.fillStyle = tablero[fila][col] || '#ddd';
            ctx.fill();
            ctx.closePath();
        }
    }
}

function iniciarTablero() {
    dibujarTablero();
}
