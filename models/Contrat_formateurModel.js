const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

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
const population = [
    {
        path: 'idFormateur',
        match : {isVisible: true}
    },
    {
        path: 'idCentre_formation',
        match : {isVisible: true}
    }
]

ContratformateurSchema.pre('find', findVisible(population));
ContratformateurSchema.pre('findOne', findVisible(population));
ContratformateurSchema.pre('findOneAndUpdate', findVisible());
ContratformateurSchema.pre('count', findVisible());
ContratformateurSchema.pre('countDocuments', findVisible());

ContratformateurSchema.plugin(deepPopulate,{})
module.exports = mongoose.model('Contrat_formateur',ContratformateurSchema)