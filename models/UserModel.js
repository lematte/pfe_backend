const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const bcrypt = require('bcrypt');

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
        required:true
    },
    IDcardnumber: {
        type : Number,
        required:true
    },
    Pays:{
        type : String,
        required:true
    }, 
    Ville:{
        type : String,
        required:true
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

/*UserSchema.methods.hashPassword = function(Password){
    return bcrypt.hashSync(Password,bcrypt.genSaltSync(10))
}
UserSchema.methods.comparePassword = function(Password, hash){
    return bcrypt.compareSync(Password,hash)
}*/

const Users = mongoose.model('Users', UserSchema);
module.exports = Users
