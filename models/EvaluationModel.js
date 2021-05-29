const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const EvaluationSchema = mongoose.Schema({
    Libelle: {
        type : String,
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
const population = [{
    path: 'Formation',
    match : {isVisible: true}
},{
    path: 'Candidat',
    match : {isVisible: true}
}
]


EvaluationSchema.pre('find', findVisible(population));
EvaluationSchema.pre('findOne', findVisible(population));
EvaluationSchema.pre('findOneAndUpdate', findVisible());
EvaluationSchema.pre('count', findVisible());
EvaluationSchema.pre('countDocuments', findVisible());


EvaluationSchema.plugin(deepPopulate,{})
module.exports = mongoose.model('Evaluation',EvaluationSchema)