"use client";

import Image from "next/image";
import { useEffect } from "react";
import { FadeInTransition } from "react-transitions-library";

const Forge_upload_Media_display = (props: any) => {
  const {
    data,
    setmaindata,
    maindata,
    video,
    setvideo,
    setdata,
    setdisplay_modal,
    deleteMedia,
  } = props;

  useEffect(() => {
    if (data.length == 0) {
      setdisplay_modal(false);
    }
  }, [data]);
  return (
    <>
      <div
        className="w-full h-full sm:flex-col bg-black fixed top-0 left-0 flex justify-center items-center py-[4vw]  gap-[2vw] sm:gap-[7vw]  z-[9999]"
        onClick={() => {
          setdisplay_modal(false);
        }}
      >
        <i
          className="text-[2vw] absolute top-[2vw] right-[2vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] sm:text-[7vw] sm:top-[4vw] sm:right-[4vw] transition text-opacity-[50%] text-white bi bi-x-circle"
          onClick={() => {
            setdisplay_modal(false);
          }}
        ></i>{" "}
        <div
          className="w-auto sm:max-h-[70vh]  sm:gap-[3.5vw] flex flex-col justify-center items-center gap-[2vw]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-[45vw] sm:w-[90vw] sm:h-auto flex-col  h-[32vw] rounded-[1vw]  overflow-hidden flex justify-center items-center">
            <FadeInTransition
              timeout={1500}
              from={0}
              to={1}
              in={true}
              style={{ width: "100%" }}
            >
              <img
                src={
                  maindata instanceof Blob
                    ? URL.createObjectURL(maindata)
                    : maindata
                }
                width="0"
                height="0"
                alt="main display image"
                className="w-full h-full"
              />
            </FadeInTransition>
          </div>
          <button
            className="text-[#FF0000] neuem text-[1.1vw] sm:text-[3.5vw] text-center bottom-[-1vw] left-0 w-full"
            onClick={() => {
              deleteMedia(maindata);
            }}
          >
            <i className="bi bi-trash3"></i> Discard post
          </button>{" "}
        </div>
        <div
          className="w-[30vw] sm:h-fit sm:w-full sm:px-[5vw]   h-[30vw]  flex justify-center items-center gap-[1vw]"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className=" w-full rounded-[1vw] h-full sm:max-h-[40vw]  sm:py-[5vw]  relative flex flex-wrap scroll-container justify-center py-[2vw] px-[1vw] overflow-y-scroll border-white border-opacity-[20%] border-[0.1vw]  gap-[1.5vw]">
            {data.map((file: any, index: any) => (
              <div
                key={index}
                className={`overflow-hidden sm:w-[15vw] sm:h-[15vw]    relative avater_bg rounded-[0.5vw] hover:scale-[1.04] transition duration-[0.6s] w-[5.5vw] ${
                  maindata == file
                    ? "border-[0.3vw] sm:border-[1vw]  border-opacity-[80%] border-[#CCFF00] "
                    : " border-[0.1vw]  border-opacity-[20%] border-white "
                }  cursor-pointer h-[5.5vw] `}
                style={{}}
              >
                <i
                  className="text-[1vw] sm:text-[4vw] sm:top-[-0.7vw] absolute top-[-0.2vw] right-[-0vw] font-[800] z-[9999] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition  text-[red] bi bi-x-circle"
                  onClick={() => {
                    deleteMedia(file);
                  }}
                ></i>{" "}
                {file.type.startsWith("image/") ? (
                  <img
                    width="0"
                    height="0"
                    src={URL.createObjectURL(file)}
                    alt={`Selected Image ${index + 1}`}
                    className="w-full   h-full"
                    onClick={() => {
                      setvideo(false);
                      setmaindata(file);
                    }}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forge_upload_Media_display;
