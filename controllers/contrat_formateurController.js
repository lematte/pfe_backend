const Contrat_formateur = require('../models/Contrat_formateurModel')

module.exports.getAll = async (req, res, next) => {
    await Contrat_formateur.find({
        isVisible: "true"
    }).sort({ createdAt: -1 })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
}

module.exports.getById = (req, res, next) => {
    Contrat_formateur.findById({ _id: req.params.id })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
}

module.exports.getByIdCenter = async (req, res, next) => {
    try {
        const contratformateur = await Contrat_formateur.find({
            idCentre_formation: req.params.id,
            isVisible: 'true',
        }).sort({ createdAt: -1 })
            .populate('idCentre_formation')
            .populate('idFormateur')
        res.status(200).json(contratformateur);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
};

module.exports.getContrat_formateurByIdFormateur = async (req, res, next) => {
    await Contrat_formateur.find({
        isVisible: "true",
        idFormateur: req.params.id
    })
        .populate("idFormateur")
        .populate("idCentre_formation")
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};

module.exports.add = (req, res, next) => {
    const newContrat_formateur = new Contrat_formateur({
        Libelle: req.body.Libelle,
       // Document: req.body.Document,
        etat: req.body.etat,
        idFormateur: req.body.idFormateur,
        idCentre_formation: req.body.idCentre_formation,
        createdAt: new Date()
    })
    newContrat_formateur.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
}


module.exports.update = (req, res, next) => {
    const id = req.params.id;
    const contrat_formateur = Contrat_formateur.findByIdAndUpdate({ _id: id },
        {
            Libelle: req.body.Libelle,
         //   Document: req.body.Document,
            etat: req.body.etat,
        },
        { new: true })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
}

module.exports.delete = (req, res, next) => {
    const id = req.params.id;
    const contrat_formateur = Contrat_formateur.findByIdAndUpdate({ _id: id },
        {
            isVisible: false
        },
        { new: true })
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.json(err)
        })
}

module.exports.uploadContrat_formateur = async (req, res, next) => {
    const id = req.params.id;
    const data = {
        Document: req.file.path
    };
    const formation = Contrat_formateur.findByIdAndUpdate({ _id: id }, data, { new: true })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  };
