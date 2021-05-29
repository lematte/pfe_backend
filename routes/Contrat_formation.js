var express = require('express');
var router = express.Router();
const contratformationController = require('../controllers/contrat_formationController')

router.get('/',contratformationController.getAll);
router.get('/:id', contratformationController.getById )
router.post('/add', contratformationController.add);
router.put('/:id/update', contratformationController.update)
router.delete('/:id/delete', contratformationController.delete)

module.exports = router;