"use client";

import { useEffect, useState } from "react";

const Mobile_Factions_forge_upload = ({
  faction_option,
  setactive_faction,
  active_faction,
  sub_faction_arr,
  setactive_sub_faction,
  active_sub_faction,
  setselected_faction,
  setmobile_filter,
  setselected_sub_faction,
}: any) => {
  const [comeup, setcomeup] = useState(false);

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };
  const hide_modal = () => {
    setcomeup(false);
    setTimeout(() => {
      setmobile_filter(false);
    }, 800);
  };
  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className="w-full  sm:flex hidden z-[9999] fixed top-0 left-0 h-full bg-black bg-opacity-[70%]  justify-center items-end"
        onClick={hide_modal}
      >
        <div
          className={`w-full h-auto ${
            comeup ? "translate-y-[0vw]" : "translate-y-[150vw]"
          } flex flex-col gap-[1.2vw] `}
          style={{ transition: "1.5s ease" }}
          onClick={modalClick}
        >
          <div className="w-full h-auto sm:py-[4vw] rounded-t-[4.2vw] py-[2vw] px-[4vw]  bg-white flex flex-col sm:gap-[5vw] gap-[2vw]">
            <p className="text-[2vw] neuer sm:text-[5vw] ">Factions</p>

            <div className="flex w-full flex-wrap   justify-between gap-[1vw] items-center ">
              {faction_option.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-[12.4vw] sm:w-[30vw] sm:h-[17vw] sm:mb-[2vw] sm:rounded-[2vw] flex justify-center items-center rounded-[1.2vw] h-[5.5vw] bg-[#E7E6E8]  cursor-pointer hover:bg-opacity-[50%]"
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
                    <p className="text-center neuer text-[1.1vw] sm:text-[3.5vw] ">
                      {e.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="w-full  flex flex-col gap-[1vw] pt-[1vw]">
              <p className="text-[4vw] neuer  mb-[21w]">Sub Factions</p>

              <div className="w-full rounded-[2vw] pt-[6vw] bg-[#E7E6E8] min-h-[30vw] flex-wrap flex justify-center items-center gap-[1.2vw] py-[2vw] px-[1vw]">
                {sub_faction_arr.length == 0 && (
                  <p className="neuer text-[4vw] ">Non Available</p>
                )}

                {sub_faction_arr.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="w-[11vw] sm:w-[27vw] sm:h-[13vw] mb-[3vw] flex justify-center items-center rounded-[2vw] h-[5.5vw] bg-[white]  cursor-pointer hover:bg-opacity-[50%]"
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
                      <p className="text-center neuer text-[3.5vw] ">{e}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobile_Factions_forge_upload;
