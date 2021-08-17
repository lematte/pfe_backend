const Salle = require('../models/SalleModel');

module.exports.getAll = async (req, res, next) => {
  await Salle.find({
    isVisible: 'true',
  })
    .sort({createdAt: -1})
    .populate('Centre_formation')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Salle.findById({_id: req.params.id})
    .populate('Centre_formation')
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getByIdCentre = async (req, res, next) => {
  try {
    const formation = await Salle.find({
      Centre_formation: req.params.id,
      isVisible: 'true',
    })
      .populate('Centre_formation')
      .populate('Formation');
    res.status(200).json(formation);
  } catch (err) {
    res.status(404).json({message: error.message});
  }
};

module.exports.add = (req, res, next) => {
  const newSalle = new Salle({
    Libelle: req.body.Libelle,
    etat: req.body.etat,
    Centre_formation: req.body.Centre_formation,
    createdAt: new Date(),
  });
  newSalle
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  const salle = Salle.findByIdAndUpdate(
    {_id: id},
    {
      Libelle: req.body.libelle,
      etat: req.body.Etat,
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

module.exports.updateFormationSalle = (req, res, next) => {
  const id = req.params.id;
  const salle = Salle.findByIdAndUpdate(
    {_id: id},
    {
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

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const salle = Salle.findByIdAndUpdate(
    {_id: id},
    {
      isVisible: false,
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
