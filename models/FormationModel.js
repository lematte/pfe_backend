const mongoose = require('mongoose');
//const deepPopulate = require('mongoose-deep-populate')(mongoose);
//const findVisible = require('./findVisible');

const FormationSchema = mongoose.Schema({
    Libelle: {
        type : String,
        required:true
    },
    Durrée: {
        type : String,
        required:true
    },
    Type: {
        type : String,
        required:true,
        enum:["présentielle","en ligne"]
    },
    Date: {
        type : String,
        //required:true
    },
    Heure: {
        type : String,
        //required:true
    },
    Description: {
        type : String,
        //required:true
    },
    Prix: {
        type : Number,
        required:true
    },
    Formateur : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Formateur'
    },
    Centre_formation : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Centre_formation'
    },
    Examen:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Examen'
    },
    isVisible : {
        type: Boolean , 
        default: true
    },
    createdAt : {
        type:Date
    }

})
/*
const population = [{
    path: 'Formateur',
    match : {isVisible: true}
},{
    path: 'Centre_formation',
    match : {isVisible: true}
},{
    path: 'Examen',
    match : {isVisible: true}
}
]


FormationSchema.pre('find', findVisible(population));
FormationSchema.pre('findOne', findVisible(population));
FormationSchema.pre('findOneAndUpdate', findVisible());
FormationSchema.pre('count', findVisible());
FormationSchema.pre('countDocuments', findVisible());


FormationSchema.plugin(deepPopulate,{})*/

module.exports = mongoose.model('Formation',FormationSchema)