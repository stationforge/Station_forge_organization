"use client ";
import Image from "next/image";
import { useState, useEffect } from "react";
import cloud from "../../../../public/admin_section/post_upload/cloud.webp";
import { FadeInTransition } from "react-transitions-library";
import Media_display from "./media_display_modal";
const Media_post = (props: any) => {
  const {
    setupdated_media,
    setlocal_post_err,
    refresh_media_post,
    setrefresh_media_post,
  } = props;
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [trimmedMediaFiles, setTrimmedMediaFiles] = useState([]);
  const [isfilelaoded, setisfilelaoded] = useState(false);
  //   these are for the props
  const [data, setdata] = useState([]);
  const [maindata, setmaindata] = useState("");
  const [display_modal, setdisplay_modal] = useState(false);
  const [video, setvideo] = useState(false);

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    addFiles(selectedFiles);
  };

  const handleDrop = (event: any) => {
    event.preventDefault();
    setIsDragOver(false);
    const droppedFiles = event.dataTransfer.files;
    addFiles(droppedFiles);
  };
  const addFiles = (files: any) => {
    if (files.length > 0) {
      const newMediaFiles: any = [...mediaFiles];

      for (const file of files) {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          newMediaFiles.push(file);
        }
      }

      // Update the trimmedMediaFiles state to contain the first 4 media files
      setTrimmedMediaFiles(newMediaFiles.slice(0, 4));

      // Update the mediaFiles state with all the files

      setMediaFiles(newMediaFiles);
      setisfilelaoded(true);
    }
  };

  const deleteMedia = (media: any) => {
    const updatedMedia = mediaFiles.filter((file) => file !== media);
    setMediaFiles(updatedMedia);
    setTrimmedMediaFiles(updatedMedia.slice(0, 4));
    if (maindata === media) {
      setmaindata(updatedMedia[0] || null);
    }
  };

  useEffect(() => {
    // setmaindata(mediaFiles[0])
    setlocal_post_err("");
    setupdated_media(mediaFiles);
    setdata(mediaFiles);
  }, [mediaFiles]);

  return (
    <>
      <div
        className="w-full h-[35vw] sm:h-[100vw] sm:gap-[3vw] sm:rounded-[4vw]  px-[5vw] flex flex-col gap-[1.5vw] justify-center items-center bg-white rounded-[2vw]"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDragEnd={() => setIsDragOver(false)}
        style={{ backgroundColor: isDragOver ? "#CCFF00" : "" }}
      >
        {trimmedMediaFiles.length > 0 && (
          <FadeInTransition
            timeout={1500}
            from={0}
            to={1}
            in={true}
            style={{ width: "100%" }}
          >
            <div className=" w-full h-[25vw] sm:h-[60vw] sm:gap-[2vw] relative flex flex-wrap justify-center items-center gap-[0.4vw]">
              {trimmedMediaFiles.map((file: any, index: any) => (
                <div
                  key={index}
                  className="overflow-hidden avater_bg rounded-[0.5vw]  w-[48%]  h-[49%]"
                  //   style={{
                  //     backgroundImage: `url(${URL.createObjectURL(file)})`,
                  //   }}
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected Image ${index + 1}`}
                      className="w-full translate-y-[-2vw] h-auto cursor-pointer"
                      onClick={() => {
                        setvideo(false);
                        setmaindata(file);
                        setdisplay_modal(true);
                        setdata(mediaFiles);
                      }}
                    />
                  ) : // <div
                  //     className="w-full h-full  bg-transparent"

                  //   ></div>
                  file.type.startsWith("video/") ? (
                    <video
                      autoPlay
                      playsInline
                      muted
                      loop
                      className="w-full cursor-pointer h-auto scale-[2]"
                      onClick={() => {
                        setvideo(true);
                        setdisplay_modal(true);

                        setmaindata(file);
                        setdata(mediaFiles);
                      }}
                    >
                      <source
                        src={URL.createObjectURL(file)}
                        type={file.type}
                      />
                    </video>
                  ) : null}
                </div>
              ))}
              {mediaFiles.length > 4 && (
                <div
                  className="rounded-[0.5vw] sm:bottom-[-1vw] absolute bottom-0 right-[1.7%] bg-black bg-opacity-[90%] w-[48%] flex justify-center items-center  h-[49%] cursor-pointer"
                  onClick={() => {
                    setmaindata(mediaFiles[4]);
                    setdata(mediaFiles);
                    setdisplay_modal(true);
                  }}
                >
                  <span className="text-white sm:text-[8vw] text-[4vw] neuem">
                    +{mediaFiles.length - 4}{" "}
                  </span>
                </div>
              )}
            </div>
          </FadeInTransition>
        )}

        <div className=" flex justify-center sm:gap-[4vw] items-center flex-col gap-[2vw] ">
          {!isfilelaoded && (
            <Image
              src={cloud}
              alt="cloud upload image"
              className="w-[15vw] sm:w-[30vw] h-fit"
            />
          )}
          <label
            htmlFor="mediaInput"
            className="cursor-pointer bg-[#F3F3F3] sm:py-[4vw] sm:px-[9vw] sm:rounded-[5vw] text-[#688200] text-[1vw] sm:text-[4vw] neuer py-[1vw] px-[2vw] rounded-[1.2vw]"
          >
            Add Media (Images & Videos)
          </label>
          <input
            type="file"
            id="mediaInput"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {!isfilelaoded && (
            <p className="text-[1.2vw] text-center neuer w-[80%] sm:w-full sm:text-[3.5vw]">
              Upload or simply drag and drop your media files. You can upload up
              to 20 media items, including both images and videos{" "}
            </p>
          )}
        </div>
      </div>
      {display_modal && (
        <Media_display
          data={data}
          setmaindata={setmaindata}
          maindata={maindata}
          setdata={setdata}
          setdisplay_modal={setdisplay_modal}
          video={video}
          setvideo={setvideo}
          deleteMedia={deleteMedia}
        />
      )}
    </>
  );
};

export default Media_post;
