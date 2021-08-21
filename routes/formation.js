var express = require('express');
var router = express.Router();
const formationController = require('../controllers/formationController')
  

router.get('/', formationController.getAll);
router.get('/getByIdCentre/:id', formationController.getByIdCentre)
router.get('/getByName/:Libelle', formationController.getByName)
router.post('/add', formationController.add)

router.get('/:id', formationController.getById)
router.put('/update/:id', formationController.update)
router.delete('/delete/:id', formationController.delete)


module.exports = router;
