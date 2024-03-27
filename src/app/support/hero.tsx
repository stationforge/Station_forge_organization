"use client";

import Image from "next/image";
import React, { useState } from "react";
import Hero_img from "../../../public/support/hero.webp";
import mob_Hero_img from "../../../public/support/mob_hero.webp";
import search_img from "../../../public/support/search_icon.png";

const Support_hero = () => {
  return (
    <>
      <div className="w-full h-[30vw] sm:h-[110vw]   mt-[2vw] px-[2vw] flex justify-center sm:px-[0] items-center">
        <div className="w-full h-full relative overflow-hidden flex justify-center items-center  rounded-[1.5vw]">
          <div className="w-auto relative z-[10]">
            <div className="absolute h-full  w-[5vw] pr-[0.5vw] flex justify-end sm:justify-center items-center top-0 left-0  sm:w-[15vw] z-[13]">
              <Image
                src={search_img}
                alt="Search icon image"
                className="w-[1.8vw] sm:w-[6vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Hello, how can we help you"
              className="h-[4vw] sm:w-[85vw] sm:rounded-[7vw] sm:h-[12vw] text-white neuem text-[1.3vw] outline-none focus:border 
              sm:text-[3.5vw] transition duration-[0.8s] sm:pl-[12vw] pl-[5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] sm:backdrop-blur-[10px] bg-[white] bg-opacity-[10%] w-[35vw]"
            />
          </div>
          <Image
            src={Hero_img}
            alt="support page hero image"
            className="absolute sm:hidden  top-0  left-0 w-full h-fit z-[1]"
          />
          <Image
            src={mob_Hero_img}
            alt="support page hero image"
            className="absolute hidden sm:block top-0  left-0 w-full h-fit z-[1]"
          />
        </div>
      </div>
    </>
  );
};

export default Support_hero;
