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

const fichaRojaImg = 'img/ferrari.png';
const fichaAzulImg = 'img/williams.png';

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
    const columnaExtra = columnas; 

    dibujarFichas(columnaExtra, 0, 'red', fichaRojaImg, 'darkred');
    dibujarFichas(columnaExtra, 1, 'red', fichaRojaImg, 'darkred');
    dibujarFichas(columnaExtra, 2, 'red', fichaRojaImg, 'darkred');

    dibujarFichas(columnaExtra + 1, 0, 'blue', fichaAzulImg, 'darkblue');
    dibujarFichas(columnaExtra + 1, 1, 'blue', fichaAzulImg, 'darkblue');
    dibujarFichas(columnaExtra + 1, 2, 'blue', fichaAzulImg, 'darkblue');
}

function dibujarFichas(col, fila, color, imgSrc, borderColor) {
    const imgSize = 60;
    const x = offsetX + col * espColumnas + espColumnas / 2; 
    const y = offsetY + fila * espFilas + espFilas / 2; 

    // Circulo
    ctx.beginPath();
    ctx.arc(x, y, fichaRadio, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    // Borde
    ctx.beginPath();
    ctx.arc(x, y, fichaRadio, 0, 2 * Math.PI);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    const fichaImg = new Image();
    fichaImg.src = imgSrc;

    fichaImg.onload = () => {
        const size = imgSize * 0.7; 
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, fichaRadio, 0, 2 * Math.PI);
        ctx.clip();
        
        ctx.drawImage(fichaImg, x - size / 2, y - size / 2, size, size);
        ctx.restore();
    };
    
}

