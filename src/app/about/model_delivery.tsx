"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import step_1 from "../../../public/about/step_1.webp";
import step_2 from "../../../public/about/step_2.webp";
import step_3 from "../../../public/about/step_3.webp";
import Link from "next/link";

const Model_delivery = () => {
  const [welcome_items, setwelcome_items] = useState([
    {
      img: step_1,
      head: "step 1",
      txt: "Sign up on PWG with the same e-mail ",
      t2: "as Patreon",
    },

    {
      img: step_2,
      head: "step 2",
      txt: "Wait up to 3-5hrs for PWG to link  ",
      t2: "the pledge",
    },
    {
      img: step_3,
      head: "step 3",
      txt: "Log in to PWG and download your ",
      t2: "minis",
    },
  ]);
  return (
    <>
      <div className="w-full flex justify-center items-center gap-[3vw] sm:gap-[7vw] flex-col pt-[4vw] sm:pt-[10vw]">
        <h2 className="text-center text-[3.2vw] text-[#CCFF00] neuem leading-[3.3vw] sm:text-[7vw] sm:leading-[6vw]">
          Model Delivery
        </h2>
        <p className="text-white sm:text-[3.5vw] sm:w-[90%] font-[400]  text-opacity-[30%] text-[1.2vw] neuer text-center capitalize">
          All of our models are delivered via{" "}
          <Link
            href={"https://printedwargames.com/partner/stationforge/"}
            target="_blank"
            className="underline-offset-4 underline"
          >
            PWG
          </Link>
          , where they will be saved in your library{" "}
          <br className="sm:hidden " /> forever, even if you unsubscribe. Simply
          create an account on PWG with the same e-{" "}
          <br className="sm:hidden " />
          mail you signed up with on Patreon to get your minis.
        </p>
        {/* display the items */}
        <div className="w-full sm:h-[45vw]  flex justify-center overflow-x-scroll h-auto pb-[4vw] cover_scrollbar sm:relative ">
          <div className="w-[85vw] sm:absolute sm:flex-wrap sm:w-[255vw]  sm:h-auto sm:top-0 sm:left-0 h-auto flex gap-[2.7vw] justify-center sm:justify-start sm:px-[3vw] sm:gap-[3.5vw]">
            {welcome_items.map((e: any, index: any) => {
              return (
                <div
                  key={index}
                  className=" w-full sm:w-[80vw] sm:py-[6vw]   h-auto py-[1.5vw] px-[2vw] flex flex-col bg-[#111111] rounded-[2vw] gap-[2vw] items-start justify-center sm:gap-[10vw] sm:px-[5vw] sm:rounded-[3vw] "
                >
                  <div className="w-full h-auto   overflow-hidden rounded-[3vw]">
                    <p className="neuem text-[1.4vw] sm:text-[4vw] text-white capitalize ">
                      {e.head}
                    </p>
                  </div>
                  <div className="w-full h-auto flex items-center justify-start gap-[1vw] sm:gap-[4vw]">
                    <Image
                      src={e.img}
                      alt={e.txt}
                      className="w-[2.5vw] sm:w-[10vw] h-fit"
                    />
                    <p className="text-[1.1vw]  text-opacity-[80%] text-white neuer sm:leading-[5vw] font-[300] sm:text-[3.1vw]  leading-[2vw]">
                      {e.txt} <br /> {e.t2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full pb-[4vw] sm:px-[3vw]">
          <p className="text-white text-center capitalize sm:leading-[5vw] sm:text-start sm:text-[3.5vw] text-[1vw]">
            <span className="text-[#CCFF00] ">
              Note <span className="sm:hidden ">.</span>{" "}
              <div className="w-full hidden sm:block h-[2vw]"></div>
            </span>
            The 3-5hrs wait time is a one-time occurrence for the new Patrons
            and will not happen with <br className="sm:hidden " /> further
            uploads. For more information on how to download the files,{" "}
            <Link
              className="underline underline-offset-4 uppercase"
              href={"https://www.patreon.com/posts/how-to-download-74396125"}
            >
              please click here
            </Link>
          </p>
        </div>
      </div>
      <div className="w-full h-[0.1vw] bg-opacity-[23%] sm:h-[0.35vw] sm:w-[95vw] sm:mx-auto bg-[#D9D9D9] sm:mt-[5vw]"></div>
    </>
  );
};

export default Model_delivery;
