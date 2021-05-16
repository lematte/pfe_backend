const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const MembersShema = new mongoose.Schema({
    username :{type : String},
    password: {type : String},
    email: {type : String},
    gender: {type : String},
    bd: {type : Date},
    isVisible : {type: Boolean , default: true},
    createdAt : {type:Date}
})

const population = []

//pour transférer en schéma
const Members = mongoose.model('Members', MembersShema ,'Members');
module.exports = Members
