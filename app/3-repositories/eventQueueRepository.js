const amqp = require('amqplib');

// URL de conexión a RabbitMQ
const rabbitMQUrl = 'amqp://localhost';

// Función para conectar con RabbitMQ
const connectToQueue = async () => {
    try {
        const connection = await amqp.connect(rabbitMQUrl);
        const channel = await connection.createChannel();
        // Declarar la cola de eventos
        await channel.assertQueue('eventQueue', { durable: true });
        return { connection, channel };
    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error);
        throw error;
    }
};

// Función para suscribir un usuario a eventos
const subscribeUser = async (userData, subscriptionData) => {
    try {
        const { connection, channel } = await connectToQueue();
        const { codes, proyecto } = subscriptionData;
        // Agregar lógica para suscribir al usuario a los eventos
        // Por ejemplo, publicar un mensaje en la cola con los códigos de evento y el proyecto
        await channel.sendToQueue('eventQueue', Buffer.from(JSON.stringify({ userData, codes, proyecto })));
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al suscribir usuario a eventos:', error);
        throw error;
    }
};

// Función para publicar un evento
const publishEvent = async (eventData) => {
    try {
        const { connection, channel } = await connectToQueue();
        const { codigo, data, proyecto } = eventData;
        // Agregar lógica para publicar el evento en la cola
        // Por ejemplo, publicar un mensaje en la cola con el código de evento, los datos y el proyecto
        await channel.sendToQueue('eventQueue', Buffer.from(JSON.stringify({ codigo, data, proyecto })));
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Error al publicar evento:', error);
        throw error;
    }
};

module.exports = {
    subscribeUser,
    publishEvent
};
