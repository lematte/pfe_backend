const Users = require("../models/UserModel");
const Centreformation = require("../models/Centre-formationModel");
const Formateur = require("../models/FormateurModel");
const Admin = require("../models/AdminModel");
const Candidat = require("../models/CandidatModel");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var smtpTransport = require('nodemailer-smtp-transport');

var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*let transporter = nodemailer.createTransport(
    sendgridTransport({
    auth: {
      api_key:"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",
    },
  })
);*/
//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
module.exports.signup = async (req, res, next) => {
  try {
    const {
      Email,
      Password,
      Téléphone,
      IDcardnumber,
      Pays,
      Ville,
      Photo,
      role,
    } = req.body;

    //Simple validation
    if (!Email || !Password || !role) {
      return res.status(400).json("Please enter all fields");
    }
    //mail regex
    Users.findOne({ Email ,  isVisible: 'true' }).exec(async (error, user) => {
      if (user) return res.status(400).json("User already exists");
      if (Password.length < 6)
        return res
          .status(400)
          .json("Le mot de passe comporte au moins 6 caractères.");
      const hashedPassword = await bcrypt.hash(req.body.Password, 10); // Cryptage du mot de passe
      const newuser = new Users({
        Email,
        Password: hashedPassword,
        Téléphone,
        IDcardnumber,
        Pays,
        Ville,
        Photo,
        role,
        createdAt: new Date(),
      });
      newuser.save()
      .then((data) => {
        console.log(data.role);
        if (data.role == "centre_formation") {
          //"admin","centre_formation", "candidat", "formateur"
          const newcentre = new Centreformation({
            Nom_centre: req.body.Nom_centre,
            Code_postal: req.body.Code_postal,
            Latitude: req.body.Latitude,
            Longitude: req.body.Longitude,
            Document_Juridique: req.body.Document_Juridique,
            User: data._id,
            //statut:req.body.statut,
            createdAt: new Date(),
          });
          newcentre
            .save()
            .then((data) => {
             // res.json({ message: "saved successfully" });
              res.status(200).json(data);
            })
            .catch((err) => {
              res.json(err);
              res.status(400).json("Internal Server error Occured");
            });
        } else {
          if (role == "formateur") {
            const newFormateur = new Formateur({
              Prenom: req.body.Prenom,
              Nom: req.body.Nom,
              Etudes_effectuees: req.body.Etudes_effectuees,
              Expériences: req.body.Expériences,
              User: data._id,
              createdAt: new Date(),
            });
            newFormateur
              .save()
              .then((data) => {
                res.status(200).json(data);
              })
              .catch((err) => {
                res.json(err);
                res.status(400).json("Internal Server error Occured");
              });
          } else {
            if (role == "candidat") {
              const newCandidat = new Candidat({
                Prenom: req.body.Prenom,
                Nom: req.body.Nom,
                Genre: req.body.Genre,
                User: data._id,
                createdAt: new Date(),
              });
              newCandidat
                .save()
                .then((data) => {
                  res.status(200).json(data);
                })
                .catch((err) => {
                  res.json(err);
                  res.status(400).json("Internal Server error Occured");
                });
            } else {
              if (role == "admin") {
                const newAdmin = new Admin({
                  Prenom: req.body.Prenom,
                  Nom: req.body.Nom,
                  User: data._id,
                  createdAt: new Date(),
                });
                newAdmin
                  .save()
                  .then((data) => {
                    res.status(200).json(data);
                  })
                  .catch((err) => {
                    res.json(err);
                  });
              } else res.json("role n'exist pas ");
            }
          }
        }
        console.log(data.Email);
        /*transporter.sendMail({
            to: data.Email,
            from: "lematteAhmed@gmail.com",
            subject: "signup success",
            html: "<h1>welcome to Taining4All</h1>",
          });*/
          let smtpTransport  = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',// hostname
    port: 587, // port for secure SMTP
    secure: false,
    requireTLS: true,
    tls: {
      ciphers:'SSLv3'
    },
    auth:{
      user:'training4all2021@gmail.com',
      pass:'26763535'
    }
  });
  let mailOptions={
    from:'training4all2021@gmail.com',
    to:data.Email,
    subject: `signup success`,
    html:`<h1>welcome to Taining4All</h1>`
  };
  smtpTransport.sendMail(mailOptions,function(error,response){
    if(error){
      res.send(error)
    }else{
      res.send("Success")
    }
  })
  smtpTransport.close()
      });
    });
  } catch {
    res.status(400).send();
  }
};

module.exports.signin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json("Please enter all fields");
    }
    const user = await Users.findOne({ Email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.Password, user.Password);
      if (cmp) {
        // code pour maintenir l'authentification jwt
        var tokens = {};
        tokens.accessToken = jwt.sign(
          { _id: user._id, role: user.role, Email: user.Email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 86400 /* expires in 24 hours*/ },
          (err, token) => {
            if (err) {
              res.status(400).json("username or password not valid/correct.");
            }
            const { _id, Email, role } = user;
            res.cookie("token", token, { expiresIn: 86400 });
            res.status(200).json({
              token,
              user: {
                _id,
                Email,
                role,
              },
            });
            //return res.status(200).json({token })
          }
        );
        //generating refresh token
        /* tokens.refreshToken = jwt.sign(
                    {_id:user._id , role : user.role, Email:user.Email}, 
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '6h' });
                    resolve(tokens);*/

        //res.json("Auth Successful");
      } else {
        res.status(400).json("Wrong email or password.");
      }
    } else {
      res.status(400).json("Wrong username or password.");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Internal Server error Occured");
  }
};

module.exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully",
  });
};
