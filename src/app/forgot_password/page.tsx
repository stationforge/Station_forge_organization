"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

// import Login_component from "./login";
import Header from "../general_components/header";
import { useProfile_Context } from "../utils/profile_context";
import Loader from "../general_components/loader";
import img_bg from "../../../public/login/login.webp";
import mob_under from "../../../public/login/mob_under.webp";

import mob_img_bg from "../../../public/subscription/mob_bg_sub.webp";
import Forge from "../general_components/forge";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function Login() {
  const { setpage_loader, forge_loader, page_loader }: any =
    useProfile_Context();
  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [logging_in, setloggin_in] = useState(false);
  const [email, setemail] = useState("");
  const [btn_text, setbtn_text] = useState("Send Reset link");
  // firebase init
  // Initialize the data base connection
  initializeApp(firebaseConfig);

  // Initialize services
  const db = getFirestore();

  // define collection reference
  // const colRef = collection(db, "users");

  // get authentication
  const auth: any = getAuth();
  const handlePasswordReset = () => {
    if (email.length == 0) {
      setbtn_text("kindly fill in your email");
      return;
    }
    setbtn_text("sending");
    // setpaswordResetIsLoading(true);
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        // console.log("sent");
        setbtn_text("Sent successfully");
        setTimeout(() => {
          // setpasswordResetValue("Password reset");
        }, 4000); // 4 seconds in milliseconds
      })
      .catch((error) => {
        // console.log(error.message);
        setbtn_text(error.message);
        // setpaswordResetIsLoading(false);
        // setpasswordResetValue(errorMessage);

        // ..
      });
  };

  const [up, setup] = useState("80vw");

  // Use useEffect to set the animation
  useEffect(() => {
    setup("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}

      <div className="w-full h-fit z-[99] sm:h-[20vw]  fixed top-[0vw] ">
        <Header />
      </div>
      {/* <Login_component /> */}

      <div className="w-full sm:gap-[5vw] sm:px-[3vw] gap-[2vw] flex-col items-center h-[100vh] relative overflow-hidden flex justify-center ">
        {" "}
        {/* Title */}
        <h1 className="capitalize z-[100] neueb text-[2.7vw] text-center text-white mb-[1vw] font-[700] sm:text-[8vw] ">
          Send reset email
        </h1>
        <input
          type="email"
          className="w-[30vw] sm:w-full h-[3.5vw] z-[100] sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw] focus:outline-none rounded-[1.1vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
          placeholder="Input your email here "
          autoComplete="email"
          onChange={(e) => {
            setemail(e.target.value.toLowerCase());
            setbtn_text("Send Reset link");
          }}
        />
        {/* Sign-in button */}
        <button
          className="w-[30vw] sm:w-full z-[99] h-[3.3vw] bg-[#CCFF00] sm:h-[15vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center capitalize items-center"
          onClick={() => {
            handlePasswordReset();
          }}
        >
          {logging_in ? (
            <div className="rounded-[100%] h-[2vw] sm:h-[9vw] sm:border-t-[1vw] sm:w-[9vw] w-[2vw]  border-solid  border-t-[0.4vw]  border-[black] animate-spin"></div>
          ) : (
            btn_text
          )}
        </button>
        {/* Background images */}
        <Image
          src={img_bg}
          alt="login background image"
          className=" w-[100%] sm:hidden h-full absolute top-0 left-0 z-[2]"
        />
        <Image
          src={mob_img_bg}
          alt="login background image"
          className=" w-[100%] h-fit hidden sm:block absolute  left-0 z-[2]"
        />
        {/* for the image coming up on mobile devices  */}
        <Image
          src={mob_under}
          alt="3d Right Page Illustration"
          className=" w-[100vw] sm:block hidden h-fit absolute bottom-0 transition duration-[2.5s] right-0 z-[3]"
          style={{
            transform: `translateY(${up})`,
          }}
        />
      </div>
    </>
  );
}
