const admin = require("firebase-admin");
const json = require("./firebase.json");

const firebase = admin.initializeApp({
  credential: admin.credential.cert(json),
});

module.exports = { firebase };
