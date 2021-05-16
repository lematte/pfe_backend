var express = require('express');
var router = express.Router();
const Sections = require('../schemas/sections.schema')
/* GET users listing. */


router.get('/', async function (req, res, next) {
  const sections = await Sections.find({
    isVisible : "true"
  })
  res.send(sections);
});

router.post('/', async function(req , res , next){
  const {name , description } = req.body
  const newSection = await Sections.create({
    name, 
    description,
    createdAt : new Date()
  })
  res.send(newSection);
})

router.put('/', async function (req, res, next) {
  const { name, description, _id } = req.body
  const newSection = await Sections.findByIdAndUpdate(_id,
    {
      name,
      description
    }, { new: true })
  res.send(newSection);

})

router.delete('/', async function (req, res, next) {
  const { _id } = req.body
  const newSection = await Sections.findByIdAndUpdate(_id,
    {
      isVisible : false
    }, { new: true })
  res.send(newSection);

})


module.exports = router;
