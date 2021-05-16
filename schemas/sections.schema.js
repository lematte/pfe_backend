const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const SectionsShema = new mongoose.Schema({
    name :{type : String},
    description: {type : String},
    isVisible : {type: Boolean , default: true},
    createdAt : {type:Date}
})

const population = []

//pour transférer en schéma
const Sections = mongoose.model('Sections', SectionsShema ,'Sections');
module.exports = Sections