"use client";

import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import firebaseConfig from "../utils/fire_base_config";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import Forge_Reduction_Confirmation from "./forge_reduce";

const Reduce_forge_options = ({
  sethide_limit_forge_options,
  user_doc_id,
}: any) => {
  const router = useRouter();
  const forge_allocations_arr = [5, 10, 15, 20, 25];
  const app = initializeApp(firebaseConfig);
  const [selected_option, setselected_option] = useState(0);
  const [button_text, setbutton_text] = useState("Select");
  const [
    hide_forge_reduction_confirmation,
    sethide_forge_reduction_confirmation,
  ] = useState(true);

  return (
    <>
      <div
        className="w-full h-full sm:px-[6vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_limit_forge_options(true);
        }}
      >
        <div
          className="w-[23vw] sm:w-full sm:rounded-[5vw] sm:min-h-[80vw] sm:gap-[6vw] min-h-[20vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="text-[1.2vw] sm:text-[4.5vw] text-center neuem">
            Select forge amount to <br /> reduce to
          </h1>
          <div className="w-full sm:gap-[3vw]  justify-center h-auto flex flex-wrap gap-[1vw] ">
            {forge_allocations_arr.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className="flex bg-[#F3F3F3] sm:text-[3vw] sm:w-[25vw]  sm:h-[10vw] text-[0.8vw] cursor-pointer hover:bg-opacity-[50%] neuer rounded-[1vw] sm:rounded-[2vw]  justify-center items-center w-[5.4vw] h-[3vw]"
                  style={{
                    backgroundColor:
                      e == selected_option ? "#CCFF00" : "#F3F3F3",
                    transition: "0.5s ease",
                  }}
                  onClick={() => {
                    setbutton_text("Select");
                    setselected_option(e);
                  }}
                >
                  {e} forges
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-between gap-[1.5vw] items-center">
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#CCFF00] neuer text-black hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                if (selected_option == 0) {
                  return setbutton_text("Please select an option");
                } else {
                  sethide_forge_reduction_confirmation(false);
                }
              }}
            >
              {button_text}
            </button>
          </div>
        </div>
      </div>
      {!hide_forge_reduction_confirmation && (
        <Forge_Reduction_Confirmation
          user_doc_id={user_doc_id}
          selected_option={selected_option}
          sethide_forge_reduction_confirmation={
            sethide_forge_reduction_confirmation
          }
        />
      )}
    </>
  );
};

export default Reduce_forge_options;
