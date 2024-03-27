"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import purchase from "../../../public/support/purchase.webp";
import accessing from "../../../public/support/accessing.webp";
import printing from "../../../public/support/printing.webp";
import painting from "../../../public/support/painting.webp";
import games from "../../../public/support/games.webp";
import journeys from "../../../public/support/journeys.webp";
import Purchase from "./subOptions/purchase";
import Access from "./subOptions/access";
import Printing from "./subOptions/printing";
import Painting from "./subOptions/painting";
import Games from "./subOptions/games";
import Journeys from "./subOptions/journeys";

const Options_body = () => {
  const [items, setitems] = useState([
    {
      img: purchase,
      text: "Purchasing",
      step: 1,
    },
    {
      img: accessing,
      text: "Accessing",
      step: 2,
    },
    {
      img: printing,
      text: "Printing",
      step: 3,
    },
    {
      img: painting,
      text: "Painting",
      step: 4,
    },
    {
      img: games,
      text: "Games",
      step: 5,
    },
    {
      img: journeys,
      text: "Journeys",
      step: 6,
    },
  ]);

  const [step, setstep] = useState(1);

  useEffect(() => {
    setstep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlestep = () => {
    setstep(0);
  };
  return (
    <>
      <h3 className="neuer sm:block hidden text-center text-[6vw] text-white text-opacity-[60%] pt-[8vw]">
        Quick Options
      </h3>
      <div className="w-full sm:py-[10vw] sm:px-[3vw]  py-[6vw] px-[2vw] flex justify-center items-center">
        {step == 0 && (
          <div className="flex sm:w-full sm:gap-[3vw]   w-[45vw] flex-wrap h-auto sm:justify-center  justify-between gap-[1vw] ">
            {items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setstep(e.step);
                  }}
                  className="h-[8vw] sm:gap-[3vw] sm:rounded-[3vw] sm:w-[45.5vw] sm:h-[25vw] rounded-[1vw] bg-[#111111] cursor-pointer hover:bg-opacity-[70%] duration-[0.6s] transition flex-col w-[14vw] flex justify-center items-center gap-[1vw] "
                >
                  <Image
                    src={e.img}
                    alt={e.text}
                    className="w-[1.5vw] h-fit sm:w-[5vw]"
                  />
                  <h3 className="neuer sm:text-[4vw] text-[1.2vw] text-[#CCFF00] capitalize">
                    {e.text}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        {step == 1 && <Purchase goback={handlestep} />}

        {step == 2 && <Access goback={handlestep} />}

        {step == 3 && <Printing goback={handlestep} />}

        {step == 4 && <Painting goback={handlestep} />}

        {step == 5 && <Games goback={handlestep} />}

        {step == 6 && <Journeys goback={handlestep} />}
      </div>
    </>
  );
};

export default Options_body;
