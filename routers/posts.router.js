const router = require('express').Router();
const controller = require('../controllers/posts.controller');
const errorHandler = require('../controllers/posts.errorHandler');

router.get('/puestos', controller.getAllPosts);

router.put('/puestos', controller.makeInventory);

router.use(errorHandler.handle);

module.exports = router;