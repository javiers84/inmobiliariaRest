const { response } = require('express');
const nodemailer = require('nodemailer');


module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: gmail,
        auth: {
            user: 'makako84@gmail.com',
            pass: 'reyvaj++1984'
        }
    });

    // var transporter = nodemailer.createTransport({
    //     "host": "smtp.gmail.com",
    //     "port": "465",
    //     "secure": false,
    //     "auth": {
    //         "type": "login",
    //         "user": "makako84@gmail.com",
    //         "pass": "reyvaj++1984"
    //     }
    // });

    const mailOption = {
        from: `${formulario.nombre} <${formulario.correo}>`,
        to: 'jorgemarinoinmobiliaria@gmail.com',
        subject: 'Consulta desde la AppWeb',
        html: `
            <strong>Nombre: </strong> ${formulario.nombre} <br/>
            <strong>Apellido: </strong> ${formulario.apellido} <br/>
            <strong>Telefono: </strong> ${formulario.telefono} <br/>
            <strong>Mensaje: </strong> ${formulario.consulta} <br/>
        `
    };

    transporter.sendMail(mailOption, function(err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}