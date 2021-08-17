var express = require('express');
var router = express.Router();
const CentreformationController = require('../controllers/centre_formationController')

router.get('/',CentreformationController.getAll);
router.get('/getBy/:Nom_centre', CentreformationController.getBy);
//router.get('/getVille/:Ville', CentreformationController.getVille)
router.get('/getByIdUser/:id', CentreformationController.getByIdUser);
router.get('/:id', CentreformationController.getById)
router.put('/:id/update', CentreformationController.update)
router.delete('/:id/delete', CentreformationController.deletecentre)

module.exports = router;
  