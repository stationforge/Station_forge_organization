"use client ";

import Head from "next/head";
import Fractions from "./factions";
import { useState, useEffect } from "react";

const Mobile_factions = ({
  faction_option,
  active_faction,
  setactive_faction,
  setfaction_data,
  sub_faction_arr,
  active_sub_faction,
  setactive_sub_faction,
  setmobile_faction_active,
}: any) => {
  const [goup, setgoup] = useState(false);

  useEffect(() => {
    setgoup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hideForge = () => {
    setgoup(false);
    setTimeout(() => {
      setmobile_faction_active(false);
    }, 400);
  };

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };
  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div
        className={`w-full ${
          goup ? "bg-opacity-[70%]" : "bg-opacity-[0%]"
        }   h-full fixed top-0 left-0 z-[999999] bg-black  flex justify-center items-end`}
        style={{ transition: "1s ease" }}
        onClick={hideForge}
      >
        <div
          className={`relative w-full ${
            goup ? "translate-y-[0vw]" : "translate-y-[200vw]"
          } sm:block py-[8vw] hidden bg-black `}
          style={{ transition: "1s ease" }}
          onClick={modalClick}
        >
          <div className="w-full h-auto pb-[1vw] px-[3vw]   sticky top-[8vw] flex flex-col gap-[6vw]">
            <h3 className="neuer text-[7vw] pb-[0.3vw] text-white">Factions</h3>

            <div className="w-full left-0 h-auto relative  flex flex-wrap gap-[3vw]">
              {faction_option.map((e: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-[29vw] rounded-[4vw]  h-[20vw] bg-[#CCFF00] flex justify-center items-center text-black neuer cursor-pointer text-[3.5vw]"
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
            <div className="h-[0.4vw] bg-white bg-opacity-[10%] w-full"></div>

            <p className="text-[7vw]  neuer text-white">Sub Factions</p>
            <div className="w-full rounded-[5vw] px-[3vw]  bg-[#111111] min-h-[10vw] flex-wrap flex justify-start items-center gap-[3vw] py-[2vw] ">
              {sub_faction_arr?.length == 0 && (
                <p className="neuer text-[3.5vw] text-white py-[11vw] text-center w-full">
                  Non Available
                </p>
              )}

              {sub_faction_arr?.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-[27vw] flex justify-center items-center rounded-[3vw] h-[12vw] text-white text-opacity-[70%] neuer  cursor-pointer hover:bg-opacity-[50%]"
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
                    <p className="text-center neuer text-[3vw] ">{e}</p>
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

export default Mobile_factions;
