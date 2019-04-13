const db = require('better-sqlite3')('./database/mates_database.db3');

//#region QUERYS
const query_getAllPosts = '\
    SELECT      \
        *       \
    FROM        \
        posts   \
;';

const query_getPostById = '\
    SELECT      \
        *       \
    FROM        \
        posts   \
    WHERE       \
        id = ?  \
;';

const query_updateCuantities = '\
    UPDATE                                  \
        posts                               \
    SET                                     \
        mates = mates - @mates,             \
        bombillas = bombillas - @bombillas, \
        termos = termos - @termos           \
    WHERE                                   \
        id = @id                            \
;';

const query_makeInventory = '\
    UPDATE                              \
        posts                           \
    SET                                 \
        mates = @mates,                 \
        bombillas = @bombillas,         \
        termos =  @termos,              \
        yerba = @yerba,                 \
        lastInventory = date(\'now\')   \
    WHERE                               \
        id = @id                        \
;';
//#endregion

module.exports.getAllPosts = function(req, res, next) {
    try {
        const rows = db.prepare(query_getAllPosts).all();
        /** los items de rows ya tienen la forma correcta, el trabajo acá es bastante simple */
        res.json(rows).send();
    }
    catch (error) {
        next(error);
    }
};

/**
 * Funcion auxiliar para cambiar las cantidades de los equipos
 * No se hace manejo de errores porque los encargados de manejarlos son los lugares de donde se los llama */
module.exports.updateCuantities = function(postId, mates, bombillas, termos) {
    const info = db.prepare(query_updateCuantities).run({
        id: postId,
        mates: mates,
        bombillas: bombillas,
        termos: termos
    });

    if (!info.changes){
        error = new Error(); error.code = 7003;
        throw error;
    }
};

module.exports.makeInventory = function(req, res, next) {
    try {
        const info = db.prepare(query_makeInventory).run({
            id: req.body.id,
            mates: req.body.mates,
            bombillas: req.body.bombillas,
            termos: req.body.termos,
            yerba: req.body.yerba
        });

        if(!info.changes) {
            error = new Error(); error.code = 7004;
            throw error;
        }

        const row = db.prepare(query_getPostById).get(req.body.id);

        res.json(row).send();
    }
    catch (error) {
        next(error);
    }
}

/* NO NENEEE, la onda es hacer el ruteo en el router, no en el controlador, implementar ahí...
module.exports.putHandler = function(req, res, next) {
   if (!req.body.adminCredentials) {
       this.makeInventory(req, res, next);
   } else {
       res.write('Not implemented yet!').send();
   }
}
*/