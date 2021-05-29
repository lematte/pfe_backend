const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

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
const population = []

module.exports = mongoose.model('Examen',ExamenSchema)