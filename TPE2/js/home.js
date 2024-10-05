//Funcion para desplazamiento de titulos largos
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.juego-card h2').forEach((title) => {
        const tamañoTitulo = title.scrollWidth; 
        const tamañoContainer = title.clientWidth; 

        if (tamañoTitulo > tamañoContainer) {
            title.classList.add('scrolling'); 
        }
    });
});

const button = document.getElementById('enCarrito');
const originalImageSrc = 'img/encarrito.png'; // Ruta de la imagen original
const newImageSrc = 'img/quitarcarrito.png'; // Ruta de la nueva imagen

button.addEventListener('mouseenter', function() {
    const img = button.querySelector('img');
    img.src = newImageSrc; // Cambiar a la nueva imagen
});

button.addEventListener('mouseleave', function() {
    const img = button.querySelector('img');
    img.src = originalImageSrc; // Volver a la imagen original
});

//Funcion para darle funcionalidad al carrusel
const carruselContainer = document.querySelector('.carrusel-container');
const anterior = document.querySelector('.carrusel-prev');
const siguiente = document.querySelector('.carrusel-next');
//con esto hacemos que aparezcan la cantidad justa de cards dependiendo su tamaño
const juegoCardWidth = document.querySelector('.juego-card').offsetWidth + 20; 
const visibleCards = Math.floor(carruselContainer.offsetWidth / juegoCardWidth);

let currentIndex = 0;
function actualizarPosicion() {
    carruselContainer.style.transform = `translateX(-${currentIndex * juegoCardWidth}px)`;
    if (currentIndex === 0) {//si es 0 siginifica que esta en la posicion inicial del carrusel
        anterior.style.display = 'none';
    } else {
        siguiente.style.display = 'block';
    }

    if (currentIndex >= carruselContainer.children.length - visibleCards) {//si alcanza el valor maximo, es porque llego al final
        siguiente.style.display = 'none';
        anterior.style.display='block';
    } else {
        siguiente.style.display = 'block';
    }
}

// le damos un evento click al boton de siguiente
siguiente.addEventListener('click', () => {
    if (currentIndex < carruselContainer.children.length - visibleCards) {
        currentIndex++;
        actualizarPosicion();
    }
});

// le damos un evento click al boton de anterior
anterior.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        actualizarPosicion();
    }
});

// Inicializar el carrusel
actualizarPosicion();


function setProgress(percentage) {
    const circle = document.getElementById('progress-path');
    const text = document.getElementById('progress-text');
    
    // Ajustar el círculo de progreso
    const dashArray = `${percentage}, 100`;
    circle.setAttribute('stroke-dasharray', dashArray);
    
    // Actualizar el texto del porcentaje
    text.textContent = `${percentage}%`;
}

// Simulación de carga (ejemplo)
let progress = 0;
const interval = setInterval(() => {
    if (progress <= 100) {
        setProgress(progress);
        progress += 5; // Incrementa el porcentaje
    } else {
        clearInterval(interval); // Detiene la simulación al llegar a 100%
    }
}, 120); // Cada 120ms
