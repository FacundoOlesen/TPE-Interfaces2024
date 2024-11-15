const cards = document.querySelectorAll('.card-galeria');

function efectoParallax() {
    const scroll = window.scrollY;
    const alturaArea = window.innerHeight;

    cards.forEach((card, i) => {
        const cardAltura = card.getBoundingClientRect().top;
        if (cardAltura < alturaArea - 100) {
            setTimeout(() => {
                card.classList.add('visible');
            }, i * 300);
        }
    });
}

window.addEventListener('scroll', efectoParallax);