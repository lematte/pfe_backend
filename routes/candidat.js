var express = require('express');
var router = express.Router();
const candidatController = require('../controllers/candidatController')

router.get('/',candidatController.getAll);
router.get('/:id', candidatController.getById )
router.get('/getByIdUser/:id', candidatController.getByIdUser);
router.put('/update/:id', candidatController.update)
router.delete('/:id/delete', candidatController.delete)

module.exports = router