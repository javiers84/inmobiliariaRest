const roles = require('./models/roles');

const crearRoles = async() => {
    try {

        const contadorRoles = await roles.estimatedDocumentCount();

        if (contadorRoles > 0) return;

        const values = await Promise.all([
            new roles({ nombre: 'administrador' }).save(),
            new roles({ nombre: 'empleado' }).save(),
            new roles({ nombre: 'vendedor' }).save(),
            new roles({ nombre: 'usuario' }).save()
        ]);

        console.log(values)

    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    crearRoles
}