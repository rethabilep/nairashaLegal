var admin = require('firebase-admin');
var serviceAccount = require('json/mokhosi.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://mokhosi-225208.firebaseio.com'
});