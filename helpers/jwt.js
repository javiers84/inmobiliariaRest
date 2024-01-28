const jwt = require('jsonwebtoken');

const generarJWT = (uid, user) => {
    const payload = { uid, user };

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.llaveJWT, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                reject('Error al generar el token');
            } else {
                resolve(token);
            }
        });

    });
}

module.exports = {
    generarJWT
}