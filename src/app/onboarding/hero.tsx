"use client";

import Image from "next/image";
import Hero_img from "../../../public/home/hero.webp";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useProfile_Context } from "../utils/profile_context";
import { useOnboarding_Context } from "../utils/onboarding_context";

const Home_hero_onboarding = () => {
  const [left, setleft] = useState("0");
  const [right, setright] = useState("0");

  const [opacity, setopacity] = useState(0.5);
  const { step }: any = useOnboarding_Context();
  return (
    <div className="w-full padding sm:hidden ">
      <div className="w-full h-[37vw] mt-[0.5vw] flex gap-[1vw]">
        {/* left container */}
        <section
          className="w-[32%] h-full  bg-[#111111] flex items-end pl-[2.5vw] pb-[4vw] transition duration-[2s]"
          style={{
            transform: `translateY(${left})`,
            opacity: opacity,
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
            <h1
              className="text-white text-[2.7vw] neuem leading-[3vw]"
              style={{ opacity: opacity }}
            >
              Creating 3D-Printable <br /> Tabletop Miniatures{" "}
            </h1>

            <div
              className="neuem relative text-[1.3vw] py-[1vw] px-[2.7vw] bg-white w-fit rounded-[6.4vw]  "
              style={{ opacity: step == 4 ? "" : opacity }}
            >
              About Us
            </div>
          </div>
          <Image
            src={Hero_img}
            alt="High-Quality 3D-Printable Tabletop Miniatures for Sale"
            style={{ opacity: opacity }}
            className="absolute left-0 top-0 w-full h-fit z-[1]"
          />
        </section>
      </div>{" "}
    </div>
  );
};

export default Home_hero_onboarding;
