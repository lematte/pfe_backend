const Categories = require("../models/CategoriesModel");

module.exports.getAll = async (req, res, next) => {
  await Categories.find({
    isVisible: "true",
  })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};



module.exports.add = ( req , res , next ) => 
{
    const newCategories = new Categories({
        libelle : req.body.libelle,
        type: req.body.type,
        createdAt : new Date()
    })
    newCategories.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

 
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const categories =  Categories.findByIdAndUpdate( {_id : id},
    {
        libelle : req.body.libelle,
        type : req.body.type,

    }, 
    { new: true })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}


module.exports.delete= (req, res, next)=> {
  const id = req.params.id;
  const categorie = Categories.findByIdAndUpdate({_id : id},
  {
    isVisible : false
  }, 
  { new: true })
  .then(data=> {
      res.json(data)
  }).catch(err=>{
      res.json(err)
  })
}

module.exports.getBy = async (req, res, next) => {
  const categorie = await Categories.find({
      isVisible : "true",
    $or: [
      {libelle: {$regex: req.params.libelle, $options: 'i'}},
      //{type: {$regex: req.params.type, $options: 'i'}},
    ],
  })
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Categories.findById({_id: req.params.id})
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
};

module.exports.getByType = async (req, res, next) => {
  const categorie = await Categories.find({
      isVisible : "true",
    $or: [
     // {libelle: {$regex: req.params.libelle, $options: 'i'}},
      {type: {$regex: req.params.type, $options: 'i'}},
    ],
  })
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};