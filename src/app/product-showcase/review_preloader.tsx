"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import firebaseConfig from "../utils/fire_base_config";
import { useRouter, useSearchParams } from "next/navigation";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

const Review_preloader = (props: any) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const route = useRouter();

  const searchParams = useSearchParams();

  const product_id = searchParams.get("product_id");
  const [items, setitems] = useState(["", "", "", ""]);

  return (
    <>
      <div className="w-full h-auto px-[4vw] sm:mt-[4vw] ">
        <div className="w-full h-full gap-[5vw] flex flex-col  sm:gap-[8vw]">
          {/* the reivew count and the input field */}
          <div className="w-full flex justify-between items-center sm:items-start sm:flex-col sm:gap-[7vw]">
            <div className="neuer text-[1.3vw] sm:h-[10vw] sm:w-[40vw] text-white animate-pulse bg-[#2a2828] h-[3vw] w-[24vw] sm:rounded-[4vw]"></div>
            {/* the form to handle comments  */}
            <form className="w-[40vw] sm:rounded-[6vw]  h-auto animate-pulse bg-[#2a2828]  rounded-[2.5vw]  relative text-[1vw] sm:w-full ">
              <div className="w-full h-[3.4vw] sm:h-[13vw] sm:rounded-[6vw]  rounded-[2.5vw] text-white text-opacity-[80%] px-[2vw] neuer transition duration-[0.6s] bg-transparent border-[0.1vw]  border-white border-opacity-[40%]"></div>
              <button
                type="submit"
                className="text-[#CCFF00]  neuer text-[1.2vw]  absolute right-[1.3vw] hover:hover:text-[#7e9426] transition duration-[0.5s] top-[-50%] translate-y-[50%] h-full "
              ></button>
            </form>
          </div>
          {/* now this is for the reviews  */}
          <div className=" h-auto w-full  sm:gap-[5vw] flex justify-start flex-wrap items-center gap-[1.2vw]">
            {items.map((e: any, index: any) => {
              return (
                <div
                  className=" p-[2.5vw] relative sm:w-[43.2vw] sm:py-[8vw] sm:gap-[3vw] sm:rounded-[6vw]  w-[21.7vw] border-[white] border-opacity-[40%] border-[0.1vw] rounded-[2vw] flex flex-col gap-[1.2vw] justify-center "
                  key={index}
                >
                  <div className="w-[4vw] h-[4vw] sm:w-[13vw] sm:h-[13vw] avater_bg animate-pulse bg-[#2a2828] rounded-[100%]"></div>
                  <div className="text-white neuer opacity-[60%] text-[1.1vw] animate-pulse bg-[#2a2828] h-[2vw] w-[12vw] sm:w-[18vw] sm:h-[7vw]"></div>
                  <div className="text-white neuer text-[0.9vw] animate-pulse bg-[#2a2828] h-[5vw] w-[17vw] sm:w-[34vw] sm:h-[13vw]"></div>

                  {/* the three small boxes */}
                  <div className="w-[0.5vw] sm:w-[1.3vw] sm:top-[3vw] sm:right-[4vw] sm:h-[1.3vw] absolute top-[1.7vw] right-[1.7vw] h-[0.5vw] animate-pulse bg-[white]  rounded-[100%] bg-opacity-[50%]"></div>
                  <div className="w-[0.5vw] sm:w-[1.3vw] sm:bottom-[3vw] sm:right-[4vw] sm:h-[1.3vw] absolute bottom-[1.7vw] right-[1.7vw] h-[0.5vw] animate-pulse bg-[white]  rounded-[100%] bg-opacity-[50%]"></div>
                  <div className="w-[0.5vw] sm:w-[1.3vw] sm:bottom-[3vw] sm:left-[4vw] sm:h-[1.3vw] absolute bottom-[1.7vw] left-[1.7vw] h-[0.5vw] animate-pulse bg-[white]  rounded-[100%] bg-opacity-[50%]"></div>
                </div>
              );
            })}
          </div>
          <button className="bg-[#CCFF00] sm:w-full sm:rounded-[4vw] sm:h-[13vw] animate-pulse  py-[2.1vw] px-[8vw] hover:bg-opacity-[70%] rounded-[2vw] w-fit neuem text-[1.2vw]"></button>
        </div>
      </div>
    </>
  );
};

export default Review_preloader;
