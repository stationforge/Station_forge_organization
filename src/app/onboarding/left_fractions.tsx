"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import Step_two from "./step2";

const Fractions_onboarding = () => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();

  return (
    <>
      <div className="w-[32%] sm:hidden h-auto pb-[1vw] border-r-[white] border-r-[0.1vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <h3
          className="neuer text-[2vw] pb-[0.3vw] text-white"
          style={{ opacity: opacity }}
        >
          Factions
        </h3>

        <div
          className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"
          style={{ opacity: opacity }}
        ></div>

        <div className="w-full h-auto relative  flex flex-wrap gap-[1vw]">
          <div
            className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] flex justify-center items-center text-white neuer text-[1.1vw]"
            style={{ opacity: opacity }}
          >
            New
          </div>
          <div
            className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#CCFF00] flex justify-center items-center text-black neuer text-[1.1vw]"
            style={{ opacity: step == 2 ? "" : opacity }}
          >
            Humanoids
          </div>
          <div
            className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] flex justify-center items-center text-white neuer text-[1.1vw]"
            style={{ opacity: opacity }}
          >
            Robots
          </div>
          <div
            className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] flex justify-center items-center text-white neuer text-[1.1vw]"
            style={{ opacity: opacity }}
          >
            Aliens
          </div>
          <div
            className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] flex justify-center items-center text-white neuer text-[1.1vw]"
            style={{ opacity: opacity }}
          >
            Chaos
          </div>
          <Step_two />
        </div>
      </div>
    </>
  );
};

export default Fractions_onboarding;
