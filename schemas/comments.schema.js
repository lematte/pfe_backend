const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const CommentsShema = new mongoose.Schema({
    text: {type : String},
    topic : {type : mongoose.Schema.Types.ObjectId, ref :'Topics'},
    member: {type : mongoose.Schema.Types.ObjectId, ref :'Members'},
    isVisible : {type: Boolean , default: true},
    createdAt : {type:Date}
})

const population = [{
    path : 'topic',
    match : {isVisible: true}
},
{
    path: 'member',
    match : {isVisible: true}
}]

CommentsShema.pre('find', findVisible(population));
CommentsShema.pre('findOne', findVisible(population));
CommentsShema.pre('findOneAndUpdate', findVisible());
CommentsShema.pre('count', findVisible());
CommentsShema.pre('countDocuments', findVisible());


CommentsShema.plugin(deepPopulate,{})

//pour transférer en schéma
const Comments = mongoose.model('Comments', CommentsShema ,'Comments');
module.exports = Comments