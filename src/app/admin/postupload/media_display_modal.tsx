"use client";

import Image from "next/image";
import { FadeInTransition } from "react-transitions-library";

const Media_display = (props: any) => {
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

  // Function to remove a media item
  const discardMedia = (media: any) => {
    const updatedData = data.filter(
      (file: any) => URL.createObjectURL(file) !== URL.createObjectURL(media),
    );
    setdata(updatedData);

    // Check if the removed media was the maindata; if so, update it
    if (URL.createObjectURL(maindata) === URL.createObjectURL(media)) {
      setmaindata(updatedData.length > 0 ? updatedData[0] : null);
    }
  };

  return (
    <>
      <div
        className="w-full h-full bg-black sm:flex-col fixed top-0 left-0 flex justify-center items-center py-[4vw]  gap-[2vw] sm:gap-[7vw]  z-[9999]"
        onClick={() => {
          setdisplay_modal(false);
        }}
      >
        <i
          className="text-[2vw] sm:text-[6vw] sm:top-[4vw] sm:right-[4vw] absolute top-[2vw] right-[2vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] text-white bi bi-x-circle"
          onClick={() => {
            setdisplay_modal(false);
          }}
        ></i>{" "}
        <div className="w-auto    flex flex-col justify-center items-center gap-[2vw]">
          <div
            className="w-[45vw] sm:w-[70vw] sm:h-auto flex-col  h-[32vw] rounded-[1vw]  overflow-hidden flex justify-center items-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <FadeInTransition
              timeout={1500}
              from={0}
              to={1}
              in={true}
              style={{ width: "100%" }}
            >
              {maindata.type.startsWith("video/") ? (
                <video
                  controls
                  key={URL.createObjectURL(maindata)}
                  className="w-full h-fit"
                >
                  <source
                    src={URL.createObjectURL(maindata)}
                    type={maindata.type}
                  />
                </video>
              ) : null}
              {maindata.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(maindata)}
                  width="0"
                  height="0"
                  alt="main display image"
                  className="w-full h-full"
                />
              ) : null}
            </FadeInTransition>
          </div>
          <button
            className="text-[#FF0000] neuem text-[1.1vw] sm:text-[3.5vw]  text-center bottom-[-1vw] left-0 w-full"
            onClick={(e) => {
              e.stopPropagation();
              deleteMedia(maindata);
            }}
          >
            <i className="bi bi-trash3"></i> Discard post
          </button>{" "}
        </div>
        <div className="w-[30vw] sm:w-[90vw]    sm:max-h-[40vw]  h-full  flex justify-center items-center gap-[1vw]">
          <div
            className=" w-full rounded-[1vw] sm:py-[5vw] max-h-full  relative flex flex-wrap scroll-container justify-center py-[2vw] px-[1vw] overflow-y-scroll border-white border-opacity-[20%] border-[0.1vw] sm:gap-[3vw]  gap-[1.5vw]"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {data.map((file: any, index: any) => (
              <div
                key={index}
                className={`overflow-hidden  relative avater_bg rounded-[0.5vw] hover:scale-[1.04] transition duration-[0.6s] sm:w-[15vw] sm:h-[15vw] w-[5.5vw] ${
                  maindata == file
                    ? "border-[0.3vw] sm:border-[1vw] border-opacity-[80%] border-[#CCFF00] "
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
                ) : //   <div
                //     className="w-full h-full bg-transparent"
                //     onClick={() => {
                //       setvideo(false);
                //       setmaindata(file);
                //     }}
                //   ></div>
                file.type.startsWith("video/") ? (
                  <div className="w-full">
                    <video
                      autoPlay
                      playsInline
                      muted
                      loop
                      className="w-full h-auto scale-x-[2] scale-y-[4]"
                      onClick={() => {
                        setvideo(false);
                        setmaindata(file);
                      }}
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Media_display;
