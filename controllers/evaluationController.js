const Evaluation = require("../models/EvaluationModel");

module.exports.getAll = async (req, res, next) => {
  await Evaluation.find({
    isVisible: "true",
  })
    .sort({ createdAt: -1 })
    .populate("Formation")
    .populate("Candidat")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.getById = (req, res, next) => {
  Evaluation.findById({ _id: req.params.id })
    .populate("Formation")
    .populate("Candidat")
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.add = (req, res, next) => {
  const newEvaluation = new Evaluation({
    Note: req.body.Note,
    Formation: req.body.Formation,
    Candidat: req.body.Candidat,
    createdAt: new Date(),
  });
  newEvaluation
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
  const evaluation = Evaluation.findByIdAndUpdate(
    { _id: id },
    {
      Note: req.body.Note,
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

module.exports.getByIdFormation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find({
      Formation: req.params.id,
      isVisible: "true",
    })
      .populate("Formation")
      .populate("Candidat");
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByIdEvalCandidatFormation = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find({
      Candidat: req.params.id,
      Formation: req.params.Formation,
      isVisible: "true",
    })
      .populate("Formation")
      .populate("Candidat");
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByIdEvalbyIdCandidat = async (req, res, next) => {
  try {
    const evaluation = await Evaluation.find({
      Candidat: req.params.id,
    //  Formation: req.params.Formation,
      isVisible: "true",
    })
      .populate("Formation")
      .populate("Candidat");
    res.status(200).json(evaluation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const evaluation = Evaluation.findByIdAndUpdate(
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
