const Evaluation = require('../models/EvaluationModel')

module.exports.getAll = async (req, res, next) => 
{
    await Evaluation.find({
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
    Evaluation.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.add =( req , res , next ) => 
{
    const newEvaluation = new Evaluation({
        Libelle : req.body.Libelle,
        Formation: req.body.Formation,
        Candidat: req.body.Candidat,
        createdAt : new Date()
    })
    newEvaluation.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
    
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const evaluation =  Evaluation.findByIdAndUpdate( {_id : id},
    {
        Libelle : req.body.Libelle
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
    const evaluation = Evaluation.findByIdAndUpdate({_id : id},
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
