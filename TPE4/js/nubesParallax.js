window.addEventListener("scroll", () => {
    const seccion=document.querySelector(".seccion-correo")
    const nubeIzquierda = document.querySelector(".left-cloud");
    const nubeGrande = document.querySelector(".big-cloud");
    const nubeDerecha=document.querySelector(".small-cloud");

    const seccionTop = seccion.offsetTop;
    const seccionAltura = seccion.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY >= seccionTop && scrollY <= seccionTop + seccionAltura) {
        const posicionScroll = scrollY - seccionTop; 
        nubeIzquierda.style.transform = `translateX(${-50 + posicionScroll * 0.3}px)`;
        nubeGrande.style.transform=`translateX(${50 - posicionScroll * 0.2}px)`;
        nubeDerecha.style.transform = `translateX(${-50 - posicionScroll * 0.1}px)`;
    }
});
