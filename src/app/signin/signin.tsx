"use client"; // Using the "client" component

import Image from "next/image";
import { useState, useEffect } from "react";
import img_bg from "../../../public/login/login.webp";
import img_right from "../../../public/login/right_login.webp";
import mob_under from "../../../public/login/mob_under.webp";

import img_left from "../../../public/login/left_login.webp";
import mob_img_bg from "../../../public/subscription/mob_bg_sub.webp";
import { usePathname, useRouter } from "next/navigation"; // Importing Next.js router
import Link from "next/link";
import { initializeApp } from "firebase/app"; // Importing Firebase modules

import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore"; // Firestore modules for database operations
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // Firebase authentication modules
import firebaseConfig from "../utils/fire_base_config"; // Firebase configuration
import { useProfile_Context } from "../utils/profile_context";

export default function Signin_component() {
  const router = useRouter(); // Initialize the Next.js router

  const [left, setleft] = useState("-80vw");
  const [right, setright] = useState("80vw");
  const [up, setup] = useState("80vw");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errusername, seterrusername] = useState("");
  const [errpassword, seterrpassword] = useState("");
  const [erremail, seterremail] = useState("");
  const [errfirebase, seterrfirebase] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyusername, setalreadyusername] = useState(false);

  const { toggleDropdown, setpage_loader, Add_notification }: any =
    useProfile_Context();
  const pathname = usePathname();

  // useEffect to set the animation when the component mounts
  useEffect(() => {
    setleft("0");
    setright("0");
    setup("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Add an authentication state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        router.push("/onboarding"); // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize the Firebase app
  initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore();

  // Initialize authentication
  const auth = getAuth();

  // Reference to the Firestore collection
  const colRef = collection(db, "users");
  const handleUsernameChange = async (newUsername: any) => {
    // Query to check if the username already exists
    const usernameQuery = query(colRef, where("Username", "==", newUsername));
    const usernameQuerySnapshot = await getDocs(usernameQuery);

    if (!usernameQuerySnapshot.empty) {
      seterrusername("Username already exists. Please choose a different one.");
      setalreadyusername(false);
    } else {
      setalreadyusername(true);
      seterrusername("");
    }
  };

  const handleFirebaseError = (error: any) => {
    let errorMessage = "An error occurred. Please try again later."; // Default error message

    switch (error.code) {
      case "auth/email-already-in-use":
        errorMessage =
          "Email address is already in use. Please choose a different one.";
        break;

      case "auth/invalid-email":
        errorMessage = "Invalid email address. Please enter a valid email.";
        break;

      case "auth/weak-password":
        errorMessage = "Password is too weak. Please use a stronger password.";
        break;

      case "auth/operation-not-allowed":
        errorMessage = "This operation is not allowed. Please contact support.";
        break;

      case "auth/user-disabled":
        errorMessage =
          "Your account has been disabled. Please contact support.";
        break;

      default:
        errorMessage = "An error occurred. Please try again later.";
    }

    seterrfirebase(errorMessage);
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    if (name.length == 0) {
      seterrusername("Kindly complete this field");
      seterrpassword("");
      seterremail("");
      return;
    } else if (name.length < 5) {
      seterrusername("Minimum username length is 5 characters");
      seterrpassword("");
      seterremail("");
      return;
    } else if (/ /g.test(name)) {
      seterrusername("Username cannot contain spaces.");
      seterrpassword("");
      seterremail("");
      return;
    } else if (email.length == 0) {
      seterremail("Kindly complete this field");
      seterrpassword("");
      seterrusername("");
      return;
    } else if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      seterremail("Invalid email format");
      seterrpassword("");
      seterrusername("");
      return;
    } else if (password.length == 0) {
      seterrpassword("Kindly complete this field");
      seterremail("");
      seterrusername("");
      return;
    } else if (password.length < 6) {
      seterrpassword("Minimum password length is 6 characters");
      seterrpassword("Password cannot contain spaces");
      seterremail("");
      seterrusername("");
      return;
    } else if (/ /g.test(password)) {
      seterrpassword("Password cannot contain spaces");
      seterremail("");
      seterrusername("");
      return;
    } else if (!/.*\d+.*$/.test(password)) {
      seterrpassword("Password must include at least one number");
      seterremail("");
      seterrusername("");
      return;
    } else if (!alreadyusername) {
      seterrusername("Username already exists. Please choose a different one.");
    } else if (!navigator.onLine) {
      seterrfirebase("No internet connection. Please check your network.");
      return;
    } else {
      seterremail("");
      seterrusername("");
      seterrpassword("");
      seterrfirebase("");
      setisLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const uid = userCredential.user.uid;
          addDoc(colRef, {
            Username: name,
            Email: email,
            userid: uid,
            allocations: 0,
            billing_address: "",
            birthday: "",
            country: "",
            description: "",
            step: 1,
            subscription: "Public",
            createdAt: serverTimestamp(),
            name: "",
            role: "user",
            avatar_url:
              "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w",
          })
            .then((docRef) => {
              seterrfirebase("Success");
              setisLoading(false);
              // router.push("/login"); // Navigate to the login page
            })
            .catch((err) => {
              handleFirebaseError(err);
              setisLoading(false); // Handle Firebase error
            });

          Add_notification("Signed up an account");
        })
        .catch((err) => {
          handleFirebaseError(err); // Handle Firebase error
          setisLoading(false);
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="w-full h-[100vh] bg-black relative overflow-hidden flex justify-center items-center">
        <form
          onSubmit={handleRegister}
          className="w-[25vw] h-auto sm:w-full sm:px-[3vw]  z-[5] sm:gap-[5vw] gap-[1.2vw] flex flex-col justify-center"
        >
          <h1 className="capitalize neueb text-[2.7vw] text-center text-white mb-[0.5vw]  font-[700] sm:text-[8vw]">
            Sign up
          </h1>

          <div className="flex  flex-col justify-center text-[0.7vw] mb-[-0.8vw] sm:text-[3vw] sm:mb-[-3vw]">
            <ul className="text-white opacity-[30%]">
              <li>Username: 4 characters minimum </li>
              <li>Password: 6 characters, including a number (0-9)</li>
            </ul>
          </div>
          <span className="text-[red] sm:text-[3.5vw] neuem text-[0.8vw]  mb-[-0.8vw]">
            {errfirebase}
          </span>
          <div className="w-full h-auto ">
            <input
              type="text"
              className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw]  w-full h-[3.3vw] lowercase rounded-[1.1vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
              placeholder="Username"
              autoComplete="name"
              onChange={(e) => {
                setname(e.target.value.toLowerCase());
                handleUsernameChange(e.target.value.toLowerCase());
                seterrfirebase("");
                seterrusername("");
              }}
            />
            <span className="text-white sm:text-[3.5vw] sm:pt-[2vw] neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {errusername}
            </span>
          </div>

          <div className="w-full h-auto ">
            <input
              type="email"
              className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw]  w-full h-[3.3vw] rounded-[1.1vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
              placeholder="Gmail"
              autoComplete="email"
              onChange={(e) => {
                setemail(e.target.value.toLowerCase());
                seterrfirebase("");
                seterremail("");
              }}
            />
            <span className="text-white sm:text-[3.5vw] sm:pt-[2vw]  neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {erremail}
            </span>
          </div>
          <div className="w-full h-auto  ">
            <div className="w-full h-auto relative ">
              {/* This section has a different implementation because of the password visibility toggle */}
              <input
                type={showPassword ? "text" : "password"}
                className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:pl-[4vw] sm:pr-[10vw]  w-full h-[3.3vw] rounded-[1.1vw] bg-[#0F0F0F] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw] "
                placeholder="Password"
                autoComplete="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                  seterrfirebase("");
                  seterrpassword("");
                }}
              />
              <span
                className="absolute right-[0.7vw] sm:text-[7vw]  h-full flex items-center sm:right-[3vw] top-[0vw] text-[2vw] text-white opacity-[50%]"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </span>
            </div>
            <span className="text-white sm:text-[3.5vw] sm:pt-[2vw]  neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {errpassword}
            </span>
          </div>

          <button
            className="w-full h-[3.3vw]  sm:h-[15vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center"
            type="submit"
          >
            {" "}
            {isLoading ? (
              <div className="rounded-[100%] sm:h-[9vw] sm:border-t-[1vw] sm:w-[9vw] h-[2vw] w-[2vw]  border-solid  border-t-[0.4vw] border-[black] animate-spin"></div>
            ) : (
              "Sign up"
            )}
          </button>

          <p className="text-[1.3vw] sm:text-[3.5vw] neuem text-white text-center">
            Don{"'"}t have an account?{" "}
            <Link
              href={"/login"}
              onClick={() => {
                if (pathname == "/") {
                  setpage_loader(false);
                } else {
                  setpage_loader(true);
                }
              }}
              className="text-[#CCFF00] hover:text-[#7e9426] hover:underline hover:underline-offset-4"
            >
              Sign in here
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
