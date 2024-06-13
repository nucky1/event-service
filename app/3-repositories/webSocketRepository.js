// repositories/webSocketRepository.js

const { kem } = require('node-forge');
const WebSocket = require('ws');

// Objeto para almacenar los clientes conectados por proyecto y código de evento
const connectedClients = {};

// Función para inicializar el WebSocket Server
const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        ws.user = { ip: req.socket.remoteAddress };

        ws.on('message', (message) => {
            handleMessage(JSON.parse(message), ws, wss);
        });

        ws.on('close', () => {
            removeClientFromGroups(ws);
        });
    });

    console.log('WebSocket Server initialized.');
    return wss;
};


// Función para manejar los mensajes recibidos
const handleMessage = (message, ws, wss) => {
    const { action, ...data } = message;
    switch (action) {
        case 'subscribe':
            subscribeUser(data, ws, wss);
            break;
        case 'unsubscribe':
            unsubscribeUser(data, ws, wss);
            break;
        case 'query':
            queryConnectedUsers(data, ws, wss);
            break;
        default:
            console.error('Unknown action:', action);
    }
};

// Función para suscribir un usuario a un proyecto y código de evento
const subscribeUser = (subscriptionData, ws, wss) => {
    const { proyecto, codigo, user } = subscriptionData;

    ws.user = {...ws.user, ...user};

    if (!connectedClients[proyecto]) {
        connectedClients[proyecto] = {};
    }

    if (!connectedClients[proyecto][codigo]) {
        connectedClients[proyecto][codigo] = new Set();
    }

    connectedClients[proyecto][codigo].add(ws);
    console.log('Usuario suscrito correctamente:', { proyecto, codigo, user: ws.user });
};

// Función para desuscribir un usuario de un proyecto y código de evento
const unsubscribeUser = (subscriptionData, ws, wss) => {
    const { proyecto, codigo } = subscriptionData;
    if (connectedClients[proyecto] && connectedClients[proyecto][codigo]) {
        connectedClients[proyecto][codigo].delete(ws);
        console.log('Usuario desuscrito correctamente:', subscriptionData);
    }
};

// Función para consultar los usuarios conectados a un proyecto y código de evento
const queryConnectedUsers = (queryData) => {
    const { proyecto, codigo } = queryData;
    let connectedUsers = [];  
    if (connectedClients[proyecto] && !codigo ) {
        Object.keys(connectedClients[proyecto]).map(key=>{
            connectedUsers.push(key,Array.from(connectedClients[proyecto][key]).map(ws=>ws.user))
        }) 
        console.log(connectedUsers)
    }
    if (connectedClients[proyecto] && connectedClients[proyecto][codigo]) {
        connectedUsers = Array.from(connectedClients[proyecto][codigo]).map(ws=>ws-user);
    }
    return connectedUsers;
};

// Función para eliminar un cliente desconectado de los grupos
const removeClientFromGroups = (ws) => {
    Object.keys(connectedClients).forEach((proyecto) => {
        Object.keys(connectedClients[proyecto]).forEach((codigo) => {
            connectedClients[proyecto][codigo].delete(ws);
        });
    });
};

// Función para publicar un evento
const publishEvent = (eventData, wss) => {
    const { proyecto, codigo, data } = eventData;
    const message = JSON.stringify({ codigo, data });
    wss.clients.forEach((client) => {
        client.send(message);
    });
    console.log('Evento publicado correctamente:', eventData);
};

module.exports = {
    initializeWebSocketServer,
    publishEvent,
    queryConnectedUsers,
};
