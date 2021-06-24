
var express = require('express');
var router = express.Router();
const formateurController = require('../controllers/formateurController')

router.get('/',formateurController.getAll);
router.get('/:id', formateurController.getById )
router.get('/getByIdUser', formateurController.getByIdUser);
router.put('/:id/update', formateurController.update)
router.delete('/:id/delete', formateurController.delete)

module.exports = router;

