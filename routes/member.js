var express = require('express');
var router = express.Router();
const Members = require('../schemas/member.schema')
/* GET users listing. */

router.get('/', async function (req, res, next) {
  const sections = await Members.find({
    isVisible : "true"
  })
  res.send(sections);
});

router.post('/', async function(req , res , next){
  const {username ,
    password,
    email,
    gender,
    bd} = req.body

    //if username exist
    let error = false;
    const member = await Members.findOne({
    username 
    })
    if(member){
      error =true;
    res.send({msg: 'username alreadey register', ok: false});
    }
    //vérifier le mot de passe
    if(password.length ===0){
      error =true;
      res.send({msg: 'password not valid', ok: false});

    }
  if(error==false){
    const member = await Members.create({
      username ,
      password,
      email,
      gender,
      bd,
      createdAt : new Date()
    })
  }
  res.send({member, ok: true});
  })

router.put('/', async function (req, res, next) {
  const { username ,
    password,
    email,
    gender,
    bd, _id } = req.body
  const newSection = await Members.findByIdAndUpdate(_id,
    {
    username ,
    password,
    email,
    gender,
    bd
    }, { new: true })
  res.send(newSection);

})

router.delete('/', async function (req, res, next) {
  const { _id } = req.body
  const newSection = await Members.findByIdAndUpdate(_id,
    {
      isVisible : false
    }, { new: true })
  res.send(newSection);

})

router.post('/login', async function (req, res, next){
  const { username ,
  password} = req.body
  //check member
  const member = await Members.findOne({
    username ,
  password
  })

  if(member){
    res.send({state: 'done' , ok :true , _id: member._id , username: member.username});
  }else {
    res.send({state: 'error data', ok : false})
  }
})


module.exports = router;
