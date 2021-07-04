const Contratformation = require('../models/Contrat_formationModel')

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

module.exports.update = (req, res, next) => 
{
    const id = req.params.id;
    const contratformation = Contratformation.findByIdAndUpdate( {_id : id},
    {
        Libelle : req.body.Libelle,
        Contrat : req.body.Contrat
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
    const contratformation = Contratformation.findByIdAndUpdate({_id : id},
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
