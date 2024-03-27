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
import { useAdmin_context } from "../utils/admin_context";

const Admin_Mobile_header = ({
  setmobile_bg_changer,
  links,
  comedown,
  setcomedown,
  loggedin,
}: any) => {
  const pathname = usePathname();
  const route = useRouter();

  const [admin_loggedin, setadmin_loggedin] = useState(false);

  //   profile context

  const {
    toggleDropdown,
    downloadProgress,
    setpage_loader,
    setforge_loader,
    hide_download,
    setshow_setting_modal,
  }: any = useProfile_Context();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route

        user.getIdTokenResult().then((idTokenResult) => {
          const isAdmin = idTokenResult.claims.admin === true;
          if (isAdmin) {
            setadmin_loggedin(true);
          } else {
            setadmin_loggedin(false);
          }
        });
      } else {
        setadmin_loggedin(false);
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  initializeApp(firebaseConfig);

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
      }, 850);
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

  const { show_setting, setshow_setting }: any = useAdmin_context();

  return (
    <>
      <div
        className={`w-[100vw] h-[100vh] hidden fixed top-0 left-0 sm:flex justify-center items-start  bg-black  ${
          comedown ? "bg-opacity-[85%]" : "bg-opacity-[0%]"
        } `}
        style={{ transition: "1.5s ease" }}
        onClick={hide_mob_header}
      >
        <div
          className={`w-full ${
            !profile_comeup ? " h-[100vw]" : "h-[155vw] "
          }   bg-[#181818] rounded-b-[6vw]  ${
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
          <div className="w-full pt-[2vw] flex px-[1vw]  flex-wrap justify-center gap-[2vw] ">
            <button
              onClick={() => {
                signOut(auth);
              }}
              className={` border-[0.3vw]  flex justify-center items-center text-[3.1vw] h-[10vw] capitalize rounded-[4vw] border-white border-opacity-[40%] text-opacity-[70%] transition duration-[0.3s] hover:text-opacity-[100%] w-[28vw] mb-[3vw] text-white `}
            >
              logout
            </button>
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
          </div>
          <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[90vw] sm:mx-auto bg-[#D9D9D9] "></div>{" "}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          {/* this is for the login and sign up section */}
          <div className="w-full flex justify-center pt-[3vw] px-[3vw] gap-[3vw] items-center ">
            <>
              <Link
                href={"/admin/add-moderator"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="w-full neuer rounded-[4vw] border-white border-opacity-[40%]  flex justify-center items-center text-[4vw] border-[0.3vw] text-opacity-[70%] text-white  h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
              >
                Add a moderator
              </Link>
              <button
                onClick={() => {
                  setshow_setting(true);
                }}
                className="w-full neuer rounded-[4vw] border-white border-opacity-[40%]  flex justify-center items-center text-[4vw] border-[0.3vw] text-opacity-[70%] text-white  h-[14vw] hover:bg-opacity-[80%] transition duration-[0.3s]"
              >
                Profile
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin_Mobile_header;
