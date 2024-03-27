"use client";

import { doc, updateDoc } from "firebase/firestore";
import React from "react";

const Pinned_modal = (props: any) => {
  const { sethide_pinned_modal, unpinpost } = props;

  return (
    <>
      <div
        className="w-full h-full fixed top-0 left-0 z-[9999] bg-black bg-opacity-[60%] flex justify-center sm:px-[3vw] items-center"
        onClick={() => {
          sethide_pinned_modal(false);
        }}
      >
        {" "}
        <div
          className="bg-white sm:rounded-[4vw] sm:w-full sm:h-[40vw] w-[30vw] h-[12vw] rounded-[1.2vw] gap-[2vw] px-[2.3vw] sm:gap-[5vw] flex flex-col justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="neuer text-[1.2vw] text-center sm:text-[4vw]">
            Post has been pinned to top
          </h1>

          <div className="w-full h-auto flex justify-center sm:gap-[4vw] gap-[2vw] items-center">
            <button
              className="neuer sm:text-[4vw] sm:h-[13vw]  border-[#FF0000] transition duration-[0.6s] border-[0.1vw] hover:border-black hover:bg-transparent hover:text-black w-full h-[3vw] text-[1.3vw] flex justify-center items-center text-white rounded-[1.2vw] bg-[#FF0000]"
              onClick={() => {
                unpinpost();
              }}
            >
              Unpin
            </button>
            <button
              className="neuer sm:text-[4vw] sm:h-[13vw]  border-[black] transition duration-[0.6s] border-[0.1vw]  hover:bg-[black] hover:text-white w-full h-[3vw] flex justify-center items-center text-[1.3vw]  rounded-[1.2vw] bg-transparent text-black"
              onClick={() => {
                sethide_pinned_modal(false);
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

export default Pinned_modal;
