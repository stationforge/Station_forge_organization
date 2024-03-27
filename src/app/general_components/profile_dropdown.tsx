"use client ";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Profile_dropdown = () => {
  const {
    show,
    setshow,
    setshow_setting_modal,
    setpage_loader,
    show_chat_modal,
    setshow_chat_modal,
    new_message,
  }: any = useProfile_Context();
  //   const [opacity, setopacity] = useState(0);
  const ref = useRef<any>(null);

  initializeApp(firebaseConfig);

  // init authentication
  const auth = getAuth();

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (event.target.classList.contains("profile_btn")) {
          return;
        } else if (event.target.classList.contains("setting_modal")) {
          return;
        } else if (event.target.classList.contains("settings")) {
          return;
        } else if (event.target.classList.contains("chats")) {
          return;
        } else {
          setshow(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlelogout = () => {
    signOut(auth)
      .then((e) => {
        // Sign-out successful.
        setshow(false);
      })
      .catch((error) => {
        // An error occurred during sign-out.
        console.error("Sign-out error:", error);
      });
  };
  const pathname = usePathname();
  return (
    <>
      {show ? (
        <>
          <div
            className="fixed top-[8vw] right-[5%] w-[13vw] h-[13vw]    z-[99]"
            ref={ref}
          >
            <div className="bg-white h-full w-full rounded-[1vw] flex flex-col">
              <div className="border-b-[lightgrey]    w-full border-b items-end flex pb-[0.5vw] px-[1vw] h-[28%]">
                <button
                  className="neuer   h-full items-end justify-start flex  w-full relative text-[1vw] hover:text-[lightgrey] font-[600]"
                  onClick={() => {
                    setshow_chat_modal(true);
                  }}
                >
                  {" "}
                  <i className="bi  pr-[0.6vw] font-[900] bi-chat-dots"></i>{" "}
                  Talk to us
                  {new_message && (
                    <div className="w-[0.9vw] h-[0.9vw] absolute rounded-[100%] bg-[red] bottom-[0.4vw] right-0"></div>
                  )}
                </button>
              </div>
              <div className="border-b-[lightgrey] flex flex-col border-b h-[44%] px-[1vw] justify-between py-[0.7vw] items-start">
                <Link
                  href={"/libary"}
                  onClick={() => {
                    if (pathname == "/libary") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="neuer text-[1vw] hover:text-[lightgrey] font-[600]"
                >
                  {" "}
                  <i className="bi pr-[0.6vw] font-[900] bi-phone"></i> Libary
                </Link>
                <button
                  className="neuer text-[1vw] hover:text-[lightgrey] font-[600]"
                  onClick={() => {
                    setshow_setting_modal(true);
                  }}
                >
                  <i className="bi pr-[0.6vw] font-[900] bi-gear"></i> Settings
                </button>
              </div>
              <div className="h-[28%] flex  px-[1vw]  pt-[0.6vw] items-start">
                <button
                  className="neuer text-[1vw] hover:text-[lightgrey] font-[600]"
                  onClick={handlelogout}
                >
                  <i className="bi pr-[0.6vw] font-[900] bi-box-arrow-left"></i>{" "}
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Profile_dropdown;
