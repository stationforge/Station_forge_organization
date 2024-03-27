"use client ";

import React from "react";
import bg_image from "../../../public/login/login.webp";
import Image from "next/image";
import About_hero_img from "../../../public/about/about_hero.webp";
import mob_about_hero from "../../../public/about/mob_about_hero.webp";
import mob_bg_img from "../../../public/subscription/mob_bg_sub.webp";

const About_hero = () => {
  return (
    <>
      <div className="w-full pt-[2vw] relative h-auto gap-[2vw] z-[9] pb-[5vw] sm:pb-[10vw]">
        <div className="w-full h-auto  flex justify-center items-center  flex-col z-[9]  gap-[3vw] px-[2vw] sm:px-[3vw] ">
          <div className="w-full h-atuo pb-[5vw] gap-[3vw] flex justify-center items-center  flex-col z-[9]">
            <p className="text-[3.2vw]  sm:pt-[6vw] sm:pb-[3vw] neuem  text-white  sm:text-[7vw]">
              StationForge
            </p>
            <Image
              src={About_hero_img}
              alt="about hero section image"
              className=" w-full sm:hidden h-fit z-[9]"
            />
            <Image
              src={mob_about_hero}
              alt="about hero section image"
              className=" w-full h-fit z-[9] hidden sm:block"
            />
          </div>

          {/* our goals section  */}
          <div className="w-full z-[9]  text-center flex items-center flex-col gap-[1.5vw] sm:gap-[6vw]">
            <h1 className="text-[#CCFF00] sm:text-[7vw] text-[3.2vw] capitalize neuem">
              Our Goals
            </h1>{" "}
            <div className=" border-[#767676] sm:w-full sm:rounded-[3vw]  sm:h-[45vw] rounded-[1.3vw] border w-[60vw] h-[10.6vw] bg-[#111111] flex justify-center items-center">
              <p className="text-white text-opacity-[70%] text-[1.4vw] neuer sm:text-[4vw] ">
                StationForge is here to make quality tabletop{" "}
                <br className="sm:block hidden " /> miniatures in a variety of
                themes to help you <br className="sm:block hidden " /> expand{" "}
                <br className="sm:hidden " />
                your creative side by providing many{" "}
                <br className="sm:block hidden " /> parts and models with
                possibilities to kitbash <br className="sm:block hidden " />{" "}
                them into <br className="sm:hidden " /> something of your own.
              </p>
            </div>
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute sm:hidden w-full h-full  top-0 left-0 z-[4]"
        />
        <Image
          src={mob_bg_img}
          alt="background image"
          className="absolute w-full h-full hidden sm:block  top-0 left-0 z-[4]"
        />
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[95vw] sm:mx-auto bg-[#D9D9D9] sm:mt-[5vw]"></div>
    </>
  );
};

export default About_hero;
