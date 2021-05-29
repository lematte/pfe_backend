const Users=require('../models/UserModel')

exports.adminMiddleware = (req, res, next) => {
  Users.findById(req.user.id)
  .then(doc => {
    if (doc.role !== "admin") {
      console.log(doc.role)
      return res.status(400).json({message: "Accès administrateur refusé" }); 
    }
  })
  //console.log(req.user.id)
  next();
};

exports.centre_formationMiddleware = (req, res, next) => {
  Users.findById(req.user.id)
  .then(doc => {
    if (req.user.role !== "centre_formation") {
      console.log(doc.role)
      return res.status(400).json({message:"Accès centre de formation refusé "}); 
    }
  })
  //console.log(req.user.id)
  next();
};

exports.CandidatMiddleware = (req, res, next) => {
  Users.findById(req.user.id)
  .then(doc => {
    if (req.user.role !== "candidat") {
      console.log(doc.role)
      return res.status(400).json({message:"Accès candidat refusé "}); 
    }
  })
  //console.log(req.user.id)
  next();
};

  exports.formateurMiddleware = (req, res, next) => {
    Users.findById(req.user.id)
    .then(doc => {
      if (req.user.role !== "formateur") {
        console.log(doc.role)
        return res.status(400).json({message:"Accès formateur refusé "}); 
      }
    })
  //console.log(req.user.id)
  next();
};