var express = require('express');
var router = express.Router();
const salleController = require('../controllers/salleController')
    
router.get('/', salleController.getAll );
router.get('/getByIdCentre/:id', salleController.getByIdCentre)
router.post('/add', salleController.add )
router.get('/:id', salleController.getById )
router.put('/update/:id', salleController.update )
router.delete('/delete/:id', salleController.delete)

module.exports = router;
