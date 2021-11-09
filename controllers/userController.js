const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");

module.exports.getAll = async (req, res, next) => {
  await Users.find({
    isVisible: "true",
  })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = async (req, res, next) => {
  await Users.findById({ _id: req.params.id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports.getVille = async (req, res, next) => {
   await Users.find({
      isVisible : "true",
      role: "centre_formation",
    $or: [
      {Ville : {$regex: req.params.Ville, $options: 'i'}},
    ],
  })
  .then((data) => {
    res.json(data)
  })
    .catch((err) => {
      res.json(err);
    });
};


module.exports.uploadImage = async (req, res, next) => {
  const id = req.params.id;
  const data = {
    Photo: req.file.path,
  };
  const user = Users.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.updatePassword = async (req, res, next) => {
  const _id = req.params.id;
  const { Password, password } = req.body;
 /* if (!Password || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }*/
  const user = await Users.findOne({ _id });
  console.log(user);
  if (user) {
    //  res.status(200).json(data)
    console.log(Password);
    const cmp = await bcrypt.compare(Password, user.Password);
    console.log(Password);
    console.log("cmp"+cmp);
    if (cmp) {
      console.log("OK");
      const hashedPassword = await bcrypt.hash(password, (10)) 

      await Users.findByIdAndUpdate(
        _id,
        {
          Password: hashedPassword
        },
        { new: true }
      )
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    }
    else {
      res.status(400).send("errer");
    }
  } 
  else {
    res.status(400).send("errer");
  }
};

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

module.exports.update = async (req, res, next) => {
  const id = req.params.id;
  //const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const data = {
    Email: req.body.Email,
  //  Password: hashedPassword,
    Téléphone: req.body.Téléphone,
    IDcardnumber: req.body.IDcardnumber,
    Pays: req.body.Pays,
    Ville: req.body.Ville,
    //Photo: req.body.photo,
    role: req.body.role,
  };

  //Simple validation
  /* if( !Email ||!Password||!Téléphone ||!IDcardnumber ||!Pays ||!Ville ||!role) {
        return res.status(400).json({ 'error' : 'Please enter all fields'}) 
    }
    if(Password.length<6)
    return res.status(400).json({
        msg:"Le mot de passe comporte au moins 6 caractères."
    })
   */
  const user = Users.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const user = Users.findByIdAndUpdate(
    { _id: id },
    {
      isVisible: false,
    },
    { new: true }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
