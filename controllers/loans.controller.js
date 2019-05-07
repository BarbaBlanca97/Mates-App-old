const db = require('better-sqlite3')('./database/mates_database.db3');

//#region QUERYS
const query_selectAll = '\
    SELECT                                                  \
        loans.*,                                            \
        clients.dni AS clientDni,                            \
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
            loans.client = clients.dni                       \
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