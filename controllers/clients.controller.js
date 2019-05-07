const db = require('better-sqlite3')('./database/mates_database.db3');
const sqlite3ErrorCodes = require('../database/sqlite3ErrorCodes');

//#region QUERYS
const query_selectAll = '\
    SELECT                                      \
        clients.*,                              \
        facultades.id AS facultadId,            \
        facultades.name AS facultadName         \
    FROM                                        \
        clients                                 \
        LEFT OUTER JOIN                         \
            facultades                          \
        ON                                      \
            clients.facultad = facultades.id    \
    WHERE                                       \
        active = true                           \
;';

const query_selectByDni = '\
    SELECT                                      \
        clients.*,                              \
        facultades.id AS facultadId,            \
        facultades.name AS facultadName         \
    FROM                                        \
        clients                                 \
        LEFT OUTER JOIN                         \
            facultades                          \
        ON                                      \
            clients.facultad = facultades.id    \
    WHERE                                       \
        dni = ?                                 \
;';

const query_createNew = '\
    INSERT INTO             \
        clients             \
    VALUES                  \
        (                   \
            @dni,           \
            @name,          \
            @lastName,      \
            @facultad,      \
            date(\'now\'),  \
            true            \
        )                   \
;';

const query_activateClient = '\
    UPDATE              \
        clients         \
    SET                 \
        active = true   \
    WHERE               \
        dni = ?         \
;';

const query_updateClient = '\
    UPDATE                      \
        clients                 \
    SET                         \
        dni = @newDni,          \
        name = @name,           \
        lastName = @lastName,   \
        facultad = @facultad    \
    WHERE                       \
        dni = @dni              \
;';

const query_deleteClient = '\
    UPDATE              \
        clients         \
    SET                 \
        active = false  \
    WHERE               \
        dni = ?         \
;';
//#endregion

module.exports.getAll = function(req, res, next) {
    try {
        const result = db.prepare(query_selectAll).all();
        const clients = result.map((row) => {
            return {
                dni: row.dni,
                name: row.name,
                lastName: row.lastName,
                facultad: {
                    id: row.facultadId,
                    name: row.facultadName
                },
                dateRegistered: row.dateRegistered,
                active: row.active
            };
        });

        res.json(clients);
    }
    catch(error) {
        next(error);
    }
}

module.exports.createNew = function(req, res, next) {
    const clientToInsert = {
        dni: req.body.dni,
        name: req.body.name,
        lastName: req.body.lastName,
        facultad: req.body.facultad
    }
    
    try {
        const query = db.prepare(query_createNew);

        try {
            query.run(clientToInsert);
        } catch (error) {
            /*
            Se busca el error de dni repetido,
            si es el caso, no es un error, solo hay que dar de alta el cliente */
            if(error.code = sqlite3ErrorCodes.SQLITE_CONSTRAINT_PRIMARYKEY)
                db.prepare(query_activateClient).run(clientToInsert.dni);
            else
                throw error;
        }
        
        const row = db.prepare(query_selectByDni).get(clientToInsert.dni);

        res.json(
            {
                dni: row.dni,
                name: row.name,
                lastName: row.lastName,
                facultad: {
                    id: row.facultadId,
                    name: row.facultadName
                },
                dateRegistered: row.dateRegistered,
                active: row.active
            }
        );
    }
    catch (error) {
        next(error);
    }
}

module.exports.update = function(req, res, next) {
    try {
        const info = db.prepare(query_updateClient).run({
            newDni: req.query.dni,
            dni: req.body.dni,
            name: req.body.name,
            lastName: req.body.lastName,
            facultad: req.body.facultad
        });
        
        if(info.changes) {
            /* Se realizaron cambios */
            const row = db.prepare(query_selectByDni).get(req.body.dni);

            /* Mapeo del objeto row a un cliente */
            res.json(
                {
                    dni: row.dni,
                    name: row.name,
                    lastName: row.lastName,
                    facultad: {
                        id: row.facultadId,
                        name: row.facultadName
                    },
                    dateRegistered: row.dateRegistered,
                    active: row.active
                }
            );
        } else {
            /*
             * El cliente no fue actualizado por alguna razón,
             * Ver cada cuanto ocurre y si va a ocurrir siquiera
             * (Puede pasar que haya un error con la base de datos así que lo dejamos nomás)
             */
            error = new Error(); error.code = 7002;
            throw error;
        }
    }
    catch (error) {
        next(error);
    }
}

module.exports.delete = function(req, res, next) {
    try {
        const info = db.prepare(query_deleteClient).run(req.query.dni);
        
        if(info.changes){
            res.json({ dni: req.query.dni });
        } else {
            throw new Error('No se borro ningun cliente');
        }
    }
    catch (error) {
        next(error);
    }
}