const mongoose = require('mongoose');

const CertificatSchema = mongoose.Schema({
    Libelle: {
        type : String,
      //  required:true
    },
    Signature: {
        type : String,
      //  required:true
    },
    Formation : {
        type:mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('Certificat',CertificatSchema)