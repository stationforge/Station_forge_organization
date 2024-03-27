"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import { FadeInTransition } from "react-transitions-library";
import success from "../../../../public/admin_section/post_upload/success.webp";
import Link from "next/link";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  runTransaction,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import Moderator_header from "./header";
import New_chats from "./new_chats";
import Moderator_Chats_modal from "./chat_modal";

export default function Home() {
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [user_data_username, setuser_data_username] = useState("");
  const [user_data_avater, setuser_data_avater] = useState("");
  const [stage, setstage] = useState(0);

  initializeApp(firebaseConfig);
  const auth: any = getAuth();
  const route = useRouter();
  const [session_id, setsession_id] = useState("");
  const [moderator_id, setmoderator_id] = useState("");

  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  // Initialize Firebase storage and Firestore
  const storage = getStorage();
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    setpage_loader(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        setmoderator_id(user.uid);

        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;

              if (snap == "admin" || snap == "moderator") {
                setshowdash(true);
                setpage_loader(false);
              } else {
                setshowdash(false);
                route.push("/");
              }
            } else {
              setshowdash(false);
              route.push("/");
            }
          })
          .catch(() => {
            console.log("error while getting user");
          });
      } else {
        setmoderator_id("");

        setpage_loader(false);
        setpage_loader(true);
        route.push("/login?ref=chats");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(user_data_avater);
  }, [user_data_avater]);

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <Moderator_header />
          <New_chats
            session_id={session_id}
            setsession_id={setsession_id}
            moderator_id={moderator_id}
            setstage={setstage}
            setuser_data_username={setuser_data_username}
            setuser_data_avater={setuser_data_avater}
          />

          {stage > 0 && (
            <Moderator_Chats_modal
              setstage={setstage}
              session_id={session_id}
              user_data_avater={user_data_avater}
              user_data_username={user_data_username}
            />
          )}
        </>
      ) : null}
    </>
  );
}
