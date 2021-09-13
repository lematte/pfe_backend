const Contratformation = require('../models/Contrat_formationModel')

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const Candidat = require('../models/CandidatModel');

let transporter = nodemailer.createTransport(
  sendgridTransport({
  auth: {
    api_key:"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",
  },
})
);

module.exports.getAll = async (req, res, next) => 
{
    await Contratformation.find({
        isVisible : "true"
    }).sort({createdAt : -1})
    .populate('Formation')
    .populate('Candidat')
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getById = (req, res, next) =>
{
    Contratformation.findById({ _id : req.params.id })
    .populate('Formation')
    .populate('Candidat')
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.add =(req, res ,next) => 
{
    const newContratformation = new Contratformation({
        Libelle : req.body.Libelle,
        Contrat : req.body.Contrat,
        etat: req.body.etat,
        Formation: req.body.Formation,
        Candidat: req.body.Candidat,
        createdAt : new Date()
    })
    newContratformation.save()
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getByIdFormation = async (req, res, next) => {
    try {
      const contratformation = await Contratformation.find({
        Formation: req.params.id,
        isVisible: 'true',
      }).sort({createdAt : -1})
        .populate('Candidat')
        .populate('Formation')
      res.status(200).json(contratformation);
    } catch (err) {
      res.status(404).json({message: error.message});
    }
  };

  module.exports.getByIdFormationCDemander = async (req, res, next) => {
    try {
      const contratformation = await Contratformation.find({
        Formation: req.params.id,
        isVisible: 'true',
        etat:"en attente"
      }).sort({createdAt : -1})
        .populate('Candidat')
        .populate('Formation')
      res.status(200).json(contratformation);
    } catch (err) {
      res.status(404).json({message: error.message});
    }
};

module.exports.getByIdFormationCAccepter = async (req, res, next) => {
    try {
      const contratformation = await Contratformation.find({
        Formation: req.params.id,
        isVisible: 'true',
        etat:"acceptée"
      }).sort({createdAt : -1})
        .populate('Candidat')
        .populate('Formation')
      res.status(200).json(contratformation);
    } catch (err) {
      res.status(404).json({message: error.message});
    }
};
module.exports.getByIdFormationCRejeter = async (req, res, next) => {
    try {
      const contratformation = await Contratformation.find({
        Formation: req.params.id,
        isVisible: 'true',
        etat:"refusée"
      }).sort({createdAt : -1})
        .populate('Candidat')
        .populate('Formation')
      res.status(200).json(contratformation);
    } catch (err) {
      res.status(404).json({message: error.message});
    }
};
module.exports.getByEtat = async (req, res, next) => {
    const contratformation = await Contratformation.find({
        Formation: req.params.id,
        isVisible: 'true',
      $or: [
        {etat: {$regex: req.params.etat, $options: 'i'}},
       // {Code_postal: {$regex: req.body.Code_postal, $options: 'i'}},
      ],
    })
    .sort({createdAt : -1})
        .populate('Candidat')
        .populate('Formation')
      .then((data) => {
        res.json(data);
        data.User;
      })
      .catch((err) => {
        res.json(err);
      });
  };
  
module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const contratformation = Contratformation.findByIdAndUpdate( {_id : id},
    {
        //Libelle : req.body.Libelle,
        etat: req.body.etat,
       // Contrat : req.body.Contrat
    }, 
    { new: true })
    .populate('Formation')
    .populate('Candidat')
    .then(data=> {
        res.json(data)
        console.log(data.Email);
        transporter.sendMail({
            to: data.Candidat.User.Email,
            from: "lematteAhmed@gmail.com",
            subject: "signup success",
            html: "<h1>welcome to Taining4All</h1>",
          });
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.delete= (req, res, next)=> {
    const id = req.params.id;
    const contratformation = Contratformation.findByIdAndUpdate({_id : id},
    {
        isVisible : false
    }, 
    { new: true })
    .populate('Formation')
    .populate('Candidat')
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}