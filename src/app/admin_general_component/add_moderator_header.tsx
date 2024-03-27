"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";

const Add_moderator_header = ({
  moderator_size,
  moderator_is_loading,
}: any) => {
  const { setpage_loader }: any = useProfile_Context();
  const router = useRouter();
  return (
    <>
      <div className="w-full items-center backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black  fixed top-0 text-white left-0 flex justify-start sm:h-[18vw] sm:justify-between  px-[2vw] h-[6vw] gap-[2vw] ">
        <button
          className="text-white text-[1.2vw] sm:px-[3vw] sm:py-[1.5vw] sm:rounded-[2vw] sm:text-[4vw] bg-[#161616] neuer px-[1vw] py-[0.5vw] rounded-[1vw]"
          onClick={() => {
            router.back();
          }}
        >
          <i className="bi bi-chevron-left"> </i> Back
        </button>
        <div className=" flex items-center sm:gap-[3vw] gap-[1vw]">
          <Link
            href={"/admin/moderator-all"}
            onClick={() => {
              setpage_loader(true);
            }}
            className="neuer sm:text-[4vw] text-[1.2vw] hover:text-[#CCFF00] transition duration-[0.6s] "
          >
            All Moderators
          </Link>
          {moderator_is_loading ? (
            <div className="w-[3vw] hover:bg-[#CCFF00] hover:text-black cursor-pointer transition duration-[0.6s] h-[3vw] animate-pulse bg-[#121212]  text-[1vw] rounded-[100%] border border-white border-opacity-[70%] "></div>
          ) : (
            <Link
              onClick={() => {
                setpage_loader(true);
              }}
              href={"/admin/moderator-all"}
              className="w-[3vw] hover:bg-[#CCFF00] hover:text-black cursor-pointer transition duration-[0.6s] h-[3vw]  text-[1vw] rounded-[100%] border sm:text-[3.5vw] sm:w-[10vw] sm:h-[10vw] border-white border-opacity-[70%] flex justify-center items-center"
            >
              {moderator_size}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Add_moderator_header;
