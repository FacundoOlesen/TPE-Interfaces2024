// Selección de elementos
const loginForm = document.querySelector(".login-form");
const registro = document.querySelector(".registro");
const pasosRegistro = [document.querySelector(".registro-p1"), document.querySelector(".registro-p2"), document.querySelector(".registro-p3")];

// Variable para la traslación
let translateValue = 0;

// Función para agregar clase a un elemento
function agregarClase(elem, clase) {
    document.querySelector(elem).classList.add(clase);
}

// Función para trasladar elementos
function trasladar(valor) {
    translateValue += valor;
    const elementsToTranslate = [loginForm, registro, ...pasosRegistro];
    elementsToTranslate.forEach(el => el.style.transform = `translateX(${translateValue}%)`);
}

// Función para asignar eventos de clic y trasladar
function asignarEventoTrasladar(selector, valor) {
    document.querySelector(selector).addEventListener("click", () => trasladar(valor));
}

// Asignar eventos de traslación
asignarEventoTrasladar("#btn-registro", -100);
asignarEventoTrasladar("#btn-inicio-sesion", 100);
asignarEventoTrasladar("#btn-crear-cuenta", -100);
asignarEventoTrasladar("#btn-p1-siguiente", -100);
asignarEventoTrasladar("#btn-p2-siguiente", -100);
asignarEventoTrasladar("#btn-p1-volver", 100);
asignarEventoTrasladar("#btn-p2-volver", 100);
asignarEventoTrasladar("#btn-p3-volver", 100);

// Asignar eventos para agregar clase "ocultar"
const ocultarRegistro = () => agregarClase("#registro", 'ocultar');

document.querySelector("#btn-p3-crear-cuenta").addEventListener("click", ocultarRegistro);
document.querySelector("#btn-ingresar").addEventListener("click", ocultarRegistro);


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


