// Define la clase Boton, la cual representa un botón dibujado en un canvas
export class Boton {
    // Constructor de la clase, inicializa propiedades del botón
    constructor(ctx, x, y, textoBoton, ancho, alto) {
        this.ctx = ctx;            // Contexto del canvas donde se dibuja el botón
        this.textoBoton = textoBoton; // Texto que se muestra en el botón
        this.posX = x;              // Posición X del botón
        this.posY = y;              // Posición Y del botón
        this.ancho = ancho;         // Ancho del botón
        this.alto = alto;           // Alto del botón
        this.radius = 12;           // Radio de los bordes redondeados
        this.color = '#5535f7';     // Color de fondo del botón
        this.colorTexto = 'white';  // Color del texto del botón
    }

    // Método que dibuja el botón en el canvas
    dibujar() {

        this.ctx.fillStyle = this.color; // Configura el color de relleno
        this.ctx.beginPath(); //  comienza el dibujo del botón con bordes redondeados

        // Inicia en la esquina superior izquierda con margen para el borde redondeado
        this.ctx.moveTo(this.posX + this.radius, this.posY);

        // Línea horizontal superior
        this.ctx.lineTo(this.posX + this.ancho - this.radius, this.posY);

        // Curva para redondear la esquina superior derecha
        this.ctx.quadraticCurveTo(this.posX + this.ancho, this.posY, this.posX + this.ancho, this.posY + this.radius);

        // Línea vertical en el borde derecho
        this.ctx.lineTo(this.posX + this.ancho, this.posY + this.alto - this.radius);

        // Curva para la esquina inferior derecha
        this.ctx.quadraticCurveTo(this.posX + this.ancho, this.posY + this.alto, this.posX + this.ancho - this.radius, this.posY + this.alto);

        // Línea horizontal en la parte inferior
        this.ctx.lineTo(this.posX + this.radius, this.posY + this.alto);

        // Curva para redondear la esquina inferior izquierda
        this.ctx.quadraticCurveTo(this.posX, this.posY + this.alto, this.posX, this.posY + this.alto - this.radius);

        // Línea vertical izquierda hacia arriba
        this.ctx.lineTo(this.posX, this.posY + this.radius);

        // Curva para redondear la esquina superior izquierda
        this.ctx.quadraticCurveTo(this.posX, this.posY, this.posX + this.radius, this.posY);

        this.ctx.closePath(); // Cierra el camino trazado, finalizando la figura
        this.ctx.fill(); // Rellena el botón con el color especificado

        // Configura y dibuja el texto centrado en el botón
        this.ctx.fillStyle = this.colorTexto;
        this.ctx.font = "bold 20px 'Nunito', sans-serif"; 
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(
            this.textoBoton,
            this.posX + this.ancho / 2, // Centra el texto en la posición X
            this.posY + this.alto / 2   // Centra el texto en la posición Y
        );
    }

    // Retorna el texto del botón
    getTextoBoton() {
        return this.textoBoton;
    }

    // Verifica si un punto (x, y) está dentro del área del botón
    isPointInside(x, y) {
        return x >= this.posX && x <= (this.posX + this.ancho) && y >= this.posY && y <= (this.posY + this.alto);
    }
}
