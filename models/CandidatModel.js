const mongoose = require('mongoose');

const CandidatSchema = new mongoose.Schema({
    Prenom :{
        type:String,
        required:true,
    },
    Nom :{
        type:String,
        required:true,
    },
    Genre:{
        type:String,
        //required:true,
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

const Candidat = mongoose.model('Candidat', CandidatSchema);
module.exports = Candidat
