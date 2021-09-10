const mongoose = require('mongoose');


const ExamenSchema = mongoose.Schema({
    Libelle: { 
        type : String,
        required:true
    },
    Description: {
        type : String,
        required:true
    },
    isVisible : {
        type: Boolean , 
        default: true
    },
    createdAt : {
        type:Date
    }

})

module.exports = mongoose.model('Examen',ExamenSchema)