import { Tablero } from './tablero.js';
import { Boton } from './btn.js';

document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let isMouseDown = false;
    let lastClickedFigure = null;


    let columnas = 7
    let filas = 6
    let fichaRadio = 28
    let espFilas = 80.5
    let espColumnas = 79.5
    let offsetX = 158;
    let offsetY = 55;

    let inGame= false

    let btns = []

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        gameImage.style.display = 'none';




        const canvas = document.createElement('canvas');
        canvas.id = 'gameCanvas';
        canvas.width = 800;
        canvas.height = 500;
        contenedorJuego.appendChild(canvas);

        const ctx = canvas.getContext('2d');


        
        
      
        dibujarBienvenidaJuego()
        function dibujarBienvenidaJuego() {
            let fondoJuego = new Image();
            fondoJuego.src = "./img/fondotablero.jpg";
    
            fondoJuego.onload = function () {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
                ctx.drawImage(fondoJuego, 0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.textAlign='center'
    
                
                let btn4Enlinea = new Boton(ctx, 300, 40, "4 en línea", 200, 60, 200 / 4, 60 / 1.5)
                btn4Enlinea.dibujar()
                btns.push(btn4Enlinea)
    
                let btn5Enlinea = new Boton(ctx, 300, 140, "5 en línea", 200, 60, 200 / 4, 60 / 1.5)
                btn5Enlinea.dibujar()
                btns.push(btn5Enlinea)

                let btn6Enlinea = new Boton(ctx, 300, 240, "6 en línea", 200, 60, 200 / 4, 60 / 1.5)
                btn6Enlinea.dibujar()
                btns.push(btn6Enlinea)

                let btn7Enlinea = new Boton(ctx, 300, 340, "7 en línea", 200, 60, 200 / 4, 60 / 1.5)
                btn7Enlinea.dibujar()
                btns.push(btn7Enlinea)
                console.log(btns)
            };
        }
       
       
       
       
        //CUANDO YA ELIGIO MODO: 

       
    
        function drawFigures() {
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                tablero.arrFichas[i].draw();
            }
        }
    
        function onMouseDown(e) {
            console.log(e)
            if(!inGame){
                console.log("posX: "+e.clientX)
                console.log("posY: "+ e.clientY)
                for (let i = 0; i < btns.length; i++) {
                    const element = btns[i];
                    let rect = ctx.canvas.getBoundingClientRect();
                    let canvasX = e.clientX - rect.left;
                    let canvasY = e.clientY - rect.top;
                    if (element.isPointInside(canvasX, canvasY)) {
                        console.log(element)
                        let modo = element.getTextoBoton()[0]
                        console.log(modo)
                        switch (modo) {
                            case '5':
                                columnas = 8;
                                filas = 7;
                                fichaRadio = 24;
                                espColumnas = 68.5;
                                espFilas = 74.5;
                                offsetX = 138;
                                offsetY = 46;
                                break;
                    
                            case '6':
                                columnas = 9;
                                filas = 8;
                                fichaRadio = 22;
                                espColumnas = 61.5;
                                espFilas = 63.5;
                                offsetX = 146;
                                offsetY = 37;
                                break;
                    
                            case '7':
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
                    
                        tablero = new Tablero(ctx, columnas, filas, fichaRadio, espFilas, espColumnas, offsetX, offsetY);
                        tablero.cargarFichas(ctx);
                        inGame=true
                        return element;
                    }
                }
            }
            else{
                e.preventDefault();
                isMouseDown = true;
                if (lastClickedFigure) lastClickedFigure = null;
        
                let clickFig = findClickedFigure(e.clientX, e.clientY);
                if (clickFig) lastClickedFigure = clickFig;
            }
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
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                const element = tablero.arrFichas[i];
                if (element.isPointInside(x, y)) return element;
            }
        }
    
        canvas.addEventListener('mousedown', onMouseDown, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
        canvas.addEventListener('mouseup', onMouseUp, false);
    });
    });
