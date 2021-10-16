var express = require('express');
var router = express.Router();
const formationController = require('../controllers/formationController')
const uploadIFormation = require('../middleware/ImageFormation')
const uploadContratFormation = require('../middleware/contratFormation')
  


router.get('/', formationController.getAll);
router.get('/getByIdCentre/:id', formationController.getByIdCentre)
router.get('/getByIdFormateur/:id', formationController.getByIdFormateur)
router.get('/getByNameAndIdFormateur/:id/:Libelle', formationController.getByNameandIdFormateur)
router.get('/getByIdCategories/:id', formationController.getByIdCategories)
router.get('/getByName/:Libelle', formationController.getByName)
router.get('/getBy/:id/:Statut', formationController.getByCentreStatut)

router.post('/add', formationController.add)
router.get('/:id', formationController.getById)
router.put('/update/:id', formationController.update)
router.delete('/delete/:id', formationController.delete)

router.post('/uploadImage/:id',uploadIFormation, formationController.uploadImageF)
router.post('/uploadContrat/:id',uploadContratFormation, formationController.uploadContratF)

module.exports = router;
