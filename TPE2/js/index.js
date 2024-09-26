const loginForm = document.querySelector(".login-form");
const registro = document.querySelector(".registro");
const registroP1 = document.querySelector(".registro-p1");
const registroP2 = document.querySelector(".registro-p2");
const registroP3 = document.querySelector(".registro-p3");

let translateValue = 0;
const btnRegistro = document.querySelector("#btn-registro").addEventListener("click", ()=>{
    transladar(-100);
});
const btnInicioSesion = document.querySelector("#btn-inicio-sesion").addEventListener("click", ()=>{
    transladar(100);
});
const btnCrearCuenta = document.querySelector("#btn-crear-cuenta").addEventListener("click", ()=>{
    transladar(-100);
});
const btnP1Siguiente = document.querySelector("#btn-p1-siguiente").addEventListener("click", ()=>{
    transladar(-100);
});
const btnP2Siguiente = document.querySelector("#btn-p2-siguiente").addEventListener("click", ()=>{
    transladar(-100);
});
// const btnP3CrearCuenta = document.querySelector("#btn-p3-crear-cuenta").addEventListener("click", ()=>{
//     transladar(-100);
// });


function transladar(valor){
    translateValue += valor;
    loginForm.style.transform=`translateX(${translateValue}%)`
    registro.style.transform=`translateX(${translateValue}%)`
    registroP1.style.transform=`translateX(${translateValue}%)`
    registroP2.style.transform=`translateX(${translateValue}%)`
    registroP3.style.transform=`translateX(${translateValue}%)`
}