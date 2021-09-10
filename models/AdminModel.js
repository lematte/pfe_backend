const mongoose = require('mongoose');

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


//pour créer une collection
const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin
