const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.dbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('conexion a base de datos exitosa!');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos');
    }
}

module.exports = {
    dbConnection
}