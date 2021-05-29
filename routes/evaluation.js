var express = require('express');
var router = express.Router();
const evaluationController = require('../controllers/evaluationController')
    
router.get('/', evaluationController.getAll);
router.get('/:id', evaluationController.getById )
router.post('/add', evaluationController.add)
router.put('/:id/update', evaluationController.update )
router.delete('/:id/delete', evaluationController.delete)

module.exports = router;
