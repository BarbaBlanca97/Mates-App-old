const router = require('express').Router();
const controller = require('../controllers/clients.controller');
const errorHandler = require('../controllers/clients.errorHandler');

// Set up the routes with their respective controller method
router.get('/clientes', controller.getAll);

router.post('/clientes', controller.createNew);

router.put('/clientes', controller.update);

router.delete('/clientes', controller.delete);

// Hooking up error-parser middleware
router.use(errorHandler.handle);

module.exports = router;