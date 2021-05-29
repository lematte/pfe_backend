const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const AdminSchema = new mongoose.Schema({
    Prenom:{
        type:String,
        required:true,
    },
    Nom:{
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

const population = [
{
    path: 'User',
    match : {isVisible: true}
}]

AdminSchema.pre('find', findVisible(population));
AdminSchema.pre('findOne', findVisible(population));
AdminSchema.pre('findOneAndUpdate', findVisible());
AdminSchema.pre('count', findVisible());
AdminSchema.pre('countDocuments', findVisible());

AdminSchema.plugin(deepPopulate,{})

//pour créer une collection
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin
