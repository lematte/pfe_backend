const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const CandidatSchema = new mongoose.Schema({
    Prenom :{
        type:String,
        required:true,
    },
    Nom :{
        type:String,
        required:true,
    },
    Genre:{
        type:String,
        //required:true,
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
/*
const population = [
{
    path: 'User',
    match : {isVisible: true}
}]

CandidatSchema.pre('find', findVisible(population));
CandidatSchema.pre('findOne', findVisible(population));
CandidatSchema.pre('findOneAndUpdate', findVisible());
CandidatSchema.pre('count', findVisible());
CandidatSchema.pre('countDocuments', findVisible());

CandidatSchema.plugin(deepPopulate,{})
*/
const Candidat = mongoose.model('Candidat', CandidatSchema);
module.exports = Candidat
