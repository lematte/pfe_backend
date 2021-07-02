const Salle = require('../models/SalleModel')

module.exports.getAll = async (req, res, next) => 
{
    await Salle.find({
        isVisible : "true"
    }).sort({createdAt : -1})
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getById = (req, res, next) =>
{
    Salle.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.add =( req , res , next ) => 
{
    const newSalle = new Salle({
        Libelle : req.body.Libelle,  
        etat : req.body.etat,
        Formation: req.body.Formation,
        createdAt : new Date()
    })
    newSalle.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
    
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const salle =  Salle.findByIdAndUpdate( {_id : id},
    {
        Libelle : req.body.Libelle,  
        etat : req.body.etat,
        Formation: req.body.Formation
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
    const salle = Salle.findByIdAndUpdate({_id : id},
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
