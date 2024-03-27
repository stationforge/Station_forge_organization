"use client";

import { useEffect, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Image from "next/image";
import logo from "../../../public/logo.webp";
import test from "../../../public/subscription/post_1.webp";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
const Download_modal = (props: any) => {
  const {
    setforge_loader,
    forge_loader,
    handle_download,
    downloadProgress,
  }: any = useProfile_Context();
  const [comeup, setcomeup] = useState(false);
  const [go_right, setgo_right] = useState(false);
  const [go_width, setgo_width] = useState(false);
  const [is_loading_allocation, setis_loading_allocation] = useState(true);
  const [is_loading_forge, setis_loading_forge] = useState(true);
  const [is_downloading1, setis_downloading1] = useState(false);
  const [is_downloading2, setis_downloading2] = useState(false);
  const [uid, setuid] = useState("");
  const [allocation_number, setallocation_number] = useState(0);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();

  const {
    setshow_download_modal,
    pnglink,
    modellink,
    download_text,
    currently_downloading_id,
  } = props;

  // const {} = props
  // Function to hide the forge
  const hideForge = () => {
    if (globalThis.innerWidth > 650) {
      setshow_download_modal(false);
    } else if (globalThis.innerWidth < 650) {
      setcomeup(false);
      setTimeout(() => {
        setshow_download_modal(false);
      }, 500);
    }
  };

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadpng = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' instead of 'smooth' for an instant scroll
    });
    handle_download(
      pnglink,
      `${download_text}_png`,
      currently_downloading_id,
      false,
    );
  };
  const downloadpngWithModel = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' instead of 'smooth' for an instant scroll
    });
    handle_download(
      modellink,
      `${download_text}_png_With_Model`,
      currently_downloading_id,
      true,
    );
  };

  useEffect(() => {
    localStorage.setItem("downloadid", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgressid = localStorage.getItem("downloadid");

      if (storedDownloadProgressid == null) {
        setis_downloading1(true);
        setis_downloading2(false);
        return;
      } else if (storedDownloadProgressid == "") {
        setis_downloading1(true);
        setis_downloading2(false);
        return;
      } else if (storedDownloadProgressid == "0") {
        setis_downloading1(true);
        setis_downloading2(false);

        return;
      } else if (storedDownloadProgressid != "") {
        setis_downloading1(false);
        setis_downloading2(true);
        return;
      }
      // console.log("this is runin");
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 bg-black sm:bg-opacity-[80%] bg-opacity-[50%] flex  z-[999999] justify-center items-center sm:items-end"
        onClick={hideForge} // Hide forge when clicking on the background
      >
        <div
          className={` w-[32vw] sm:w-[99vw] sm:bg-[black] sm:gap-[3vw] sm:h-[60vw] bg-[#111111] z-[1000] h-[20vw]  ${
            comeup ? "translate-y-[0vw]" : "translate-y-[100vw]"
          }  overflow-hidden flex-col justify-center items-center gap-[1.6vw] px-[3vw] flex flex-wrap relative rounded-[2vw]`}
          onClick={modalClick}
          style={{ transition: "1s ease" }}
        >
          <p className="neuer text-[2vw] sm:text-[5vw] text-white mb-[1vw]">
            Choose download option
          </p>
          {is_downloading2 && (
            <p className="neuer text-[1.3vw] sm:text-[3.5vw] opacity-[70%] text-white text-center">
              Please wait. Your current download is in progress
            </p>
          )}
          {is_downloading1 && (
            <>
              {" "}
              <button
                className="neuer text-[1.1vw] sm:text-[3.5vw] sm:h-[14vw] sm:rounded-[4vw] text-[#CCFF00] border-[#CCFF00] border-[0.1vw] rounded-[1.2vw] hover:text-black hover:bg-[#CCFF00] transition duration-[0.3s] w-full h-[4.5vw]"
                onClick={downloadpng}
              >
                Download PNG
              </button>
              <button
                className="neuer text-[1.1vw] sm:text-[3.5vw] sm:h-[14vw] sm:rounded-[4vw] text-[#CCFF00] border-[#CCFF00] border-[0.1vw] rounded-[1.2vw]  hover:text-black hover:bg-[#CCFF00] transition duration-[0.3s] w-full h-[4.5vw]"
                onClick={downloadpngWithModel}
              >
                Download PNG with model
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Download_modal;
