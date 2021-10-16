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
    Certificat.findById({ _id : req.params.id ,
        isVisible : "true"
    })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}


module.exports.getCertificatByIdFormation = async (req, res, next) => {
    await Certificat.find({
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

module.exports.getCertificatByIdCandidat_Formation = async (req, res, next) => {
    await Certificat.findOne({
        isVisible : "true",
        Formation: req.params.id,
        Candidat: req.params.Candidat
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

module.exports.add = ( req , res , next ) => 
{
    const newCertificat = new Certificat({
        Libelle : req.body.Libelle,
        //Mention: req.body.Mention,
        Formation: req.body.Formation,
        Candidat: req.body.Candidat,
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
        Libelle : req.body.Libelle,
        //Mention: req.body.Mention
    }, 
    { new: true })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}


module.exports.uploadSignature = async (req, res, next) => {
    const id = req.params.id;
    const data = {
        Signature: req.file.path,
    };
    const formation = Certificat.findByIdAndUpdate({ _id: id }, data, { new: true })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  };

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
