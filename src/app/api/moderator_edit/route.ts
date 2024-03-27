// /src/api/test.ts
// import admin from "@/app/utils/customclaim";
import firebaseConfig from "@/app/utils/fire_base_config";
import firebaseadmin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

var serviceAccount = require("../../api/customClaims/service.json");
// console.log(firebaseadmin.apps[0]);
if (firebaseadmin.apps.length > 0) {
} else {
  firebaseadmin
    .initializeApp({
      credential: firebaseadmin.credential.cert(serviceAccount),
      projectId: "fir-9-dojo-24129",
      databaseURL: "https://fir-9-dojo-24129.firebaseapp.com",
    })
    .firestore();
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  try {
    const data = await req.json();
    const userCredential = await getAuth().createUser({
      email: data.email,
      password: data.password,
    });

    return NextResponse.json({ uid: userCredential.uid }, { status: 200 });
  } catch (error: any) {
    if (error.code) {
      // console.error("Error during Firebase Admin SDK test:", error);

      return NextResponse.json({ error: error }, { status: 200 });
    } else {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }

  // try {
  //   const auth = getAuth();
  //   const userCredential = await createUserWithEmailAndPassword(
  //     auth,
  //     "user@example.com",
  //     "secretPas:asword",
  //   );

  //   // If successful, userCredential.user will contain user information
  //   console.log("Successfully created new user:", userCredential.user.uid);

  //   // Return the UID or any other relevant information
  //   return NextResponse.json(
  //     { uid: userCredential.user.uid },
  //     { status: 200 },
  //   );
  // } catch (error) {
  //   console.error("Error during Firebase Admin SDK test:", error);

  //   // Return the error message
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
}
