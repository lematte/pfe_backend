const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const SalleSchema = mongoose.Schema({
    Libelle: {
        type : String,
        required:true
    },
    état: {
        type : String,
        required:true,
        enum:["libre","occupée"]
    },
    Formation : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Formation'
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
}
]


SalleSchema.pre('find', findVisible(population));
SalleSchema.pre('findOne', findVisible(population));
SalleSchema.pre('findOneAndUpdate', findVisible());
SalleSchema.pre('count', findVisible());
SalleSchema.pre('countDocuments', findVisible());


SalleSchema.plugin(deepPopulate,{})
module.exports = mongoose.model('Salle',SalleSchema)                                  