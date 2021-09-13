const mongoose = require('mongoose');
const SalleSchema = mongoose.Schema({
    Libelle: {
        type : String,
      //  required:true
    },
    etat: {
        type : String,
       // required:true,
        enum:["libre","occupee"]
    },
    Centre_formation : {
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
module.exports = mongoose.model('Salle',SalleSchema)                                  