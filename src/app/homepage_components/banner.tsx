"use client";

import Image from "next/image";
import React from "react";
import banner from "../../../public/banner.webp";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

const Banner = () => {
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="w-full h-[28vw] rounded-[2vw]  overflow-hidden relative flex justify-center flex-col items-start px-[3vw] gap-[2vw]">
        <h2 className="z-[999] neuem text-[3vw] leading-[3.5vw] text-[white]">
          Join our community to <br /> get our latest updates
        </h2>

        <p className="z-[999] neuer text-[1.5vw] leading-[1.8vw] text-[white]">
          Keep in touch with all that{"'"}s happening in <br /> the forge
          community
        </p>

        <Link
          href={"https://malkainstaging.website/forge/community/"}
          className="bg-[#CCFF00] z-[99] rounded-[4vw] text-[1.3vw] neuer text-black py-[1vw] px-[3.5vw] hover:bg-opacity-[70%]"
          onClick={() => {
            setpage_loader(true);
          }}
        >
          Go to community
        </Link>

        <Image
          src={banner}
          alt="product banner image"
          className="w-full h-fit absolute top-0 left-0"
        />
      </div>
    </>
  );
};

export default Banner;
