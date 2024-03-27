"use client";

import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import firebaseConfig from "../utils/fire_base_config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const Single_Display_forge_modal = ({
  sethide_single_display_forge_modal,
  data,
  forge_modal_heading,
  lastdownload_time,
}: any) => {
  const router = useRouter();
  const user_loading_loader = ["", "", "", "", "", ""];

  const app = initializeApp(firebaseConfig);

  const [forge_title, setforge_title] = useState("");
  const [forge_img, setforge_img] = useState("");
  const [forgearr_is_loading, setforgearr_is_loading] = useState(true);
  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const doc_ref = doc(db, "products", data);
    getDoc(doc_ref)
      .then((res) => {
        if (res.exists()) {
          const data_res = res.data().cover_png;
          const data_title = res.data().title;
          console.log(data_res);
          setforge_title(data_title);
          setforge_img(data_res);
          setforgearr_is_loading(false);
        }
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, [data]);

  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_single_display_forge_modal(true);
        }}
      >
        <div
          className="w-[35vw] relative sm:w-full sm:rounded-[5vw] sm:h-[100vw] sm:pt-[9vw] sm:pb-[4vw] sm:gap-[4.5vw] h-[30vw] flex-col gap-[2vw] sm:px-[3vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-start py-[2.2vw] items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <i
            className="bi bi-x-lg text-[1.2vw] sm:right-[4vw] sm:top-[3vw] absolute top-[0.5vw] right-[1vw] sm:text-[4vw]  cursor-pointer"
            onClick={() => {
              sethide_single_display_forge_modal(true);
            }}
          ></i>
          {!forgearr_is_loading ? (
            <>
              {" "}
              <div className="w-full sm:pt-[3vw] pt-[1vw] flex justify-between items-center">
                <p className="neuem text-[1.2vw] sm:text-[4vw] ">
                  Last Download
                </p>
                <p className="neuem text-[1.2vw] sm:text-[4vw] ">
                  {lastdownload_time}
                </p>
              </div>
              <div className="w-full px-[6vw]  sm:px-[12vw]    sm:gap-[2.3vw] sm:w-full  sm:h-fit  gap-[0.7vw] flex flex-col items-start h-auto">
                <div
                  className="w-full sm:w-full h-[18vw] sm:h-[62vw] avater_bg "
                  style={{ backgroundImage: `url(/cover.webp)` }}
                >
                  <img
                    src={forge_img}
                    alt="last download img"
                    className="h-full w-full"
                  />
                </div>
                <p className="neuer w-full text-center text-[0.9vw] capitalize sm:text-[4vw]">
                  {forge_title}
                </p>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className="w-full flex justify-between items-center">
                <div className="bg-[#A9A7A7] animate-pulse h-[1.5vw] w-[12vw] sm:w-[25vw] sm:h-[4vw] "></div>
                <div className="bg-[#A9A7A7] animate-pulse h-[1.5vw] w-[7vw] sm:w-[10vw] sm:h-[4vw] "></div>
              </div>
              <div className="w-full px-[6vw]  sm:px-[12vw]    sm:gap-[2.3vw] sm:w-full  sm:h-fit  gap-[0.7vw] flex flex-col items-start h-auto">
                <div className="w-full sm:w-full h-[18vw] sm:h-[62vw] bg-[#A9A7A7] animate-pulse avater_bg "></div>
                <p className="bg-[#A9A7A7] animate-pulse w-full h-[2.3vw] sm:h-[4vw]"></p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Single_Display_forge_modal;
