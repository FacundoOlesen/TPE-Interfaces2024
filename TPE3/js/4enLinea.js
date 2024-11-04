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
    //cuando se hace click en playButton inicia el juego
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
                // Configura el tamaño y estilo del título
                ctx.font = "bold 30px Arial"; 
                // Color del título
                tx.fillStyle = "white"; 
                // Posición centrada
                ctx.fillText("Bienvenido al Juego", ctx.canvas.width / 2, 50); 
                //creamos botones para elegir el modo de juego
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
                //esperamos a que se carguen todas las img antes de crear las fichas,
                //una vez cargadas, se crean las fichas 
                Promise.all(fichasImg).then(([ferrariImg, williamsImg, ferrari2, williams2, williams3, ferrari3]) => {
                    crearFichaJug(ctx,ferrariImg, 'red',300, 400,true);
                    crearFichaJug(ctx,williamsImg, 'lightblue',300, 455,true);
                    crearFichaJug(ctx,ferrari2, 'red',360, 400,false);
                    crearFichaJug(ctx,williams2, 'lightblue',360, 455,false);
                    crearFichaJug(ctx,williams3, 'lightblue',420, 455,false);
                    crearFichaJug(ctx,ferrari3, 'red',420, 400,false);
                });

                ctx.font = "bold 25px Arial";
                ctx.textAlign = 'left';
                ctx.fillText("Ficha jugador 2:", 50, 455);

            };
        }
        //creamos y agregamos el array de fichas de cada jugador
        //si la ficha esta seleccionada actualizamos la referencia con la ruta relativa de su imagen
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
        //dibuja todas la fichas que estan en el tablero
        function drawFigures() {
            for (let i = 0; i < tablero.arrFichas.length; i++) {
                tablero.arrFichas[i].draw();
            }
        }
        //maneja el evento click en el canvas
        function onMouseDown(e) {
            let clickFig;
            let rect = ctx.canvas.getBoundingClientRect();
            let canvasX = e.clientX - rect.left;
            let canvasY = e.clientY - rect.top;

            if (!inGame) {
                //detecta si se hizo click en alguno de los botones de modo de juego
                let clickedMode = findClickedFigure(canvasX, canvasY, btns);
                if (clickedMode) {
                    elegirModo(clickedMode.getTextoBoton()[0]);
                }
                else{
                    //detecta si se eligio una ficha el jugador 1
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
                        //detecta si se eligio una ficha el jugador 2
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
            else {//si el juego comenzo
                e.preventDefault();
                isMouseDown = true;

                if (lastClickedFigure)
                    lastClickedFigure = null;
                //verificamos si se hizo click en alguna ficha
                //si se clickeo seleccionamos la ficha y su posicion
                clickFig = findClickedFigure(e.clientX, e.clientY, tablero.arrFichas);
                if (clickFig && !clickFig.ubicada && tablero.esTuTurno(clickFig)) {
                    lastClickedFigure = clickFig;
                    helperPos = lastClickedFigure.getPos()
                }
                //verificamos si se clickeo en el boton de reinicio
                //si se clickeo reiniciamos el tablero y recargamos las fichas
                if(tablero.clicEnReinicio(canvasX, canvasY)){
                    tablero.reiniciarTablero();
                    tablero.cargarFichas(ctx);
                }
            }
            return clickFig;
        }
        /**manejamos el movimiento del mouse cuando se mantiene presionado
        si esta presionado el mouse y hay una ficha seleccionada, calculamos 
        las coordenadas del mouse en el canvas, actualizamos la posicion de
        la figura seleccionada (fichas) y redibujamos el tablero
        **/
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
        /** manejamos la accion de soltar el click
            calculamos las coordenadas, si hay una figura seleccionada
            intentamos colocarla en el tablero, si la figura no se pudo colocar la
            devolvemos a su posicion original 
        * */
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
        //elegimos el modo de juego
        function elegirModo(modo) {
            switch (modo) {
                case '4':
                    tablero = new Tablero(ctx, 6, 7, 19, 55, 80.5, 158, 95, 4);
                    break;
                case '5':
                    tablero = new Tablero(ctx, 7, 8, 17.5, 47.5, 70, 158, 95, 5);
                    break;

                case '6':
                    tablero = new Tablero(ctx, 8, 9, 15, 41.3, 60, 158, 95, 6);
                    break;

                case '7':
                    tablero = new Tablero(ctx, 9, 10, 13.3, 36.5, 53, 158, 95, 7);
                    break;

                default:
                    break;

            }
            
            tablero.setImagenFicha1(fichaSelecJug1);
            tablero.setImagenFicha2(fichaSelecJug2);
            inGame = true
        }

        canvas.addEventListener('mousedown', onMouseDown, false);

        canvas.addEventListener('mousemove', onMouseMove, false);

        canvas.addEventListener('mouseup', onMouseUp, false);
    });
});
