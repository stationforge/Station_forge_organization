"use client ";

import React, { useEffect, useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Mobile_Allocations = ({
  settrimmed_text,
  trimmed_text,
  setshow_mobile_filter_allocation,
}: any) => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();
  const [comeup, setcomeup] = useState(false);

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
  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 justify-center ${
        !comeup ? "bg-opacity-[0%]" : "bg-opacity-[70%]"
      } items-end bg-black  z-[999] h-full w-full hidden sm:flex`}
      style={{ transition: "1.2s ease" }}
      onClick={() => {
        if (globalThis.innerWidth > 650) {
          setshow_mobile_filter_allocation(false);
        } else if (globalThis.innerWidth < 650) {
          setcomeup(false);
          setTimeout(() => {
            setshow_mobile_filter_allocation(false);
          }, 800);
        }
      }}
    >
      <div
        className={`relative ${
          comeup ? "translate-y-[0vw]" : "translate-y-[120vw]"
        }  sm:bg-black sm:px-[3vw] sm:py-[7vw]  `}
        onClick={(e) => {
          e.stopPropagation();
        }}
        style={{ transition: "1.2s ease" }}
      >
        <div className="w-full h-auto pb-[1vw]  pt-[2vw] px-[1vw] sticky top-[8vw] flex flex-col gap-[1vw] sm:gap-[6vw]">
          <div className="w-full flex justify-between items-center">
            <h3 className="neuer text-[1.6vw] sm:text-[7vw]  text-white">
              Monthly allocations
            </h3>

            <button
              className="bg-[#CCFF00] h-[2.9vw] sm:text-[3.5vw] sm:h-[10vw] sm:w-[20vw] sm:rounded-[3vw] text-[1vw] neuer rounded-[1vw] w-[8vw]"
              onClick={() => {
                setactive("30");
                settrimmed_text("");
              }}
            >
              View all
            </button>
          </div>

          <div className="w-full sm:gap-[4vw]  sm:rounded-[6vw] sm:py-[7vw] left-0 h-auto relative  flex flex-wrap gap-[1vw]  py-[2vw] bg-[#111111] justify-center rounded-[1.2vw]">
            {months.map((e: any, index: any) => {
              return (
                <div
                  className="w-[8vw] sm:w-[22vw]  sm:h-[12vw] sm:rounded-[2vw] sm:text-[3vw]  h-[3.6vw]  rounded-[1.2vw] flex justify-center items-center text-white text-[1vw] neuer bg-black  cursor-pointer"
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
                  <p
                    style={{
                      color: trimmed_text == e ? "black" : "white",
                      opacity: trimmed_text == e ? 1 : 0.7,
                      transition: "0.5s ease",
                    }}
                    className="sm:text-opacity-[70%] text-white"
                  >
                    {e}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mobile_Allocations;
