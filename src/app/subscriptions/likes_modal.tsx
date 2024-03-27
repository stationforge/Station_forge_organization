"use client";

import { useEffect, useState } from "react";
import like_img from "../../../public/subscription/love.png";
import Image from "next/image";

const Subscrption_Likes_modal = ({
  index,
  likes,
  setActiveModalIndex,
  likes_array,
}: any) => {
  const [moveup, setmoveup] = useState(false);
  const emptyArray = [
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
    "??",
  ];

  useEffect(() => {
    setmoveup(true);
  }, []);

  return (
    <div
      className={`absolute ${
        moveup ? "sm:bg-opacity-[40%]" : "sm:bg-opacity-[0%]"
      }  bottom-[-27vw] sm:fixed sm:bg-black  sm:top-0 sm:left-0 sm:w-full sm:h-full sm:flex sm:items-end rounded-[1.2vw] overflow-hidden z-[99] w-[22vw] h-[30vw] bg-white shadow-2xl right-0`}
      id={`brand-${index}`}
      style={{
        transition: "1s ease",
      }}
      onClick={() => {
        setmoveup(false);
        setTimeout(() => {
          setActiveModalIndex(null);
        }, 700);
      }}
    >
      <div
        className={` w-full h-full ${
          moveup ? "sm:translate-y-0" : "sm:translate-y-[200vw]"
        }   sm:rounded-t-[5vw] sm:overflow-hidden bg-black sm:relative sm:h-[65vh]  `}
        id={`brand-${index}`}
        style={{
          transition: "1s ease",
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="w-full h-[4vw] sm:h-[20vw] flex justify-between  items-center   absolute top-0 left-0 text-[1.1vw] text-white sm:text-[4vw] sm:px-[4vw] neuem  px-[1vw]"
          style={{ backgroundColor: "black" }}
        >
          <p className="">All post likes</p>
          <p className="">{likes} likes</p>
        </div>

        <div className=" overflow-y-scroll scroll-container h-full w-full">
          <div className=" flex flex-col sm:gap-[6vw] gap-[1vw] pb-[2vw] sm:px-[2vw] px-[1vw]  pt-[4.3vw] sm:pt-[25vw]">
            {likes_array.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className="w-full items-center  flex justify-between "
                >
                  <div className="flex items-center sm:gap-[2vw] gap-[0.5vw]">
                    <div
                      className="w-[3vw] h-[3vw] rounded-[100%] border avater_bg overflow-hidden sm:h-[12vw] sm:w-[12vw] "
                      style={{ backgroundImage: `url(/cover.webp)` }}
                    >
                      <Image
                        src={e.avatar}
                        unoptimized
                        width="0"
                        height="0"
                        alt={e.name}
                        className="w-full h-full"
                      />
                    </div>
                    <p
                      className="text-[0.8vw] sm:text-[3.5vw]  "
                      style={{ color: "white" }}
                    >
                      {e.name}
                    </p>
                  </div>

                  <Image
                    src={like_img}
                    alt="love"
                    className="w-[1.5vw] sm:w-[5vw] h-fit"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscrption_Likes_modal;
