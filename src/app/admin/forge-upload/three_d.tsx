"use client ";
import Image from "next/image";
import { useState, useEffect } from "react";
import cloud from "../../../../public/admin_section/post_upload/cloud.webp";
import { FadeInTransition } from "react-transitions-library";
import Forge_upload_Media_display from "./image_display";

const Three_d = ({ setzipfile_with_model, setzipfile_only_png }: any) => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaFiles_only_png, setMediaFiles_only_png] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [trimmedMediaFiles, setTrimmedMediaFiles] = useState([]);
  const [isfilelaoded, setisfilelaoded] = useState(false);
  const [isfilelaoded_only_png, setisfilelaoded_only_png] = useState(false);
  //   these are for the props
  const [data, setdata] = useState([]);
  const [filename, setfilename] = useState("");
  const [filename_only_png, setfilename_only_png] = useState("");
  const [display_modal, setdisplay_modal] = useState(false);
  const [video, setvideo] = useState(false);

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files;
    addFiles(selectedFiles);
  };

  const addFiles = (files: any) => {
    if (files.length > 0) {
      const newMediaFiles: any = [];
      setfilename(files[0].name);

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          newMediaFiles.push(file);
        }
      }

      setMediaFiles(files);
      setisfilelaoded(true);
    }
  };

  // for the png without models

  const handleFileChange_only_png = (event: any) => {
    const selectedFiles = event.target.files;
    addFiles_only_png(selectedFiles);
  };

  const addFiles_only_png = (files: any) => {
    if (files.length > 0) {
      const newMediaFiles: any = [];
      setfilename_only_png(files[0].name);

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          newMediaFiles.push(file);
        }
      }

      setMediaFiles_only_png(files);
      setisfilelaoded_only_png(true);
    }
  };

  useEffect(() => {
    setzipfile_only_png(mediaFiles_only_png);
    console.log(mediaFiles_only_png);
  }, [mediaFiles_only_png]);

  //
  useEffect(() => {
    setzipfile_with_model(mediaFiles);
    console.log(mediaFiles);
  }, [mediaFiles]);

  return (
    <>
      <div
        className="w-[55vw] sm:rounded-[3vw] sm:w-full sm:flex-col sm:h-[140vw] sm:px-[5vw] h-[22vw] sm:gap-[10vw]   px-[3vw] flex  gap-[1.4vw] justify-center items-center bg-white rounded-[2vw]"
        style={{ backgroundColor: isDragOver ? "#CCFF00" : "" }}
      >
        <div className=" flex justify-center w-full sm:gap-[4vw]  items-center flex-col gap-[1vw] ">
          {!isfilelaoded && (
            <Image
              src={cloud}
              alt="cloud upload image"
              className="w-[10vw] sm:w-[20vw] h-fit"
            />
          )}

          {isfilelaoded && (
            <p className="text-[7vw]  sm:text-[15vw] translate-y-[2.5vw] text-center neuer  ">
              <i className="bi bi-badge-3d-fill"></i>
            </p>
          )}
          {isfilelaoded && (
            <p className="text-[1.2vw] sm:text-[4vw] text-center neuer  ">
              <span className="text-[#688200]"> {filename}</span> file
              containing 3D models and images uploaded successfully.
            </p>
          )}
          <label
            htmlFor="Zipinput"
            className="cursor-pointer bg-[#F3F3F3] text-[#688200] text-[1vw] sm:text-[3.5vw] sm:py-[1vw] sm:px-[5vw] sm:rounded-[2vw] neuer py-[0.5vw] px-[2vw] rounded-[1.2vw]"
          >
            {isfilelaoded ? "  Relace zip file" : "  Add zip file"}
          </label>
          <input
            type="file"
            id="Zipinput"
            accept=".zip" // Add the 3D file formats you want to allow
            className="hidden"
            onChange={handleFileChange}
          />

          {!isfilelaoded && (
            <p className="text-[1.2vw] sm:text-[4vw] text-center neuer  ">
              Please upload a ZIP file containing your 3D models and PNG images.
            </p>
          )}
        </div>

        {/* just some border lines  */}
        <div className="w-full h-[0.5vw] sm:block hidden bg-black bg-opacity-[50%]"></div>
        {/* image wihthout model  */}
        <div className=" flex justify-center w-full sm:gap-[4vw] items-center flex-col gap-[1vw] ">
          {!isfilelaoded_only_png && (
            <Image
              src={cloud}
              alt="cloud upload image"
              className="w-[10vw] sm:w-[20vw] h-fit"
            />
          )}

          {isfilelaoded_only_png && (
            <p className="text-[7vw]  sm:text-[15vw] translate-y-[2vw] text-center neuer  ">
              <i className="bi bi-filetype-png"></i>
            </p>
          )}
          {isfilelaoded_only_png && (
            <p className="text-[1.2vw] sm:text-[4vw] text-center neuer  ">
              <span className="text-[#688200]"> {filename_only_png}</span> file
              containing 3D images uploaded successfully.
            </p>
          )}
          <label
            htmlFor="Zipinput_only_png"
            className="cursor-pointer bg-[#F3F3F3] text-[#688200] text-[1vw] sm:text-[3.5vw] sm:py-[1vw] sm:px-[5vw] sm:rounded-[2vw] neuer py-[0.5vw] px-[2vw] rounded-[1.2vw]"
          >
            {isfilelaoded_only_png ? "  Relace zip file" : "  Add zip file"}
          </label>
          <input
            type="file"
            id="Zipinput_only_png"
            accept=".zip" // Add the 3D file formats you want to allow
            className="hidden"
            onChange={handleFileChange_only_png}
          />

          {!isfilelaoded_only_png && (
            <p className="text-[1.2vw] sm:text-[4vw] text-center neuer  ">
              Please upload a ZIP file containing only your PNG images.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Three_d;
