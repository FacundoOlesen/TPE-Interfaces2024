const logo = document.querySelector(".logo-inicio")

const initialWidth = 560;
const initialHeight = 320;

const minWidth = 70;
const minHeight = 55;

window.addEventListener("scroll", () => {
    let y = window.scrollY;
    console.log(y)
    if (window.scrollY <= 879) {
        logo.style.marginTop = 0 + y + "px";
        let newWidth = Math.max(minWidth, initialWidth - y * 0.5);
        let newHeight = Math.max(minHeight, initialHeight - y * 0.25);

        logo.style.width = newWidth + "px";
        logo.style.height = newHeight + "px";

        window.scrollY >= 847 ? logo.classList.add("fixed") : logo.classList.remove("fixed")
    }
    else if (window.scrollY >= 845) {
        logo.classList.add("fixed")
        logo.style.width = 131.5 + "px";
        logo.style.height = 105.75 + "px";
        logo.style.marginTop = -5  + "px";

    }
});

