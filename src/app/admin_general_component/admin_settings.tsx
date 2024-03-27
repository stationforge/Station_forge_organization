"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import firebaseConfig from "../utils/fire_base_config";
import { v4 as uuidv4 } from "uuid"; // Import the v4 function from the uuid module

import avatar from "../../../public/setings/avatar.jpg";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAdmin_context } from "../utils/admin_context";
import axios from "axios";

const Admin_Settings_modal = () => {
  const [settings_is_opac, setsettings_is_opac] =
    useState<any>("bg-opacity-[0%]");
  const [mob_ham_opac, setmob_ham_opac] = useState(false);
  const [loading, setloading] = useState(false);
  const [shift_modal, setshift_modal] = useState("translate-x-[40vw]");
  const [up_modal, setup_modal] = useState("translate-y-[100vw]");
  const { show_setting, setshow_setting }: any = useAdmin_context();
  const [start_hiding, setstart_hiding] = useState(false);
  // to handle the user info
  const [save, setsave] = useState("Save");

  const [user_email, setUser_email] = useState("");

  const [user_username, setUser_username] = useState("");
  const [user_subscription, setUser_subscription] = useState<any>("");
  const [confirmPassordModal, setconfirmPassordModal] = useState(false);
  const [confirmButtonIsLoading, setconfirmButtonIsLoading] = useState(false);
  const [saveButtonIsLoading, setsaveButtonIsLoading] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [user_id, setuser_id] = useState("");
  const [doc_id, setdoc_id] = useState("");
  const [errPasswordModule, seterrPasswordModule] = useState("");
  const [errInfoModule, seterrInfoModule] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [paswordResetIsLoading, setpaswordResetIsLoading] = useState(false);
  const [ImageWasChanged, setImageWasChanged] = useState(false);
  const [confirm_ImageWasChanged, setconfirm_ImageWasChanged] = useState(false);
  const [passwordResetValue, setpasswordResetValue] =
    useState("Password Reset");
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImage_fileextension, setSelectedImage_fileextension] =
    useState<any>("");

  // for reseting the image to default
  const [load_reset, setload_reset] = useState("");

  const [filename, setfilename] = useState<any>("");
  const [file, setfile] = useState<any>("");
  const [img_size_error, setimg_size_error] = useState<any>("");

  const randomId = uuidv4();

  // Initialize Firebase
  const storage = getStorage();
  const storageRef = ref(storage, `avatars/${filename}`);
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    setfilename(randomId + selectedFile.name);
    setfile(selectedFile);
    if (selectedFile) {
      // Process the selected file (e.g., upload it) and set it for preview
      setSelectedImage(URL.createObjectURL(selectedFile));
      // Extract the file extension

      setsave("Save");
      if (file.size > 5 * 1024 * 1024) {
        return setimg_size_error(" size exceeds   maximum  size.");
      } else {
        setimg_size_error("");
        return setconfirm_ImageWasChanged(true);
      }
    }
  };

  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init
  // Initialize the data base connection
  initializeApp(firebaseConfig);

  // Initialize services
  const db = getFirestore();

  // define collection reference
  const colRef = collection(db, "users");

  // get authentication
  const auth: any = getAuth();

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        // Replace with your protected route
      } else {
        router.push("/login");
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setshift_modal("translate-x-[0]");
    setmob_ham_opac(true);
    setup_modal("translate-y-[0]");
    setsettings_is_opac(() => {
      const width_oh = globalThis.innerWidth;

      if (width_oh >= 650) {
        return "bg-opacity-[80%]";
      } else if (width_oh < 650) {
        return "bg-opacity-[90%]";
      }
    });
    const user = auth.currentUser;

    if (user) {
      const user_info = query(colRef, where("userid", "==", user.uid));
      // Real-time collection data listener

      const unsubscribe = onSnapshot(user_info, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const user_res = querySnapshot.docs[0]; // Always the first document
          const user_data = user_res.data();
          const email = user_data.Email;
          const Username = user_data.Username;

          const avatar_url = user_data.avatar_url;

          setUser_email(email);
          setUser_username(Username);

          setSelectedImage(avatar_url);
          // finally set the user id
          setuser_id(user.uid);
          // set document id
          setdoc_id(user_res.id);
          setloading(true);
          // set image was changed to falso
          setimg_size_error("");
          setload_reset(avatar_url);
          setconfirm_ImageWasChanged(false);
        }
      });

      // Cleanup the real-time listener when the component unmounts
      return () => {
        unsubscribe();
      };
    } else {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUsernameAvailability = async (newUsername: any) => {
    const usernameQuery = query(colRef, where("Username", "==", newUsername));
    const usernameDocs = await getDocs(usernameQuery);
    return usernameDocs.empty;
  };

  const UpdateForm = async () => {
    setsaveButtonIsLoading(true);
    if (user_email == "" || user_username == "") {
      seterrPasswordModule("kindly fill your infomation");
      setsaveButtonIsLoading(false);

      return;
    } else if ((await checkUsernameAvailability(user_username)) == false) {
      setsaveButtonIsLoading(false);
      seterrPasswordModule("Username already exist.");
    } else if (await checkUsernameAvailability(user_username)) {
      setsaveButtonIsLoading(true);

      const user = auth.currentUser.uid;

      seterrPasswordModule("");

      axios
        .post(
          "/api/update_admin_info",
          {
            uid: user,
            user_username: user_username,
            user_email: user_email,
            doc_id: doc_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((res) => {
          if (res.data.completed) {
            setsaveButtonIsLoading(false);
          } else if (res.data.error) {
            seterrPasswordModule(res.data.error.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setsaveButtonIsLoading(false);
          //   seterrPasswordModule(res.data.err.message);
        });
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref_modal.current && !ref_modal.current.contains(event.target)) {
        // Delay hiding the component by 2000 milliseconds (2 seconds)
        setstart_hiding(true);
        setmob_ham_opac(false);
        setshift_modal("translate-x-[40vw]");
        setup_modal("translate-y-[100vw]");
        setsettings_is_opac("bg-opacity-[0%]");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (start_hiding) {
      const timer = setTimeout(() => {
        // Code to be executed after the delay
        setshow_setting(false);
        setstart_hiding(false);
      }, 1500);

      // Clear the timer if the component unmounts or the effect is re-executed.
      return () => clearTimeout(timer);
    }
  }, [start_hiding]);

  const handlePasswordReset = () => {
    setpaswordResetIsLoading(true);
    sendPasswordResetEmail(auth, auth.currentUser.email)
      .then((res) => {
        // Password reset email sent!
        // ..
        setpaswordResetIsLoading(false);
        setpasswordResetValue("Email sent successfully");
        // Reset the message back to "Password reset" after 4 seconds
        setTimeout(() => {
          setpasswordResetValue("Password reset");
        }, 4000); // 4 seconds in milliseconds
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setpaswordResetIsLoading(false);
        setpasswordResetValue(errorMessage);

        // ..
      });
  };
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <div
        className={`w-full min-h-full bg-black ${settings_is_opac} fixed top-0 left-0 z-[9999] transition duration-[1s] setting_modal sm:items-end flex justify-end items-start pt-[7vw] sm:py-0 sm:px-0 px-[2vw] overflow-hidden`}
      >
        <Image
          src={exit_modal}
          alt="exit ham"
          className="sm:block hidden w-[10vw] h-fit absolute top-[5vw] right-[3vw] "
          style={{ opacity: mob_ham_opac ? 1 : 0, transition: "1s ease" }}
        />
        <div
          className={`w-[35vw]  sm:w-full  h-auto py-[2vw] sm:py-[5vw] sm:px-[2vw] relative sm:gap-[4vw] rounded-[2.2vw] bg-[#111111] settings flex flex-col gap-[3vw] border-[#434343] overflow-hidden ${
            globalThis.innerWidth > 650 ? shift_modal : up_modal
          } border transition duration-[1.5s]`}
          ref={ref_modal}
        >
          {" "}
          {loading ? (
            <>
              {/* first dive section */}
              <div className="w-full h-auto px-[2vw] flex justify-between items-center">
                <div className="w-auto h-auto  flex items-center gap-[1vw] sm:gap-[3vw]">
                  <div
                    className=" h-[4.9vw] avater_bg w-[4.9vw] sm:w-[11vw] sm:h-[11vw]  rounded-[100%] overflow-hidden relative "
                    style={{
                      backgroundImage: `url('${selectedImage}')`,
                    }}
                  >
                    {/* <Image
                      src={selectedImage}
                      alt=""
                      unoptimized
                      width={800}
                      height={800}
                    /> */}
                  </div>
                </div>
                <p className="neuem text-[1.06vw] sm:text-[3vw] text-white">
                  Tap any box to edit
                </p>
              </div>
              {/* third section that contains all the names*/}
              <div className="w-full flex sm:gap-[3vw]     px-[2vw] justify-start gap-[1vw] flex-wrap">
                {errPasswordModule && (
                  <p className="text-[red] w-full text-[0.8vw] sm:text-[3.2vw]">
                    {errPasswordModule}
                  </p>
                )}
                <div className="flex  flex-col gap-[0.5vw] sm:gap-[1.5vw] w-[40%]">
                  <label
                    htmlFor=""
                    className="neuem text-[0.8vw] sm:text-[2.8vw] text-white opacity-[70%] capitalize"
                  >
                    Admin name
                  </label>
                  <input
                    type="text"
                    placeholder={`${
                      user_username == "" ? "Fill in your information " : ""
                    }`}
                    onChange={(e: any) => {
                      setsave("Save");
                      setUser_username(e.target.value);
                    }}
                    className="py-[0.7vw] sm:py-[3vw] sm:rounded-[4vw] sm:px-[3vw] text-[0.9vw] sm:text-[3vw] text-white bg-[#212121] rounded-[2.2vw] capitalize px-[1.7vw]"
                    value={user_username == "" ? "" : user_username}
                  />
                </div>

                <div className="flex flex-col gap-[0.5vw] sm:gap-[1.5vw] sm:w-[50%] w-[55%]">
                  <label
                    htmlFor=""
                    className="neuem text-[0.8vw] sm:text-[2.8vw] text-white opacity-[70%]"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder={`${
                      user_email == "" ? "Fill in your information " : ""
                    }`}
                    onChange={(e: any) => {
                      setsave("Save");
                      setUser_email(e.target.value);
                    }}
                    className="py-[0.7vw] sm:py-[3vw] sm:rounded-[4vw] sm:px-[3vw] text-[0.9vw] sm:text-[3vw]  text-white bg-[#212121] rounded-[2.2vw] px-[1.7vw]"
                    value={user_email == "" ? "" : user_email}
                  />
                </div>
              </div>
              {/* cross bar */}
              <div className="w-full h-[0.1vw] bg-[#353535] border-b-[#353535] ">
                {" "}
              </div>
              <p className="absolute top-[0.4vw] left-[3vw]  text-[0.7vw] text-[lightgray] capitalize">
                {errInfoModule}
              </p>
              <div className="w-full  h-[3.5vw] sm:py-[5vw]  px-[2vw] sm:h-[25vw]  flex justify-between items-center">
                <button
                  className="h-full w-[49%] sm:text-[3.5vw] sm:rounded-[4vw] bg-[#262626] text-white text-[1vw] neuem rounded-[1.3vw] hover:bg-[#131312] hover:border  transition duration-[0.3s]:text-white hover:bg-opacity-[30%] flex justify-center items-center"
                  onClick={handlePasswordReset}
                >
                  {paswordResetIsLoading ? (
                    <div className="rounded-[100%] h-[2vw] w-[2vw] sm:w-[5vw] sm:h-[5vw] sm:border-t-[0.8vw]  border-solid  border-t-[0.4vw] border-[lightgray] animate-spin"></div>
                  ) : (
                    passwordResetValue
                  )}
                </button>

                <button
                  className="h-full w-[49%] sm:text-[3.5vw] sm:rounded-[4vw] bg-[#CCFF00] text-black text-[1vw] neuem rounded-[1.3vw] hover:bg-[#CCFF00] hover:text-white  hover:border hover:bg-opacity-[30%] transition duration-[0.3s] flex justify-center items-center"
                  onClick={UpdateForm}
                >
                  {saveButtonIsLoading ? (
                    <div className="rounded-[100%] h-[2vw] w-[2vw] sm:w-[5vw] sm:h-[5vw] sm:border-t-[0.8vw]  border-solid  border-t-[0.4vw] border-[black] animate-spin"></div>
                  ) : (
                    save
                  )}
                </button>
              </div>{" "}
              {/*  */}
              {/*  */}
              {/*  */}
              {/* this is for the password verifiation */}
              {confirmPassordModal ? <> </> : null}
            </>
          ) : (
            <>
              {/* first dive section */}
              <div className="w-full animate-pulse h-auto px-[2vw] flex justify-between items-center">
                <div className=" h-[4.9vw] w-[4.9vw] sm:w-[10vw] sm:h-[10vw] bg-[#6a6a6a] rounded-[100%]"></div>
                <p className="neuem text-[1.06vw] sm:text-[3vw] text-white rounded-[2.2vw] h-[2vw] w-[50%] sm:h-[5vw] bg-[#6a6a6a]"></p>
              </div>
              {/* second section and its a button */}
              <div className="w-full px-[2vw] animate-pulse ">
                <p className="  h-[2.5vw] w-[30%] bg-[#CCFF00] text-[0.8vw] sm:py-[3vw] sm:text-[2.8vw] font-[600]  py-[0.6vw] px-[0.6vw] rounded-[2.3vw] neuem"></p>
              </div>
              {/* third section that contains all the names*/}
              <div className="w-full flex animate-pulse sm:gap-[6vw]  px-[2vw] justify-between gap-[2vw] flex-wrap">
                <div className="flex flex-col gap-[0.5vw] sm:gap-[2vw]  w-[48%]">
                  <label
                    htmlFor=""
                    className="h-[1.1vw] sm:h-[3vw] rounded-[2.2vw] w-[60%] bg-[#6a6a6a] "
                  ></label>
                  <div className="w-[95%] sm:h-[8vw] sm:rounded-[8vw] rounded-[2.2vw]  bg-[#6a6a6a] h-[2vw] "></div>
                </div>

                <div className="flex flex-col gap-[0.5vw] sm:gap-[2vw] w-[45%]">
                  <label
                    htmlFor=""
                    className="h-[1.1vw] sm:h-[3vw] rounded-[2.2vw] w-[60%] bg-[#6a6a6a] "
                  ></label>
                  <div className="w-[95%] sm:h-[8vw] sm:rounded-[8vw] rounded-[2.2vw]  bg-[#6a6a6a] h-[2vw] "></div>
                </div>
              </div>
              {/* cross bar */}
              <div className="w-full h-[0.1vw] bg-[#353535] border-b-[#353535] ">
                {" "}
              </div>
              <div className="w-full h-[3.5vw] animate-pulse  sm:h-[13vw]  sm:px-[3vw]  px-[2vw]  flex justify-between items-center">
                <button className="h-full w-[49%] bg-[#262626] text-white text-[1vw] neuem rounded-[1.3vw] sm:rounded-[3vw]"></button>
                <button className="h-full w-[49%] bg-[#CCFF00] text-black text-[1vw] neuem rounded-[1.3vw] sm:rounded-[3vw]"></button>
              </div>{" "}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin_Settings_modal;
