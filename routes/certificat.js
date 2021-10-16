var express = require('express');
var router = express.Router();
const certificatController = require('../controllers/certificatController')
const upload= require('../middleware/signatureCertificat')

router.get('/', certificatController.getAll );
router.get('/formation/:id', certificatController.getCertificatByIdFormation );
router.get('/candidat_formation/:id/:Candidat', certificatController.getCertificatByIdCandidat_Formation )
router.post('/add',certificatController.add )
router.post('/upload/:id',upload, certificatController.uploadSignature)
router.get('/:id', certificatController.getById )
router.put('/:id/update', certificatController.update )
router.delete('/delete/:id', certificatController.delete)

module.exports = router;
