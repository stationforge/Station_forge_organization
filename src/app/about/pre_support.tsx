"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import main from "../../../public/about/pre_support.webp";
import mob_main from "../../../public/about/mob_pre_support.webp";
import ben_1 from "../../../public/about/ben_1.webp";
import ben_2 from "../../../public/about/ben_2.webp";
import Link from "next/link";

const Pre_support = () => {
  const [welcome_items, setwelcome_items] = useState([
    {
      img: ben_1,
      head: "Benefit 1",
      txt: "Mini Swap Collabs with other  ",
      t2: "Patreon creators",
    },

    {
      img: ben_2,
      head: "Benefit 2",
      txt: "20% discount codes for my mini  ",
      t2: "factory ",
    },
  ]);

  const [community_icons, setcommunity_icons] = useState([
    {
      link: "/",
      bi: "facebook",
    },
    {
      link: "/",
      bi: "discord",
    },
    {
      link: "/",
      bi: "instagram",
    },
  ]);
  return (
    <>
      <div className="w-full flex justify-center items-center px-[2.5vw] gap-[3vw] flex-col pt-[4vw] sm:pt-[12vw] sm:gap-[7vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00]  neuem leading-[3.3vw] sm:text-[7vw] sm:leading-[6vw]">
          Pre Support
        </h2>
        <p className="text-white  text-opacity-[40%] text-[1.2vw] neuer text-center font-[300] capitalize  sm:text-[3.5vw] sm:w-[90%]">
          all of our models are fully supported by professionals on our team. If
          you{"'"}re <br className="sm:hidden " /> having trouble, join our{" "}
          <br className="sm:block hidden" />
          <Link
            href={"https://discord.com/invite/EMVhj7hS8B"}
            className="underline underline-offset-4"
          >
            {" "}
            Discord
          </Link>{" "}
          for assistance support.
        </p>

        <div className="w-full h-auto mb-[2vw]">
          <Image
            src={main}
            alt="preload support main display image"
            className="w-full sm:hidden h-fit"
          />
          <Image
            src={mob_main}
            alt="preload support main display image"
            className="w-full sm:block hidden h-fit"
          />
        </div>

        <h2 className="text-white  text-opacity-[40%] text-[1.7vw] neuer text-center sm:text-[4vw]">
          Extra benefits
        </h2>

        {/* display the items */}
        <div className="w-full flex overflow-x-scroll sm:h-[45vw]  cover_scrollbar sm:relative justify-center h-auto pb-[3vw] pt-[0.4vw]">
          <div className="w-[65vw] h-auto flex gap-[2.7vw] justify-center sm:justify-start sm:px-[3vw] sm:gap-[3.5vw] sm:absolute sm:flex-wrap sm:w-[175vw]  sm:h-auto sm:top-0 sm:left-0 ">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className=" w-full sm:gap-[11vw] sm:w-[81.5vw] h-auto py-[2vw] sm:py-[6vw] sm:px-[5vw] px-[2vw] flex flex-col bg-[#111111] rounded-[2vw] gap-[3vw] items-start justify-center "
                >
                  <div className="w-full h-auto   overflow-hidden rounded-[3vw]">
                    <p className="neuem sm:text-[4vw] text-[1.5vw] text-white capitalize ">
                      {e.head}
                    </p>
                  </div>
                  <div className="w-full h-auto flex items-center justify-start gap-[1vw] sm:gap-[4vw]">
                    <Image
                      src={e.img}
                      alt={e.txt}
                      className="w-[2.5vw]  sm:w-[10vw] h-fit"
                    />
                    <p className="text-[1.3vw] text-opacity-[80%] text-white neuer  leading-[2vw]  sm:leading-[5vw] font-[300] sm:text-[3.1vw] ">
                      {e.txt} <br /> {e.t2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="text-center sm:text-[5vw] text-[2.4vw] text-[#CCFF00]  neuem  ">
          Let{"'"}s Chat! Join our community here
        </h3>

        <div className="w-full flex justify-center gap-[2vw] sm:gap-[4vw] items-center pb-[5vw]">
          {community_icons.map((e: any, index: any) => {
            return (
              <div
                className=" h-[3.7vw] sm:h-[10vw]  sm:text-[4.5vw] sm:w-[10vw] w-[3.7vw] text-white border-opacity-[80%] cursor-pointer  hover:border-opacity-[100%] hover:opacity-[100%] transition duration-[0.6vw] opacity-[80%] text-[1.7vw] font-[700] rounded-[100%] flex justify-center items-center  border-white border-[0.07vw]"
                key={index}
              >
                <i className={`bi bi-${e.bi} w-fit h-fit`}></i>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[95vw] sm:mx-auto bg-[#D9D9D9] sm:mt-[5vw]"></div>{" "}
    </>
  );
};

export default Pre_support;
