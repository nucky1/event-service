const jwt = require('jsonwebtoken');
const WebSocket = require('ws');
const { WS_TOKEN_SECRET } = require('../constants/authConstant');

// Función para inicializar el WebSocket Server
const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws, req) => {
        const token = req.url.split('token=')[1];
        if (!token) {
            ws.close(1008, 'Token no proporcionado');
            return;
        }

        jwt.verify(token, WS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                ws.close(1008, 'Token inválido');
                return;
            }

            ws.user = { ...decoded, ip: req.socket.remoteAddress };

            subscribeUser({action:'suscribe',...decoded}, ws, wss);
            ws.on('message', (message) => {
                handleMessage(JSON.parse(message), ws, wss);
            });

            ws.on('close', () => {
                removeClientFromRooms(ws, wss);
            });
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
    const { proyecto, codigos } = subscriptionData;
    ws.rooms = ws.rooms || new Set();
    for (const codigo of codigos) {
        const room = `${proyecto}:${codigo}`;
        ws.rooms.add(room);        
    }
    wss.clients.forEach(client => {
        if (client === ws) {
            client.rooms = ws.rooms;
        }
    });

    console.log('Usuario suscrito correctamente:', { proyecto, codigos, user: ws.user });
};

// Función para desuscribir un usuario de un proyecto y código de evento
const unsubscribeUser = (subscriptionData, ws, wss) => {
    const { proyecto, codigos } = subscriptionData;
    ws.rooms = ws.rooms || new Set();
    for (const codigo of codigos) {
        const room = `${proyecto}:${codigo}`;
        ws.rooms.add(room);    
        if (ws.rooms) {
            ws.rooms.delete(room);
        }
        
    } 
    wss.clients.forEach(client => {
        if (client === ws) {
            client.rooms = ws.rooms;
        }
    });

    console.log('Usuario desuscrito correctamente:', subscriptionData);
};

// Función para consultar los usuarios conectados a un proyecto y código de evento
const queryConnectedUsers = (queryData, ws, wss) => {
    const { proyecto, codigo } = queryData;
    let connectedUsers = [];

    const room = codigo ? `${proyecto}:${codigo}` : proyecto;

    wss.clients.forEach(client => {
        if (client.rooms && client.rooms.has(room)) {
            connectedUsers.push(client.user);
        }
    });

    return connectedUsers;
};

// Función para eliminar un cliente desconectado de los grupos
const removeClientFromRooms = (ws, wss) => {
    if (ws.rooms) {
        ws.rooms.forEach(room => {
            wss.clients.forEach(client => {
                if (client === ws) {
                    client.rooms.delete(room);
                }
            });
        });
    }
};

// Función para publicar un evento
const publishEvent = (eventData, wss) => {
    const { proyecto, codigo, data, codigos } = eventData;
    if(codigo){
        const room = `${proyecto}:${codigo}`;
        const message = JSON.stringify({ codigo, data });

        wss.clients.forEach(client => {
            if (client.rooms && client.rooms.has(room)) {
                client.send(message);
            }
        });
    }
    if(codigos && codigos.length > 0){
        for (const codigo of codigos) {    
            const room = `${proyecto}:${codigo}`;
            const message = JSON.stringify({ codigo, data });

            wss.clients.forEach(client => {
                if (client.rooms && client.rooms.has(room)) {
                    client.send(message);
                }
            });
        }
    }

    console.log('Evento publicado correctamente:', eventData);
};

module.exports = {
    initializeWebSocketServer,
    publishEvent,
    queryConnectedUsers,
};
