"use client";

import Penalty_kickout from "./penalty_kickout";
import React, { useState } from "react";
import Reduce_forge_options from "./reduce_forge_options";

const Penalty_options = ({ sethide_penalty_options, user_doc_id }: any) => {
  const [hide_penalty_kickout, sethide_penalty_kickout] = useState(true);
  const [hide_limit_forge_options, sethide_limit_forge_options] =
    useState(true);
  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_penalty_options(true);
        }}
      >
        <div
          className="w-[25vw] sm:w-full sm:rounded-[5vw] sm:h-[43vw] sm:gap-[4vw] h-[10vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="text-[1.2vw] sm:text-[4.5vw] neuem">
            Select punishment type
          </h1>

          <div className="w-full flex justify-between gap-[1.5vw] items-center">
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#FF0000] neuer text-white hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                sethide_penalty_kickout(false);
              }}
            >
              Kick out of platform
            </button>
            <button
              className="h-[3.5vw] sm:h-[13vw] sm:text-[3.5vw] w-full bg-[#CCFF00] neuer text-black hover:bg-opacity-[80%] text-[0.9vw] rounded-[1vw] sm:rounded-[3vw]"
              onClick={() => {
                sethide_limit_forge_options(false);
              }}
            >
              Limit forge allocation
            </button>
          </div>
        </div>
      </div>

      {!hide_penalty_kickout && (
        <Penalty_kickout
          user_doc_id={user_doc_id}
          sethide_penalty_kickout={sethide_penalty_kickout}
        />
      )}

      {!hide_limit_forge_options && (
        <Reduce_forge_options
          user_doc_id={user_doc_id}
          sethide_limit_forge_options={sethide_limit_forge_options}
        />
      )}
    </>
  );
};

export default Penalty_options;
