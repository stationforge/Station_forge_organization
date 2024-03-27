"use client";

import Image from "next/image";
import Hero_img from "../../../public/home/hero.webp";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";
import { usePathname } from "next/navigation";

const Home_hero = () => {
  const [left, setleft] = useState("100vw");
  const [right, setright] = useState("-100vw");
  const searchParams = usePathname();
  // Use useEffect to set the animation
  useEffect(() => {
    setleft("0");
    setright("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { setpage_loader }: any = useProfile_Context();

  return (
    <div className="w-full padding pt-[0.8vw] sm:hidden">
      <div className="w-full h-[40vw]  flex gap-[1vw]">
        {/* left container */}
        <section
          className="w-[32%] h-full  bg-[#111111] flex items-end pl-[2.5vw] pb-[4vw] transition duration-[2s]"
          style={{
            transform: `translateY(${left})`,
          }}
        >
          <h2 className="uppercase neuem text-[2.2vw] text-white leading-[3vw]">
            CREATIVE <br /> AND <span className="text-[#CCFF00]">UNIQUE</span>{" "}
            <br /> FORGES
          </h2>
        </section>
        <section
          className="w-[68%] h-full  relative overflow-hidden flex items-end pl-[2.5vw] pb-[4vw] transition duration-[2s]"
          style={{
            transform: `translateY(${right})`,
          }}
        >
          <div className="w-auto h-auto z-[50] flex gap-[2vw] flex-col">
            <h1 className="text-white text-[2.7vw] neuem leading-[3vw]">
              Creating 3D-Printable <br /> Tabletop Miniatures{" "}
            </h1>

            <Link
              href={"/about"}
              onClick={() => {
                if (searchParams == "/") {
                  setpage_loader(true);
                } else {
                  setpage_loader(true);
                }
              }}
              className="neuem text-[1.3vw] py-[1vw] px-[2.7vw] bg-white w-fit rounded-[6.4vw] hover:bg-[#CCFF00] hover:text-white hover:bg-opacity-[30%] transition duration-[0.3s] "
            >
              About Us
            </Link>
          </div>
          <Image
            src={Hero_img}
            alt="High-Quality 3D-Printable Tabletop Miniatures for Sale"
            className="absolute left-0 top-0 w-full h-fit z-[1]"
          />
        </section>
      </div>{" "}
    </div>
  );
};

export default Home_hero;
