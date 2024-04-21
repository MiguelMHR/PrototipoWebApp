let atras = document.querySelector('.icono_atras');
let microfono = document.querySelector('.icono_microfono');
let ayuda = document.querySelector('.icono_interrogacion');
let bot_biblio = document.querySelector('.bibliotecas2');
let check = document.querySelector('.check-1-icon');
let calculo = document.querySelector('.calcula');

// eventos botones
atras.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.history.back();
});

ayuda.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    let txt = "introduzca un nombre para la asignatura y el numero de paginas"
    notie.alert({
        type: 'success',
        text: txt,
        time: 5 
    });
});

bot_biblio.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.location.href = '/client/library.html';
}); 

// añadir asignatura a lista
check.addEventListener('touchstart', () => {
    navigator.vibrate(100);

    /*const asignatura = document.getElementById('pl').value; // Asume que tienes un input para el nombre de la asignatura
    const tiempo = document.getElementById('horas').value; // Asume que tienes un input para el tiempo

    // Guardar la información en localStorage
    const asignaturas = JSON.parse(localStorage.getItem('asignaturas')) || [];
    asignaturas.push({ nombre: asignatura, tiempo: tiempo });
    localStorage.setItem('asignaturas', JSON.stringify(asignaturas)); */
    window.location.href = '/client/home.html';
}); 


calculo.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    var paginas = document.getElementById('paginas').value;
    var horasDeEstudio = Math.floor(paginas / 5);  // Cada 5 páginas equivalen a 1 hora de estudio
    document.getElementById('horas').textContent = horasDeEstudio + 'H';  // Asumiendo que tienes un contenedor con id 'horas'

}); 


// actualizar texto asignatura final
document.getElementById('nombre_peque_intro').addEventListener('input', function() {
    var texto = this.value;
    document.getElementById('pl').innerText = texto; // Actualiza el texto en tiempo real
});




// ----- Reconocimiento de voz ----- //
let grabacion = false;

function lectura(text){
    const message = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(message);  
}

// Verifica si el navegador soporta la API de reconocimiento de voz
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {

    // Crea una instancia de la API de reconocimiento de voz
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    // Configura las opciones de la API
    recognition.lang = 'es-ES';
    recognition.interimResults = false;
  
    // Inicializa la variable de texto
    let text = '';
  
    // Agrega un evento de inicio de grabación en touchstart
    microfono.addEventListener('touchstart', () => {
        navigator.vibrate(100);
        // Finaliza la grabación si ya se está grabando
        if (grabacion){
            notie.alert({
                type: 'info',
                text: 'Finalizando la grabación...',
                time: 4
            });
            recognition.stop();
            console.log('Finalizando grabación...');
            grabacion = false;
        // Inicia la grabación si no se está grabando
        } else {
            notie.alert({
                type: 'info',
                text: 'Iniciando la grabación...',
                time: 2
            });
            recognition.start();
            console.log('Iniciando grabación...');
            grabacion = true;
        }
    });

    // Agrega un evento de resultado
    recognition.onresult = (event) => {
        text = event.results[0][0].transcript;
        grabacion = false;
        navigator.vibrate(100);
        console.log(`Audio reconocido: ${text}`);
        // se repite el texto reconocido por el altavoz del movil
        if (text == 'ayuda al usuario') {
            ayuda.dispatchEvent(new Event('touchstart'));
        }
        else if (text == 'atrás') {
            atras.dispatchEvent(new Event('touchstart'));
        }
        else if (text == 'bibliotecas') {
            lectura('Bibliotecas cercanas');
            window.location.href = '/client/library.html';
        }
        else if (text == 'favoritos') {
            notie.alert({
                type: 'info',
                text: 'Asignatura añadida a favoritos',
                time: 4
            });
        }
        else if (text == 'calcular') {
            lectura('calculando horas');
            calculo.dispatchEvent(new Event('touchstart'));
        }
        else {
            lectura(text);
        }
        // lectura(text);
    };
} else {
    console.log('API de reconocimiento de voz no soportada');
  }