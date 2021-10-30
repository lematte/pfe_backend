const mongoose = require('mongoose');

const ContratformateurSchema = mongoose.Schema({
    Libelle : {
        type : String,
       // required:true
    },
    Document : {
        type : String,
        //required:true
    },
    etat:{
        type : String,
        required:true,
        enum:["en attente", "acceptée", "refusée",  "retirée"]
    },
    idFormateur : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Formateur'
    },
    idCentre_formation : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Centre_formation'
    },
    isVisible : {
        type: Boolean, 
        default: true
    },
    createdAt : {
        type:Date
    }
})
module.exports = mongoose.model('Contrat_formateur',ContratformateurSchema)