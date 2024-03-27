"use client"; // Using the "client" component

import Image from "next/image";
import { useState, useEffect } from "react";
// import img_bg from "../../../public/login/login.webp";
// import img_right from "../../../public/login/right_login.webp";
// import mob_under from "../../../public/login/mob_under.webp";

// import img_left from "../../../public/login/left_login.webp";
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
import firebaseConfig from "@/app/utils/fire_base_config";
import { useProfile_Context } from "@/app/utils/profile_context";
import axios from "axios";

export default function Create_moderator_component({
  setstage,
  password,
  setpassword,
  name,
  setname,
}: any) {
  const router = useRouter(); // Initialize the Next.js router

  //   const [name, setname] = useState("");
  const [email, setemail] = useState("");
  //   const [password, setpassword] = useState("");
  const [errusername, seterrusername] = useState("");
  const [errpassword, seterrpassword] = useState("");
  const [erremail, seterremail] = useState("");
  const [errfirebase, seterrfirebase] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alreadyusername, setalreadyusername] = useState(false);
  const [opacity, setopacity] = useState(false);

  const { toggleDropdown, setpage_loader }: any = useProfile_Context();
  const pathname = usePathname();

  // Initialize the Firebase app
  initializeApp(firebaseConfig, "signup");

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
      case "auth/email-already-exists":
        errorMessage =
          "Email address is already in use. Please choose a different one.";
        break;

      case "auth/invalid-email":
        errorMessage = "Invalid email address. Please enter a valid email.";
        break;

      case "auth/invalid-password":
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

  const handleRegister = async (e: any) => {
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
      //   setstage(2);
      console.log(name, password);
      axios
        .post("/api/moderator_edit", { email: email, password: password })
        .then((res) => {
          console.log(res.data.uid);
          if (res.data.uid) {
            const uid = res?.data?.uid;
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
              role: "moderator",
              avatar_url:
                "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w",
            })
              .then((docRef) => {
                seterrfirebase("Success");
                setstage(2);
                setisLoading(false);
                // router.push("/login"); // Navigate to the login page
              })
              .catch((err) => {
                handleFirebaseError(err);
                setisLoading(false); // Handle Firebase error
              });
          } else if (res.data.error) {
            const err = res.data.error;
            setisLoading(false);

            seterrfirebase(err.message);
          }
        })
        .catch((err) => {
          console.error(err);
          setisLoading(false);
        });

      //   createUserWithEmailAndPassword(auth, email, password)
      //     .then((userCredential) => {
      //       const uid = userCredential.user.uid;
      //     })
      //     .catch((err) => {
      //       handleFirebaseError(err); // Handle Firebase error
      //       setisLoading(false);
      //     });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    setopacity(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`w-full h-[100vh] bg-black relative overflow-hidden  ${
          !opacity ? "opacity-[0%]" : "opacity-[100%]"
        }  flex justify-center items-center`}
        style={{ transition: "1.7s ease " }}
      >
        <form
          onSubmit={handleRegister}
          className="w-[30vw] px-[2.5vw]  sm:py-[8vw] rounded-[2vw] sm:rounded-[4vw] py-[2.5vw] bg-[#D9D9D9] bg-opacity-[10%] h-auto sm:w-[95vw] sm:px-[3vw]  z-[5] sm:gap-[5vw] gap-[1.2vw] flex flex-col justify-center"
        >
          <h1 className="capitalize neuem text-[2vw] text-center text-white mb-[0.5vw]  font-[700] sm:text-[6vw]">
            Create log in info
          </h1>

          <div className="flex  flex-col justify-center text-[0.7vw] mb-[-0.8vw] sm:text-[3vw] sm:mb-[-3vw]">
            <ul className="text-white opacity-[50%]">
              <li>Username: 4 characters minimum </li>
              <li>Password: 6 characters, including a number (0-9)</li>
            </ul>
          </div>
          <span className="text-[red] sm:text-[3.5vw] neuem text-[0.8vw]  mb-[-0.8vw]">
            {errfirebase}
          </span>
          <div className="w-full h-auto flex flex-col ">
            <input
              type="text"
              className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw]  w-full h-[3.3vw] lowercase rounded-[1.1vw] bg-[#272727] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
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

          <div className="w-full h-auto flex flex-col ">
            <input
              type="email"
              className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:px-[4vw]  w-full h-[3.3vw] rounded-[1.1vw] bg-[#272727] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw]"
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
          <div className="w-full h-auto  flex flex-col ">
            <div className="w-full h-auto relative ">
              {/* This section has a different implementation because of the password visibility toggle */}
              <input
                type={showPassword ? "text" : "password"}
                className="  sm:h-[15vw] sm:rounded-[4vw] sm:text-[3.5vw] sm:pl-[4vw] sm:pr-[10vw]  w-full h-[3.3vw] rounded-[1.1vw] bg-[#272727] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw] "
                placeholder="Password"
                autoComplete="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                  seterrfirebase("");
                  seterrpassword("");
                }}
              />
              <span
                className="absolute right-[0.7vw] sm:text-[7vw]   h-full flex items-center sm:right-[3vw] top-[0vw] text-[2vw] text-white opacity-[50%]"
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
            <span className="text-white sm:text-[3.5vw]  sm:pt-[2vw]  neuem text-[0.8vw] pl-[0.5vw] opacity-[60%]">
              {errpassword}
            </span>
          </div>
          <button
            className="w-full h-[3.3vw]  sm:h-[15vw] sm:rounded-[4vw] sm:text-[4vw]  sm:px-[3vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw]  text-[1.06vw] flex justify-center items-center"
            type="submit"
          >
            {" "}
            {isLoading ? (
              <div className="rounded-[100%] sm:h-[9vw] sm:border-t-[1vw] sm:w-[9vw] h-[2vw] w-[2vw]  border-solid  border-t-[0.4vw] border-[black] animate-spin"></div>
            ) : (
              "Add moderator"
            )}
          </button>
        </form>
        {/* Background images */}
      </div>
    </>
  );
}
