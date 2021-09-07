const Formation = require("../models/FormationModel");

module.exports.getAll = async (req, res, next) => {
  await Formation.find({
    isVisible: "true",
  })
    .sort({ createdAt: -1 })
    .populate("Formateur")
    .populate("Centre_formation")
    .populate("Examen")
    .populate("idSalle")
    .populate("Categories")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Formation.findById({ _id: req.params.id })
    .populate("Formateur")
    .populate("Centre_formation")
    .populate("Examen")
    .populate("idSalle")
    .populate("Categories")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getByIdCentre = async (req, res, next) => {
  try {
    const formation = await Formation.find({
      Centre_formation: req.params.id,
      isVisible: "true",
    })
      .sort({ createdAt: -1 })
      .populate("Formateur")
      .populate("Centre_formation")
      .populate("Examen")
      .populate("idSalle")
      .populate("Categories")
    res.status(200).json(formation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByIdCategories = async (req, res, next) => {
  try {
    const formation = await Formation.find({
      Categories: req.params.id,
      isVisible: "true",
    })
      .sort({ createdAt: -1 })
      .populate("Formateur")
      .populate("Centre_formation")
      .populate("Examen")
      .populate("idSalle")
      .populate("Categories")
    res.status(200).json(formation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByName = async (req, res, next) => {
  const formation = await Formation.find({
    isVisible: "true",
    $or: [{ Libelle: { $regex: req.params.Libelle, $options: "i" } }],
  })
    .populate("Formateur")
    .populate("Centre_formation")
    .populate("Examen")
    .populate("idSalle")
    .populate("Categories")
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.add = (req, res, next) => {
  const newFormation = new Formation({
    Libelle: req.body.Libelle,
    Durrée: req.body.Durrée,
    Type: req.body.Type,
    Date: req.body.Date,
    Heure: req.body.Heure,
    Description: req.body.Description,
    Prix: req.body.Prix,
    Formateur: req.body.Formateur,
    Centre_formation: req.body.Centre_formation,
    Categories: req.body.Categories,
    idSalle: req.body.idSalle,
    Examen: req.body.Examen,
    createdAt: new Date(),
  });
  newFormation
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
  const formation = Formation.findByIdAndUpdate(
    { _id: id },
    {
      Libelle: req.body.Libelle,
      Durrée: req.body.Durrée,
      Type: req.body.Type,
      Date: req.body.Date,
      Heure: req.body.Heure,
      Description: req.body.Description,
      Prix: req.body.Prix,
      Formateur: req.body.Formateur,
      idSalle: req.body.idSalle,
      Categories: req.body.Categories,
      Examen: req.body.Examen
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

module.exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const formation = await Formation.findByIdAndUpdate(
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

