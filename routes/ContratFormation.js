var express = require('express');
var router = express.Router();
const contratformationController = require('../controllers/contratFormationController')

router.get('/',contratformationController.getAll);
router.get('/:id', contratformationController.getById )
router.get('/getByIdFormation/:id', contratformationController.getByIdFormation)
router.get('/getByIdCandidat/:id', contratformationController.getByIdCandidat)
router.get('/getByCandidat/:id/:Candidat', contratformationController.testCandidat);
router.get('/getByLibelle/:Libelle', contratformationController.getByLibelle)
router.get('/getBy/:id/:etat', contratformationController.getByEtat);
router.get('/getByCandidatEtat/:id/:etat', contratformationController.getByCandidatEtat);

//router.get('/getByIdFormationDemande/:id', contratformationController.getByIdFormationCDemander)
//router.get('/getByIdFormationAccepter/:id', contratformationController.getByIdFormationCAccepter)
//router.get('/getByIdFormationRejeter/:id', contratformationController.getByIdFormationCRejeter)

router.post('/add', contratformationController.add);
router.put('/update/:id', contratformationController.update)
router.post('/send', contratformationController.send)

router.delete('/delete/:id', contratformationController.delete)

module.exports = router;