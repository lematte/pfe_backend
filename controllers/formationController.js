const Formation = require('../models/FormationModel')

module.exports.getAll = async (req, res, next) => 
{
    await Formation.find({
        isVisible : "true"
    }).sort({createdAt : -1})
    .populate('Formateur')
    .populate('Centre_formation')
    .populate('Examen')
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getById = (req, res, next) =>
{
    Formation.findById({ _id : req.params.id })
    .populate('Formateur')
    .populate('Centre_formation')
    .populate('Examen')
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.add =( req , res , next ) => 
{
    const newFormation = new Formation({
        Libelle : req.body.Libelle,
        Durrée : req.body.Durrée,
        Type : req.body.Type,
        Date : req.body.Date,
        Heure: req.body.Heure,
        Description: req.body.Description,
        Prix: req.body.Prix,
        Formateur: req.body.Formateur,
        Centre_formation: req.body.Centre_formation,
        Examen: req.body.Examen,
        createdAt : new Date()
    })
    newFormation.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
    
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const formation =  Formation.findByIdAndUpdate( {_id : id},
    {
        Libelle : req.body.Libelle,
        Durrée : req.body.Durrée,
        Type : req.body.Type,
        Date : req.body.Date,
        Heure: req.body.Heure,
        Description: req.body.Description,
        Prix: req.body.Prix,
        Formateur: req.body.Formateur,
        Examen: req.body.Examen
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
    const formation = Formation.findByIdAndUpdate({_id : id},
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
