"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Allocations = ({ settrimmed_text, trimmed_text }: any) => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();
  const [active, setactive] = useState("30");
  const [months] = useState([
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
  ]);

  const handlefilter = (e: any) => {
    setactive(e);
    settrimmed_text(e);
  };

  return (
    <div className="relative w-[32%] sm:hidden ">
      <div className="w-full h-auto pb-[1vw]  pt-[2vw] px-[1vw] sticky top-[8vw] flex flex-col gap-[1vw]">
        <h3 className="neuem text-[3vw] pb-[0vw] text-white">Library</h3>

        <div className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"></div>
        <div className="h-[1vw] w-full"></div>
        <div className="w-full flex justify-between pb-[0.3vw] items-center">
          <h3 className="neuer text-[1.6vw]  text-white">
            Monthly allocations
          </h3>

          <button
            className="bg-[#CCFF00] h-[2.9vw] text-[1vw] neuer rounded-[1vw] w-[8vw]"
            onClick={() => {
              setactive("30");
              settrimmed_text("");
            }}
          >
            View all
          </button>
        </div>

        <div className="w-full  left-0 h-auto relative  flex flex-wrap gap-[1vw]  py-[2vw] bg-[#111111] justify-center rounded-[1.2vw]">
          {months.map((e: any, index: any) => {
            return (
              <div
                className="w-[8vw] h-[3.6vw] rounded-[1.2vw] flex justify-center items-center text-white text-[1vw] neuer bg-black text-opacity-[80%] cursor-pointer"
                key={index}
                onClick={() => {
                  handlefilter(e);
                }}
                style={{
                  backgroundColor: trimmed_text == e ? "#CCFF00" : "black",
                  color: trimmed_text == e ? "black" : "white",
                  transition: "0.5s ease",
                }}
              >
                {e}
              </div>
            );
          })}
        </div>

        <div className="h-[0.1vw] mt-[1vw] bg-white bg-opacity-[10%] w-full"></div>
      </div>
    </div>
  );
};

export default Allocations;
