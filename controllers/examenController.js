const Examen = require('../models/ExamenModel')

module.exports.getAll = async (req, res, next) => 
{
    await Examen.find({
        isVisible : "true"
    }).sort({createdAt : -1})
    .populate("Formation")
    .populate("Candidat")
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getById = (req, res, next) =>
{
    Examen.findById({ _id : req.params.id })
    .sort({createdAt : -1})
    .populate("Formation")
    .populate("Candidat")
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getExamenByIdFormation = async (req, res, next) => {
    await Examen.find({
        isVisible : "true",
        Formation: req.params.id
        //,Candidat: req.params.Candidat
     })
    .populate("Formation")
    .populate("Candidat")
    .then((data) => {
    res.json(data);
    })
    .catch((err) => {
    res.json(err);
    });
  };

module.exports.add =( req , res , next ) => 
{
    const newexamen = new Examen({
        Libelle : req.body.Libelle,
        Description : req.body.Description,
        Note: req.body.Note,
        Remarque:req.body.Remarque,
        Formation: req.body.Formation,
        Candidat: req.body.Candidat,
        createdAt : new Date()
    })
    newexamen.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
    
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const user =  Examen.findByIdAndUpdate( {_id : id},
    {
        Libelle : req.body.Libelle,
        Description : req.body.Description,
        Note: req.body.Note,
        Remarque:req.body.Remarque,
        Formation: req.body.Formation,
        Candidat: req.body.Candidat,
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
    const examen = Examen.findByIdAndUpdate({_id : id},
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
