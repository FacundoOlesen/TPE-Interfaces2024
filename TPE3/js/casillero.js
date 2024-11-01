import { Circulo } from "./circulo.js";

export class Casillero extends Circulo {
    constructor(ctx, x, y, radius, color, ocupado) {
        super(ctx, x, y, radius, color)
        this.ocupado = false
    }

    setOcupado(bool) {
        this.ocupado = bool
    }
}