const mongoose = require('mongoose');

const CategoriesSchema = new mongoose.Schema({
    libelle: {
        type : String,
        required:true
    },
    type:{
        type : String,
        required:true
    },
    isVisible : {
        type: Boolean, 
        default: true
    },
    createdAt : {
        type : Date
    }
});

const Categories = mongoose.model('Categories', CategoriesSchema);
module.exports = Categories
