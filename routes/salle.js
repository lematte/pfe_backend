var express = require('express');
var router = express.Router();
const salleController = require('../controllers/salleController')
    
router.get('/', salleController.getAll );
router.post('/add', salleController.add )
router.get('/:id', salleController.getById )
router.put('/:id/update', salleController.update )
router.delete('/:id/delete', salleController.delete)

module.exports = router;
