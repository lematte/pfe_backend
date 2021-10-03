const mongoose = require('mongoose');


const ExamenSchema = mongoose.Schema({
    Libelle: { 
        type : String,
        //required:true
    },
    Description: {
        type : String,
        //required:true
    },
    Note: {
        type : String,
       // required:true
    },
    Remarque:{
        type : String,
        // required:true
    },
    Formation :{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Formation'

    },
    Candidat:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Candidat'
    },
    isVisible : {
        type: Boolean, 
        default: true
    },
    createdAt : {
        type:Date
    }

})

module.exports = mongoose.model('Examen',ExamenSchema)