import { Circulo } from "./circulo.js";

export class Casillero extends Circulo {
    constructor(ctx, x, y, radius, color, fila, col ,ocupado, jugador) {
        super(ctx, x, y, radius, color)
        this.ocupado = false
        this.jugador=new Circulo()
        this.fila=fila
        this.col=col
    }

    setOcupado(bool) {
        this.ocupado = bool
    }

    setJugador(jugador){
        this.jugador=jugador
    }

    getJugador(){
        return this.jugador
    }

    getColor(){
        return this.color
    }

}