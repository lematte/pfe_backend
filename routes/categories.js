var express = require('express');
var router = express.Router();
const CategoriesController = require('../controllers/categoriesController')
    
router.get('/', CategoriesController.getAll);
router.post('/add', CategoriesController.add )
router.get('/:type', CategoriesController.getByType)
router.get('/:libelle', CategoriesController.getBy )
router.put('/update/:id', CategoriesController.update )
router.delete('/delete/:id', CategoriesController.delete)

module.exports = router;
