const Users = require("../models/UserModel");
const Centreformation = require("../models/CentreFormationModel");
const Formateur = require("../models/FormateurModel");
const Admin = require("../models/AdminModel");
const Candidat = require("../models/CandidatModel");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
var smtpTransport = require('nodemailer-smtp-transport');

var bcrypt = require("bcrypt");
var crypto = require("crypto");
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
      return res.status(400).json("Veuillez saisir tous les champs");
    }
    //mail regex
    Users.findOne({ Email, isVisible: 'true' }).exec(async (error, user) => {
      if (user) return res.status(400).json("L'utilisateur existe déjà");
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
       /*   let smtpTransport = nodemailer.createTransport({
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
            to: data.Email,
            subject: `signup success`,
            html: `<h1>welcome to Taining4All</h1>`
          };
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              res.send(error)
            } else {
              res.send("Success")
            }
          })
          smtpTransport.close()*/
        });
    });
  } catch {
    res.status(400).json();
  }
};

module.exports.signin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(400).json("Veuillez saisir tous les champs");
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
              res.status(400).json("E-mail ou mot de passe erroné.");
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
        res.status(400).json("E-mail ou mot de passe erroné.");
      }
    } else {
      res.status(400).json("E-mail ou mot de passe erroné.");
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


module.exports.sendOTP = (req, res) => {

  const client = require('twilio')("ACa597c8b168041387cdc6e623a202f873", "d7fe06d44062c5d9811cd9970edde13a")

  const Téléphone = req.body.Téléphone
  const otp = Math.floor(100000 + Math.random() * 900000)
  const ttl = 2 * 60 * 1000
  const expires = Date.now() + ttl
  const data = `${Téléphone}.${otp}.${expires}`
  const hash = crypto.createHmac('sha256', "4d2fa64935b719216648dcd8870004f83b58894eeb741d5a7343900a1e7a322f643734592bf14476d4433bafec75365fdae80418d605b6867421f93dc989e070").update(data).digest('hex')
  const fullHash = `${hash}.${expires}`

  client.messages.create({
    body: `Your one Time Register Password For training for all is ${otp}`,
    from: +12176802677,
    to: `+216${Téléphone}`
  }).then((messages) => console.log(messages)).catch((err) => console.error(err))
  res.status(200).send({ Téléphone, hash: fullHash, otp })
}

module.exports.verifyOTP = (req, res) => {

  //  const client = require('twilio')("AC8838155d229a5b5b07759f6780d3cbb5", "acba9f1f14593e8cb93bc0fa112ae9ef")

  const Téléphone = req.body.Téléphone
  const hash = req.body.hash
  const otp = req.body.otp
  let [hashValue, expires] = hash.split('.')

  let now = Date.now()
  if (now > parseInt(expires)) {
    return res.status(504).send({ msg: 'timeout please try again' })
  }
  const data = `${Téléphone}.${otp}.${expires}`
  const newCalculatedHash = crypto.createHmac('sha256', "4d2fa64935b719216648dcd8870004f83b58894eeb741d5a7343900a1e7a322f643734592bf14476d4433bafec75365fdae80418d605b6867421f93dc989e070").update(data).digest('hex')

  if (newCalculatedHash === hashValue) {

    return res.status(202).send({ msg: 'user Confirmed', otp: otp })
  } else {
    return res.status(400).send({ verification: false, msg: 'incorrect OTP' })
  }
}
