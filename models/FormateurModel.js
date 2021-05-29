const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const FormateurSchema = new mongoose.Schema({
    Prenom :{
        type:String,
        required:true,
    },
    Nom :{
        type:String,
        required:true,
    },
    Etudes_effectuees :{
        type:String,
        required:true,
    },
    Expériences  :{
        type:String,
        required:true,
    },
    User: {
        type : mongoose.Schema.Types.ObjectId, 
        ref :'Users'
    },
    isVisible : {
        type: Boolean , 
        default: true
    },
    createdAt : {
        type:Date
    }
})

const population = [{
    path: 'User',
    match : {isVisible: true}
}
]


FormateurSchema.pre('find', findVisible(population));
FormateurSchema.pre('findOne', findVisible(population));
FormateurSchema.pre('findOneAndUpdate', findVisible());
FormateurSchema.pre('count', findVisible());
FormateurSchema.pre('countDocuments', findVisible());


FormateurSchema.plugin(deepPopulate,{})

const Formateur = mongoose.model('Formateur', FormateurSchema);
module.exports = Formateur
