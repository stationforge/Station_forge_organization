/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // get user and add a custom claim  ( admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin
        .auth()
        .setCustomUserClaims(user.uid, { admin: true })
        .then((res) => {
          console.log(`Added role to ${user.email}`);
          return {
            message: `success ! ${data.email} has been made an admin`,
          };
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      return err;
    });
});
