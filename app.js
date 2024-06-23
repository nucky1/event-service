// app.js

global.__basedir = __dirname;
process.env.TZ = "America/Argentina/Buenos_Aires";
let fs = require('fs');
const http2Express = require('http2-express-bridge');
const { initializeWebSocketServer } = require('./app/3-repositories/webSocketRepository');

//----------------------- EXPRESS CONFIG ----------------------- //

const express = require('express');
const fileUpload = require('express-fileupload');
let cors = require('cors');
const bodyParser = require('body-parser');
let zip = require('express-zip');

// En el index del router registramos los distintos archivos con endpoints (mantener formato)

let app = http2Express(express);
// Esto sirve para el manejo de archivo
app.use(fileUpload());
// Peticiones del mismo sv.
app.use(cors({
    origin: ["*", 'http://127.0.0.1:5500'],
    optionsSuccessStatus: 200
}));

// Forzar https
app.use(function (req, res, next) {
    res.setHeader('Strict-Transport-Security', 'max-age=28800; includeSubDomains; preload');
    res.setHeader('Cache-control', 'no-store');
    res.setHeader('Pragma', 'no-cache');
    next();
})

// Manejo previo de las request.
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
var wss;
router = require(__dirname + '/app/1-routes')(wss);
app.use('/api', router);

// Un Handler por defecto nos permite definir una interfaz de comunicación
// para que quien consume sepa el formato de response.
app.use(require('./app/utils/responseHandler'));

let port = process.env.PORT ? process.env.PORT : 9000;
// Inicializar WebSocket Server http
/*
const httpServer = app.listen(port, () => {
    console.log('Servidor HTTP escuchando en el puerto 9000');
    global.wss = initializeWebSocketServer(httpServer); // Inicializa el WebSocket Server
    // Ahora que el WebSocket Server está inicializado, pasa wss a tus rutas

});
*/
//------------HTTPS-----------//
const http2 = require('https');
let certificate = fs.readFileSync("/back/certs/cert.crt", 'utf8');

let privateKey = fs.readFileSync("/back/certs/key.key", 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

let httpsServer = http2.createServer(credentials, app);
httpsServer.listen(port, () => {
    console.log('Servidor HTTP escuchando en el puerto 9000');
    global.wss = initializeWebSocketServer(httpsServer ); // Inicializa el WebSocket Server
    // Ahora que el WebSocket Server está inicializado, pasa wss a tus rutas

});

//------------HTTPS-----------//
// Enrutamos los endpoints al módulo api.
// host/api/endpoints definidos en la carpeta route..

// Definimos la carpeta public como pública.
app.use('/public', express.static(__dirname + '/public'));
// Siempre dejo esta ruta que me permite probar el sv en el navegador rápidamente.
app.get('/', function (req, res) {
    res.send('hello world');
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>404! Page not found</h1>');
});
