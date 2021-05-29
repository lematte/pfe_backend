const Centreformation = require('../models/Centre-formationModel')
const Users = require('../models/UserModel')
var bcrypt = require('bcrypt');

module.exports.getAll = async(req, res, next) => {
    await Centreformation.find({
    isVisible : "true"
    }).sort({createdAt : -1})
    .then(data=> {
        res.json(data)
    }).catch(err=>{ 
        res.json(err)
    })
}

module.exports.getBy = async(req, res, next) =>
{
    /*const{
        Nom_centre,
        Code_postal,
        Ville,
        Pays
    }= req.body*/
    //if(Nom_centre || Code_postal){
        const centre = await Centreformation.find(
        {
            "$or":
            [    
                //{"Ville":{"$regex":req.body.Ville,'$options' : 'i'}},
                //{"Pays":{"$regex":req.body.Pays,'$options' : 'i'}},
                { "Nom_centre": {"$regex" :req.body.Nom_centre,'$options' : 'i'}},
                {"Code_postal":{"$regex" :req.body.Code_postal,'$options' : 'i'}}
            ]
        })
        .then(data=> {
            res.json(data)
            data.User
        }).catch(err=>{
            res.json(err)
        })
    //}else 
   // {if(Ville || Pays)
        //{
           /* const user = await Users.find(
            {
                "$or":
                [    
                    {"Ville":{"$regex":req.body.Ville,'$options' : 'i'}},
                    {"Pays":{"$regex":req.body.Pays,'$options' : 'i'}}
                ]
            })
            .then(data=> {
                res.json(data)
                data.User
            }).catch(err=>{
                res.json(err)
            })  */
       // }
   // }
}

module.exports.getById = (req, res, next) =>
{
    Centreformation.findById({ _id : req.params.id })
    .then(data=> {
        res.json(data)
    }).catch(err=>{
        res.json(err)
    })
}

module.exports.update = ( req , res , next ) => 
{
    const id = req.params.id;
    const centre = Centreformation.findByIdAndUpdate({_id : id},
    {
        Nom_centre: req.body.Nom_centre,
        Code_postal: req.body.Code_postal,
        Latitude : req.body.Latitude,
        Longitude : req.body.Longitude,
        Document_Juridique : req.body.Document_Juridique,
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

module.exports.deletecentre= (req, res, next)=> {
    const id = req.params.id;
    const centre = Centreformation.findByIdAndUpdate({_id : id},
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
        }
    )
    }).catch(err=>{
        res.json(err)
    })
}
