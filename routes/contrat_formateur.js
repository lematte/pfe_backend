var express = require('express');
var router = express.Router();
const Contrat_formateurController = require('../controllers/contrat_formateurController')

router.get('/',Contrat_formateurController.getAll);
router.post('/add', Contrat_formateurController.add);
router.get('/centre/:id', Contrat_formateurController.getByIdCenter);
router.get('/:id', Contrat_formateurController.getById )
router.put('/:id/update', Contrat_formateurController.update)
router.delete('/:id/delete', Contrat_formateurController.delete)

module.exports = router;
  