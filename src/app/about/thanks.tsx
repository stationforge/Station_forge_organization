"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../../public/about/pre_support.webp";
import step_1 from "../../../../public/about/step_1.webp";
import Link from "next/link";

const Thanks = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center sm:px-[3vw] px-[1vw] gap-[3vw] flex-col pt-[7vw]">
        <h2 className="text-center text-[3.5vw] sm:text-[5.4vw] text-[#CCFF00]  neuem leading-[3.3vw] sm:leading-[8vw]">
          THANK YOU FOR SUPPORTING US{" "}
        </h2>
        <p className="text-white   text-opacity-[30%] text-[1.5vw] neuer text-center capitalize sm:text-[4vw]">
          Our Stats
        </p>

        <div className="w-[75vw] sm:w-full sm:h-[30vw] h-[13vw] sm:rounded-[2.5vw] rounded-[1.2vw] bg-[#111111] flex justify-between px-[5.4vw] items-center">
          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2vw]">
            <p className="text-[1.8vw] sm:text-[4vw] neuem  text-white">
              Total Members
            </p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer text-[1.3vw]">
              2735
            </span>
          </div>
          {/* long vertical line */}
          <div className="h-[6vw] w-[0.1vw] sm:h-[15vw] sm:w-[0.4vw] bg-opacity-[23%] bg-[#D9D9D9]  "></div>
          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2vw]">
            <p className="text-[1.8vw] sm:text-[4vw] neuem  text-white">
              Paid Members
            </p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer text-[1.3vw]">
              2,372
            </span>
          </div>
          <div className="h-[6vw] w-[0.1vw] sm:h-[15vw] sm:w-[0.4vw] bg-opacity-[23%] bg-[#D9D9D9]  "></div>

          <div className="w-auto h-auto  flex flex-col items-start gap-[1.2vw]">
            <p className="text-[1.8vw] sm:text-[4vw] neuem  text-white">
              Posts
            </p>
            <span className="text-opacity-[80%] sm:text-[3vw] text-white neuer text-[1.3vw]">
              240
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thanks;
