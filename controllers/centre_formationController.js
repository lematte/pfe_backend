const Centreformation = require('../models/Centre-formationModel');
const Users = require('../models/UserModel');
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => {
  try {
    const centre = await Centreformation.find({
      isVisible: 'true',
    })
      .sort({createdAt: -1})
      .populate('User');
    res.status(200).json(centre);
  } catch (err) {
    res.status(404).json({message: error.message});
  }
};

module.exports.getByIdUser = async (req, res, next) => {
  await Centreformation.findOne({User: req.params.id})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getBy = async (req, res, next) => {
  const centre = await Centreformation.find({
    $or: [
      {Nom_centre: {$regex: req.params.Nom_centre, $options: 'i'}},
     // {Code_postal: {$regex: req.body.Code_postal, $options: 'i'}},
    ],
  })
  .populate('User')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getVille = async (req, res, next) => {
  const formation = await Centreformation.find({
      isVisible : "true",
      role: "centre_formation",
    $or: [
      {Ville : {$regex: req.params.User.Ville, $options: 'i'}},
    ],
  })
  .populate('User')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Centreformation.findById({_id: req.params.id})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getByCode_postal = async (req, res, next) => {
  const formation = await Centreformation.find({
      isVisible : "true",
      $or: [
        {Code_postal : {$regex: req.params.Code_postal, $options: 'i'}},
      ],
  })
  .populate('User')
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    res.json(err);
  });
};



module.exports.update = (req, res, next) => {
  const id = req.params.id;
  const centre = Centreformation.findByIdAndUpdate(
    {_id: id},
    {
      Nom_centre: req.body.Nom_centre,
      Code_postal: req.body.Code_postal,
      Latitude: req.body.Latitude,
      Longitude: req.body.Longitude,
      Document_Juridique: req.body.Document_Juridique,
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

module.exports.deletecentre = (req, res, next) => {
  const id = req.params.id;
  const centre = Centreformation.findByIdAndUpdate(
    {_id: id},
    {
      isVisible: false,
    },
    {new: true}
  )
    .then((data) => {
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


module.exports.uploadDocument_Juridique = async (req, res, next) => {
  const id = req.params.id;
  const data = {
    Document_Juridique: req.file.path,
  };
  const formation = Centreformation.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};
