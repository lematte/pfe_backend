var express = require('express');
var router = express.Router();
const contratformationController = require('../controllers/contrat_formationController')

router.get('/',contratformationController.getAll);
router.get('/:id', contratformationController.getById )
router.get('/getByIdFormation/:id', contratformationController.getByIdFormation)

router.get('/getByIdFormationDemande/:id', contratformationController.getByIdFormationCDemander)
router.get('/getByIdFormationAccepter/:id', contratformationController.getByIdFormationCAccepter)
router.get('/getByIdFormationRejeter/:id', contratformationController.getByIdFormationCRejeter)
router.get('/getBy/:id/:etat', contratformationController.getByEtat);

router.post('/add', contratformationController.add);
router.put('/update/:id', contratformationController.update)
router.delete('/delete/:id', contratformationController.delete)

module.exports = router;