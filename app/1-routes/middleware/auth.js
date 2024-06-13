const jwt = require('jsonwebtoken');
const JWT_SECRET = 'tu_clave_secreta_para_jwt';

const verifyToken = async (req, res, next) => {
    try {
        // Evitar que se guarde caché en todas las rutas que requieren token
        res.header('Cache-control', 'no-store');
        res.header('Pragma', 'no-cache');

        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Token de autorización no proporcionado' });
        }

        const token = req.headers.authorization.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Token de autorización no proporcionado' });
        }

        const verified = jwt.verify(token, JWT_SECRET);
        req.user = JSON.parse(JSON.stringify(verified)); 
        req.user.ip = req.ip.split(":").pop();
        next(); // Continuamos
    } catch (error) {
        return res.status(401).json({ message: 'Token de autorización inválido o expirado' });
    }
};

module.exports = verifyToken;
