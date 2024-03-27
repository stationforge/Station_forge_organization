"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import logo from "../../../public/logo.webp";
import { useProfile_Context } from "../utils/profile_context";
import { useRouter } from "next/navigation";

const Showcase_header = () => {
  const {
    toggleDropdown,
    setpage_loader,
    page_loader,
    setforge_loader,
    forge_loader,
  }: any = useProfile_Context();
  const router = useRouter();

  const goBack = () => {
    router.back(); // This will take you back to the previous page
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // for smooth scrolling
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="w-full sm:hidden h-[7vw] backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black flex justify-center items-end fixed top-0 left-0">
        <nav className="w-[95%] h-full  pr-[1.3vw]   flex justify-between items-center ">
          <button
            className="text-white text-[1.4vw] neuer bg-transparent"
            onClick={() => {
              goBack();
            }}
          >
            <i className="bi bi-chevron-left"> </i> Back
          </button>
          {/* the navigation bat  */}
          <Link
            href={"/"}
            className="h-auto w-auto"
            onClick={() => {
              setpage_loader(true);
            }}
          >
            <Image src={logo} className="w-[12vw] h-fit" alt="logo" />
          </Link>
          <button
            className=" text-white py-[0.7vw] text-[1vw] border-white border neuem px-[0.9vw] rounded-[0.8vw]  hover:bg-[#CCFF00] hover:bg-opacity-[30%] transition duration-[0.3s] "
            onClick={() => {
              setforge_loader(true);
            }}
          >
            {" "}
            <i className="bi bi-bag-fill"></i> Forge
          </button>{" "}
        </nav>
      </div>
    </>
  );
};

export default Showcase_header;
