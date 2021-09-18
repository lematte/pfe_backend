const Formateur = require('../models/FormateurModel');
const Users = require('../models/UserModel');
var bcrypt = require('bcrypt');

module.exports.getAll = async (req, res, next) => {
  try {
    await Formateur.find({
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
  } catch (err) {
    res.status(404).json({message: error.message});
  }
};

module.exports.getById = (req, res, next) => {
  Formateur.findById({_id: req.params.id})
    .populate('User')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getByIdUser = async (req, res, next) => {
  try {
    const formateur = await Formateur.findOne({User: req.body.User});
    res.status(200).json(formateur);
  } catch (err) {
    res.status(404).json({message: error.message});
  }
};

module.exports.getBy = async (req, res, next) => {
  const formateurs = await Formateur.find({
    $or: [
      {Prenom: {$regex: req.params.Prenom, $options: 'i'}},
     // {Nom: {$regex: req.params.Nom, $options: 'i'}},
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


module.exports.update = (req, res, next) => {
  const id = req.params.id;
  const formateur = Formateur.findByIdAndUpdate(
    {_id: id},
    {
      Prenom: req.body.Prenom,
      Nom: req.body.Nom,
      Etudes_effectuees: req.body.Etudes_effectuees,
      Expériences: req.body.Expériences,
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
          Password: bcrypt.hashSync(req.body.Password, 8),
          Téléphone: req.body.Téléphone,
          IDcardnumber: req.body.IDcardnumber,
          Pays: req.body.Pays,
          Ville: req.body.Ville,
          Photo: req.body.Photo,
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

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const formateur = Formateur.findByIdAndUpdate(
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


module.exports.getByNom= async (req, res, next) => {
  const formateurs = await Formateur.find({
    isVisible : "true",
    $or: [
      {Nom: {$regex: req.params.Nom, $options: 'i'}},
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

module.exports.getByEtudes_effectuees= async (req, res, next) => {
  const formateurs = await Formateur.find({
    isVisible : "true",
    $or: [
      {Etudes_effectuees: {$regex: req.params.Etudes_effectuees, $options: 'i'}},
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


module.exports.getByExperiences= async (req, res, next) => {
  const formateurs = await Formateur.find({
    isVisible : "true",
    $or: [
      {Expériences: {$regex: req.params.Experiences, $options: 'i'}},
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