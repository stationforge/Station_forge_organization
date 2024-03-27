"use client ";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";
import chat from "../../../public/mobile_header/chat.webp";
import libary from "../../../public/mobile_header/libary.webp";
import logout from "../../../public/mobile_header/logout.webp";
import profile from "../../../public/mobile_header/profile.webp";
import Image from "next/image";
import firebaseConfig from "../utils/fire_base_config";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const Mobile_header = ({
  setmobile_bg_changer,
  links,
  comedown,
  setcomedown,
  loggedin,
}: any) => {
  const pathname = usePathname();
  const route = useRouter();

  const [admin_loggedin, setadmin_loggedin] = useState(false);
  const [moderator_loggedin, setmoderator_loggedin] = useState(false);

  //   profile context

  const {
    toggleDropdown,
    downloadProgress,
    setpage_loader,
    setforge_loader,
    hide_download,
    setshow_setting_modal,
    setshow_chat_modal,
    new_message,
  }: any = useProfile_Context();

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;

              if (snap == "admin") {
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
        setmoderator_loggedin(false);

        setadmin_loggedin(false);
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // init authentication
  const auth = getAuth();
  const [profile_comeup, setprofile_comeup] = useState(false);
  const hide_mob_header = () => {
    setprofile_comeup(false);
    if (profile_comeup) {
      setcomedown(false);
      setTimeout(() => {
        setmobile_bg_changer(false);
      }, 900);
    } else if (!profile_comeup) {
      setcomedown(false);
      setTimeout(() => {
        setmobile_bg_changer(false);
      }, 800);
    }
  };

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  //    useEffect(() => {
  //      // Trigger the slide-up effect after the component is mounted
  //      const timer = setTimeout(() => {
  //        setgo_right(true);
  //      }, 500); // Start the animation shortly after the component mounts

  //      // Optional: Clean up the timeout if the component unmounts before the animation starts
  //      return () => clearTimeout(timer);
  //      // eslint-disable-next-line react-hooks/exhaustive-deps
  //    }, []);

  useEffect(() => {
    setcomedown(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlelogout = () => {
    signOut(auth).then(() => {
      setprofile_comeup(false);
    });
  };
  return (
    <>
      <div
        className={`w-[100vw] h-[100vh] hidden fixed top-0 left-0 sm:flex justify-center items-start  bg-black  ${
          comedown ? "bg-opacity-[85%]" : "bg-opacity-[0%]"
        } `}
        onClick={hide_mob_header}
        style={{ transition: "1.5s ease" }}
      >
        <div
          className={`w-full ${
            !profile_comeup ? " h-[100vw]" : "h-[155vw] "
          }   bg-[#181818] rounded-[6vw]  ${
            comedown
              ? "translate-y-[0vw]"
              : profile_comeup
              ? "translate-y-[-180vw]"
              : "translate-y-[-100vw]"
          } flex flex-col justify-start pt-[30vw] pb-[10vw] gap-[6vw]`}
          style={{ transition: "1.5s ease" }}
          onClick={modalClick}
        >
          {/* for the links at the top */}
          <div className="w-full pt-[2vw] flex px-[3vw] flex-wrap justify-center gap-[2vw] ">
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
                    className={` border-[0.3vw] flex justify-center items-center text-[3.1vw] h-[10vw] capitalize rounded-[4vw] border-white border-opacity-[40%] text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] w-[28vw] mb-[3vw] ${
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

            {/* this is specially for dashborad  */}
            {admin_loggedin && (
              <Link
                onClick={() => {
                  setpage_loader(true);
                }}
                href={"/admin/dashboard"}
                className={` border-[0.3vw] flex justify-center items-center text-[3.1vw] h-[10vw] capitalize rounded-[4vw] border-white border-opacity-[40%] text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] w-[28vw] mb-[3vw] text-white
              `}
                style={{ transition: "1s ease" }}
              >
                Admin dash
              </Link>
            )}
            {moderator_loggedin && (
              <Link
                onClick={() => {
                  setpage_loader(true);
                }}
                href={"/admin/chats"}
                className={` border-[0.3vw] flex justify-center items-center text-[3.1vw] h-[10vw] capitalize rounded-[4vw] border-white border-opacity-[40%] text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] w-[28vw] mb-[3vw] text-white
              `}
                style={{ transition: "1s ease" }}
              >
                Chats
              </Link>
            )}
          </div>
          <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[90vw] sm:mx-auto bg-[#D9D9D9] "></div>{" "}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          <div className="w-full flex justify-center pt-[3vw] px-[3vw] gap-[3vw] items-center ">
            {!loggedin ? (
              <>
                <Link
                  href={"/login"}
                  onClick={() => {
                    if (pathname == "/login") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Log in
                </Link>
                <Link
                  href={"/signin"}
                  onClick={() => {
                    if (pathname == "/signin") {
                      setpage_loader(false);
                    } else {
                      setpage_loader(true);
                    }
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                {/* <button
                  onClick={() => {
                    setshow_setting_modal(true);
                  }}
                  className="w-full neuer flex justify-center items-center text-[4vw] bg-white rounded-[3vw] h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
                >
                  Profile
                </button> */}

                <div
                  className={`bg-white w-full    px-[5vw] overflow-hidden flex flex-col ${
                    !profile_comeup ? "h-[14vw]" : "h-[70vw] "
                  }  ${!profile_comeup ? "rounded-[3vw]" : "rounded-[8vw] "}`}
                  style={{ transition: "1.5s ease" }}
                >
                  {/* this is the option that sticks  */}
                  <div
                    className="w-full h-[14vw]  relative neuer text-[4vw] gap-[3vw] flex justify-center items-center"
                    onClick={() => {
                      setprofile_comeup(!profile_comeup);
                    }}
                  >
                    {!profile_comeup ? "Profile" : "Close "}
                    <i
                      className={`bi ${
                        !profile_comeup ? "bi-chevron-down " : "bi-chevron-up"
                      }  `}
                    ></i>

                    {new_message && (
                      <div className="w-[4vw] h-[4vw] absolute rounded-[100%] bg-[red] top-[50%] translate-y-[-50%] right-0"></div>
                    )}
                  </div>
                  <div
                    className={`w-full  ${
                      profile_comeup ? "h-[55vw] " : "h-[0vw] "
                    }  overflow-hidden  flex flex-col  gap-[3.2vw]`}
                    style={{ transition: "1.5s ease" }}
                  >
                    {/* this is for the row elements */}
                    <div
                      className="w-full py-[0vw] pt-[3vw]   justify-start items-center  flex gap-[4vw]"
                      onClick={() => {
                        setshow_setting_modal(true);
                      }}
                    >
                      <Image
                        src={profile}
                        alt="profile img"
                        className="h-fit w-[5vw]"
                      />
                      <p className="neuem text-[4vw] ">Profile</p>
                    </div>

                    <div className="w-full bg-opacity-[27%] py-[0.2vw] bg-[#1E1B1B]"></div>
                    {/* this is for the row elements */}
                    <div
                      className="w-full py-[0vw]  relative  justify-start items-center flex gap-[4vw]"
                      onClick={() => {
                        setshow_chat_modal(true);
                      }}
                    >
                      <Image
                        src={chat}
                        alt="profile img"
                        className="h-fit w-[5vw]"
                      />
                      <p className="neuem text-[4vw] ">Talk to us</p>
                      {new_message && (
                        <div className="w-[4vw] h-[4vw] absolute rounded-[100%] bg-[red] top-[50%] translate-y-[-50%] right-0"></div>
                      )}
                    </div>
                    <div className="w-full bg-opacity-[27%] py-[0.2vw] bg-[#1E1B1B]"></div>

                    <Link
                      href={"/libary"}
                      className="w-full py-[0vw]  justify-start items-center flex gap-[4vw]"
                    >
                      <Image
                        src={libary}
                        alt="profile img"
                        className="h-fit w-[5vw]"
                      />
                      <p className="neuem text-[4vw] ">Library</p>
                    </Link>
                    <div className="w-full bg-opacity-[27%] py-[0.2vw] bg-[#1E1B1B]"></div>

                    <div
                      className="w-full py-[0vw]  justify-start items-center flex gap-[4vw]"
                      onClick={handlelogout}
                    >
                      <Image
                        src={logout}
                        alt="profile img"
                        className="h-fit w-[5vw]"
                      />
                      <p className="neuem text-[4vw] ">Logout</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobile_header;
