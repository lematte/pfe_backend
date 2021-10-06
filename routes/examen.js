var express = require('express');
var router = express.Router();
const examenController = require('../controllers/examenController')
    
router.get('/', examenController.getAll );
router.post('/add', examenController.add )
router.get('/:id', examenController.getById )
router.put('/update/:id', examenController.update )
router.delete('/:id/delete', examenController.delete)
router.get('/getByIdFormation/:id', examenController.getExamenByIdFormation);

module.exports = router;
