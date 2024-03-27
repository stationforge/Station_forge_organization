"use client ";

import React, { useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Fractions = ({
  faction_option,
  active_faction,
  setactive_faction,
  setfaction_data,
  sub_faction_arr,
  active_sub_faction,
  setactive_sub_faction,
}: any) => {
  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();

  return (
    <div className="relative w-[32%] sm:hidden">
      <div className="w-full h-auto pb-[1vw]  pt-[2vw] px-[1vw] sticky top-[8vw] flex flex-col gap-[1vw]">
        <h3 className="neuer text-[2vw] pb-[0.3vw] text-white">Factions</h3>

        <div className="h-[0.1vw] bg-white bg-opacity-[10%] w-full"></div>

        <div className="w-full left-0 h-auto relative  flex flex-wrap gap-[1vw]">
          {faction_option.map((e: any, index: number) => {
            return (
              <div
                key={index}
                className="w-[9vw] rounded-[1.5vw]  h-[6vw] bg-[#CCFF00] flex justify-center items-center text-black neuer cursor-pointer text-[1.1vw]"
                style={{
                  backgroundColor:
                    active_faction == e.id ? "#CCFF00" : "#111111",
                  color: active_faction == e.id ? "black" : "white",

                  transition: "0.5s ease",
                }}
                onClick={() => {
                  setactive_faction(e.id);
                  setfaction_data(e.label);
                }}
              >
                {e.label}
              </div>
            );
          })}
        </div>

        <p className="text-[1.5vw] pt-[1vw] neuer text-white">Sub Factions</p>
        <div className="w-full rounded-[2vw]  bg-[#111111] min-h-[10vw] flex-wrap flex justify-start items-center gap-[0.6vw] py-[2vw] px-[0.3vw]">
          {sub_faction_arr?.length == 0 && (
            <p className="neuer text-[1.1vw] text-white text-center w-full">
              Non Available
            </p>
          )}

          {sub_faction_arr?.map((e: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[9vw] flex justify-center items-center rounded-[1.2vw] h-[4vw] text-white text-opacity-[70%] neuer  cursor-pointer hover:bg-opacity-[50%]"
                style={{
                  backgroundColor:
                    active_sub_faction == e ? "#CCFF00" : "black",
                  transition: "0.5s ease",
                  color: active_sub_faction == e ? "black" : "white",
                }}
                onClick={() => {
                  setactive_sub_faction(e);
                  // setselected_sub_faction(e);
                }}
              >
                <p className="text-center neuer text-[1vw] ">{e}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Fractions;
