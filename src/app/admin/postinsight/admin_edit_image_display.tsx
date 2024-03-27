"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FadeInTransition } from "react-transitions-library";
import logo from "../../../../public/logo.webp";
import Image_display from "@/app/subscriptions/img_display";

const Admin_Image_display = (props: any) => {
  const {
    img_display_arr,
    setimg_display_arr,
    img_display,
    setimg_display,
    setimg_display_show,
    video,
    setvideo,
    firebase_link,
    setfirebase_link,
    delete_media,
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

  useEffect(() => {
    if (img_display_arr.length == 0) {
      return setimg_display_show(false);
    }
  }, [img_display_arr]);

  // Check if the displayed media is a video or an image
  const checkMediaType = (media: any) => {
    let isVideo = false;
    let isImage = false;

    // If it's a Firebase file with a 'link' property
    if (typeof media?.link === "string") {
      // Check if the link's extension matches any video extension
      isVideo = videoExtensions.some((ext) => media?.link?.includes(`.${ext}`));
      // If it's not a video, it must be an image
      isImage = !isVideo;
      setfirebase_link(true);
    }
    // If it's a local file, check the 'type' property
    else if (media instanceof File) {
      isVideo = media.type.startsWith("video/");
      isImage = media.type.startsWith("image/");
      setfirebase_link(false);
    }

    return { isVideo, isImage };
  };

  // Use the function to get the media type
  const { isVideo, isImage } = checkMediaType(img_display);

  // Now you can use isVideo and isImage to conditionally render elements

  return (
    <>
      {" "}
      <div
        className="w-full flex justify-center items-center h-full fixed  top-0 left-0 bg-black bg-opacity-[97%]  gap-[3vw] comment_wrap  z-[9999] py-[10vw]  "
        // onClick={() => hide(false)}
      >
        <div className="w-full h-[6vw] absolute px-[3vw] flex justify-between items-center   top-0 left-0">
          <Image
            src={logo}
            alt="Station forge logo"
            className="w-[10vw] h-fit"
          />

          <i
            className="text-[2vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
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
            flexDirection: "row",
            alignItems: "center",
          }}
          //   onClick={handleModalClick}
        >
          <div className="w-[32vw] h-full gap-[1.2vw] flex-col overflow-hidden flex justify-center items-center">
            {isVideo && (
              <video
                src={
                  firebase_link
                    ? img_display.link
                    : URL.createObjectURL(img_display)
                }
                playsInline
                controls
                className="w-full aspect-[16/9]"
              />
            )}
            {isImage && (
              <Image
                src={
                  firebase_link
                    ? img_display.link
                    : URL.createObjectURL(img_display)
                }
                width="0"
                height="0"
                alt="main display image"
                className="w-full h-fit"
                unoptimized
              />
            )}
            {
              // Check if img_display is a non-empty File object or an object with a non-empty 'link'
              ((img_display instanceof File && img_display.size > 0) ||
                (img_display &&
                  typeof img_display.link === "string" &&
                  img_display.link)) && (
                <button
                  className="text-[red] text-[1.2vw] bg-transparent"
                  onClick={() => delete_media(img_display)}
                >
                  <i className="bi bi-trash" /> Discard media
                </button>
              )
            }
          </div>

          <div className="w-auto  relative ">
            <p className="text-[1.2vw] capitalize pb-[1vw] text-white neuer text-center ">
              Select a media to preview
            </p>
            <div className="w-[35vw] max-h-[32vw]  border-white border-opacity-[20%] rounded-[1.2vw] border-[0.1vw]  h-full overflow-y-scroll scroll-container flex flex-wrap justify-center gap-[1vw] py-[2vw] px-[3vw] items-center  ">
              {img_display_arr.map((file: any, index: any) => {
                // Check if the file is a video based on its link
                const isVideoLink =
                  file.link &&
                  videoExtensions.some((ext) => file.link.includes(`.${ext}`));
                return (
                  <div
                    key={index}
                    className={`overflow-hidden  relative avater_bg rounded-[0.5vw] hover:scale-[1.04] relative transition duration-[0.6s] w-[5.5vw] ${
                      img_display == file
                        ? "border-[0.3vw]  border-opacity-[80%] border-[#CCFF00] "
                        : " border-[0.1vw]  border-opacity-[20%] border-white "
                    }  cursor-pointer h-[5.5vw] `}
                    // style={{
                    //   backgroundImage: file.link
                    //     ? `url(${file.link})`
                    //     : `url(${URL.createObjectURL(file)})`,
                    // }}
                    onClick={() => {
                      console.log(file);
                    }}
                  >
                    <i
                      className="text-[1vw] absolute top-[-0.2vw] right-[-0vw] font-[800] z-[9999] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition  text-[red] bi bi-x-circle"
                      onClick={() => {
                        delete_media(file);
                      }}
                    ></i>{" "}
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
                            setimg_display(file);
                            setfirebase_link(true);
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
                            setimg_display(file);
                            setfirebase_link(true);
                            setvideo(false);
                          }}
                        >
                          {" "}
                          <img
                            src={file.link}
                            alt={index + "bg images"}
                            className="h-full w-full  cursor-pointer"
                          />
                        </div>
                      )
                    ) : file?.type?.startsWith("image/") ? (
                      // This is a local image file
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Selected Image ${index + 1}`}
                        className="w-full   h-full cursor-pointer"
                        onClick={() => {
                          setvideo(false);
                          setfirebase_link(false);

                          setimg_display(file);
                          // setmaindata(file);
                          // setdisplay_modal(true);
                          // setdata(mediaFiles);
                          // setimg_display_show(true);
                        }}
                      />
                    ) : file?.type?.startsWith("video/") ? (
                      // This is a local video file
                      <video
                        autoPlay
                        playsInline
                        muted
                        loop
                        className="w-full cursor-pointer h-auto scale-[2]"
                        onClick={() => {
                          setvideo(true);
                          setfirebase_link(false);

                          setimg_display(file);
                          // setdisplay_modal(true);
                          // setmaindata(file);
                          // setdata(mediaFiles);
                          // setimg_display_show(true);
                        }}
                      >
                        <source
                          src={URL.createObjectURL(file)}
                          type={file.type}
                        />
                      </video>
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

export default Admin_Image_display;
