"use client";

import React, { useState, useEffect } from "react";

const Post_preloader = (props: any) => {
  const [images, setimages] = useState(["", "", "", ""]);

  return (
    <>
      <section className="w-[58vw] sm:w-full sm:py-[10vw] h-auto flex flex-col py-[4vw] gap-[3vw] sm:gap-[5vw] sm:rounded-[3vw]  bg-[#111111] rounded-[1.5vw]">
        {/*the heading */}

        <div className="w-full px-[4vw] flex flex-col gap-[2vw]  items-start">
          <div className="w-full flex items-center text-[1vw] gap-[0.5vw] text-opacity-[70%] text-white neuer">
            <p className="animate-pulse bg-[#2a2828] h-[2vw] sm:h-[4vw] sm:w-[50vw] w-[30vw] rounded-[1vw]"></p>
          </div>
          <p className="animate-pulse bg-[#2a2828] h-[2vw] w-[15vw] sm:h-[4vw] sm:w-[25vw] rounded-[1vw]"></p>
        </div>
        {/* the images */}
        <div className="w-full flex flex-wrap gap-[1vw] relative  justify-center items-center px-[0vw]">
          {images.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[28vw] sm:w-[44.5vw] sm:h-[34vw] animate-pulse bg-[#2a2828]  relative h-[24vw] avater_bg rounded-[1.5vw] overflow-hidden "
              ></div>
            );
          })}
        </div>

        <div className="w-full px-[4vw] text-white text-opacity-[50%] text-[1.2vw] flex flex-col gap-[2vw] items-start sm:gap-[4vw] ">
          <p className=" h-[2vw] w-[30vw] sm:h-[4vw] sm:w-[50vw] neuer animate-pulse rounded-[1vw] bg-[#2a2828]"></p>

          <span className="bg-[#CCFF00] h-[2vw] w-[20vw] sm:h-[4vw] sm:w-[26vw] animate-pulse rounded-[1vw] bgs-[#2a2828]"></span>

          {/* the icons */}
          <div className="w-full  py-[1vw]  h-auto  flex justify-between items-center">
            <p className=" h-[2vw] w-[13vw] neuer animate-pulse rounded-[1vw] sm:h-[3vw] sm:w-[17vw] bg-[#2a2828]"></p>

            <div className="w-auto flex gap-[1vw] justify-end items-center ">
              <p className=" h-[2vw] w-[5vw] neuer animate-pulse rounded-[1vw] bg-[#CCFF00]"></p>
            </div>
          </div>

          {/* the form to handle comments  */}
          <div className="w-full h-[3.4vw] sm:h-[6vw]   mt-[0vw] relative text-[1vw]">
            <div className="animate-pulse rounded-[2vw] bg-[#2a2828] h-full w-full"></div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Post_preloader;
