// ----- Conexión Inicial Socket.io ----- //
const socket = io('http://localhost:3000/movil');
socket.on('connection');


let atras = document.querySelector('.icono_atras');
let microfono = document.querySelector('.icono_microfono');
let interval;

atras.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function() {
    var horas = localStorage.getItem('horasEstudio') || '0';
    var minutos = localStorage.getItem('minutosEstudio') || '0';
    iniciarTemporizador(horas, minutos);
});
function iniciarTemporizador(horas, minutos) {
    // Primero, detén cualquier temporizador existente.
    if (interval) {
        clearInterval(interval);
        interval = null; // Anula la variable del intervalo después de detenerlo.
    }

    var totalSegundos = parseInt(horas) * 3600 + parseInt(minutos) * 60;
    if (totalSegundos <= 0) return;

    interval = setInterval(function() {
        if (totalSegundos <= 0) {
            clearInterval(interval);
            interval = null; // No olvides anular la variable aquí también.
            return;
        }
        
        var h = Math.floor(totalSegundos / 3600);
        var m = Math.floor((totalSegundos % 3600) / 60);
        var s = totalSegundos % 60;

        h = String(h).padStart(2, '0');
        m = String(m).padStart(2, '0');
        s = String(s).padStart(2, '0');

        document.querySelector('.div2').textContent = `${h}:${m}:${s}`;

        totalSegundos--;
    }, 1000);
}
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
        else if (text == 'parar') {
            lectura('parando temporizador');
            detenerTemporizador();
        }
        else if (text == 'reiniciar') {
            lectura('reiniciando temporizador');
            reanudarTemporizador();
        }
        else {
            lectura(text);
        }
        // lectura(text);
    };
} else {
    console.log('API de reconocimiento de voz no soportada');
  }

function detenerTemporizador() {
    if (interval) {
        clearInterval(interval);
        localStorage.setItem('tiempoRestante', totalSegundos.toString()); // Guarda el tiempo restante actualizado
        console.log('Temporizador detenido con ' + totalSegundos + ' segundos restantes');
        interval = null;
    }
}

function reanudarTemporizador() {
    const tiempoGuardado = parseInt(localStorage.getItem('tiempoRestante'), 10);
    if (tiempoGuardado && tiempoGuardado > 0) {
        iniciarTemporizadorDesdeSegundos(tiempoGuardado);
        console.log('Temporizador reanudado con ' + tiempoGuardado + ' segundos restantes');
    } else {
        console.log("No hay tiempo guardado o el temporizador había terminado.");
    }
}
function iniciarTemporizadorDesdeSegundos(segundosRestantes) {
    clearInterval(interval); // Detén cualquier intervalo existente
    totalSegundos = segundosRestantes;

    interval = setInterval(function() {
        if (totalSegundos <= 0) {
            clearInterval(interval);
            interval = null;
            document.querySelector('.div2').textContent = "00:00:00";
            return;
        }
        
        const h = Math.floor(totalSegundos / 3600);
        const m = Math.floor((totalSegundos % 3600) / 60);
        const s = totalSegundos % 60;

        document.querySelector('.div2').textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        totalSegundos--;
    }, 1000);
}

function enviar_info_ordenador() {
    fetch('/client/running.html')
    .then(response => response.text())
    .then(html => {
        document.querySelector('.div2').innerHTML = html;
    });
}

// emisión de datos con los sockets
io.on("connection", (socket) => {
    socket.emit("running", horas, minutos);
  });