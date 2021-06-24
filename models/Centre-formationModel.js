const mongoose = require('mongoose');

const Centre_formationSchema = new mongoose.Schema({
    Nom_centre :{
        type:String,
        required:true,
    },
    Code_postal:{
        type:String,
       // required:true,
    },
    Latitude:{
        type:String,
       // required:true,
    },
    Longitude:{
        type:String,
        // required:true,
    },
    Document_Juridique:{
        type:String
    },
    User: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'Users'
    },
    statut:{
        type:Number,
        enum:[0,1],
        required:true,
        default: 0
    },
    isVisible : {
        type: Boolean, 
        default: true
    },
    createdAt : {
        type:Date
    }
})

//pour transférer en schéma
const Centre_formation = mongoose.model('Centre_formation', Centre_formationSchema);
module.exports = Centre_formation
