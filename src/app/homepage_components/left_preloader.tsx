"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Fractions_preloader = () => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();

  return (
    <div className="relative w-[32%] sm:hidden ">
      <div className="w-full h-auto pb-[1vw]  pt-[2vw] px-[1vw] sticky top-[8vw] flex flex-col gap-[1vw]">
        <h3 className="neuer text-[2vw] mb-[0.6vw] text-white h-[4vw] rounded-[1.2vw] w-[15vw] bg-[#111111] animate-pulse"></h3>

        <div className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"></div>

        <div className="w-full  left-0 h-auto relative  flex flex-wrap gap-[1vw]">
          <div className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#CCFF00] animate-pulse flex justify-center items-center text-black neuer text-[1.1vw]"></div>
          <div className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] animate-pulse flex justify-center items-center text-white neuer text-[1.1vw]"></div>

          <div className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] animate-pulse flex justify-center items-center text-white neuer text-[1.1vw]"></div>
          <div className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] animate-pulse flex justify-center items-center text-white neuer text-[1.1vw]"></div>
          <div className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#111111] animate-pulse flex justify-center items-center text-white neuer text-[1.1vw]"></div>
        </div>
      </div>
    </div>
  );
};

export default Fractions_preloader;
