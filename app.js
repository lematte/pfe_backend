var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser")
require('dotenv').config();
var cors = require('cors');

var authRouter = require('./routes/auth.route');
var usersRouter = require('./routes/users');
var centreformationRouter = require('./routes/centreFormation');
var formateurRouter =require('./routes/formateur');
var candidatRouter =require('./routes/candidat');
var adminRouter =require('./routes/admin');
var examenRouter = require('./routes/examen')
var formationRouter = require('./routes/formation')
var certificatRouter = require('./routes/certificat')
var evaluationRouter = require('./routes/evaluation')
var salleRouter= require('./routes/salle')
var contratformationRouter = require('./routes/ContratFormation')
var contratformateurRouter = require('./routes/contratFormateur')
var categoriesRouter = require('./routes/categories')
//Instancier le serveur
var app = express();

//configuration de Body Parser
app.use(bodyParser.urlencoded({extended: true})); //pour forcer le parse dans le objects incluent dans d'autres 
app.use(bodyParser.json());


app.use(cors());
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//CROS VALIDATION HTTP HTTPS

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

//Configuration routes
app.use('/', authRouter);

app.use('/centre_formations', centreformationRouter);
app.use('/formateurs', formateurRouter);
app.use('/candidats', candidatRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/examen', examenRouter);
app.use('/formations', formationRouter);
app.use('/certificats', certificatRouter);
app.use('/evaluations', evaluationRouter);
app.use('/salles',salleRouter)

app.use('/contrat_formations',contratformationRouter)
app.use('/contrat_formateurs',contratformateurRouter)
app.use('/categories',categoriesRouter)





//connection mongodb
mongoose.connect(process.env.DB_CONNECTION, 
{
  useNewUrlParser: true  ,
  useFindAndModify: false ,
  useUnifiedTopology: true ,
  useCreateIndex: true
})
.then(() => {
  console.log('connected to db!');
  })
.catch((err) => {
  console.error('Error connecting to Mongo', err);
});

// Page not found 404 
app.use(function(req, res, next) {
  res.status(404).json({
    errors : "page not found"
  })
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = 5000
app.listen(port, () => console.log(`server started on port${port}`))
module.exports = app;