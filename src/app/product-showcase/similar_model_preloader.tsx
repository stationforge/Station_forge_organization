"use client ";

import Image from "next/image";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

const Preloader_for_Similar_models_preloader = () => {
  const items = ["", "", "", ""];
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="sm:h-[9vw] sm:ml-[3vw] ml-[3vw] animate-pulse bg-[#2a2828]  sm:w-[40vw] h-[3.2vw] w-[20vw] sm:mb-0 mb-[1vw]"></div>
      <div
        className={`w-full  h-auto  cover_scrollbar overflow-x-hidden ${
          items.length > 0 ? "sm:h-[90vw]" : "sm:h-[40vw]"
        }  flex flex-col gap-[2vw] sm:relative`}
      >
        {" "}
        <div className="w-full sm:pr-[5vw] sm:w-auto h-auto sm:gap-[6vw]  sm:absolute sm:top-[3vw] sm:left-0 px-[3vw] py-[1vw]   items-center flex justify-start gap-[3vw]">
          {items.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className=" w-full  cursor-pointer hover:scale-[1.04] transition duration-[0.6s] sm:w-[60vw] flex flex-col gap-[2vw] sm:gap-[4vw]"
                onClick={() => {
                  setpage_loader(true);
                  // route.push(``);
                }}
              >
                <div className="w-full h-[20vw] animate-pulse bg-[#2a2828] sm:h-[60vw] "></div>

                <div className=" sm:h-[9vw] sm:w-[40vw] h-[3vw] w-[15vw]  sm:rounded-[3vw] animate-pulse bg-[#2a2828]  "></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Preloader_for_Similar_models_preloader;
