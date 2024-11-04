import { Tablero } from './tablero.js';
import { Boton } from './btn.js';
import { Circulo } from './circulo.js';

document.addEventListener('DOMContentLoaded', () => {
    //elementos de la presentación
    const playButton = document.getElementById('playButton');
    const gameImage = document.getElementById('gameImage');
    //contenedor del juego
    const contenedorJuego = document.querySelector('.contenedorJuego');

    let tablero;
    let isMouseDown = false;
    let lastClickedFigure = null;
    let inGame = false;
    let btns = [];
    let fichasJug1 = [];
    let fichasJug2 = [];
    let fichaSelecJug1;
    let fichaSelecJug2;

    let helperPos
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



        dibujarBienvenidaJuego();

        function dibujarBienvenidaJuego() {
            let fondoJuego = new Image();
            fondoJuego.src = "./img/fondocasillero.jpg";

            fondoJuego.onload = function () {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.drawImage(fondoJuego, 0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'center';

                ctx.font = "bold 30px Arial"; // Configura el tamaño y estilo del título
                ctx.fillStyle = "white"; // Color del título
                ctx.fillText("Bienvenido al Juego", ctx.canvas.width / 2, 50); // Posición centrada

                let btn4Enlinea = new Boton(ctx, 300, 70, "4 en línea", 200, 60);
                btn4Enlinea.dibujar();
                btns.push(btn4Enlinea);

                let btn5Enlinea = new Boton(ctx, 300, 140, "5 en línea", 200, 60);
                btn5Enlinea.dibujar();
                btns.push(btn5Enlinea);

                let btn6Enlinea = new Boton(ctx, 300, 210, "6 en línea", 200, 60);
                btn6Enlinea.dibujar();
                btns.push(btn6Enlinea);
                let btn7Enlinea = new Boton(ctx, 300, 280, "7 en línea", 200, 60);
                btn7Enlinea.dibujar();
                btns.push(btn7Enlinea);

                ctx.font = "bold 25px Arial";
                ctx.textAlign = 'left';
                ctx.fillText("Ficha jugador 1:", 50, 400);

                const fichasImg = ["./img/ferrari.png", "./img/williams.png", "./img/ferrari2.png", "./img/williams2.png","./img/williams3.png","./img/ferrari3.png"].map(src => {
                    const img = new Image();
                    img.src = src;
                    return new Promise(resolve => (img.onload = () => resolve(img)));
                });
            
                Promise.all(fichasImg).then(([ferrariImg, williamsImg, mercedesImg, redbullImg, renaultImg, alfaromeoImg]) => {
                    crearFichaJug(ctx,ferrariImg, 'red',300, 400,true);
                    crearFichaJug(ctx,williamsImg, 'lightblue',300, 455,true);
                    crearFichaJug(ctx,mercedesImg, 'red',360, 400,false);
                    crearFichaJug(ctx,redbullImg, 'lightblue',360, 455,false);
                    crearFichaJug(ctx,renaultImg, 'lightblue',420, 455,false);
                    crearFichaJug(ctx,alfaromeoImg, 'red',420, 400,false);
                });

                ctx.font = "bold 25px Arial";
                ctx.textAlign = 'left';
                ctx.fillText("Ficha jugador 2:", 50, 455);

            };
        }

        function crearFichaJug(ctx,img, color,ejeX, ejeY,seleccionada){
            const ficha = new Circulo(ctx, ejeX, ejeY, 20, color);
            ficha.setImage(img.src);
            ficha.setSeleccionada(seleccionada);
            if(color=='red'){
                fichasJug1.push(ficha);
                if(seleccionada){
                    fichaSelecJug1 = ficha.getRelativeSrc();
                }
            }
            else{
                fichasJug2.push(ficha);
                if(seleccionada){
                    fichaSelecJug2 = ficha.getRelativeSrc();
                }
            }
            ficha.draw();
        }

        function drawFigures() {
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                tablero.arrFichas[i].draw();
            }
        }

        function onMouseDown(e) {
            let clickFig;
            let rect = ctx.canvas.getBoundingClientRect();
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;

            if (!inGame) {
                let clickedMode = findClickedFigure(canvasX, canvasY, btns);
                if (clickedMode) {
                    elegirModo(clickedMode.getTextoBoton()[0]);
                }
                else{
                    let clickedfichaJug1 = findClickedFigure(e.clientX, e.clientY, fichasJug1);
                    if (clickedfichaJug1) {
                        fichasJug1.forEach(element => {
                            if(element.getImage()==clickedfichaJug1.getImage()){
                                element.setSeleccionada(true);
                                fichaSelecJug1 = element.getRelativeSrc();
                            }
                            else
                                element.setSeleccionada(false);
                            element.draw();
                        });
                    }
                    else{
                        let clickedfichaJug2 = findClickedFigure(e.clientX, e.clientY, fichasJug2);
                        if (clickedfichaJug2) {
                            fichasJug2.forEach(element => {
                                if(element.getImage()==clickedfichaJug2.getImage()){
                                    element.setSeleccionada(true);
                                    fichaSelecJug2 = element.getRelativeSrc();
                                }
                                else
                                    element.setSeleccionada(false);
                                element.draw();
                            });
                        }
                    }
                }
            }
            else {
                e.preventDefault();
                isMouseDown = true;

                if (lastClickedFigure)
                    lastClickedFigure = null;

                clickFig = findClickedFigure(e.clientX, e.clientY, tablero.arrFichas);
                if (clickFig && !clickFig.ubicada && tablero.esTuTurno(clickFig)) {
                    lastClickedFigure = clickFig;
                    helperPos = lastClickedFigure.getPos()
                }

                if(tablero.clicEnReinicio(canvasX, canvasY)){
                    tablero.reiniciarTablero();
                    tablero.cargarFichas(ctx);
                }
            }
            return clickFig;
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
            let rect = ctx.canvas.getBoundingClientRect();
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;

            e.preventDefault();
            if (lastClickedFigure != undefined) {
                tablero.ponerFicha(lastClickedFigure, canvasX, canvasY)
                if (!lastClickedFigure.ubicada) {
                    lastClickedFigure.setPos(helperPos.x, helperPos.y)
                    tablero.dibujarTablero()
                }
                drawFigures()
            }
            isMouseDown = false;
        }



        function findClickedFigure(x, y, arr) {
            // Busca si se ha hecho clic en alguna figura dentro del array
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                if (element.isPointInside(x, y))
                    return element;
            }
        }

        function elegirModo(modo) {
            switch (modo) {
                case '4':
                    tablero = new Tablero(ctx, 6, 7, 20, 60, 80.5, 158, 95, 4);
                    break;
                case '5':
                    tablero = new Tablero(ctx, 7, 8, 20, 55, 65, 180, 75, 5);
                    break;

                case '6':
                    tablero = new Tablero(ctx, 8, 9, 18, 50, 62, 160, 75, 6);
                    break;

                case '7':
                    tablero = new Tablero(ctx, 9, 10, 15, 45, 55, 160, 75, 7);
                    break;

                default:
                    break;

            }
            tablero.setImagenFicha1(fichaSelecJug1);
            tablero.setImagenFicha2(fichaSelecJug2);
            tablero.cargarFichas(ctx);
            inGame = true
        }

        canvas.addEventListener('mousedown', onMouseDown, false);

        canvas.addEventListener('mousemove', onMouseMove, false);

        canvas.addEventListener('mouseup', onMouseUp, false);
    });
});
