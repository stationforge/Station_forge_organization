"use client";

import Image from "next/image";
import React from "react";
import img_bg from "../../../public/login/login.webp";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmPasswordReset, onAuthStateChanged } from "firebase/auth";
import { getAuth, signOut } from "firebase/auth";

const Reset_Component = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [reset_is_loading, setreset_is_loading] = useState(false);
  const [password, setpassword] = useState("");
  const [passwordMatch, setpasswordMatch] = useState<any>("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const searchParams = useSearchParams();

  const search: any = searchParams.get("oobCode");

  //   use router
  const router = useRouter();

  // get authentication
  const auth: any = getAuth();

  useEffect(() => {
    if (search == null) {
      router.push("/"); // Replace with the actual path to your login page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFirebaseError = (error: any) => {
    let errorMessage = "An error occurred. Please try again later."; // Default error message

    switch (error.code) {
      case "auth/expired-action-code":
        errorMessage =
          "The action code has expired. Please request a new reset link.";
        break;

      case "auth/invalid-action-code":
        errorMessage =
          "The action code is invalid. Please double-check the link or request a new reset link.";
        break;

      case "auth/user-disabled":
        errorMessage =
          "Your account has been disabled. Please contact support.";
        break;

      case "auth/user-not-found":
        errorMessage = "User not found. Please check your credentials.";
        break;

      case "auth/too-many-requests":
        errorMessage =
          "Too many unsuccessful login attempts. Please try again later.";
        break;

      // Add more error cases if needed

      default:
        errorMessage = "An error occurred. Please try again later.";
    }

    setpasswordMatch(errorMessage);

    return errorMessage;
  };

  // // Use useEffect to check if the user is already authenticated
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (!user) {
  //       // User is authenticated, redirect to a protected route
  //       // Set a timeout to redirect to the login page after 1 second
  //       setTimeout(() => {
  //         router.push("/login"); // Replace with the actual path to your login page
  //       }, 1000);
  //     } else {
  //       // User is not authenticated, you can keep them on the current page or redirect them to a login page
  //     }
  //   });

  //   // Clean up the listener when the component unmounts
  //   return () => unsubscribe();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReset = (e: any) => {
    e.preventDefault();

    if (password == "" || confirmPassword == "") {
      return setpasswordMatch("Passwords cannot be empty");
    } else if (password !== confirmPassword) {
      return setpasswordMatch("Passwords dont match ");
    } else if (password.length < 6) {
      return setpasswordMatch("Minimum password length = 5 ");
    } else if (!/.*\d+.*$/.test(password)) {
      return setpasswordMatch("Password must include at least one number");
    }
    // Check for internet connectivity
    else if (!navigator.onLine) {
      return setpasswordMatch(
        "No internet connection. Please check your network.",
      );
    } else {
      setreset_is_loading(true);
      confirmPasswordReset(auth, search, password)
        .then((res) => {
          setreset_is_loading(false);
          setpasswordMatch("Successful reset. Redirecting ... ");
          signOut(auth)
            .then((e) => {
              // Sign-out successful.
            })
            .catch((error) => {
              // An error occurred during sign-out.
              return;
            });
        })
        .catch((err) => {
          handleFirebaseError(err);
          setreset_is_loading(false);
        });
    }
  };
  return (
    <>
      <div className="w-full relative h-[100vh] sm:px-[3vw] flex justify-center items-center neuem">
        <form
          onSubmit={handleReset}
          className="w-[36vw] sm:w-full sm:px-[2vw]  sm:h-[80vw] sm:gap-[4vw]  h-[22vw] z-[3] bg-[#111111] border-[#434343] border px-[4vw] rounded-[2vw] bg-opacity-[50%] backdrop-blur-[4px] flex justify-center items-center flex-col gap-[2vw] relative"
        >
          <p className=" text-[1vw] left-[4vw] text-white text-opacity-[70%] font-[400] neuer sm:text-[3.5vw]">
            {passwordMatch}
          </p>
          <div className=" relative  w-full h-[15%] sm:h-[15vw] ">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full h-full rounded-[1.1vw] sm:text-[3.5vw] sm:rounded-[5vw] bg-[#262626] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw] text-center "
              placeholder="New Password"
              autoComplete="password"
              onChange={(e) => {
                setpassword(e.target.value);
                setpasswordMatch("");
              }}
            />{" "}
            {/* Toggle password visibility */}
            <span
              className="absolute sm:text-[7vw] sm:right-[2vw] right-[0.7vw] top-[50%] text-[2vw] text-white opacity-[50%]"
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

          <div className=" relative w-full h-[15%]  sm:h-[15vw] ">
            <input
              type="password"
              className="w-full sm:rounded-[5vw] h-full rounded-[1.1vw]  sm:text-[3.5vw] bg-[#262626] border-[#3F3F3F] text-white border-[0.07vw] px-[1.8vw] text-[1.06vw] text-center "
              placeholder="Confirm New Password"
              autoComplete="password"
              onChange={(e) => {
                setconfirmPassword(e.target.value);
                setpasswordMatch("");
              }}
            />{" "}
          </div>

          {/* Sign-in button */}
          <button
            className="w-full h-[3.3vw] sm:rounded-[6vw] sm:h-[17vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center sm:text-[4vw]"
            type="submit"
          >
            {reset_is_loading ? (
              <div className="rounded-[100%] h-[2vw] sm:h-[6vw] sm:w-[6vw] w-[2vw]  border-solid sm:border-t-[1vw] border-t-[0.4vw] border-[black] animate-spin"></div>
            ) : (
              "Change"
            )}
          </button>
        </form>{" "}
        {/* Background images */}
        <Image
          src={img_bg}
          alt="login background image"
          className=" w-[100%] h-full absolute top-0 left-0 z-[2]"
        />{" "}
      </div>
    </>
  );
};

export default Reset_Component;
