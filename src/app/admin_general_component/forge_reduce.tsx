"use client";

import { initializeApp } from "firebase/app";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import firebaseConfig from "../utils/fire_base_config";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

const Forge_Reduction_Confirmation = ({
  sethide_forge_reduction_confirmation,
  user_doc_id,
  selected_option,
}: any) => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const [button_text, setbutton_text] = useState("Yes");
  const update_forge_allocation = () => {
    setbutton_text("Updating ");
    const user_ref = doc(db, "users", user_doc_id);
    updateDoc(user_ref, {
      allocations: selected_option,
    })
      .then(() => {
        setbutton_text("Updated Successfully");

        setTimeout(() => {
          setbutton_text("Yes");
        }, 5000);
      })
      .catch((err) => {
        console.log("Error deleting user" + err);
        setbutton_text("Not successfull ");
      });
  };
  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_forge_reduction_confirmation(true);
        }}
      >
        <div
          className="w-[25vw] sm:w-full sm:rounded-[5vw] sm:h-[46vw] sm:gap-[4vw] h-[13vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="text-[1.2vw] sm:text-[4.5vw] text-center neuem">
            Are you sure you want to Limit <br /> this users allocation to{" "}
            {selected_option}
          </h1>

          <div className="w-full flex justify-between gap-[1.5vw] items-center">
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#FF0000] neuer text-white hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                update_forge_allocation();
              }}
            >
              {button_text}
            </button>
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#CCFF00] neuer text-black hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                sethide_forge_reduction_confirmation(true);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forge_Reduction_Confirmation;
