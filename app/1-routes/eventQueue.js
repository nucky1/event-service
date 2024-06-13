// routes/eventQueue.js

const { publishEvent, queryConnectedUsers } = require('../3-repositories/webSocketRepository');

module.exports = (router) => {
    // Ruta para publicar un evento
    router.post('/publish', async (req, res) => {
        try {
            const eventData = req.body;
            if(!wss){
                return res.status(500).json({ success: false, error: 'Error al publicar evento.' });
            }
            publishEvent(eventData, wss);
            res.status(200).json({ success: true, message: 'Evento publicado correctamente.' });
        } catch (error) {
            console.error('Error al publicar evento:', error);
            res.status(500).json({ success: false, error: 'Error al publicar evento.' });
        }
    });

    // Ruta para consultar usuarios conectados
    router.get('/query', async (req, res) => {
        try {
            const queryData = req.query;
            const connectedUsers = queryConnectedUsers(queryData);
            res.status(200).json({ success: true, connectedUsers });
        } catch (error) {
            console.error('Error al consultar usuarios conectados:', error);
            res.status(500).json({ success: false, error: 'Error al consultar usuarios conectados.' });
        }
    });
};
