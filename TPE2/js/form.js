let form1 = document.querySelector('.register-form')
let form2 = document.querySelector('.register-form-2')
let form3 = document.querySelector('.register-form-3')
let form4 = document.querySelector('.register-form-4')

let goBack = document.querySelector('.flecha-izq')
let goBack2 = document.querySelector('.flecha-izq2')
let goBack3 = document.querySelector('.flecha-izq3')

let cont = document.querySelector('.cont')

let step1= document.getElementById('go1')
let step2= document.getElementById('go2')
let step3= document.getElementById('go3')


step1.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ -600+"px)";
})


step2.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ -1216+"px)";
})

step3.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ -1832+"px)";
})




goBack.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ 0+"px)";
})

goBack2.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ -600+"px)";
})
goBack3.addEventListener("click", function(){
    cont.style.transform =
    "translateX("+ -1216+"px)";
})



document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.button'),
        loader = document.querySelector('.loader'),
        check = document.querySelector('.check');
    
    btn.addEventListener('click', function () {
      loader.classList.add('active');    
    });
   
    loader.addEventListener('animationend', function() {
      check.classList.add('active'); 
    });
  });
  



let redire = document.getElementById('q')

redire.addEventListener("click", function(){
    setTimeout(() => {
        window.location.href= "home.html"
    }, 3500);
})



