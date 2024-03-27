// // /src/lib/firebase.ts
// // "use server";
// import admin from "firebase-admin";
// import { getApps } from "firebase/app";
// import { cert } from "firebase-admin/app";
// var serviceAccount = require("../../app/api/customClaims/service.json");
// const firebaseAppName = "custom";
// if (!getApps().length) {
//   admin.initializeApp(
//     {
//       credential: cert(serviceAccount),
//     },
//     firebaseAppName,
//   );
//   console.log("Firebase initialized.");
// } else {
//   const firebase_app  =  admin.app(firebaseAppName)
//     firebase_app
//       .delete()
//       .then(() => {
//         admin.initializeApp(
//     {
//       credential: cert(serviceAccount),
//     },
//     firebaseAppName,
//   );
//         console.log("Firebase app deleted and reinitialized.");
//       })
//       .catch((error) => {
//         console.error("Error deleting Firebase app:", error);
//       });
// }

// export default admin;
