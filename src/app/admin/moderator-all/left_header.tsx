"use client";

import { useRouter } from "next/navigation";

const Moderator_header = ({ moderator_size, moderator_is_loading }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="  w-[calc(100vw/3.05)] sm:w-full  items-center backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black  fixed top-0 text-white left-0 flex justify-start sm:h-[18vw] sm:justify-between  px-[2vw] h-[6vw] gap-[2vw] ">
        <button
          className="text-white text-[1.2vw] sm:px-[3vw] sm:py-[1.5vw] sm:rounded-[2vw] sm:text-[4vw] bg-[#161616] neuer px-[1vw] py-[0.5vw] rounded-[1vw]"
          onClick={() => {
            router.back();
          }}
        >
          <i className="bi bi-chevron-left"> </i> Back
        </button>
        <div className=" flex items-center sm:gap-[3vw] gap-[1vw]">
          <div className="neuer sm:text-[4vw] text-[1.2vw]  transition duration-[0.6s] ">
            All Moderators
          </div>
          {moderator_is_loading ? (
            <div className="w-[3vw] hover:bg-[#CCFF00] hover:text-black transition duration-[0.6s] h-[3vw] animate-pulse bg-[#121212]  text-[1vw]  sm:w-[10vw] sm:h-[10vw]  rounded-[100%] border border-white border-opacity-[70%] "></div>
          ) : (
            <div className="w-[3vw]   transition duration-[0.6s] h-[3vw]  text-[1vw] rounded-[100%] border sm:text-[3.5vw] sm:w-[10vw] sm:h-[10vw] border-white border-opacity-[70%] flex justify-center items-center">
              {moderator_size}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Moderator_header;
