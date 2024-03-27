"use client";

import React, { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import station_forge from "../../../public/chats/station_forge.webp";
import avatar from "../../../public/setings/avatar.jpg";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { fromUnixTime } from "date-fns";
import format from "date-fns/format";
import { useProfile_Context } from "@/app/utils/profile_context";
import firebaseConfig from "@/app/utils/fire_base_config";

const Admin_Chats_modal = ({
  setstage,
  admin_messages_arr,
  time_date,
  name,
  avatar,
}: any) => {
  const [loading, setloading] = useState(false);
  const [btn_disabled, setbtn_disabled] = useState(false);
  const [create_new_sess, setcreate_new_sess] = useState(true);
  const [show_end_and_start_btn, setshow_end_and_start_btn] = useState(false);

  const [chat_session_id, setchat_session_id] = useState("");
  const [chat_text, setchat_text] = useState("");
  const [chat_data_arr, setchat_data_arr] = useState<any>([]);

  // Explicitly define the type for useRef
  const new_session = useRef<any>(false);
  const {
    show_chat_modal,
    setshow_chat_modal,
    sess_id,
    create_chat_session,
  }: any = useProfile_Context();
  const [hide, sethide] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const chats = [
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
    {
      msg: "Hi good afternoon i would love to enquire about forges",
      user: true,
    },
    {
      msg: "Hello",
      user: false,
    },
    {
      msg: "Thank you for using station forge",
      user: false,
    },
  ];

  const [uuid, setuuid] = useState("");
  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Initialize services

  // get authentication
  const auth: any = getAuth();

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
        // User is authenticated, redirect to a protected route
        // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
        router.push("/login");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sethide(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>

      <div
        className={`w-[33vw] bg-[black] sm:max-h-[100vh] sm:h-full sm:w-full fixed pt-[6.5vw] sm:pt-[25vw] pb-[6vw] rounded-l-[1vw]  max-h-[88vh] h-full  sm:py-[5vw] px-[1.5vw] sm:top-0 sm:translate-y-0 top-[55vh] translate-y-[-45vh]  z-[999]   sm:gap-[4vw]   settings flex flex-col gap-[1.5vw] border-[#434343] overflow-hidden ${
          hide ? "right-[-50vw] sm:right-[-110vw]" : "right-0 sm:right-0"
        } border transition duration-[1.5s]`}
        ref={ref_modal}
        style={{ transition: "1.5s ease" }}
      >
        {/* this is for the top relative box  */}
        <div className="w-full fixed top-0 left-0 h-[5.5vw] bg-[#1F1E1E]  sm:h-[22vw]  bg-opacity-[50%] flex justify-start items-center neuer px-[1.3vw] gap-[1vw]  sm:px-[2vw] border-b-[0.2vw] border-white border-opacity-[60%]">
          <div className="w-full flex gap-[1vw] h-full items-center sm:gap-[3vw]">
            <i
              className="bi bi-chevron-left cursor-pointer text-white text-[1.2vw] sm:text-[6vw]"
              onClick={() => {
                sethide(true);
                setTimeout(() => {
                  setstage(2);
                }, 1000);
              }}
            ></i>

            <div
              className=" h-[3.2vw] w-[3.2vw] overflow-hidden sm:h-[10vw] sm:w-[10vw] rounded-[100%] avater_bg"
              style={{ backgroundImage: "url(/chats/station_forge.webp)" }}
            >
              <Image
                unoptimized
                width="0"
                height="0"
                src={avatar}
                alt={name}
                className="w-full h-full"
              />
            </div>

            {/*the name of the moderator for now its  talk to support */}
            <div className="w-fit  flex-col flex gap-[0.5vw] sm:gap-[1.2vw] ">
              <p className="text-[1vw] text-white sm:text-[4vw] ">{name}</p>
              <p className="text-[0.8vw]  text-white  sm:text-[3vw] italic text-opacity-[50%]">
                customer session
              </p>
            </div>
          </div>
        </div>

        {/* the date teh chat started  */}

        {/* this is for the chats */}
        <div
          className="w-full flex   overflow-y-scroll cover_scrollbar flex-col sm:px-[2vw] pb-[1vw] sm:pb-[18vw] sm:gap-[4vw] h-full gap-[0.6vw] "
          ref={scrollAreaRef}
        >
          <div className="w-full flex justify-center h-[2vw] sm:h-[9vw]  neuer">
            <p className="text-white text-[0.9vw] h-full px-[1vw] py-[0.4vw] border-white border-[0.1vw] flex items-center rounded-[2vw] border-opacity-[50%] sm:text-[4vw]  sm:px-[5vw] sm:rounded-[4vw] ">
              {time_date}
            </p>
          </div>
          {admin_messages_arr.length > 0 &&
            admin_messages_arr.map((e: any, index: any) => {
              return (
                <div
                  className={`w-full flex   ${
                    e.from != "user" ? "justify-start" : "justify-end"
                  }  h-auto bg-white"`}
                  key={index}
                >
                  <div
                    className={`w-fit rounded-[1vw] text-[0.8vw] sm:text-[3vw] sm:max-w-[41vw] sm:py-[1.5vw] sm:px-[2vw] sm:rounded-[2.5vw] py-[0.7vw] px-[0.8vw]  max-w-[12vw] h-auto border-[0.1vw] ${
                      e.from != "user"
                        ? "border-white border-opacity-[50%] text-white"
                        : "border-[#CCFF00] bg-[#CCFF00] text-black "
                    }  h-[2vw]`}
                  >
                    <p className={` `}>{e.message}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Admin_Chats_modal;
