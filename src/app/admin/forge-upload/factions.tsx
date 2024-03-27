"use client";

import { useEffect } from "react";

const Factions_forge_upload = ({
  faction_option,
  setactive_faction,
  active_faction,
  sub_faction_arr,
  setactive_sub_faction,
  active_sub_faction,
  setselected_faction,
  setselected_sub_faction,
}: any) => {
  return (
    <>
      <div className="w-[30vw] sm:hidden h-auto flex flex-col gap-[1.2vw] ">
        <h3 className="text-[1.2vw] neuem">Select Forge category</h3>

        <div className="w-full h-auto rounded-[2.2vw] py-[2vw] px-[2vw]  bg-white flex flex-col gap-[2vw]">
          <p className="text-[2vw] neuer ">Factions</p>

          <div className="flex w-full flex-wrap justify-between gap-[1vw] items-center ">
            {faction_option.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className="w-[12.4vw] flex justify-center items-center rounded-[1.2vw] h-[5.5vw] bg-[#E7E6E8]  cursor-pointer hover:bg-opacity-[50%]"
                  style={{
                    backgroundColor:
                      active_faction == e.id ? "#CCFF00" : "#E7E6E8",
                    transition: "0.5s ease",
                  }}
                  onClick={() => {
                    setactive_faction(e.id);
                    setselected_faction(e.label);
                  }}
                >
                  <p className="text-center neuer text-[1.1vw] ">{e.label}</p>
                </div>
              );
            })}
          </div>

          <div className="w-full  flex flex-col gap-[1vw] pt-[1vw]">
            <p className="text-[2vw] neuer ">Sub Factions</p>

            <div className="w-full rounded-[2vw] bg-[#E7E6E8] min-h-[10vw] flex-wrap flex justify-center items-center gap-[1.2vw] py-[2vw] px-[1vw]">
              {sub_faction_arr.length == 0 && (
                <p className="neuer text-[1.1vw] ">Non Available</p>
              )}

              {sub_faction_arr.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-[11vw] flex justify-center items-center rounded-[1.2vw] h-[5.5vw] bg-[white]  cursor-pointer hover:bg-opacity-[50%]"
                    style={{
                      backgroundColor:
                        active_sub_faction == e ? "#CCFF00" : "white",
                      transition: "0.5s ease",
                    }}
                    onClick={() => {
                      setactive_sub_faction(e);
                      setselected_sub_faction(e);
                    }}
                  >
                    <p className="text-center neuer text-[1.1vw] ">{e}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Factions_forge_upload;
