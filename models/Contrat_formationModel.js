const mongoose = require('mongoose');
const ContratformationSchema = mongoose.Schema({
    Libelle: {
        type : String,
        required:true
    },
    Contrat: {
        type : String,
      //  required:true
    },
    etat:{
        type : String,
        required:true,
        enum:["n'est pas abonné", "en attent", "ok", "refusé"]
    },
    Formation :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Formation'
    },
    Candidat:{
        type:mongoose.Schema.Types.ObjectId,
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
module.exports = mongoose.model('Contratformation',ContratformationSchema)