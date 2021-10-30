const Contratformation = require('../models/ContratFormationModel')
const nodemailer = require("nodemailer");

module.exports.getAll = async (req, res, next) => {
  await Contratformation.find({
    isVisible: "true"
  }).sort({ createdAt: -1 })
    .populate('Formation')
    .populate('Candidat')
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
}

module.exports.getById = (req, res, next) => {
  Contratformation.findById({ _id: req.params.id })
    .populate('Formation')
    .populate('Candidat')
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
}

module.exports.add = (req, res, next) => {
  const newContratformation = new Contratformation({
    Libelle: req.body.Libelle,
    Contrat: req.body.Contrat,
    etat: req.body.etat,
    Formation: req.body.Formation,
    Candidat: req.body.Candidat,
    createdAt: new Date()
  })
  newContratformation.save()
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
}

module.exports.getByIdFormation = async (req, res, next) => {
  try {
    const contratformation = await Contratformation.find({
      Formation: req.params.id,
      isVisible: 'true',
    }).sort({ createdAt: -1 })
      .populate('Candidat')
      .populate('Formation')
    res.status(200).json(contratformation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};


module.exports.getByLibelle = async (req, res, next) => {
  const contratformation = await Contratformation.find({
    isVisible: "true",
    $or: [{ Libelle: { $regex: req.params.Libelle, $options: "i" } }],
  }).sort({ createdAt: -1 })
    .populate('Candidat')
    .populate('Formation')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports.getByIdCandidat = async (req, res, next) => {
  try {
    const contratformation = await Contratformation.find({
      Candidat: req.params.id,
      isVisible: 'true',
    }).sort({ createdAt: -1 })
      .populate('Candidat')
      .populate('Formation')
    res.status(200).json(contratformation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByIdFormationCDemander = async (req, res, next) => {
  try {
    const contratformation = await Contratformation.find({
      Formation: req.params.id,
      isVisible: 'true',
      etat: "en attente"
    }).sort({ createdAt: -1 })
      .populate('Candidat')
      .populate('Formation')
    res.status(200).json(contratformation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getByIdFormationCAccepter = async (req, res, next) => {
  try {
    const contratformation = await Contratformation.find({
      Formation: req.params.id,
      isVisible: 'true',
      etat: "acceptée"
    }).sort({ createdAt: -1 })
      .populate('Candidat')
      .populate('Formation')
    res.status(200).json(contratformation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.getByIdFormationCRejeter = async (req, res, next) => {
  try {
    const contratformation = await Contratformation.find({
      Formation: req.params.id,
      isVisible: 'true',
      etat: "refusée"
    }).sort({ createdAt: -1 })
      .populate('Candidat')
      .populate('Formation')
    res.status(200).json(contratformation);
  } catch (err) {
    res.status(404).json({ message: error.message });
  }
};
module.exports.getByEtat = async (req, res, next) => {
  const contratformation = await Contratformation.find({
    Formation: req.params.id,
    isVisible: 'true',
    $or: [
      { etat: { $regex: req.params.etat, $options: 'i' } },
      // {Code_postal: {$regex: req.body.Code_postal, $options: 'i'}},
    ],
  })
    .sort({ createdAt: -1 })
    .populate('Candidat')
    .populate('Formation')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};


module.exports.getByCandidatEtat = async (req, res, next) => {
  const contratformation = await Contratformation.find({
    Candidat: req.params.id,
    isVisible: 'true',
    $or: [
      { etat: { $regex: req.params.etat, $options: 'i' } },
    ],
  })
    .sort({ createdAt: -1 })
    .populate('Candidat')
    .populate('Formation')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};
module.exports.testCandidat = async (req, res, next) => {
  const contratformation = await Contratformation.find({
    Formation: req.params.id,
    isVisible: 'true',
    Candidat: req.params.Candidat,
  })
    .sort({ createdAt: -1 })
    .populate('Candidat')
    .populate('Formation')
    .then((data) => {
      res.json(data);
      data.User;
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports.send = (req, res, next) => {
  const Email = req.body.Email
  var fromation = req.body.fromation;
  let smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',// hostname
    port: 587, // port for secure SMTP
    secure: false,
    requireTLS: true,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: 'training4all2021@gmail.com',
      pass: '26763535'
    }
  });
  let mailOptions = {
    from: 'training4all2021@gmail.com',
    to: Email,
    subject: `Réponse`,
    html: `<h3> Informations  ${fromation}</h3>`
  };
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      res.send(error)
    } else {
      res.send("Success")
    }
  })
  smtpTransport.close()
}

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  const Email = req.body.Email
  const contratformation = Contratformation.findByIdAndUpdate({ _id: id },
    {
      etat: req.body.etat,
    },
    { new: true })
    .populate('Formation')
    .populate('Candidat')
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
}
module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  const contratformation = Contratformation.findByIdAndUpdate({ _id: id },
    {
      isVisible: false
    },
    { new: true })
    .populate('Formation')
    .populate('Candidat')
    .then(data => {
      res.json(data)
    }).catch(err => {
      res.json(err)
    })
}