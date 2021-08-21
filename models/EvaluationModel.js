const mongoose = require('mongoose');

const EvaluationSchema = mongoose.Schema({
    Note: {
        type : Number,
        required:true
    },
    Formation : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Formation'
    },
    Candidat : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Candidat'
    },
    isVisible : {
        type: Boolean , 
        default: true
    },
    createdAt : {
        type:Date
    }

})

module.exports = mongoose.model('Evaluation',EvaluationSchema)