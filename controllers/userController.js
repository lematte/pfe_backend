const Users = require('../models/UserModel')
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => 
{
    await Users.find({
        isVisible : "true"
    }).sort({createdAt : -1})
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.getById = async (req, res, next) =>
{
    await Users.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}
/*
module.exports.add = async(req, res, next ) => 
{
    try {
        const{
            Email,
            Password,
            Téléphone,
            IDcardnumber,
            Pays,
            Ville,
            Photo,
            role,
        } = req.body

    //Simple validation
    if( !Email ||!Password||!Téléphone ||!IDcardnumber ||!Pays ||!Ville ||!role) {
        return res.status(400).json({ 'error' : 'Please enter all fields'}) 
    }
    //mail regex

    Users.findOne({Email}).exec(async (error, user) => {
        if(user)
        return res.status(400).json({ error:"User already exists"})
        if(Password.length<6)
            return res.status(400).json({
                msg:"Le mot de passe comporte au moins 6 caractères."
            })*/
            /*if(Téléphone.length<6 && type)
            return res.status(400).json({
                msg:"Le Téléphone comporte au moins 8 numero."
            })*/
           /* 
        const hashedPassword = await bcrypt.hash(req.body.Password, (10))      // Cryptage du mot de passe
        const newuser = new Users({
            Email,
            Password: hashedPassword,
            Téléphone,
            IDcardnumber,
            Pays,
            Ville,
            Photo,
            role,
            createdAt : new Date()
        })
        newuser.save()
       .then(data=> {
            res.json(data)
        }).catch(err=>{      
            res.json(err)
        })
    })
    }catch{
        res.status(500).send()
    }
}
*/
    
module.exports.update = async (req, res, next) => 
{
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(req.body.password, (10))
    const data = {
        Email : req.body.email,
        Password : hashedPassword,
        Téléphone : req.body.téléphone,
        IDcardnumber : req.body.idcardnumber,
        Pays : req.body.pays,
        Ville : req.body.ville,
        //Photo: req.body.photo,
        role : req.body.role
    } 

    //Simple validation
   /* if( !Email ||!Password||!Téléphone ||!IDcardnumber ||!Pays ||!Ville ||!role) {
        return res.status(400).json({ 'error' : 'Please enter all fields'}) 
    }
    if(Password.length<6)
    return res.status(400).json({
        msg:"Le mot de passe comporte au moins 6 caractères."
    })
   */
    const user =  Users.findByIdAndUpdate( {_id : id}, data, { new: true })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.delete= (req, res, next)=> {
    const id = req.params.id;
    const user = Users.findByIdAndUpdate({_id : id},
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