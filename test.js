//  NAVEGACION ENTRE HTML //

    // Para cargar la nueva pagina(html)
    window.location.href = 'https://www.ejemplo.com/pagina2.html';

    // Para una nueva ventana 
    window.open('https://www.ejemplo.com/pagina2.html', '_blank');

    

// GIROSCOPIO PARA VER LA ORIENTACION (SI ESTA DADO LA VUELTA O NO) //

    // CODIGO
        // Escucha el evento de orientación del dispositivo
    window.addEventListener('deviceorientation', function(event) {
        // Obtener el ángulo de rotación alrededor del eje Z
        var rotateDegrees = event.alpha;
        // Definir un umbral de giro 
        var threshold = 150;

        // Verificar si el dispositivo ha sido girado más allá del umbral
        if(rotateDegrees > threshold) {
            // Aquí iría la lógica para terminar la sesión

            endStudySession();  
        }
    });

    // VOLVER A LA PANTALLA DE INICIO 
    function endStudySession() {
        // Función para manejar el cierre de la sesión de estudio
        // Ejemplo: Redirigir al usuario o cerrar la sesión en el servidor
        console.log("Sesión de estudio terminada.");
        // Redireccionar al usuario o realizar alguna otra acción
        window.location.href = '/logout'; // Redirigir al endpoint de cierre de sesión
    }



// TOUCH , touchstart, touchmove, touchend, y touchcancel // 

    // las variables estas para el boton que se quiere implementar el touch o el deslizar
        const touchArea = document.getElementById('touch-area');
        const statusText = document.getElementById('status');



        touchArea.addEventListener('touchstart', function(e) {
            e.preventDefault(); // Prevención del comportamiento por defecto (scroll, zoom)
            statusText.textContent = 'Tocando...';
        });

        touchArea.addEventListener('touchmove', function(e) {
            e.preventDefault(); // Mantén el comportamiento por defecto deshabilitado
            const touch = e.touches[0]; // Obtén el primer toque
            statusText.textContent = `Moviendo en (${touch.pageX}, ${touch.pageY})`;
        });

        touchArea.addEventListener('touchend', function(e) {
            statusText.textContent = 'Toque finalizado';
        });

        touchArea.addEventListener('touchcancel', function(e) {
            statusText.textContent = 'Toque cancelado';
        });



// ACELEROMETRO PARA LA AGITACION DEL MOVIL //

        if ('Accelerometer' in window) {

            const threshold = 25; // Umbral de velocidad de agitación, cambiar para que detecte bien que se ha agitado
            let lastReadingTimestamp;
            let shakeBuffer = [];

            const accelerometer = new accelerometer({ frequency: 60 });


            accelerometer.addEventListener('reading', () => {
                const now = Date.now();
                if (lastReadingTimestamp && (now - lastReadingTimestamp) < 100) {
                    const deltaX = accelerometer.x - lastX;
                    const deltaY = accelerometer.y - lastY;
                    const deltaZ = accelerometer.z - lastZ;
                    const speed = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ) / (now - lastReadingTimestamp);

                    shakeBuffer.push(speed);
                    shakeBuffer = shakeBuffer.filter(ts => now - ts < 500); // Mantener solo los últimos 500ms de datos

                    if (shakeBuffer.some(val => val > threshold)) {
                        
                        // poner aqui lo que se quiera hacer una vez agitado el movil
                        document.getElementById('status').textContent = 'Agitación detectada!';
                        shakeBuffer = []; // Limpiar el buffer después de detectar una agitación
                    }
                }

                lastReadingTimestamp = now;
                lastX = accelerometer.x;
                lastY = accelerometer.y;
                lastZ = accelerometer.z;
            });

            accelerometer.start();
        } else {
            document.getElementById('status').textContent = 'Accelerometer no soportado en este dispositivo.';
        }

// API DE VIBRACION CUANDO 
function vibrar() {
    if ('vibrate' in navigator) {
        // Vibrar por 200 milisegundos
        navigator.vibrate(200);
    } else {
        alert("La API de vibración no es soportada en este navegador.");
    }
}

// API MICROFONO

// start-btn seria el boton del microfono que hauy en el footer
const startBtn = document.getElementById('start-btn');
const transcript = document.getElementById('transcript');

// Verificar si el navegador soporta SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();
    recognition.lang = 'es-ES'; // Configurar el idioma del reconocedor
    recognition.interimResults = false; // Configurar para obtener resultados finales solamente

    recognition.onstart = function() {
        transcript.textContent = 'El reconocimiento de voz está activo. Habla ahora...';
    };

    recognition.onresult = function(event) {
        const speechResult = event.results[0][0].transcript;
        transcript.textContent = 'Resultado reconocido: ' + speechResult;
        console.log('Confianza: ' + event.results[0][0].confidence);
        // Aquí puedes añadir lógica para procesar el comando de voz
    };

    recognition.onerror = function(event) {
        transcript.textContent = 'Error en el reconocimiento de voz: ' + event.error;
    };

    recognition.onend = function() {
        transcript.textContent = 'El reconocimiento de voz ha terminado.';
        // Opcionalmente, puedes reiniciar automáticamente el reconocimiento
        // recognition.start();
    };

    // Iniciar el reconocimiento de voz
    startBtn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    transcript.textContent = 'Tu navegador no soporta la API de reconocimiento de voz.';
    startBtn.disabled = true;
}


// API ALTAVOZ  cuando un temporizador se acabe suene po el altavoz del movil una alarma

function startTimer() {
    const timeInput = document.getElementById('timeInput');
    const duration = parseInt(timeInput.value);  // Duración en segundos
    if (isNaN(duration)) {
        alert("Por favor, ingresa un número válido de segundos.");
        return;
    }

    // Configurar el temporizador
    setTimeout(() => {
        playAlarmSound();
    }, duration * 1000);  // Convertir segundos a milisegundos
}

function playAlarmSound() {
    const audio = new Audio('path_to_your_alarm_sound.mp3');  // Ruta al archivo de sonido de la alarma
    audio.play().catch(e => console.error("Error al reproducir el sonido de la alarma:", e));
}



























