const sqlite3ErrorCodes = require('../database/sqlite3ErrorCodes');

module.exports.handle = function(error, req, res, next) {
    let intercepted = false;

    switch (error.code) {
        case sqlite3ErrorCodes.SQLITE_CONSTRAINT_PRIMARYKEY: {
            /* La unica clave primaria que puede fallar acá es la de las facultades */
            error.customInfo = {
                message: 'la facultad indicada no existe'
            }; intercepted = true;

            break;
        }

        case 7001: {
            // No dni param in req url (put - delete)
            error.customInfo = {
                message: 'debe especificar un dni'
            }; intercepted = true;

            break;
        }
    }

    next(error);
}