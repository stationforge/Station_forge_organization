"use client ";
import Image from "next/image";
import { useState, useEffect } from "react";
import cloud from "../../../../public/admin_section/post_upload/cloud.webp";
import { FadeInTransition } from "react-transitions-library";
import Forge_upload_Media_display from "./image_display";
const Image_upload = ({
  setselected_image_arr,
  setselected_cover_img,
}: any) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [trimmedMediaFiles, setTrimmedMediaFiles] = useState([]);
  const [isfilelaoded, setisfilelaoded] = useState(false);
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
    setdata(mediaFiles);
    setselected_cover_img(mediaFiles[0]);
    console.log(mediaFiles);
    setselected_image_arr(mediaFiles);
  }, [mediaFiles]);

  return (
    <>
      <div
        className="w-[55vw] h-[22vw]  sm:rounded-[3vw] sm:w-full sm:h-[80vw]   px-[3vw] flex flex-col gap-[1.4vw] justify-center items-center bg-white rounded-[2vw]"
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
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              itemsAlign: "center",
            }}
          >
            <div className=" w-[60%] sm:w-[90%] sm:h-[50vw]  h-[15vw] relative flex flex-wrap justify-center  items-center gap-[0.4vw] sm:gap-[2vw]">
              {trimmedMediaFiles.map((file: any, index: any) => (
                <div
                  key={index}
                  className="overflow-hidden avater_bg rounded-[0.5vw] w-[48%] border-[#E7E6E8] border-[0.1vw]  h-[49%]"
                  //   style={{
                  //     backgroundImage: `url(${URL.createObjectURL(file)})`,
                  //   }}
                >
                  {file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected Image ${index + 1}`}
                      className="w-full translate-y-[-2vw] scale-[1.4]  h-auto cursor-pointer"
                      onClick={() => {
                        setvideo(false);
                        setmaindata(file);
                        setdisplay_modal(true);
                        setdata(mediaFiles);
                      }}
                    />
                  ) : null}
                </div>
              ))}
              {mediaFiles.length > 4 && (
                <div
                  className="rounded-[0.5vw] sm:bottom-[-1vw] sm:right-[1.2%] absolute bottom-0 right-[1.7%] bg-black bg-opacity-[75%] w-[48%] flex justify-center items-center  h-[49%] cursor-pointer"
                  onClick={() => {
                    setmaindata(mediaFiles[4]);
                    setdata(mediaFiles);
                    setdisplay_modal(true);
                  }}
                >
                  <span className="text-white sm:text-[7vw] text-[3vw] neuem">
                    +{mediaFiles.length - 4}{" "}
                  </span>
                </div>
              )}
            </div>
          </FadeInTransition>
        )}

        <div className=" flex justify-center sm:gap-[4vw] items-center flex-col gap-[1vw] ">
          {trimmedMediaFiles.length == 0 && (
            <Image
              src={cloud}
              alt="cloud upload image"
              className="w-[10vw] sm:w-[20vw] h-fit"
            />
          )}
          <label
            htmlFor="mediaInput"
            className="cursor-pointer bg-[#F3F3F3] text-[#688200] text-[1vw] sm:text-[4vw] sm:px-[13vw] sm:py-[3vw] sm:rounded-[3vw]  sm:mt-[5vw] neuer py-[0.5vw] px-[2vw] rounded-[1.2vw]"
          >
            Add Supporting images
          </label>
          <input
            type="file"
            id="mediaInput"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {trimmedMediaFiles.length == 0 && (
            <p className="text-[1.2vw] text-center sm:text-[4vw] neuer w-[80%] ">
              Add supporting images for this product. The first image you upload
              will be used as the cover image.
            </p>
          )}
        </div>
      </div>
      {display_modal && (
        <Forge_upload_Media_display
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

export default Image_upload;
