const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Lematte:51BCxd7YyWpd1kH2@cluster0.xlu4b.mongodb.net/test', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected ')
});
