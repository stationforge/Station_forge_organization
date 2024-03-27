"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import img_bg from "../../../public/login/login.webp";
import mob_img_bg from "../../../public/subscription/mob_bg_sub.webp";
import img_right from "../../../public/login/right_login.webp";
import mob_under from "../../../public/login/mob_under.webp";
import img_left from "../../../public/login/left_login.webp";
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // Consider using "next/router" instead
import { initializeApp } from "firebase/app";

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
import firebaseConfig from "../utils/fire_base_config"; // Make sure this import is correct
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

export default function Login_component() {
  const [left, setleft] = useState("-80vw");
  const [right, setright] = useState("80vw");
  const [up, setup] = useState("80vw");
  const router = useRouter();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errusername, seterrusername] = useState("");
  const [errpassword, seterrpassword] = useState("");
  const [erremail, seterremail] = useState("");
  const [errfirebase, seterrfirebase] = useState("");
  const [logging_in, setloggin_in] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { toggleDropdown, setpage_loader, from }: any = useProfile_Context();
  const pathname = usePathname();

  // Initialize the data base connection
  initializeApp(firebaseConfig);

  // Initialize services
  const db = getFirestore();

  // Initialize authentication
  const auth = getAuth();

  const searchParams = useSearchParams();

  const ref = searchParams.get("ref");
  // Define collection reference
  const colRef = collection(db, "users");

  // Use useEffect to set the animation
  useEffect(() => {
    setleft("0");
    setright("0");
    setup("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (ref) {
          router.back();
        } else {
          router.push("/");
        }

        // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Firebase errors with friendly messages
  const handleFirebaseError = (error: any) => {
    let errorMessage = "An error occurred. Please try again later."; // Default error message

    switch (error.code) {
      case "auth/user-not-found":
        errorMessage = "User not found. Please check your email and try again.";
        break;

      case "auth/wrong-password":
        errorMessage =
          "Incorrect password or username. Please check your credentials and try again.";
        break;

      case "auth/invalid-email":
        errorMessage = "Invalid email address. Please enter a valid email.";
        break;

      case "auth/user-disabled":
        errorMessage =
          "Your account has been disabled. Please contact support.";
        break;

      case "auth/too-many-requests":
        errorMessage = "Too many login attempts. Please try again later.";
        break;

      default:
        errorMessage = "An error occurred. Please try again later.";
    }

    seterrfirebase(errorMessage);
  };

  // Handle login functionality
  const handlelogin = (e: any) => {
    e.preventDefault();

    if (name.length == 0) {
      seterrusername("Kindly complete this field");
      seterrpassword("");
      return;
    } else if (password.length == 0) {
      seterrpassword("Kindly complete this field");
      seterrusername("");
      return;
    } else {
      seterrusername("");
      seterrpassword("");
      seterrfirebase("");

      // Query the Firestore collection to find the user
      const userQuery = query(colRef, where("Username", "==", name));

      // Check for internet connectivity
      if (!navigator.onLine) {
        seterrfirebase("No internet connection. Please check your network.");
        return;
      }

      setloggin_in(true);
      getDocs(userQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            // Assuming each username is unique, there should be only one matching user
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // Example sign-in with email and password
            signInWithEmailAndPassword(auth, userData.Email, password)
              .then((userCredential) => {
                // The userCredential object contains information about the signed-in user.
                const user = userCredential.user;
                seterrfirebase("Success. Redirecting to dashboard ....");
                setloggin_in(false);
                setpage_loader(true);
                // Handle other post-login actions here.
              })
              .catch((error) => {
                handleFirebaseError(error);
                setloggin_in(false);

                // Handle any errors that occur during sign-in.
              });
          } else {
            seterrfirebase("Username not found.");
            setloggin_in(false);
          }
        })
        .catch((e) => {
          handleFirebaseError(e);
          setloggin_in(false);
        });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="w-full h-[100vh] sm:px-[3vw] bg-black relative overflow-hidden flex justify-center items-center">
        <form
          onSubmit={handlelogin}
          className="w-[25vw] h-auto sm:w-full  z-[5] gap-[1.8vw] sm:gap-[5vw] flex flex-col justify-center"
        >
          {/* Title */}
          <h1 className="capitalize neueb text-[2.7vw] text-center text-white mb-[1vw] font-[700] sm:text-[8vw] ">
            log in
          </h1>
          {/* Firebase error message */}
          <span className="text-[red] neuem sm:text-[3.5vw] text-[0.8vw]  mb-[-0.8vw]">
            {errfirebase}
          </span>
          {/* Username input */}
          <div className="w-full h-auto ">
            <input
              type="text"
              className="w-full h-[3.3vw] sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw] lowercase rounded-[1.1vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
              placeholder="Username"
              autoComplete="name"
              onChange={(e) => {
                setname(e.target.value.toLowerCase());
              }}
            />
            {/* Error message for username */}
            <span className="text-white sm:text-[3.5vw] neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {errusername}
            </span>
          </div>
          {/* Password input */}
          <div className="w-full h-auto  ">
            <div className="w-full h-auto relative ">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-[3.3vw] rounded-[1.1vw] sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:pl-[4vw] sm:pr-[10vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw] "
                placeholder="Password"
                autoComplete="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              {/* Toggle password visibility */}
              <span
                className="absolute sm:text-[7vw] sm:right-[3vw] right-[0.7vw] top-[50%] text-[2vw] h-full flex items-center  text-white opacity-[50%]"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer", transform: "translateY(-50%)" }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </span>
            </div>
            {/* Error message for password */}
            <span className="text-white sm:text-[3.5vw] neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {errpassword}
            </span>
          </div>
          {/* Sign-in button */}
          <button
            className="w-full h-[3.3vw] bg-[#CCFF00] sm:h-[15vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center"
            type="submit"
          >
            {logging_in ? (
              <div className="rounded-[100%] h-[2vw] sm:h-[9vw] sm:border-t-[1vw] sm:w-[9vw] w-[2vw]  border-solid  border-t-[0.4vw]  border-[black] animate-spin"></div>
            ) : (
              "Sign in"
            )}
          </button>
          {/* Link to sign-up */}
          <p className="text-[1.3vw] neuem sm:text-[3.7vw] text-white text-center">
            Dont have an account ?{" "}
            <Link
              href={"/signin"}
              onClick={() => {
                if (pathname == "/") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
              className="text-[#CCFF00] hover:text-[#7e9426] hover:underline hover:underline-offset-4"
            >
              sign up here
            </Link>
          </p>
          {/* Link to forgot passwod */}
          <p className="text-[1.3vw] mt-[-1vw] sm:mt-[-2vw] neuem sm:text-[3.7vw] text-white text-center">
            Forgot password ?{" "}
            <Link
              href={"/forgot_password"}
              onClick={() => {
                if (pathname == "/") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
              className="text-[#CCFF00] hover:text-[#7e9426] hover:underline hover:underline-offset-4"
            >
              Reset passwod
            </Link>
          </p>
        </form>
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

        {/* the desktiop images on there  */}
        <Image
          src={img_left}
          alt="3d Left Page Illustration"
          className=" w-[35vw] sm:hidden h-fit absolute bottom-0 transition duration-[2.5s] left-0 z-[3]"
          style={{
            transform: `translateX(${left})`,
          }}
        />
        <Image
          src={img_right}
          alt="3d Right Page Illustration"
          className=" w-[35vw] sm:hidden h-fit absolute bottom-0 transition duration-[2.5s] right-0 z-[3]"
          style={{
            transform: `translateX(${right})`,
          }}
        />
      </div>
    </>
  );
}
