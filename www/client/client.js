// ----- Conexión Inicial Socket.io ----- //
//const socket = io('http://localhost:3000');
//socket.on('connection');

// ----- Definicion de clases e ids ----- //
// Asignaturas - Lista de tareas
let asignaturas = document.querySelectorAll('.asignaturas li');
let ayuda = document.querySelector('.icono_interrogacion');
let atras = document.querySelector('.icono_atras');
let microfono = document.querySelector('.icono_microfono');
let bot_biblio = document.querySelector('.bibliotecas');

// ----- Variables de control ----- //
let startX, startY, distX, distY;
let threshold = 1; // minimum distance in viewport units for a swipe to be detected
let single_tap = true;

// ----- Funciones de eventos ----- //
function handleTouchStart(event) {
    event.preventDefault()
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
    single_tap = true;
}

function handleTouchEnd(event) {
    const touch = event.changedTouches[0];
    distX = touch.pageX - startX;
    distY = touch.pageY - startY;
    // Deslizamiento vertical
    if (Math.abs(distY) > Math.abs(distX) && Math.abs(distY) > threshold * window.innerHeight / 100) {
        single_tap = false;
        if (distY > 0) {
        // Hacia abajo
            navigator.vibrate(100);
            slide_abajo(this);
            console.log("Vertical swipe down");
        } else {
        // Hacia arriba
            navigator.vibrate(100);
            slide_arriba(this);
            console.log("Vertical swipe up");
        }
    }
    if (single_tap) {
        console.log("single tap");
        }
}

function slide_abajo(element) {
    // copiamos los datos del elemento seleccionado al siguiente en la lista
    let lista = document.querySelector('.asignaturas');
    let asignaturas = lista.getElementsByTagName('li');
    let asignaturasArray = Array.from(asignaturas);
    const indice = asignaturasArray.indexOf(element);
    // Eliminar el elemento de su posición actual
    asignaturasArray.splice(indice, 1);
    // Insertar el elemento en la posición siguiente
    asignaturasArray.splice(indice + 1, 0, element);
    // Refrescar la lista
    lista.innerHTML = '';
    asignaturasArray.forEach(elemento => {
        lista.appendChild(elemento);
    });
}

function slide_arriba(element) {
    // copiamos los datos del elemento seleccionado al siguiente en la lista
    let lista = document.querySelector('.asignaturas');
    let asignaturas = lista.getElementsByTagName('li');
    let asignaturasArray = Array.from(asignaturas);
    const indice = asignaturasArray.indexOf(element);
    // Eliminar el elemento de su posición actual
    asignaturasArray.splice(indice, 1);
    // Insertar el elemento en la posición siguiente
    asignaturasArray.splice(indice - 1, 0, element);
    // Refrescar la lista
    lista.innerHTML = '';
    asignaturasArray.forEach(elemento => {
        lista.appendChild(elemento);
    });
}

// ----- Eventos ----- //
asignaturas.forEach(asignatura => {
    asignatura.addEventListener('touchstart', handleTouchStart);
    asignatura.addEventListener('touchend', handleTouchEnd);
});

ayuda.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    let txt = "Desliza hacia arriba o hacia abajo para cambiar el orden de las asignaturas"
    notie.alert({
        type: 'success',
        text: txt,
        time: 5 
    });
});

atras.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.location.href = '/logout';
});

bot_biblio.addEventListener('touchstart', () => {
    navigator.vibrate(100);
    window.location.href = '/client/library.html';
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
        else if (text == 'grabar') {
            microfono.dispatchEvent(new Event('touchstart'));
        }
        else if (text == 'leer') {
            lectura('Leyendo la lista de asignaturas');
            asignaturas.forEach(asignatura => {
                lectura(asignatura.textContent);
            });
        }
        else if (text == 'bibliotecas') {
            lectura('Bibliotecas cercanas');
            window.location.href = '/client/library.html';
        }
        else {
            lectura(text);
        }
        // lectura(text);
    };
} else {
    console.log('API de reconocimiento de voz no soportada');
  }

// Agitacion movil:
window.addEventListener('devicemotion', function(event) {
    const acceleration = event.accelerationIncludingGravity;
    const threshold = 80; // Umbral de agitación (ajustar según sea necesario)

    // Calcular la aceleración total
    const totalAcceleration = Math.sqrt(
        acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z
    );

    // Verificar si la aceleración total supera el umbral
    if (totalAcceleration > threshold) {
        console.log('¡Dispositivo agitado!');
        let lista = document.querySelector('.asignaturas');
        let asignaturas = lista.getElementsByTagName('li');
        let asignaturasArray = Array.from(asignaturas);
        // Eliminar el ultimo 
        asignaturasArray.pop();
        // Refrescar la lista
        lista.innerHTML = '';
        asignaturasArray.forEach(elemento => {
            lista.appendChild(elemento);
        });
    };
});