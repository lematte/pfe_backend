const mongoose = require('mongoose');
/*
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
*/
const ContratformationSchema = mongoose.Schema({
    Libelle: {
        type : String,
        required:true
    },
    Contrat: {
        type : String,
        required:true
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
/*
const population = 
[{
    path: 'Formation',
    match : {isVisible: true}
},
{
    path: 'Candidat',
    match : {isVisible: true}
}]

ContratformationSchema.pre('find', findVisible(population));
ContratformationSchema.pre('findOne', findVisible(population));
ContratformationSchema.pre('findOneAndUpdate', findVisible());
ContratformationSchema.pre('count', findVisible());
ContratformationSchema.pre('countDocuments', findVisible());

ContratformationSchema.plugin(deepPopulate,{})
*/
module.exports = mongoose.model('Contratformation',ContratformationSchema)