const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const TopicsShema = new mongoose.Schema({
    title :{type : String},
    text: {type : String},
    section : {type : mongoose.Schema.Types.ObjectId, ref :'Sections'},
    member: {type : mongoose.Schema.Types.ObjectId, ref :'Members'},
    isVisible : {type: Boolean , default: true},
    createdAt : {type:Date}
})

const population = [{
    path : 'section',
    match : {isVisible: true}
},
{
    path: 'member',
    match : {isVisible: true}
}]

TopicsShema.pre('find', findVisible(population));
TopicsShema.pre('findOne', findVisible(population));
TopicsShema.pre('findOneAndUpdate', findVisible());
TopicsShema.pre('count', findVisible());
TopicsShema.pre('countDocuments', findVisible());


TopicsShema.plugin(deepPopulate,{})

//pour transférer en schéma
const Topics = mongoose.model('Topics', TopicsShema ,'Topics');
module.exports = Topics