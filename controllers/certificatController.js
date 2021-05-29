const Certificat = require('../models/CertificatModel')

module.exports.getAll = async (req, res, next) => 
{
    await Certificat.find({
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
    Certificat.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.add = ( req , res , next ) => 
{
    const newCertificat = new Certificat({
        Libelle : req.body.Libelle,
        Formation: req.body.Formation,
        createdAt : new Date()
    })
    newCertificat.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
    
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const certificat =  Certificat.findByIdAndUpdate( {_id : id},
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
    const certificat = Certificat.findByIdAndUpdate({_id : id},
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
