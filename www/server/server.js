// DOM elements
const clock = document.getElementById("clock");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");


// Variables globales
var horas;
var minutos;

// Recepción de los datos por parte del socket
socket.on("running", (arg1, arg2) => {
    horas = arg1;
    minutos = arg2;
  });