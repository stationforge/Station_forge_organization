"use client";

import Image from "next/image";
import React from "react";
import mob_banner from "../../../public/mob_banner.webp";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";

const Mob_Banner = () => {
  const { toggleDropdown, setpage_loader }: any = useProfile_Context();

  return (
    <>
      <div className="w-full h-[57vw] rounded-[2vw]  overflow-hidden relative flex justify-center flex-col items-start px-[3vw] gap-[5vw]">
        <h2 className="z-[999] neuem text-[5vw] leading-[5vw] text-[white]">
          Join our <br className="sm:block " /> community to get{" "}
          <br className="sm:block " /> our latest updates
        </h2>

        <p className="z-[999] neuer text-opacity-[60%] text-[3vw] leading-[3vw] text-[white]">
          Keep in touch with all that{"'"}s <br className="sm:block " />{" "}
          happening in the forge community
        </p>

        <Link
          href={"https://malkainstaging.website/forge/community/"}
          className="bg-[#CCFF00] z-[99] rounded-[7vw] text-[3vw] neuer text-black py-[2.5vw] px-[5vw] hover:bg-opacity-[70%]"
          onClick={() => {
            setpage_loader(true);
          }}
        >
          Go to community
        </Link>

        <Image
          src={mob_banner}
          alt="product banner image"
          className="w-full h-fit absolute top-0 left-0"
        />
      </div>
    </>
  );
};

export default Mob_Banner;
