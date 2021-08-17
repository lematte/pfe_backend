const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Email: {
        type : String,
        required:true
    },
    Password: {
        type : String,
        required:true
    },
    Téléphone: {
        type : Number,
       // required:true
    },
    IDcardnumber: {
        type : Number,
        //required:true
    },
    Pays:{
        type : String,
        //required:true
    }, 
    Ville:{
        type : String,
        //required:true
    }, 
    Photo: {
        type : String,
        //required:true
    },
    role: {type : String,
            required: true, 
            enum:["admin","centre_formation", "candidat", "formateur"]
        },
    isVisible : {
        type: Boolean , 
        default: true
    },
    createdAt : {
        type : Date
    }
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users
