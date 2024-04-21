// ----- Definicion de clases e ids ----- //


let bot_biblio = document.querySelector('.bibliotecas1');
let atras = document.querySelector('.icono_atras');
let horasSeleccionadas = '00';
let minutosSeleccionados = '00';
let ayuda = document.querySelector('.icono_interrogacion');
let check = document.querySelector('.icono_check');



// ----- eventos de botones----- // 
bot_biblio.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.location.href = '/client/library.html';
}); 

atras.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.location.href = '/logout';
});

check.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    var horasSeleccionadas = document.getElementById('horas').value;
    var minutosSeleccionados = document.getElementById('minutos').value;
    localStorage.setItem('horasEstudio', horasSeleccionadas);
    localStorage.setItem('minutosEstudio', minutosSeleccionados);
    console.log("Tiempo de estudio guardado.");
    window.location.href = '/client/home.html';
});

ayuda.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    let txt = "introduzca el timpo de la sesion de estudio"
    notie.alert({
        type: 'success',
        text: txt,
        time: 5 
    });
});























