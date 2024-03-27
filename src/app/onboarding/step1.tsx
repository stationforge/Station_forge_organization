"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Step_one = () => {
  const { step, setstep }: any = useOnboarding_Context();

  const [show, setshow] = useState(false);
  const [opac, setopac] = useState(false);

  useEffect(() => {
    if (step != 1) {
      setopac(false);

      setTimeout(() => {
        setshow(false);
      }, 1000);
    } else {
      setshow(true);
    }
  }, [step]);

  useEffect(() => {
    if (show == true) {
      // settim
      setTimeout(() => {
        setopac(true);
      }, 100);
    } else {
      // setopac(false);
    }
  }, [show]);
  return (
    <>
      {show && (
        <>
          <div
            className={`w-auto sm:hidden h-auto sm:h-[46vw] sm:w-[75.5vw]  absolute sm:bottom-[-48.5vw] sm:rounded-[5vw] bottom-[-15vw] flex justify-center z-[9999990]  right-[4.1vw]  sm:right-[2vw] flex-col items-center transition duration-[1s]  `}
            style={{ opacity: !opac ? 0 : 1 }}
          >
            {/* <i className="bi  translate-y-[2vw]   h-fit bi-caret-up-fill text-transparent  text-[3vw]  "></i> */}
            <div className="w-[22vw] h-[14vw] sm:px-[5vw] sm:h-full sm:gap-[4vw] bg-transparent sm:w-full   rounded-[1.5vw] relative flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]">
              <p className="text-[#CCFF00] text-[1vw] neuem  absolute top-[0.5vw] right-[1vw]">
                1 / 4
              </p>
              <h1 className="neuem text-[1.1vw] font-[600] sm:text-[3.6vw] text-center text-black">
                See Models you have added to forge here
              </h1>
              <p className="neuer text-[1vw] text-center sm:text-[2.8vw] ">
                When you add a forge to your forge it appears{" "}
                <br className="hidden sm:block" /> here foe easy tracking and
                downloads
              </p>

              <button
                className="neuem w-full sm:h-[10vw] sm:text-[3vw] rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer bg-[#CCFF00] border-none outline-none "
                onClick={() => {
                  setstep(2);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      <div
        className={`w-auto sm:w-[75.5vw] sm:h-[46vw] sm:hidden   h-auto absolute bottom-[-15vw] sm:bottom-[-48.5vw] sm:rounded-[5vw]  flex justify-center z-[9999]  right-[4.1vw]  sm:right-[2vw] flex-col items-center transition duration-[10s] ${
          step == 2 && "animate_next_1"
        } ${step == 3 && "animate_next_2"} ${step == 4 && "animate_next_3"}  `}
      >
        <i
          className="bi  sm:text-[11vw] sm:translate-x-[80%] sm:absolute sm:top-[-10.5vw] sm:right-[12vw]  translate-y-[2vw] h-fit bi-caret-up-fill text-white text-[3vw]  "
          style={{
            opacity: step != 1 ? 0 : 1,
            transition: "1s ease",
            display: step != 1 ? "none" : "block",
          }}
        ></i>
        <div className="w-[22vw] border-[#CCFF00] border-[0.1vw] sm:h-full  h-[14vw] sm:w-full  bg-white sm:rounded-[5vw]  rounded-[1.5vw]  flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]">
          <h1 className="neuem text-[1.1vw] text-center text-black"></h1>
          <p className="neuer text-[1vw] text-center "></p>

          <button
            className="neuem w-full rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer border-none outline-none "
            onClick={() => {
              setstep(2);
            }}
          ></button>
        </div>
        <i
          className="bi  translate-y-[-2vw] h-fit bi-caret-down-fill text-white  text-[3vw]  "
          style={{
            opacity: step != 1 ? 1 : 0,
            transition: "1s ease",
            display: step != 1 ? "block" : "none",
            transform: `translateY(${step != 1 ? "-2vw" : "-5vw"})`,
          }}
        ></i>
      </div>
    </>
  );
};

export default Step_one;
