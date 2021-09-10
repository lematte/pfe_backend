const mongoose = require('mongoose');

const ContratformateurSchema = mongoose.Schema({
    Libelle : {
        type : String,
        required:true
    },
    Document : {
        type : String,
        required:true
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
        type: Boolean , 
        default: true
    },
    createdAt : {
        type:Date
    }
})
module.exports = mongoose.model('Contrat_formateur',ContratformateurSchema)