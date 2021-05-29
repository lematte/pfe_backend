const Admin =require('../models/AdminModel')
const Users = require('../models/UserModel')
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => 
{
    await Admin.find({
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
    Admin.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}


module.exports.updateAdmin =async( req , res , next ) => 
{
    const id = req.params.id;
    const admin = Admin.findByIdAndUpdate({_id : id},
        {
            Prenom: req.body.Prenom,
            Nom: req.body.Nom
        }, 
        { new: true })
    .then(data=> { 
        res.json(data)
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
            role : req.body.role
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

module.exports.deleteadmin= async (req, res, next)=> {
    const id = req.params.id;
    const admin = await Admin.findByIdAndUpdate({_id : id},
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
