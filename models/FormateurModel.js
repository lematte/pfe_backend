const mongoose = require('mongoose');

const FormateurSchema = new mongoose.Schema({
    Prenom :{
        type:String,
        required:true,
    },
    Nom :{
        type:String,
        required:true,
    },
    Etudes_effectuees :{
        type:String,
       // required:true,
    },
    Expériences  :{
        type:String,
       // required:true,
    },
    User: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'Users'
    },
    isVisible : {
        type: Boolean ,
        default: true
    },
    createdAt : {
        type:Date
    }
})

const Formateur = mongoose.model('Formateur', FormateurSchema);
module.exports = Formateur
