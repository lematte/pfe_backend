const Users = require('../models/UserModel')
const Centreformation = require('../models/Centre-formationModel')
const Formateur =require('../models/FormateurModel');
const Admin =require('../models/AdminModel')
const Candidat =require('../models/CandidatModel')

var bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


module.exports.signup = async ( req , res , next ) => {
    try{
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
        }) 
        const hashedPassword = await bcrypt.hash(req.body.Password, (10))      // Cryptage du mot de passe
        const newuser = new Users({
            Email,
            Password : hashedPassword,
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
            console.log(data.role)
            if (data.role == "centre_formation") //"admin","centre_formation", "candidat", "formateur"
            {
                const newcentre = new Centreformation({
                    Nom_centre: req.body.Nom_centre,
                    Code_postal: req.body.Code_postal,
                    Latitude : req.body.Latitude,
                    Longitude : req.body.Longitude,
                    Document_Juridique : req.body.Document_Juridique,
                    User: data._id,
                //statut:req.body.statut,
                createdAt : new Date()
                })
                newcentre.save()
                .then(data=> {
                    res.json(data)
                }).catch(err=>{
                    res.json(err)
                })
            }else
            {
                if (role == "formateur")
                {
                    const newFormateur = new Formateur({
                        Prenom: req.body.Prenom,
                        Nom: req.body.Nom,
                        Etudes_effectuees:req.body.Etudes_effectuees,
                        Expériences:req.body.Expériences,
                        User: data._id,
                        createdAt : new Date()
                    })
                    newFormateur.save()
                    .then(data=> {
                        res.json(data)
                    }).catch(err=>{
                        res.json(err)
                    })
                }else
                {
                    if(role == "candidat")
                    {
                        const newCandidat = new Candidat({
                            Prenom: req.body.Prenom,
                            Nom: req.body.Nom,
                            Genre:req.body.Genre,
                            User: data._id,
                            createdAt : new Date()
                        })
                        newCandidat.save()
                        .then(
                            data=> {
                            res.json(data)
                        }).catch(err=>{
                            res.json(err)
                        })
                    }else
                    {
                        if(role == "admin")
                        {
                            const newAdmin = new Admin({
                                Prenom: req.body.Prenom,
                                Nom: req.body.Nom,
                                User: data._id,
                                createdAt : new Date()
                            })
                            newAdmin.save()
                            .then(data=> {
                                res.json(data)
                            }).catch(err=>{
                                res.json(err)
                            })
                        }else(res.json("role n'exist pas "))
                    }
                }
            }
        })
    })
    }catch{
        res.status(500).send()
    }
}

module.exports.signin = async(req, res) => {
    try {
        const { Email, Password} = req.body
        if (!Email || !Password){
            return res.status(400).json({ 'error' : 'Please enter all fields'}) 
        }
        const user = await Users.findOne({Email })
        if (user) {
            const cmp = await bcrypt.compare(req.body.Password, user.Password);
            if (cmp) {
                // code pour maintenir l'authentification jwt
                var tokens = {};
                tokens.accessToken = jwt.sign(
                    {_id:user._id , role : user.role, Email:user.Email},
                    process.env.ACCESS_TOKEN_SECRET, 
                    { expiresIn : 86400 /* expires in 24 hours*/}, (err,token)=>{                  
                    if(err){
                        res.json({
                            message:"username or password not valid/correct"
                        })
                    }
                    const { _id , Email , role} = user;
                    res.cookie('token',token , { expiresIn : 86400})
                    res.status(200).json({
                        token,
                        user :
                        {
                            _id,
                            Email,
                            role
                        }
                    })
                    //return res.status(200).json({token }) 
                })
                //generating refresh token
                /* tokens.refreshToken = jwt.sign(
                    {_id:user._id , role : user.role, Email:user.Email}, 
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '6h' });
                    resolve(tokens);*/

                //res.send("Auth Successful");
            } else {
              res.send("Wrong email or password.");
            }
        } 
        else {
        res.send("Wrong username or password.");
        }
    }
    catch(error){
        console.log(error);
    res.status(500).send("Internal Server error Occured");
    }
} 

module.exports.signout = (req,res) =>{
    res.clearCookie('token');
    res.status(200).json({
        message : 'Signout successfully'
    })
}
