var express = require('express');
var router = express.Router();
const certificatController = require('../controllers/certificatController')
    
router.get('/', certificatController.getAll );
router.post('/add', certificatController.add )
router.get('/:id', certificatController.getById )
router.put('/:id/update', certificatController.update )
router.delete('/:id/delete', certificatController.delete)

module.exports = router;
