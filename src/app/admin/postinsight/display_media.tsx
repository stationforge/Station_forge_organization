"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FadeInTransition } from "react-transitions-library";
import logo from "../../../../public/logo.webp";
import Image_display from "@/app/subscriptions/img_display";

const Display_media = (props: any) => {
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
  useEffect(() => {
    console.log(img_display_arr);
  }, [img_display_arr]);
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
  // Check if the file is a video based on its link
  const isVideoLink = "";

  //   const [isVideo, setisVideo] = useState(null);

  useEffect(() => {
    if (img_display_arr.length == 0) {
      return setimg_display_show(false);
    }
  }, [img_display_arr, img_display]);
  //   const isVideo = videoExtensions.some((ext) =>
  //     img_display.includes(`.${ext}`),
  //   );

  //   useEffect(() => {
  //     setisVideo(
  //       img_display &&
  //         typeof img_display.link === "string" &&
  //         videoExtensions.some((ext) => img_display.link.includes(`.${ext}`)),
  //     );
  //   }, [img_display]);

  // Check if the displayed media is a video or an image
  const checkMediaType = (media: any) => {
    let isVideo = false;
    let isImage = false;

    // If it's a Firebase file with a 'link' property
    if (typeof media === "string") {
      // Check if the link's extension matches any video extension
      isVideo = videoExtensions.some((ext) => media.includes(`.${ext}`));
      // If it's not a video, it must be an image
      isImage = !isVideo;
      //   setfirebase_link(true);
      setvideo(isVideo);
    }
    // If it's a local file, check the 'type' property
    else if (media instanceof File) {
      isVideo = media.type.startsWith("video/");
      isImage = media.type.startsWith("image/");
      //   setfirebase_link(false);
    }

    return { isVideo, isImage };
  };

  // Use the function to get the media type
  const { isVideo, isImage } = checkMediaType(img_display);

  return (
    <>
      {" "}
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black bg-opacity-[97%]  gap-[3vw] comment_wrap  z-[9999] py-[10vw]  "
        onClick={() => {
          setimg_display_show(false);
        }}
      >
        <div className="w-full h-[6vw] sm:h-[14vw]  absolute px-[3vw] flex justify-between items-center   top-0 left-0">
          <Image
            src={logo}
            alt="Station forge logo"
            className="w-[10vw] sm:w-[30vw] h-fit"
            onClick={(e) => {
              e.stopPropagation();
            }}
          />

          <i
            className="text-[2vw] sm:text-[7vw]  hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
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
            gap: "3vw",
            display: "flex",
            justifyContent: "center",
            flexDirection: globalThis.innerWidth > 650 ? "row" : "column",
            alignItems: "center",
          }}
          //   onClick={handleModalClick}
        >
          <div
            className="w-[32vw]  sm:w-[90vw] sm:h-auto sm:max-h-[60vh] h-full gap-[1.2vw] flex-col overflow-hidden flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {video && (
              <video
                src={img_display}
                playsInline
                controls
                className="w-full aspect-[16/9]"
              />
            )}
            {!video && (
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

          <div className="w-auto h-auto  relative">
            <p className="text-[1.2vw] sm:text-[3.5vw] sm:py-[3vw] capitalize pb-[1vw] text-white neuer text-center ">
              Select a media to preview
            </p>
            <div
              className="w-[35vw] max-h-[32vw] sm:w-[90vw] sm:max-h-[40vw] sm:py-[5vw]  border-white border-opacity-[20%] rounded-[1.2vw] border-[0.1vw]  h-full overflow-y-scroll scroll-container flex flex-wrap justify-center gap-[1vw] py-[2vw] px-[3vw] items-center  "
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {img_display_arr.map((file: any, index: any) => {
                // Check if the file is a video based on its link
                const isVideoLink =
                  file.link &&
                  videoExtensions.some((ext) => file.link.includes(`.${ext}`));
                return (
                  <div
                    key={index}
                    className={`overflow-hidden sm:w-[15vw] sm:h-[15vw]   avater_bg rounded-[0.5vw] hover:scale-[1.04] relative transition duration-[0.6s] w-[5.5vw] ${
                      img_display == file.link
                        ? "border-[0.3vw]  border-opacity-[80%] sm:border-[1vw] border-[#CCFF00] "
                        : " border-[0.1vw]  border-opacity-[20%] border-white "
                    }  cursor-pointer h-[5.5vw] `}
                    // style={{
                    //   backgroundImage: `url(${file.link})`,
                    // }}
                  >
                    {file.link && typeof file.link === "string" ? (
                      isVideoLink ? (
                        // This is a video URL from Firebase
                        <video
                          autoPlay
                          playsInline
                          muted
                          loop
                          className="w-full cursor-pointer h-auto scale-[3]"
                          onClick={() => {
                            setvideo(true);
                            setimg_display(file.link);
                            // setdisplay_modal(true);
                            // setmaindata(file);
                            // setimg_display_show(true);
                            // setdata(mediaFiles);
                          }}
                        >
                          <source src={file.link} />
                        </video>
                      ) : (
                        // // This is an image URL from Firebase
                        // <img
                        //   src={file.link}
                        //   alt={`Media ${index + 1}`}
                        //   className="w-full  translate-y-[-2vw] h-auto cursor-pointer"
                        //   onClick={() => {
                        //     setvideo(false);
                        //     setmaindata(file);
                        //     setdisplay_modal(true);
                        //     console.log(file);
                        //     setdata(mediaFiles);
                        //   }}
                        // />
                        <div
                          className="w-full h-full"
                          onClick={() => {
                            setimg_display(file.link);

                            setvideo(false);
                          }}
                        >
                          {" "}
                          <img
                            src={file.link}
                            alt={index + "bg images"}
                            className="h-full w-full"
                          />
                        </div>
                      )
                    ) : null}
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

export default Display_media;
