var express = require('express');
var router = express.Router();
const examenController = require('../controllers/examenController')
const upload = require('../middleware/contratFormation')

router.get('/', examenController.getAll );
router.post('/add', examenController.add )
router.get('/:id', examenController.getById )
router.put('/update/:id', examenController.update )
router.delete('/delete/:id', examenController.delete)
router.get('/getByIdFormation/:id', examenController.getExamenByIdFormation);
router.get('/getExamenByIdCandidat_Formation/:id/:Candidat', examenController.getExamenByIdCandidat_Formation);
router.post('/upload/:id',upload, examenController.uploadDescription)

module.exports = router;
