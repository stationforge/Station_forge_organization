"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import img from "../../../public/subscription/post_1.webp";
import prev_img from "../../../public/showcase/prev.webp";
import next_img from "../../../public/showcase/next.webp";
const Showcase_preloader = (props: any) => {
  const [items, setitems] = useState(["", "", "", ""]);

  return (
    <>
      <main className="w-full h-auto  px-[8.5vw] sm:px-[3vw] sm:flex-col  flex justify-between items-start">
        <div className="sm:block hidden animate-pulse bg-[#2a2828] rounded-[4vw] sm:w-[25vw] sm:h-[7vw]  mb-[4vw]"></div>
        <div className="sm:block hidden animate-pulse bg-[#2a2828] rounded-[4vw] sm:w-[65vw] sm:h-[12vw]  mb-[6vw]"></div>
        {/* for the images side  */}
        <div className="w-[39vw] sm:w-full overflow-hidden sm:rounded-[5vw]  border-[white] border-[0.15vw]  sm:h-[140vw]  border-opacity-[31%] rounded-[2vw] flex flex-col h-[57vw]">
          {/* main image */}
          <div className="w-full h-[68%] sm:h-[70%] animate-pulse bg-[#2a2828] overflow-hidden"></div>
          <div
            className={`w-full h-[32%] sm:h-[30%] flex justify-around items-center relative overflow-hidden  `}
          >
            <div className="absolute flex h-full sm:gap-[3.5vw]  w-auto  items-center gap-[2vw] px-[2vw]  top-0 left-0 ">
              {items.map((e: any, index: any) => {
                return (
                  <>
                    <div
                      className="w-[10vw] sm:w-[20vw] sm:h-[20vw] h-[10vw] animate-pulse bg-[#2a2828] "
                      key={index}
                    >
                      {" "}
                    </div>
                    <div className="h-full w-[0.15vw] sm:w-[0.5vw] bg-[white] bg-opacity-[31%]"></div>
                  </>
                );
              })}
            </div>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/*  */}

        {/* for the text and description side */}
        <div className="w-[36vw] flex flex-col text-white sm:w-full sm:mt-[6vw] items-start justify-center gap-[3vw]  h-auto pt-[4vw]">
          <div className="neuem text-[2.5vw] w-[80%] h-[3vw] animate-pulse bg-[#2a2828] rounded-[3.2vw] sm:hidden"></div>

          <div className="bg-[#CCFF00] animate-pulse text-black neuer text-[1.1vw] rounded-[3.2vw] py-[1.4vw] px-[6vw] sm:w-fit sm:w-full sm:h-[12vw]"></div>

          <div className="w-full flex flex-col sm:gap-[5vw] sm:mt-[6vw] justify-center gap-[1.7vw] ">
            <h3 className="text-[1.3vw] neuer animate-pulse bg-[#2a2828] w-[50%] h-[2vw] rounded-[3.2vw] sm:w-[35vw] sm:h-[10vw]"></h3>

            <div className="text-[1.2vw] neuer w-full sm:h-[50vw] h-[20vw] animate-pulse bg-[#2a2828] rounded-[2vw]"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Showcase_preloader;
