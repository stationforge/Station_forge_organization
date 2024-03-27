"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FadeInTransition } from "react-transitions-library";
import love from "../../../public/subscription/love.png";

const Comments_modal = (props: any) => {
  const { commentwrap, hide } = props;

  const ref = useRef<any>(null);
  useEffect(() => {
    function handleClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        hide(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This click handler is added to stop propagation of the click event when clicked inside the modal.
  function handleModalClick(event: any) {
    event.stopPropagation();
  }
  return (
    <>
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black  comment_wrap  z-[9999] bg-opacity-[70%]"
        onClick={() => hide(false)}
      >
        <FadeInTransition
          timeout={1000}
          from={0}
          to={1}
          in={true}
          ref={ref}
          style={{
            width: "fit-content",
            height: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleModalClick}
        >
          <div className="bg-[#111111] relative rounded-[2vw] sm:rounded-[4vw] pb-[2vw] w-[34vw] sm:w-[94vw] sm:h-[130vw] gap-[1vw] h-[34vw] flex items-start justify-start flex-col overflow-hidden ">
            <div className="flex sticky top-0 justify-between border-b-[white] border-opacity-[20%] border-b-[0.1vw] items-center px-[2vw]  w-full  py-[1vw] sm:py-[3vw] sm:px-[4vw] bg-[#111111]">
              <p className="text-white neuer text-[1.2vw] sm:text-[3vw] ">
                Viewing {commentwrap.length} Comments
              </p>
              <i
                className="text-[1.6vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle sm:text-[3.5vw]"
                onClick={() => {
                  hide(false);
                }}
              ></i>
            </div>

            {/* the main comment section */}
            <div className="w-full     sm:mt-[2.5vw] flex flex-col gap-[1.5vw] sm:gap-[5vw]  overflow-y-scroll scroll-container px-[2vw] sm:px-[4vw] h-auto">
              {commentwrap.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-full  relative flex  gap-[1vw] items-center sm:gap-[3vw] h-auto "
                  >
                    <div
                      className="w-[3.4vw] h-[3.4vw] sm:w-[12vw] sm:h-[12vw] overflow-hidden avater_bg  rounded-[100%] "
                      style={{ backgroundImage: "url(/cover.webp)" }}
                    >
                      <Image
                        src={e.avatar}
                        alt="comment images"
                        className="w-full h-fit scale-[1.1]"
                        unoptimized
                        width="0"
                        height="0"
                      />{" "}
                    </div>
                    <div className=" h-auto ">
                      <p className="text-[0.7vw] sm:text-[2.5vw] capitalize neuer text-white text-opacity-[90%]">
                        {e.name}
                      </p>
                      <p className="text-[1vw] sm:text-[3vw] neuer text-white text-opacity-[50%]">
                        {e.text}
                      </p>
                    </div>

                    {/* <Image
                      src={love}
                      alt="love"
                      className="w-[1.2vw] h-fit sm:w-[5vw] absolute right-0 top-[50%] translate-y-[-50%]"
                    /> */}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInTransition>
      </div>
    </>
  );
};

export default Comments_modal;
