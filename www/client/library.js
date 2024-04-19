
// ----- Definicion de clases e ids ----- //

let atras_b = document.querySelector('.icono_atras_b');

atras_b.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.history.back();
});