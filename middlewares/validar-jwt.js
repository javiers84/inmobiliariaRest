const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Error en el token'
        });
    }

    try {
        const { uid, user } = jwt.verify(token, process.env.llaveJWT);

        req.uid = uid;
        req.user = user;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido'
        });
    }
    next();
}

module.exports = {
    validarJWT
}