"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import logo from "../../../public/logo.webp";
import { usePathname } from "next/navigation";
import searchimg from "../../../public/support/search_icon.png";
import mob_ham from "../../../public/mob_ham.png";
import mob_ham_exit from "../../../public/mob_ham_exit.webp";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../utils/fire_base_config";
import axios from "axios";
import { useProfile_Context } from "../utils/profile_context";
import Admin_Mobile_header from "./mobile_header";
import Search_Items from "./search_items";
import { useAdmin_context } from "../utils/admin_context";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

type HeaderProp = {
  showModeratorBtn?: boolean;
};

const Header = ({ position, padding, top, blur }: any) => {
  const [mobile_bg_changer, setmobile_bg_changer] = useState<any>(false);
  const [comedown, setcomedown] = useState(false);
  const [show_search_items, setshow_search_items] = useState(false);
  const [search_text, setsearch_text] = useState("");
  const [avater, setavater] = useState("");
  const [nav_array, setnav_array] = useState([
    {
      link: "/admin/dashboard",
      txt: "Dashboard",
    },
    {
      link: "/admin/digitalsales",
      txt: "Digital sales",
    },
    {
      link: "/admin/digitaluploads",
      txt: "Digital Uploads",
    },
    {
      link: "/admin/postinsight",
      txt: "Posts & Insights",
    },
  ]);

  initializeApp(firebaseConfig);
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  // init authentication
  const auth: any = getAuth();
  const pathname = usePathname();
  const db = getFirestore();

  // this is just to get the user dp
  useEffect(() => {
    //  setpage_loader(true);

    // User is authenticated, redirect to a protected route
    const user_ref = collection(db, "users");
    const user_query = query(
      user_ref,
      where("userid", "==", auth.currentUser.uid),
    );

    getDocs(user_query).then((e) => {
      setavater(e.docs[0].data().avatar_url);
    });

    // console.log(admin_doc.doc)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlecustomclaim = async () => {};

  const { show_setting, setnotification, setshow_setting }: any =
    useAdmin_context();

  // this dashboard is for other pages but because of design we would have props passed into it to take either a fixed or absolute position
  return (
    <>
      <div
        className={`w-full fixed top-[1vw] ${
          blur ? "sm:backdrop-blur-[5px] " : ""
        }  sm:top-0 sm:py-[2.5vw]  right-0 h-auto px-[2vw] z-[999]`}
        style={{ position: position, padding: padding, top: top }}
      >
        {mobile_bg_changer && (
          <Admin_Mobile_header
            setmobile_bg_changer={setmobile_bg_changer}
            comedown={comedown}
            setcomedown={setcomedown}
            links={nav_array}
            // loggedin={loggedin}
          />
        )}
        <nav
          className="w-full  sm:bg-opacity-[90%] drop-shadow-2xl rounded-[2vw] flex items-center justify-between sm:px-[3vw] h-[6vw] sm:h-[20vw] sm:rounded-[5vw] px-[2vw]"
          style={{
            backgroundColor: mobile_bg_changer ? "#181818" : "#000002",
            transition: "0.6s ease",
            opacity: mobile_bg_changer ? 1 : "",
          }}
        >
          <div className=" hidden sm:flex  justify-between items-center h-full w-full">
            <div className="w-full">
              <button
                className="= w-[10vw] h-auto flex"
                onClick={() => {
                  if (mobile_bg_changer) {
                    setcomedown(false);
                    setTimeout(() => {
                      setmobile_bg_changer(false);
                    }, 850);
                  } else {
                    setmobile_bg_changer(!mobile_bg_changer);
                  }
                }}
              >
                <Image
                  src={mobile_bg_changer ? mob_ham_exit : mob_ham}
                  alt="StationForge Logo"
                  className="w-full h-fit "
                  style={{ transition: "2s ease" }}
                />
              </button>
            </div>

            <div className="w-full">
              <Link
                href="/"
                aria-label="StationForge Home"
                className="= w-[30vw] h-auto flex"
                onClick={() => {
                  if (pathname == "/") {
                    setpage_loader(false);
                  } else {
                    setpage_loader(true);
                  }
                }}
              >
                <Image
                  src={logo}
                  alt="StationForge Logo"
                  className="w-full h-fit"
                />
              </Link>
            </div>

            <div className=" w-full flex gap-[2vw] items-center justify-end">
              <button
                onClick={() => {
                  setnotification(true);
                }}
                className="w-[10vw] bg-white bg-opacity-[8%] h-[10vw]   border-opacity-[30%] flex justify-center items-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    text-white text-[4vw] rounded-[100%]"
                // onClick={handlecustomclaim}
              >
                {" "}
                <i className="bi bi-bell"></i>
              </button>
              <Link
                href={"/admin/moderator-all"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="w-[10vw] bg-white bg-opacity-[8%] h-[10vw]   border-opacity-[30%] flex justify-center items-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    text-white text-[4vw] rounded-[100%]"
                // onClick={handlecustomclaim}
              >
                {" "}
                <i className="bi bi-chat-dots"></i>
              </Link>
            </div>
          </div>

          {/* this is the desktop design  */}
          <div className="w-full h-full flex items-center justify-between sm:hidden">
            {/* logo */}
            <Link
              href={"/"}
              onClick={() => {
                if (pathname == "/") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
            >
              <Image
                src={logo}
                alt="Stationforge logo"
                className="w-[10vw] h-fit"
              />
            </Link>

            {/* the linking options */}
            <div className="w-auto flex justify-center  items-center gap-[2vw] ">
              {nav_array.map((e: any, index: any) => {
                return (
                  <Link
                    key={index}
                    onClick={() => {
                      if (pathname == "/admin/postinsight") {
                        setpage_loader(false);
                      } else {
                        setpage_loader(true);
                      }
                    }}
                    href={e.link}
                    className={`text-[0.9vw]   transition duration-[0.3s] hover:text-opacity-[100%] h-full ${
                      pathname == e.link
                        ? "text-white text-opacity-[100%]  bg-[#161515] py-[0.5vw] px-[1vw] rounded-[1.2vw] "
                        : "text-white text-opacity-[40%]"
                    } `}
                  >
                    {e.txt}
                  </Link>
                );
              })}
            </div>

            {/* the search , moderator and other actions */}
            <div className="w-auto flex items-center justify-center  gap-[1vw] ">
              {/* this is the input field  */}
              <div className="w-auto  relative items-center  flex justify-center   ">
                <div className="absolute  h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
                  <Image
                    src={searchimg}
                    alt="Search icon image"
                    className="w-[1.3vw]  h-fit"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search pages"
                  className="h-[3vw] w-[23vw] search  text-white neuer text-[0.9vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-transparent  border-white border-opacity-[30%] border-[0.1vw]"
                  onFocus={() => {
                    setshow_search_items(true);
                  }}
                  onChange={(e) => {
                    setsearch_text(e.target.value);
                  }}
                />
                {show_search_items && (
                  <Search_Items
                    show_search_items={show_search_items}
                    setshow_search_items={setshow_search_items}
                    search_text={search_text}
                    setsearch_text={setsearch_text}
                  />
                )}
              </div>

              <Link
                href={"/admin/add-moderator"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="text-white border-[0.1vw] border-white border-opacity-[30%] rounded-[1.6vw] py-[0.8vw] px-[1.6vw] hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black  text-[0.8vw]"
              >
                Add a moderator
              </Link>

              <button
                onClick={() => {
                  setnotification(true);
                }}
                className="w-[2.5vw]  cursor-pointer   h-[2.5vw] border-[0.1vw] border-white border-opacity-[30%] flex justify-center items-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    text-white text-[1.2vw] rounded-[100%]"
                // onClick={handlecustomclaim}
              >
                {" "}
                <i className="bi bi-bell"></i>
              </button>
              <Link
                href={"/admin/moderator-all"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="w-[2.5vw] h-[2.5vw] border-[0.1vw] border-white border-opacity-[30%] flex justify-center hover:bg-[#CCFF00] duration-[0.6s] transition hover:text-black    items-center  text-white text-[1.2vw] rounded-[100%]"
              >
                <i className="bi bi-chat-dots"></i>
              </Link>
              <div
                onClick={() => {
                  setshow_setting(true);
                }}
                className="w-[3vw] h-[3vw] overflow-hidden cursor-pointer  rounded-[100%] avater_bg "
                style={{
                  backgroundImage:
                    "url(https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w)",
                }}
              >
                <Image
                  unoptimized
                  width="0"
                  height="0"
                  src={
                    avater
                      ? avater
                      : "url(https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w)"
                  }
                  alt="bg"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
