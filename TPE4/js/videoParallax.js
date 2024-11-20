window.addEventListener("scroll", () => {
    const seccion = document.querySelector(".seccion-video");
    const img = document.querySelector(".parallax-img");

    const seccionTop = seccion.offsetTop;
    const seccionAltura = seccion.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY >= seccionTop && scrollY <= seccionTop + seccionAltura) {
        const posicionScroll = scrollY - seccionTop; 
        img.style.transform = `translateY(${-50 - posicionScroll * 0.3}px)`;
    }
});
