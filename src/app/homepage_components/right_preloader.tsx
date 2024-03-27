"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";
import Link from "next/link";

const Product_preloader = (props: any) => {
  const route = useRouter();
  const { products } = props;
  const [opacity, setopacity] = useState(0.5);
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[date.getMonth()];

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
  ]);

  return (
    <>
      <div className="w-[68%] sm:w-full sm:px-[3vw]  sm:h-[100vh]  h-auto pb-[1vw] pt-[2.26vw]  border-r-[white] border-r-[0.1vw]  border-l-[white] border-l-[0.13vw] border-opacity-[10%]  flex flex-col gap-[1vw] sm:gap-[7vw]">
        <div className="w-full flex justify-between items-center  px-[2vw] sm:px-0">
          <h3 className="neuer text-[2.2vw] text-white bg-[#111111] sm:h-[8vw]       sm:w-[40vw] h-[4vw] w-[20vw] animate-pulse rounded-[1.5vw] "></h3>
          <div className="w-auto relative z-[999999999]">
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]"></div>
            <div className="h-[3vw] bg-[#111111] animate-pulse sm:h-[7vw]   w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px]   ">
              {" "}
            </div>
          </div>
        </div>
        <div className="h-[0.1vw] bg-white  bg-opacity-[10%] w-full sm:hidden"></div>
        <h3 className="neuer text-[2.2vw] text-white bg-[#111111] sm:h-[13vw] sm:rounded-[7vw]   sm:w-full h-[4vw] w-[20vw] sm:block hidden  animate-pulse rounded-[1.5vw] "></h3>
        <div className="w-full flex flex-wrap justify-start px-[1.8vw] sm:gap-[4vw] sm:px-0 gap-[1.7vw]">
          {items.map((e: any, index: any) => {
            // if (index == 9 ) {

            // }
            return (
              <>
                <div
                  key={index}
                  //   scroll={true}
                  className="w-[19.5vw]  sm:w-[41.5vw] sm:gap-[4vw]   border-white  border border-opacity-[30%] overflow-hidden cursor-pointer hover:scale-[1.008] transition duration-[0.6s] h-auto flex flex-col gap-[1.3vw] rounded-[2vw] sm:rounded-[4vw]"
                >
                  <div className="w-full bg-[#111111] animate-pulse avater_bg sm:h-[40vw] h-[20vw] overflow-hidden"></div>
                  <div className="w-full px-[1vw] flex justify-between  items-center">
                    <p className="neuem text-[1.2vw] h-[2.6vw] sm:h-[4vw] sm:w-[30vw] rounded-[1.2vw] w-[14vw] text-white animate-pulse  bg-[#111111]"></p>
                  </div>
                  <div className="w-full  flex px-[1vw] sm:mb-[3vw] sm:px-[3vw] mb-[1vw] justify-between items-center ">
                    <button className="bg-[#CCFF00] hover:bg-opacity-[70%] sm:h-[4vw] sm:w-[15vw]  rounded-[1.2vw]  neuer text-black  text-[1vw] animate-pulse h-[2.7vw] w-[8vw]  "></button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Product_preloader;
