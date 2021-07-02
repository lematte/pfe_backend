const mongoose = require('mongoose');

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
        enum:["presentielle","en ligne"]
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

module.exports = mongoose.model('Formation',FormationSchema)