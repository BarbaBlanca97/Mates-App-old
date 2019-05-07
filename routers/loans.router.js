const router = require('express').Router();
const controller = require('../controllers/loans.controller');
const errorHandler = require('../controllers/loans.errorHandler');

router.get('/prestamos', controller.getAll);

router.post('/prestamos', controller.newLoan);

router.use(errorHandler.handle);

module.exports = router;