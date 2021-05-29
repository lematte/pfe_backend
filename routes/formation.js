var express = require('express');
var router = express.Router();
const formationController = require('../controllers/formationController')
    
router.get('/', formationController.getAll);
router.post('/add', formationController.add)
router.get('/:id', formationController.getById)
router.put('/:id/update', formationController.update)
router.delete('/:id/delete', formationController.delete)

module.exports = router;
