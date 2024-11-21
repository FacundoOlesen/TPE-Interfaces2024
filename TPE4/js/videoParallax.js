window.addEventListener("scroll", () => {
    const seccion = document.querySelector(".seccion-video");
    const img = document.querySelector(".parallax-img");
    const video=document.querySelector(".video-container");

    const seccionTop = seccion.offsetTop;
    const seccionAltura = seccion.offsetHeight;
    const scrollY = window.scrollY;

    if (scrollY >= seccionTop && scrollY <= seccionTop + seccionAltura) {
        const posicionScroll = scrollY - seccionTop; 
        img.style.transform = `translateY(${-50 - posicionScroll * 0.3}px)`;
        video.style.transform=`translateX(${50 - posicionScroll * 0.1}px)`;
    }
});
