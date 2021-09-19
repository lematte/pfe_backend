var express = require('express');
var router = express.Router();
const CentreformationController = require('../controllers/centre_formationController')
const uploadContratFormation = require('../middleware/contratFormation')

router.get('/',CentreformationController.getAll);
router.get('/getBy/:Nom_centre', CentreformationController.getBy);
//router.get('/getVille/:Ville', CentreformationController.getVille)
router.get('/getByCode_postal/:Code_postal', CentreformationController.getByCode_postal)
router.get('/getByIdUser/:id', CentreformationController.getByIdUser);
router.get('/:id', CentreformationController.getById) 
router.put('/:id/update', CentreformationController.update)
router.delete('/:id/delete', CentreformationController.deletecentre)
router.post('/uploadDocument_Juridique/:id',uploadContratFormation, CentreformationController.uploadDocument_Juridique)

module.exports = router;
  