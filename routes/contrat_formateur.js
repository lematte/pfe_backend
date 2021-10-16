var express = require('express');
var router = express.Router();
const Contrat_formateurController = require('../controllers/contrat_formateurController')
const uploadContrat = require('../middleware/contratFormation')

router.get('/',Contrat_formateurController.getAll);
router.post('/add', Contrat_formateurController.add);
router.get('/centre/:id', Contrat_formateurController.getByIdCenter);
router.get('/formateur/:id', Contrat_formateurController.getContrat_formateurByIdFormateur);
router.get('/:id', Contrat_formateurController.getById )
router.put('/update/:id', Contrat_formateurController.update)
router.delete('/delete/:id', Contrat_formateurController.delete)
router.post('/uploadContrat/:id',uploadContrat, Contrat_formateurController.uploadContrat_formateur)

module.exports = router;
  