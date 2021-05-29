const Formateur =require('../models/FormateurModel')
const Users = require('../models/UserModel')
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => 
{
    await Formateur.find({
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
    Formateur.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.update =( req , res , next ) => 
{
    const id = req.params.id;
    const formateur = Formateur.findByIdAndUpdate({_id : id},
        {
            Prenom: req.body.Prenom,
            Nom: req.body.Nom,
            Etudes_effectuees:req.body.Etudes_effectuees,
            Expériences:req.body.Expériences,
        }, 
        { new: true })
        .then(data=> { res.json(data)
            const idu = data.User;
            const user =  Users.findByIdAndUpdate( {_id : idu},
            {
                Email : req.body.Email,
                Password: bcrypt.hashSync(req.body.Password, 8),
                Téléphone : req.body.Téléphone,
                IDcardnumber : req.body.IDcardnumber,
                Pays : req.body.Pays,
                Ville: req.body.Ville,
                Photo : req.body.Photo,
            }, 
            { new: true })
            .then(data=> {
                res.json(data)
            }).catch(err=>{
                res.json(err)
            })
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.delete= (req, res, next)=> {
    const id = req.params.id;
    const formateur = Formateur.findByIdAndUpdate({_id : id},
    {
    isVisible : false
    }, 
    { new: true })
    .then(data=> {
    const idu = data.User;
    const user = Users.findByIdAndUpdate({_id : idu},
        {
            isVisible : false
        }, 
        { new: true })
        .then(data=> {
            res.json("done")
        })
    }).catch(err=>{
        res.json(err)
    })
}


