
// Selecciona el elemento donde se mostrará el número
const loaderText = document.getElementById("loaderText");

// Duración de la animación en segundos
const animationDuration = 12;

// Establece el intervalo de tiempo en milisegundos para incrementar el número
const intervalTime = 100;  // Cada 100 ms

// Número máximo a alcanzar
const maxNumber = 100;

// Función para actualizar el número
function updateLoaderText() {
    let startTime = Date.now();  // Hora en que comienza la animación
    let interval = setInterval(function () {
        let elapsedTime = (Date.now() - startTime) / 1000;  // Tiempo transcurrido en segundos
        let progress = Math.min(elapsedTime / animationDuration, 1);  // Progreso de 0 a 1

        // Calcula el número basado en el progreso
        let currentNumber = Math.floor(progress * maxNumber);

        // Actualiza el texto en el loader
        loaderText.textContent = currentNumber;

        // Si se ha alcanzado el número máximo, detiene la animación
        if (currentNumber >= maxNumber) {
            clearInterval(interval);
        }
    }, intervalTime);
}


document.addEventListener("DOMContentLoaded", function () {
    // Iniciar temporizador inmediatamente después de que el DOM esté listo
    updateLoaderText();

    setTimeout(function () {
        document.getElementById("loader").style.display = "none";
    }, 13000); 
});