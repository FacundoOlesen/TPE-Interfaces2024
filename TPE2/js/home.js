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
const primerImg = 'img/encarrito.png'; // Ruta de la imagen original
const nuevaImg = 'img/quitarcarrito.png'; // Ruta de la nueva imagen

button.addEventListener('mouseenter', function() {
    const img = button.querySelector('img');
    img.src = nuevaImg; // Cambiar a la nueva imagen
});

button.addEventListener('mouseleave', function() {
    const img = button.querySelector('img');
    img.src = primerImg;
});

//Funcion para darle funcionalidad al carrusel

const carruseles = document.querySelectorAll('.carrusel');

carruseles.forEach(carrusel => {
    const carruselContainer = carrusel.querySelector('.carrusel-container');
    const anterior = carrusel.querySelector('.carrusel-prev');
    const siguiente = carrusel.querySelector('.carrusel-next');
    
    // Determinamos el ancho de cada tarjeta
    const juegoCardWidth = carruselContainer.querySelector('.juego-card').offsetWidth;
    
    // Calculamos cuántas tarjetas son visibles dependiendo del ancho del carrusel
    const visibleCards = Math.floor(carrusel.offsetWidth / juegoCardWidth);
    
    let currentIndex = 0;

    function actualizarPosicion() {
        carruselContainer.style.transform = `translateX(-${currentIndex * juegoCardWidth}px)`;
        if (currentIndex === 0) {
            anterior.style.display = 'none';
        } else {
            anterior.style.display = 'block';
        }

        if (currentIndex >= carruselContainer.children.length - visibleCards) {
            siguiente.style.display = 'none';
        } else {
            siguiente.style.display = 'block';
        }
    }

    siguiente.addEventListener('click', () => {
        if (currentIndex < carruselContainer.children.length - visibleCards) {
            currentIndex++;
            actualizarPosicion();
        }
    });

    anterior.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            actualizarPosicion();
        }
    });

    actualizarPosicion();
});



