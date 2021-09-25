const Candidat = require('../models/CandidatModel');
const Users = require('../models/UserModel');
const userController = './userController';
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => {
  await Candidat.find({
    isVisible: 'true',
  })
    .sort({createdAt: -1})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Candidat.findById({_id: req.params.id})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getByIdUser = async (req, res, next) => {
  await Candidat.findOne({User: req.params.id})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

/*module.exports.add = async ( req , res , next ) => {
    const hashedPassword = await bcrypt.hash(req.body.Password,(10))
    console.log(hashedPassword)
    const newuser = new Users({
        Email : req.body.Email,
        Password: hashedPassword,
        Téléphone : req.body.Téléphone,
        IDcardnumber : req.body.IDcardnumber,
        Pays : req.body.Pays,
        Ville: req.body.Ville,
        Photo : req.body.Photo,
        role: 'candidat',
        createdAt : new Date()
    })
    newuser.save()
    .then(data=> {
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
    }).catch(err=>{
        res.json(err)
    })
} */

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  const centre = Candidat.findByIdAndUpdate(
    {_id: id},
    {
      Prenom: req.body.Prenom,
      Nom: req.body.Nom,
      Genre: req.body.Genre,
    },
    {new: true}
  )
    .then((data) => {
      res.json(data);
      const idu = data.User;
      const user = Users.findByIdAndUpdate(
        {_id: idu},
        {
          Email: req.body.Email,
          //Password: bcrypt.hashSync(req.body.Password, 8),
          Téléphone: req.body.Téléphone,
          IDcardnumber: req.body.IDcardnumber,
          Pays: req.body.Pays,
          Ville: req.body.Ville,
          //Photo: req.body.Photo,
        },
        {new: true}
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports.updatePassword = async (req, res, next) => {
  const id = req.params.id;
  const user = await Users.findByIdAndUpdate(
    {_id: id},
    {
      Password: bcrypt.hashSync(req.body.password, 8), 
      //Photo: req.body.photo
    },
    {new: true}
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
/*module.exports.update = async (req, res, next) => {
  const id = req.params.id;
  const candidat = Candidat.findByIdAndUpdate(
    {_id: id},
    {
      Prenom: req.body.prenom,
      Nom: req.body.nom,
      Genre: req.body.genre,
    },
    {new: true}
  ).populate('User')
    .then(Data => {
      res.json(Data)
      const idu = Data.User;
      const hashedPassword = bcrypt.hashSync(req.body.password, 8)
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
/* const user =  Users.findByIdAndUpdate( {_id : idu},
    data, 
      { new: true })
      .then(data=> {
          res.json(data)
      }).catch(err=>{
          res.json(err)
      })*/
//userController.update(idu, data);
//res.json(idu)
/* const user = Users.findByIdAndUpdate(
        {_id: idu},
        {
          Email: req.body.email,
          Password: bcrypt.hashSync(req.body.password, 8),
          Téléphone: req.body.téléphone,
          IDcardnumber: req.body.idcardnumber,
          Pays: req.body.pays,
          Ville: req.body.ville,
          //Photo: req.body.photo,
        },
        {new: true}
      ) 
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });*/
/*  })
    .catch((err) => {
      res.json(err);
    });
};*/

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const candidat = Candidat.findByIdAndUpdate(
    {_id: id},
    {
      isVisible: false,
    },
    {new: true}
  )
    .then((data) => {
      //res.json(data)
      const idu = data.User;
      const user = Users.findByIdAndUpdate(
        {_id: idu},
        {
          isVisible: false,
        },
        {new: true}
      ).then((data) => {
        res.json('done');
      });
    })
    .catch((err) => {
      res.json(err);
    });
};
