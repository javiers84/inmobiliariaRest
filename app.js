const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const { sendMail } = require('./config/mail');

require('dotenv').config();

// const config = require('./config');
const { dbConnection } = require("./db/config");

const app = express();
const router = express.Router();

dbConnection();

app.use(cors());
app.use(methodOverride());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '2048mb' }));
app.use(express.static('public'));

// app.use(process.env.path, express.static(__dirname + "public/upload/"));
app.use(express.static(__dirname + '/public/upload'));

// app.use('/api', require('./routes/auth'));
app.use('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, PATCH, POST, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization');
    next();
});

app.listen(process.env.PORT, () => {
    console.log(`Server corriendo en puerto ${process.env.PORT}`);
});

///// ROUTES USUARIOS
app.use('/api/auth', require('./routes/userRoutes'));

///// ROUTES PROPIEDADES
app.use('/api/propiedades', require('./routes/propiedadesRoutes'));

///// ROUTES ADMINISTRACIONES
app.use('/api/administraciones', require('./routes/administracionRoutes'));

///// ROUTES CARTELES
app.use('/api/carteles', require('./routes/cartelesRoutes'));

///// ROUTES CLIENTES
app.use('/api/clientes', require('./routes/clienteRoutes'));

///// ROUTES SLIDER
app.use('/api/slider', require('./routes/sliderRoutes'));

///// ROUTES ROLES
app.use('/api/roles', require('./routes/rolesRoutes'));

///// ENVIO DE CORREO
app.use('/api/mail', require('./routes/mail'));

app.use(router);