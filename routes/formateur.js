
var express = require('express');
var router = express.Router();
const formateurController = require('../controllers/formateurController')

router.get('/',formateurController.getAll);
router.get('/:id', formateurController.getById )
router.get('/getBy/:Prenom', formateurController.getBy);
router.get('/getByNom/:Nom', formateurController.getByNom);
router.get('/getByEtudes_effectuees/:Etudes_effectuees', formateurController.getByEtudes_effectuees);
router.get('/getByExperiences/:Experiences', formateurController.getByExperiences);
router.get('/getByIdUser', formateurController.getByIdUser);
router.put('/:id/update', formateurController.update)
router.delete('/:id/delete', formateurController.delete)

module.exports = router;

