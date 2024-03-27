"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import logo from "../../../public/logo.webp";
import mob_ham from "../../../public/mob_ham.png";
import mob_ham_exit from "../../../public/mob_ham_exit.webp";
import mob_cart from "../../../public/mob_cart.png";

import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Mobile_header from "./mobile_header";
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Chats_modal from "./chat";

initializeApp(firebaseConfig);

// init authentication
const auth = getAuth();

const Header = () => {
  const [loggedin, setloggedin] = useState(false);
  const [comedown, setcomedown] = useState(false);
  const [admin_loggedin, setadmin_loggedin] = useState(false);
  const [moderator_loggedin, setmoderator_loggedin] = useState(false);
  const [track_hide_download, settrack_hide_download] = useState(true);
  const [track_progress, settrack_progress] = useState<any>("0");
  const [mobile_bg_changer, setmobile_bg_changer] = useState<any>(false);
  const {
    toggleDropdown,
    downloadProgress,
    setpage_loader,
    setforge_loader,
    hide_download,
    show_chat_modal,
    setshow_chat_modal,
    new_message,
    update_message_notification,
    setnew_message,
  }: any = useProfile_Context();
  const pathname = usePathname();
  const route = useRouter();
  const [links, setlinks] = useState([
    {
      txt: "Physical store",
      link: "https://malkainstaging.website/forge/shop/",
    },
    {
      txt: " Digital store",
      link: "/",
    },
    {
      txt: "  Subscriptions",
      link: "/subscriptions",
    },
    {
      txt: "    Community",
      link: "https://malkainstaging.website/forge/community/",
    },
    {
      txt: "    Support",
      link: "/support",
    },
  ]);

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        setloggedin(true);
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;

              if (snap == "admin") {
                setmoderator_loggedin(false);
                setadmin_loggedin(true);
                setpage_loader(false);
              } else if (snap == "moderator") {
                setmoderator_loggedin(true);
                setadmin_loggedin(false);
              } else {
                setadmin_loggedin(false);
              }
            } else {
              setadmin_loggedin(false);
            }
          })
          .catch(() => {
            console.log("error while getting user");
          });
      } else {
        setadmin_loggedin(false);
        setloggedin(false);
        setmoderator_loggedin(false);

        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("downloadProgress", "0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgress = localStorage.getItem("downloadProgress");
      if (storedDownloadProgress == null) {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
      } else if (storedDownloadProgress == "0") {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
        return;
      } else {
        settrack_hide_download(false);
        settrack_progress(storedDownloadProgress);
      }
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update the chat notifications

  useEffect(() => {
    if (!auth?.currentUser?.uid) {
      // No user is authenticated, you might want to handle this case
      return;
    }

    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionsQuery = query(
      chatSessionsRef,
      where("JoinedUserid", "==", auth?.currentUser?.uid),
      where("Endedsession", "==", false),
    );

    const unsubscribe = onSnapshot(chatSessionsQuery, (snapshot) => {
      if (snapshot.empty) {
        // Handle case when there are no documents

        return;
      }

      snapshot.forEach(async (doc) => {
        // Handle each document
        const chatSessionData = doc.data();

        // Convert Firebase Timestamp to JavaScript Date

        // Assuming your timestamp field is named 'SessioncreatedAt'
        chatSessionData.isNotReadByUser
          ? update_message_notification()
          : setnew_message(false);
      });
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [auth?.currentUser?.uid]); // Dependency on currentUserUid, so it re-subscribes when the user logs in or out

  return (
    <>
      {show_chat_modal && <Chats_modal />}
      {/* <Chats_modal /> */}
      <header className="w-full h-[4.7vw] sm:h-[20vw]  bg-transparent absolute z-[99] top-[2.5vw] sm:top-0 flex justify-center ">
        {mobile_bg_changer && (
          <Mobile_header
            setmobile_bg_changer={setmobile_bg_changer}
            comedown={comedown}
            setcomedown={setcomedown}
            links={links}
            loggedin={loggedin}
          />
        )}
        <nav
          className="w-[90%] sm:w-[100%] sm:px-[5%] h-full pr-[1.3vw] bg-[#0A0B0B] sm:bg-[black] border-[#CCFF00] sm:bg-opacity-[50%] border-opacity-[5%] sm:border-none border rounded-[1.06vw] flex justify-between  items-center backdrop-blur-[14px]  bg-opacity-[30%]"
          style={{
            backgroundColor: mobile_bg_changer ? "#181818" : "",
            transition: "0.6s ease",
            opacity: mobile_bg_changer ? 1 : "",
          }}
        >
          {/* mobile design */}
          {/* mobile design */}
          {/* mobile design */}
          {/* mobile design */}
          {/* mobile design */}
          <div className="sm:block sm:w-fit  hidden">
            <button
              className="= w-[10vw] h-auto flex"
              onClick={() => {
                if (mobile_bg_changer) {
                  setcomedown(false);
                  setTimeout(() => {
                    setmobile_bg_changer(false);
                  }, 800);
                } else {
                  setmobile_bg_changer(!mobile_bg_changer);
                }
              }}
            >
              <Image
                src={mobile_bg_changer ? mob_ham_exit : mob_ham}
                alt="StationForge Logo"
                className="w-full h-fit"
                style={{ transition: "2s ease" }}
              />
            </button>
          </div>

          <div className="sm:block sm:w-fit  hidden">
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

          <div
            className="sm:block sm:w-fit  hidden"
            onClick={() => {
              setforge_loader(true);
            }}
          >
            <button
              className="= w-[10vw] h-auto flex"
              // onClick={() => {
              //   if (pathname == "/") {
              //     setpage_loader(false);
              //   } else {
              //     setpage_loader(true);
              //   }
              // }}
            >
              <Image
                src={mob_cart}
                alt="StationForge Logo"
                className="w-full h-fit"
              />
            </button>
          </div>
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* destop designs */}
          {/* logo image */}
          <div className="sm:hidden">
            <Link
              href="https://malkainstaging.website/forge/"
              aria-label="StationForge Home"
              className="= w-[10vw] h-auto flex"
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
          {/* nav array list  */}
          <div className="neuer sm:hidden  flex items-center gap-[1.8vw] capitalize text-[1vw]">
            {links.map((e: any, index: any) => {
              return (
                <>
                  <Link
                    onClick={() => {
                      if (pathname == e.link) {
                        setpage_loader(false);
                      } else {
                        setpage_loader(true);
                      }
                    }}
                    href={e.link}
                    key={index}
                    className={`  text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] h-full ${
                      pathname == e.link
                        ? "text-black bg-white py-[0.5vw] px-[1vw] rounded-[1.2vw] text-opacity-[100%]"
                        : "text-white"
                    } `}
                    style={{ transition: "1s ease" }}
                  >
                    {e.txt}
                  </Link>
                </>
              );
            })}
          </div>
          <div className="text-white sm:hidden  flex gap-[0.9vw] text-[1vw] items-center justify-center">
            {/* now this is for the download */}
            {!track_hide_download && (
              <div
                className="w-[3vw] h-[3vw] relative bg-[#151414] cursor-pointer rounded-[100%]"
                onClick={() => {
                  route.push("/libary");
                  if (pathname == "/libary") {
                    setpage_loader(false);
                  } else {
                    setpage_loader(true);
                  }
                }}
              >
                {downloadProgress != "100" && (
                  <i className="bi bi-arrow-down absolute  top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[1.2vw] text-opacity-[90%]"></i>
                )}

                {downloadProgress >= "99" && (
                  <i className="bi bi-check2 absolute  top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] text-white text-[1.4vw] text-opacity-[90%]"></i>
                )}
                <CircularProgressbar
                  value={track_progress}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,

                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: "butt",

                    // Text size
                    // textSize: "16px",

                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,

                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',

                    // Colors
                    pathColor: `#CCFF00`,
                    // textColor: "#f88",
                    trailColor: "#151414",
                    backgroundColor: "",
                  })}
                />
              </div>
            )}
            {/*  */}
            {admin_loggedin && (
              <Link
                href={"/admin/dashboard"}
                className="  py-[0.7vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s]  "
              >
                {" "}
                Dashboard
              </Link>
            )}
            {moderator_loggedin && (
              <Link
                href={"/admin/chats"}
                className="  py-[0.7vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s]  "
              >
                {" "}
                Chats
              </Link>
            )}
            <button
              onClick={() => {
                setforge_loader(true);
              }}
              className=" py-[0.7vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s] "
            >
              {" "}
              <i className="bi bi-bag-fill"></i> Forge
            </button>{" "}
            {!loggedin ? (
              <Link
                href={"/login"}
                className=" py-[0.7vw]  px-[0.9vw]  border-transparent border rounded-[0.8vw] text-black bg-white hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] font-[600]"
                onClick={() => {
                  if (pathname == "/login") {
                    setpage_loader(false);
                  } else {
                    setpage_loader(true);
                  }
                }}
              >
                Log In
              </Link>
            ) : (
              <button
                className=" py-[0.7vw]  px-[0.9vw] relative  border-transparent border rounded-[0.8vw] text-black bg-white hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] profile_btn font-[600]"
                onClick={toggleDropdown}
              >
                Profile
                {new_message && (
                  <div className="w-[0.9vw] h-[0.9vw] absolute rounded-[100%] bg-[red] top-[-0.3vw] right-[-0.3vw]"></div>
                )}
              </button>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
