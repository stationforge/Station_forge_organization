"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import mob_filter from "../../../public/home/mob_filter.webp";

import Step_three from "./step3";

const Products_onboarding = () => {
  const [opacity, setopacity] = useState(0.5);
  const { step, mobile_step }: any = useOnboarding_Context();

  const [items, setitems] = useState([
    {
      img: "/onboarding/1.webp",
      txt: "Grimguard seargeant A",
      price: "343",
    },
    {
      img: "/onboarding/2.webp",
      txt: "Grimguard officer",
      price: "343",
    },
    {
      img: "/onboarding/3.webp",
      txt: "Grimguard priest",
      price: "343",
    },
    {
      img: "/onboarding/4.webp",
      txt: "Orkaz Strappaz Front",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
  ]);

  return (
    <>
      <div className="w-[68%] sm:w-full sm:px-[1.5vw] sm:mt-[20vw]  h-auto pb-[1vw] border-r-[white] border-r-[0.1vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <div className="w-full sm:py-[5vw] flex justify-between items-center px-[2vw]">
          <h3
            className="neuer text-[2.2vw] text-white  sm:text-[5vw] sm:leading-[6vw]"
            style={{ opacity: opacity }}
          >
            All New Models <br className="sm:block hidden" /> (August)
          </h3>
          <div
            className="w-auto relative sm:hidden z-[999999999]"
            style={{ opacity: step == 3 ? "" : opacity }}
          >
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                alt="Search icon image"
                className="w-[1.3vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              className="h-[3vw] w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
            />

            <Step_three />
          </div>

          {/* now this is for the search filter  */}
          <div
            className="text-[white] text-opacity-[90%] hidden justify-center items-center sm:flex w-[38vw] gap-[2vw] text-[3vw] h-[10vw] bg-[#181515] rounded-[5vw] "
            style={{
              opacity: mobile_step == 3 ? 1 : 0.7,
              transition: "1s ease",
            }}
          >
            <p>Select categories</p>
            <Image
              src={mob_filter}
              alt="filter icon"
              className="w-[3vw] h-fit opacity-[90%]"
            />
          </div>
        </div>

        <div
          className="w-auto sm:block sm:mb-[5vw] hidden relative z-[999]"
          style={{
            opacity: mobile_step == 2 ? 1 : 0.7,
            transition: "1s ease",
          }}
        >
          <div className="absolute h-full   w-[12vw]  flex justify-center items-center top-0  left-0 z-[13]">
            <Image
              src={searchimg}
              unoptimized
              width="0"
              height="0"
              alt="Search icon image"
              className="w-[5vw]   h-fit"
            />
          </div>
          <input
            type="text"
            placeholder="Search model"
            // onChange={(e) => {
            //   setsearch_text(e.target.value);
            // }}
            // value={search_text || ""}
            className="h-[12vw] w-full   sm:block hidden placeholder:text-white text-white neuer text-[3.5vw] outline-none focus:border transition duration-[0.8s] pl-[12vw] pr-[1vw]  rounded-[7vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
          />
        </div>
        <div
          className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"
          style={{ opacity: opacity }}
        ></div>

        <div
          className="w-full  flex flex-wrap justify-between px-[1.8vw] gap-[1.1vw]  sm:px-0  sm:gap-[3vw] "
          style={{ opacity: opacity }}
        >
          {items.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[20vw]  sm:w-[45.5vw]   sm:gap-[3vw] sm:rounded-[4vw]  border-white  border border-opacity-[30%] overflow-hidden h-auto flex flex-col gap-[1vw] rounded-[2vw]"
              >
                <div
                  className="w-full avater_bg sm:h-[45vw] h-[20vw]"
                  style={{ backgroundImage: `url(${e.img})` }}
                ></div>
                <div className="w-full px-[1vw] flex justify-between  items-center">
                  <p className="neuem text-[1.2vw] text-white sm:text-[3vw]   sm:leading-[3.5vw]">
                    {e.txt}
                  </p>
                </div>

                <div className="bg-[#CCFF00] sm:text-[3vw] hover:bg-opacity-[70%] sm:ml-[3vw] sm:py-[1.2vw] sm:px-[5vw] sm:rounded-[3vw] sm:mb-[4vw] ml-[1vw] rounded-[1.2vw] py-[0.6vw] px-[1.6vw] neuer text-black w-fit h-fit mb-[2vw] text-[1vw]">
                  View
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products_onboarding;
