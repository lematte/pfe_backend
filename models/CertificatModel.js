const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');

const CertificatSchema = mongoose.Schema({
    Libelle: {
        type : String,
        required:true
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


CertificatSchema.pre('find', findVisible(population));
CertificatSchema.pre('findOne', findVisible(population));
CertificatSchema.pre('findOneAndUpdate', findVisible());
CertificatSchema.pre('count', findVisible());
CertificatSchema.pre('countDocuments', findVisible());


CertificatSchema.plugin(deepPopulate,{})
module.exports = mongoose.model('Certificat',CertificatSchema)