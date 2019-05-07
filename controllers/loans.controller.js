const db = require('better-sqlite3')('./database/mates_database.db3');

//#region QUERYS
const query_selectAll = '\
    SELECT                                                  \
        loans.*,                                            \
        clients.dni AS clientDni,                           \
        clients.name AS clientName,                         \
        clients.lastName AS clientLastName,                 \
        clients.dateRegistered AS clientDateRegistered,     \
        clients.active AS clientActive,                     \
        facultades.id AS facultadId,                        \
        facultades.name AS facultadName,                    \
        posts_g.id AS postGivenId,                          \
        posts_g.name AS postGivenName,                      \
        posts_r.id AS postRecivedId,                        \
        posts_r.name AS postRecivedName                     \
    FROM                                                    \
        loans                                               \
        LEFT OUTER JOIN                                     \
            clients                                         \
        ON                                                  \
            loans.client = clients.dni                      \
        LEFT OUTER JOIN                                     \
            facultades                                      \
        ON                                                  \
            clients.facultad = facultades.id                \
        LEFT OUTER JOIN                                     \
            posts AS posts_g                                \
        ON                                                  \
            loans.postGiven = posts_g.id                    \
        LEFT OUTER JOIN                                     \
            posts AS posts_r                                \
        ON                                                  \
            loans.postRecived = posts_r.id                  \
;';

const query_selectById = '\
    SELECT                                                  \
        loans.*,                                            \
        clients.dni AS clientDni,                           \
        clients.name AS clientName,                         \
        clients.lastName AS clientLastName,                 \
        clients.dateRegistered AS clientDateRegistered,     \
        clients.active AS clientActive,                     \
        facultades.id AS facultadId,                        \
        facultades.name AS facultadName,                    \
        posts_g.id AS postGivenId,                          \
        posts_g.name AS postGivenName,                      \
        posts_r.id AS postRecivedId,                        \
        posts_r.name AS postRecivedName                     \
    FROM                                                    \
        loans                                               \
        LEFT OUTER JOIN                                     \
            clients                                         \
        ON                                                  \
            loans.client = clients.dni                      \
        LEFT OUTER JOIN                                     \
            facultades                                      \
        ON                                                  \
            clients.facultad = facultades.id                \
        LEFT OUTER JOIN                                     \
            posts AS posts_g                                \
        ON                                                  \
            loans.postGiven = posts_g.id                    \
        LEFT OUTER JOIN                                     \
            posts AS posts_r                                \
        ON                                                  \
            loans.postRecived = posts_r.id                  \
        WHERE                                               \
            loans.id = ?                                    \
            ;';

const query_createNew = '\
    INSERT INTO             \
        loans               \
    VALUES                  \
        (                   \
            null,           \
            @client,        \
            @mates,         \
            @bombillas,     \
            @termos,        \
            @yerba,         \
            0,              \
            0,              \
            0,              \
            @postGiven,     \
            null,           \
            date(\'now\'),  \
            null            \
        )                   \
;';

const query_reciveLoan = '\
    UPDATE                                  \
        loans                               \
    SET                                     \
        matesBack = @matesBack,             \
        bombillasBack = @bombillasBack,     \
        termosBack = @termosBack,           \
        dateRecived = date(\'now\'),        \
        postRecived = @postRecived          \
    WHERE                                   \
        id = @id                            \
;';
//#endregion

/**
 * Mapea un row develto por un query SELECT(a la tabla loans) 
 * hacia un objeto loan
 * @param {*} row 
 */
const mapRowToLoan = function(row) {
    return {
        id: row.id,
        client: {
            dni: row.clientDni,
            name: row.clientName,
            lastName: row.clientLastName,
            facultad: {
                id: row.facultadId,
                name: row.facultadName
            },
            dateRegistered: row.clientdateRegistered,
            active: row.active
        },
        mates: row.mates,
        bombillas: row.bombillas,
        termos: row.termos,
        yerba: row.yerba,
        matesBack: row.matesBack,
        bombillasBack: row.bombillasBack,
        termosBack: row.termosBack,
        postGiven: (row.postGivenId) ? {
            id: row.postGivenId,
            name: row.postGivenName
        } : null,
        postRecived: (row.postRecivedId) ? {
            id: row.postRecivedId,
            name: row.postRecivedName
        } : null,
        dateGiven: row.dateGiven,
        dateRecived: row.dateReturned
    }
}


/**
 * Devuelve todos los prestamos. 
 * (A implementar: Debería devolver solo los "mas recientes")
 */
module.exports.getAll = function(req, res, next) {
    try {
        const result = db.prepare(query_selectAll).all();
        const loans = result.map((row) => mapRowToLoan(row));

        res.json(loans);

    } catch(error) {
        next(error);
    }
}

/**
 * Crea un nuevo prestamo
 */
module.exports.newLoan = function(req, res, next) {
    try {
        /* Mandando query a la base de datos y guardando la info con los cambios realizados*/
        const info = db.prepare(query_createNew).run(
            {
                client: req.body.client,
                mates: req.body.mates,
                bombillas: req.body.bombillas,
                termos: req.body.termos,
                yerba: req.body.yerba,
                postGiven: req.body.postGiven
            }
        );

        if(info.changes) {
            /*
            Se realizaron cambios,
            Mapeando el prestamo recien creado */
            const loan = mapRowToLoan(
                db.prepare(query_selectById).get(info.lastInsertRowid)
            );

            res.json(loan);
        } else { throw new Error('No se agrgo el prestamo, algo salio mal'); }
    }
    catch (error) {
        next(error);
    }
}
/**
 * Recibe la informacion del prestamo entregado, actualiza la base de datos y responde */
module.exports.reciveLoan = function(req, res, next) {
    try {
        const info = db.prepare(query_reciveLoan).run(
            {
                id: req.body.id,
                matesBack: req.body.matesBack,
                bombillasBack: req.body.bombillasBack,
                termosBack: req.body.termosBack,
                postRecived: req.body.postRecived
            }
        );

        if(info.changes) {
            /*
            Todo ok, se actualizo el prestamo.
            Ahora se busca y se envia el prestamo actualizado */
            const loan = mapRowToLoan(db.prepare(query_selectById).get(req.body.id));

            res.json(loan);
        }
        else { throw new Error('No se recibio el prestamo, algo salio mal') }
    }
    catch (error) {
        next(error);
    }
}