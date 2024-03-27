"use client";

import React, { useState, useEffect } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import { useRouter } from "next/navigation";

const Mobile_card = () => {
  const { mobile_step, setmobile_step }: any = useOnboarding_Context();

  const [show, setshow] = useState(false);

  const router = useRouter();
  const [opac, setopac] = useState(false);

  //   useEffect(() => {
  //     if (step != 1) {
  //       setopac(false);

  //       setTimeout(() => {
  //         setshow(false);
  //       }, 1000);
  //     } else {
  //       setshow(true);
  //     }
  //   }, [step]);

  //   useEffect(() => {
  //     if (show == true) {
  //       // settim
  //       setTimeout(() => {
  //         setopac(true);
  //       }, 100);
  //     } else {
  //       // setopac(false);
  //     }
  //   }, [show]);

  const [arrow_left, setarrow_left] = useState(8);
  const [modal_top, setmodal_top] = useState(20);
  const [modal_right, setmodal_right] = useState(2);
  //   const [arrow_left, setarrow_left]= useState()

  const items = [
    {
      title: "See Models you have added to forge here",
      body: "When you add a forge to your forge it appears here foe easy tracking and downloads",
    },
    {
      title: "Search Models",
      body: "Search models ny name, faction or subfactions",
    },
    {
      title: "Filter Models",
      body: "Filter out factions and sub factions to get pin point access to forges",
    },
  ];

  useEffect(() => {
    if (mobile_step == 1) {
    } else if (mobile_step == 2) {
      setmodal_top(63);
      setmodal_right(12.5);
      setarrow_left(40);
    } else if (mobile_step == 3) {
      setmodal_top(45);
      setmodal_right(2);
      setarrow_left(15);
    }
  }, [mobile_step]);
  return (
    <>
      <>
        <div
          className={`w-auto hidden  bg-white  sm:flex h-auto sm:h-[46vw] sm:w-[75.5vw]  fixed sm:rounded-[5vw]   justify-center z-[9999990]  right-[4.1vw]  sm:right-[2vw] flex-col items-center transition duration-[1s]  `}
          style={{
            transition: "1s ease",
            top: `${modal_top}vw`,
            right: `${modal_right}vw`,
            // right: `5vw`,
          }}
          // style={{ opacity: !opac ? 0 : 1 }}
        >
          <i
            className="bi  sm:text-[11vw] sm:translate-x-[50%] sm:absolute sm:top-[-10.5vw]   translate-y-[2vw] h-fit bi-caret-up-fill text-white text-[3vw]  "
            style={{
              transition: "1s ease",
              right: `${arrow_left}vw`,
            }}
          ></i>
          {items.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[22vw] h-[14vw] absolute top-0  sm:px-[5vw] sm:h-full sm:gap-[4vw] bg-transparent sm:w-full   rounded-[1.5vw]  flex justify-center items-center flex-col gap-[1.2vw] px-[1vw]"
                style={{
                  opacity: mobile_step == index + 1 ? 1 : 0,
                  zIndex: mobile_step == index + 1 ? 9999 : 1,
                  transition: "1s ease",
                }}
              >
                <p className="text-[#CCFF00] text-[3.5vw] neuem  absolute top-[2vw] right-[2vw]">
                  {index + 1} / {items.length}
                </p>
                <h1 className="neuem text-[1.1vw] font-[600] sm:text-[3.6vw] text-center text-black">
                  {e.title}
                </h1>
                <p className="neuer text-[1vw] text-center sm:text-[2.8vw] ">
                  {e.body}
                </p>

                <button
                  className="neuem w-full sm:h-[10vw] sm:text-[3vw] rounded-[1vw] py-[0.8vw] text-[1.1vw] hover:bg-opacity-[30%] transition duration-[0.6s] cursor-pointer bg-[#CCFF00] border-none outline-none "
                  onClick={() => {
                    if (index + 1 < items.length) {
                      setmobile_step(mobile_step + 1);
                      console.log(mobile_step);
                    } else {
                      router.push("/");
                    }
                  }}
                >
                  {index + 1 < items.length ? "Next" : "Finish"}
                </button>
              </div>
            );
          })}
        </div>
      </>
    </>
  );
};

export default Mobile_card;
