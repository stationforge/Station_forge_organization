// /src/api/test.ts
// import admin from "@/app/utils/customclaim";
import firebaseConfig from "@/app/utils/fire_base_config";
import firebaseadmin from "firebase-admin";
import { cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
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
    // const userCredential = await getAuth().getUsers([{ uid: data.uid }]);
    const userCredential_update = await getAuth().updateUser(data.uid, {
      email: data.user_email,
    });
    // Initialize the data base connection
    initializeApp(firebaseConfig);
    const db = getFirestore();

    const docRef = doc(db, "users", data.doc_id);
    const checkupdate = await updateDoc(docRef, {
      Username: data.user_username,
      Email: data.user_email,
    });
    // const userCredential = await getAuth().getUsers([{ uid: data.uid }]);

    return NextResponse.json({ completed: true }, { status: 200 });
  } catch (error: any) {
    if (error.code) {
      // console.error("Error during Firebase Admin SDK test:", error);

      return NextResponse.json({ error: error }, { status: 200 });
    } else {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 500 });
    }
  }
}
