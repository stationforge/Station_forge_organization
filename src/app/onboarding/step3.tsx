"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Step_three = () => {
  const [speed, setspeed] = useState(2);

  const { step, setstep }: any = useOnboarding_Context();

  const [show, setshow] = useState(false);
  const [opac, setopac] = useState(false);

  useEffect(() => {
    if (step != 3) {
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
        <div
          className={`w-auto h-auto absolute top-[-17vw] flex justify-center z-[999999999] sm:hidden   flex-col items-center transition duration-[2s]  `}
          style={{ opacity: !opac ? 0 : 1 }}
        >
          <div className="w-[22vw] h-[14vw]  bg-transparent  rounded-[1.5vw] relative flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]  ">
            <p className="text-[#CCFF00] text-[1vw] neuem  absolute top-[0.5vw] right-[1vw]">
              3 / 4
            </p>
            <h1 className="neuem text-[1.1vw] font-[600]   text-center text-black">
              Search Models
            </h1>
            <p className="neuer text-[1vw] text-center ">
              Search models ny name, faction or <br /> subfactions
            </p>

            <button
              className="neuem w-full rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer bg-[#CCFF00] border-none outline-none "
              onClick={() => {
                setstep(4);
                setspeed(0);
              }}
              style={{
                backgroundColor: step != 3 ? "transparent" : "#CCFF00",
                transition: "4s ease",
              }}
            >
              Next
            </button>
          </div>

          <i className="bi  translate-y-[-2vw] h-fit bi-caret-down-fill text-transparent  text-[3vw]  "></i>
        </div>
      )}
    </>
  );
};

export default Step_three;
