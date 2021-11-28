var express = require('express');
var router = express.Router();
const evaluationController = require('../controllers/evaluationController')
    
router.get('/', evaluationController.getAll);
router.get('/:id', evaluationController.getById )
router.get('/formation/:id', evaluationController.getByIdFormation )
router.get('/candidat/:id/:Formation', evaluationController.getByIdEvalCandidatFormation)
router.get('/candidat/:id', evaluationController.getByIdEvalbyIdCandidat)
router.post('/add', evaluationController.add)
router.put('/update/:id', evaluationController.update )
router.delete('/delete/:id', evaluationController.delete)

module.exports = router;
