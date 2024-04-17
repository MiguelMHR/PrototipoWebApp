// ----- Servidor Express ----- //
// Declaraciones iniciales
const path = require('path');         // Módulo para trabajar con rutas (Windows tiene errores con / y \)
const fs = require('fs');             // Módulo para abrir y leer archivos
const express = require('express');   // Módulo para crear el servidor usando el framework de ExpressJS     
const app = express();                // Objeto del servidor

// Configuraciones del servidor
app.set('port', 3000);

// Carga de archivos estáticos requeridos por el servidor (FRONTEND: HTML, CSS, JS e imágenes)
// Archivos del cliente
app.use(express.static(path.join(__dirname, 'www/client')));
// Archivos del servidor
app.use(express.static(path.join(__dirname, 'www/server')));
// Archivos compartidos
app.use(express.static(path.join(__dirname, 'www')));

// Enrutamiento del servidor (URLs del navegador)
// Para el ordenador (http://localhost:3000/desktop):
app.get('/desktop', (req, res) => {
  fs.readFile(path.join(__dirname, 'www/server/server.html'), 'utf-8', (err, text) => {
    res.send(text);    // Envía todo el texto leído del archivo HTML al navegador
  });
});
// Para el movil (http://localhost:3000/movil):
app.get('/movil', (req, res) => {
  fs.readFile(path.join(__dirname, 'www/client/home.html'), 'utf-8', (err, text) => {
    res.send(text);     // Envía todo el texto leído del archivo HTML al navegador
  });
});


// ----- Socket.io ----- //
// Creación del objeto socket.io (se le pasa el servidor creado con Express con protocolo http) 
// y se le permite la conexión desde cualquier origen (CORS de Express habilitados
// para evitar errores en el navegador)
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors:{origin:'*'}});

// Conexiones de los sockets con el servidor
io.on('connection', (socket) => {
  // Recepciones de emisiones de los sockets
  // Y emisiones globales de respuestas
  // a todos los sockets conectados (broadcasts)
  console.log('cliente conectado: ' + socket.id);
  // Si hay más de un cliente, no permitir más conexiones
  if (io.engine.clientsCount > 1) {
  socket.emit('maximo');
  socket.disconnect();
  // -------  INSERTAR AQUÍ FUNCIONES SOCKET.IO  ------- //
  // socket.on("like", () => {
  // socket.broadcast.emit("like");
  // });
}
});  


// ----- Inicio servidor ----- //
server.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'))
});