# Prototipo Sistemas Interactivos y Ubicuos -> G4

## Roles

* **Belén**: Front-end completo (movil y ordenador) 
* **Jana**: Front-end móvil
* **Miguel**: Back-end -> funciones del sistema y gestión del server (NodeJS, Socket.io y ExpressJS)
* **Jose**: Back-end -> funciones del sistema

## Estructura

* **app.js** : encargado de gestionar el servidor *express,* hacer el despliegue tanto de la interfaz del ordenador como la del móvil y de gestionar las comunicaciones cliente-servidor mediante *Socket.io*
* **package.json** : maneja el proyecto mediante *NodeJS* y las dependencias necesarias para correr el sistema. Además, contiene metadatos del proyecto así como atajos propios de *NodeJS* tanto para ejecutar el sistema como para ejecutar un debuger de JS llamado *Nodemon*
* **/www** : carpeta que contiene los archivos web (HTML, CSS y JS, así como recursos extras como imágenes)
  * **/cliente** : contiene los archivos HTML, CSS y JS propios del cliente
    * Por cada pantalla del cliente vamos a tener un HTML y un CSS, pero solo va a haber un JS
      * *index.html/css/js:* punto de entrada del móvil. Resulta en una pantalla donde se pide al usuario el tiempo de estudio
      * *home.html/css/js:* pantalla que alberga todas las asignaturas creadas en la sesión de estudio. Nuestro "carrito de la compra"
      * *subject.html/css/js:* pantalla de creación de la asignatura en esa sesión de estudio. En ella el usuario introducirá datos como *nombre*y los *archivos PDF a estudiar* y se procederá a hacer un cálculo del tiempo de estudio estimado según los archivos añadidos.
      * *library.html/css/js:* pantalla extra que mostrará la ubicación del usuario y las bibliotecas más cercanas.
      * *running.html/css/js:* al terminar de configurar la sesión de estudio y si el tiempo es menor que el introducido por el usuario, se irá a esta pantalla que contendrá información como un resumen de la sesión de estudio y un temporizador
    * **/server** : contiene los archivos propios del servidor, un HTML, un CSS y un archivo JS

## Funcionalidades del proyecto:

* **Funcionalidad básica del sistema**
  * Crear una **sesión de estudio inteligente** con un *temporizador* en el móvil y en el ordenador
    * Se creará la sesión de estudio si el tiempo introducido por el usuario en el móvil es *mayor* que el tiempo estimado en base a los archivos introducidos
    * El sistema calculará el *tiempo estimado de estudio* en base a las **páginas que contiene cada PDF**. Este dato deberá ser introducido por el usuario
      * En futuras versiones se prevee crear un sistema de lectura de archivos PDF que te calcula el tiempo estimado de estudio
    * Además, como componente de gamificación, se implementará un sistema de recompensas basado en componentes de personalización (modo oscuro o nuevos temas) en base a las **horas estudiadas** por el usuario (1 coin = 1 hora de estudio)
      * En este prototipo se obtendrá el número en base al *tiempo de la sesión de estudio creada*. En futuras versiones se almacenará el dato para poder acumular las recompensas para poder obtener mejores
* **Funcionalidad ubicua:**
  * *Touch API y Pointer API para manejo de la interfaz:*
    * Se pretende implementar, mediante la *Touch API y Pointer API*, un sistema de deslizamiento direccional que redistribuirá las asignaturas para poder reorganizar la sesión de estudio a elección del usuario
  * *Sensor API* *para eliminar última asignatura creada*
    * Se pretende implementar, agitando el móvil, una función que elimina la última asignatura creada de la sesión de estudio
  * *Vibración por feedback al usuario:*
    * Se pretende implementar un sistema de feedback al usuario basado en la vibración del móvil, sobre todo, y en pop-ups usando la API Notie
      * toque a un botón : vibración corta
      * error del sistema : vibración larga y notificación
  * *Giroscopio para terminar sesión:*
    * Se pretende implementar una función mediante la cuál, al girar el movil, se elimina la sesión de estudio
  * *Voice API* *para comandos de voz:*
    * Se pretende crear un sistema de comandos de voz que ejecutarán nuevas acciones o algunas que ya de por sí se podían ejecutar presionando botones
      * "favoritos" : salta una notificación de que esta sesión de estudio se almacenará en favoritos (solo notificación)
      * "añadir sesión" : sustituye al botón de "+" que te lleva a la pantalla de *añadir asignatura*
      * "bibliotecas" : sustituye al botón del bibliotecas que te lleva a la pantalla de *bibliotecas*
      * "ayuda" : sustituye al botón de ayuda presente en todas las pantallas del móvil
      * "iniciar sesión" : sustituye al botón de iniciar sesión de estudio
  * *Accesibilidad - botón de ayuda:*
    * En cada pantalla del móvil se muestra un botón de "?" que mostrará un pop-up que da información sobre cómo usar cada pantalla
* **Funcionalidades extra (pendiente de decisión de implementación):**
  * *Bibliotecas cercanas:*
    * Se pretende, en la pantalla de bibliotecas, mostrar la ubicación del usuario y bibliotecas cercanas al usuario

## **Cosas extras a añadir no contempladas:**

* Se debe añadir un botón en el desktop que enseñe una mini-pantalla de recompensas para satisfacer ese requerimiento✅
* Se pretende añadir una pantalla HTML en el desktop que muestre un mensaje de "esperando sesión de estudio" hasta que el cliente envíe la sesión de estudio🔄

## ¿Cómo ejecutar el proyecto?

* * Recomendado usar Google Chrome en Android y ejecutarlo con cable para reducir posibles problemas
* Para poder abrir el servidor y poder empezar a usar el móvil y el ordenador, debemos seguir los siguientes pasos:
  * Instalar **Node.JS** : [click para descargar NodeJS](https://nodejs.org/en/download)
  * Instalar las **dependencias del proyecto : `npm install`**
  * Iniciar el **servicio** :
    * Si pretendes ejecutarlo normal (sin debugger) : **`node app.js`**
    * Si pretendes usar el debugger (nodemon) : **`nodemon app.js`**
  * Abrir la **ventana del ordenador** :
    * Desde el navegador del ordenador : **`http://localhost:3000/desktop`**
  * Abrir la **ventana del móvil** :
    * Primero, desde el navegador, debes conectar el móvil: **`chrome://inspect`**
      * Puedes hacer *port forwarding* y conectarte sin necesidad de cable
      * Si no funciona, puedes conectar el móvil con cable, activar la depuración USB y conectar, desde el ordenador, el móvil cuando aparezca la opción en **verde**
    * Una vez conectado, debes introducir, desde el móvil, el enlace siguiente : **`http://localhost:3000/movil`**

## Funcionalidades P1 - incluidas y no incluídas:

De las funcionalidades mencionadas previamente y en el P1 se han conseguido implementar las siguientes:

* **Funcionalidad ubicua:**
  * Voice API para ejecutar comandos de voz y acciones de callback (lectura asignaturas, notificaciones, etc)
  * Sensor API para eliminar las asignaturas de la sesión de estudio agitando el móvil
  * Touch API para reorganizar la sesión de estudio
  * Vibracion al interaccionar con cualquier botón de la aplicación
* **Accesibilidad y sistema de recompensas:**
  * Botón de ayuda presente en cada pestaña del móvil junto con un texto de ayuda en forma de notificación
  * Botón localizado arriba a la izquierda en la pantalla del ordenador con ciertas opciones desbloqueables según las horas de estudio acumuladas por el usuario
  * Sesiones de estudio y asignaturas favoritas mediante comandos de voz
    * En la pestaña de asignatura, si se presiona el micrófono y se dice "favoritos", se mostrará una notificación simulando que se ha agregado la asignatura a favoritos
    * En la pestaña de organización de la sesión de estudio, si se presiona el micrófono y se dice "favoritos", el móvil dirá en alto que la sesión se ha agregado a favoritos
* **Funcionamiento básico del sistema:**
  * Navegación completa entre HTMLs mediante botones y comandos de voz
  * Uso del temporizador al crear la sesión de estudio
    * Pausa y reanudación con comandos de voz
  * Creación de las asignaturas de la sesión de estudio
  * Cálculo del tiempo de estudio en base a las páginas introducidas
  * Resumen de la sesión de estudio en base a las asignaturas creadas
* **Funcionalidades no implementadas:**
  * Uso de la API de geolocalización para mostrar las bibliotecas cercanas
    * Únicamente la pestaña de bibliotecas con una imágen estática de lo que sería en un futuro esta función
  * Sistema de manejo de PDF y de cálculo del tiempo de estudio al subir los PDFs a la aplicación
