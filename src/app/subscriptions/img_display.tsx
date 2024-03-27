"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FadeInTransition } from "react-transitions-library";
import logo from "../../../public/logo.webp";

const Image_display = (props: any) => {
  const {
    img_display_arr,
    setimg_display_arr,
    img_display,
    setimg_display,
    setimg_display_show,
    video,
    setvideo,
  } = props;
  const [items, setitems] = useState(["", "", "", "", "", ""]);

  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "3gp",
    "mpeg",
    "ogv",
    "ogg",
  ];

  return (
    <>
      {" "}
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black bg-opacity-[97%]  gap-[3vw] comment_wrap  z-[9999] py-[10vw]  "
        onClick={() => {
          setimg_display_show(false);
        }}
      >
        <div className="w-full h-[6vw] absolute px-[3vw] flex sm:top-[5vw] justify-between items-center sm:justify-end  top-0 left-0">
          <Image
            src={logo}
            alt="Station forge logo"
            className="w-[10vw] sm:hidden h-fit"
          />

          <i
            className="text-[2vw] sm:text-[7vw] h-fit hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
            onClick={() => {
              setimg_display_show(false);
            }}
          ></i>
        </div>

        <FadeInTransition
          timeout={1500}
          from={0}
          to={1}
          in={true}
          //   ref={ref}
          style={{
            width: "auto",
            gap: globalThis.innerWidth > 650 ? "3vw" : "8vw",
            display: "flex",
            justifyContent: "center",
            flexDirection: globalThis.innerWidth > 650 ? "row" : "column",
            alignItems: "center",
          }}
          //   onClick={handleModalClick}
        >
          <div
            className="w-[40vw] max-h-[95vh] sm:max-h-[70vh]  sm:w-[80vw] h-full  overflow-hidden flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {video ? (
              <video
                src={img_display}
                playsInline
                controls
                className="w-full aspect-[16/9]"
              ></video>
            ) : (
              <Image
                src={img_display}
                width="0"
                height="0"
                alt="main display image"
                className="w-full h-fit"
                unoptimized
              />
            )}
          </div>

          <div
            className="w-[30vw] sm:w-[90vw] sm:max-h-[40vw] sm:py-[5vw] border-white border-opacity-[20%] rounded-[1.2vw] border-[0.1vw]  h-full overflow-y-scroll scroll-container flex flex-wrap justify-center gap-[1vw] py-[2vw] px-[3vw] items-center "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {img_display_arr.map((e: any, index: any) => {
              const isVideoLink = videoExtensions.some((ext) =>
                e.link.includes(`.${ext}`),
              );
              if (isVideoLink) {
                return (
                  <div
                    key={index}
                    className={`w-[5vw] h-[5vw] sm:w-[15vw] sm:h-[15vw] hover:scale-[1.07] transition duration-[0.6s]
                    ${
                      e.link == img_display
                        ? "border-[0.3vw] sm:border-[1vw] border-opacity-[80%] border-[#CCFF00] "
                        : " border-[0.1vw]  border-opacity-[20%] border-white "
                    } 
                    overflow-hidden  cursor-pointer avater_bg rounded-[0.8vw]`}
                    onClick={() => {
                      setvideo(true);
                      setimg_display(e.link);
                    }}
                    style={{
                      backgroundImage: `url(/subscription/video_loader.webp)`,
                    }}
                  >
                    {" "}
                    <video
                      src={e.link}
                      playsInline
                      className="aspect-[1/0.9] scale-y-[2.3] scale-x-[1.8] w-full"
                    ></video>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className={`w-[5vw] h-[5vw] sm:w-[15vw] sm:h-[15vw]  hover:scale-[1.07] transition duration-[0.6s] 
                     ${
                       e.link == img_display
                         ? "border-[0.3vw] sm:border-[1vw] border-opacity-[80%] border-[#CCFF00] "
                         : " border-[0.1vw]  border-opacity-[20%] border-white "
                     } cursor-pointer avater_bg rounded-[0.8vw] overflow-hidden `}
                    onClick={() => {
                      setvideo(false);
                      setimg_display(e.link);
                    }}
                    // style={{ backgroundImage: `url(${e.link})` }}
                  >
                    <img
                      src={e.link}
                      alt={index + "bg images"}
                      className="h-full w-full  cursor-pointer"
                    />
                  </div>
                );
              }
            })}
          </div>
        </FadeInTransition>
      </div>
    </>
  );
};

export default Image_display;
