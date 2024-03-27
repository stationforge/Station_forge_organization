"use client ";

import React, { useState, useEffect } from "react";
import cloud from "../../../../public/admin_section/post_upload/cloud.webp";
import Image from "next/image";
import { FadeInTransition } from "react-transitions-library";
import Admin_Image_display from "./admin_edit_image_display";

const Admin_edit_post = (props: any) => {
  const {
    goback,
    setcopy_role,
    setcopy_Title,
    setcopy_Description,
    setcopy_Images,
    setlocal_post_err,

    copy_role,
    copy_Title,
    copy_Description,
    copy_Images,
    local_post_err,
    reset_value,
    mediaFiles,
    setmediaFiles,
    isDragOver,
    setIsDragOver,
    trimmedMediaFiles,
    settrimmedMediaFiles,
    isfilelaoded,
    setisfilelaoded,
    update_post,
    setdata,
    data,
    setmaindata,
    maindata,
    setdisplay_modal,
    display_modal,
    setvideo,
    video,
    setis_updating,
  } = props;

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
  // this above is for props
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);

  const [img_display_arr, setimg_display_arr] = useState([]);
  const [img_display, setimg_display] = useState<any>("");
  const [firebase_link, setfirebase_link] = useState(true);
  const [img_display_show, setimg_display_show] = useState(false);

  const handleRadioChange = (id: any) => {
    setcopy_role(id);
    // setlocal_post_err("");
  };

  // Assuming mediaFiles is the state that holds the new media files added from the local machine
  // and existingMediaFiles is the prop with media files coming from Firebase

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
      // Combine existing media files from Firebase with new files from local machine
      const updatedMediaFiles = [...copy_Images];
      for (const file of files) {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          updatedMediaFiles.push(file);
        }
      }

      // Update the trimmedMediaFiles state to contain the first 4 media files
      //   settrimmedMediaFiles(updatedMediaFiles.slice(0, 4));
      setcopy_Images(updatedMediaFiles);
      // Update the mediaFiles state with all the files
      setmediaFiles(updatedMediaFiles);
      setisfilelaoded(true);
    }
  };

  const deleteMedia = (media: any) => {
    let updatedMediaFiles;

    if (media instanceof File) {
      // For local files, compare using the `name` property
      updatedMediaFiles = copy_Images.filter((file: any) => {
        return file instanceof File ? file.name !== media.name : true;
      });
    } else if (media && typeof media.link === "string") {
      // For Firebase files, compare using the `link` property
      updatedMediaFiles = copy_Images.filter((file: any) => {
        return file.link !== media.link;
      });
    }

    setcopy_Images(updatedMediaFiles);

    // If the main display media is deleted, update it
    if (img_display === media) {
      setimg_display(updatedMediaFiles[0] || null);
    }
  };

  // to handle the delete function
  useEffect(() => {
    setimg_display_arr(copy_Images);
  }, [copy_Images]);
  useEffect(() => {
    // Reset error message on mediaFiles change
    setlocal_post_err("");

    setdata(mediaFiles);
  }, [mediaFiles]); // Dependency array ensures this effect runs when mediaFiles changes

  useEffect(() => {
    return settrimmedMediaFiles(copy_Images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[60vw] sm:w-full gap-[3vw] sm:gap-[10vw] flex  flex-col justify-center h-auto pl-[3.5vw] sm:px-[3vw] sm:mt-[5vw] ">
        {/* this is for the media upload*/}
        {/* media upload now  */}
        {/* media upload now  */}
        {/* media upload now  */}
        {/* media upload now  */}
        {/* media upload now  */}

        <div
          className="w-full   sm:h-[100vw] sm:gap-[6vw] sm:rounded-[4vw]  h-[35vw] px-[5vw] flex flex-col gap-[1.5vw] justify-center items-center bg-white rounded-[2vw]"
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
              <div className=" w-full  overflow-hidden h-[25vw] sm:h-[60vw] sm:gap-[2vw]  relative flex flex-wrap justify-center items-center gap-[0.4vw]">
                {trimmedMediaFiles.map((file: any, index: any) => {
                  // Check if the file is a video based on its link
                  const isVideoLink =
                    file.link &&
                    videoExtensions.some((ext) =>
                      file.link.includes(`.${ext}`),
                    );
                  return (
                    <div
                      key={index}
                      className="overflow-hidden  sm:rounded-[3vw] sm:overflow-hidden avater_bg rounded-[0.5vw] w-[48%] h-[49%]"
                      // style={{
                      //   backgroundImage: file.link
                      //     ? `url(${file.link})`
                      //     : `url(${URL.createObjectURL(file)})`,
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
                            className="w-full cursor-pointer h-auto scale-[2]"
                            onClick={() => {
                              setvideo(true);
                              setdisplay_modal(true);
                              setmaindata(file);
                              setimg_display_show(true);
                              setdata(mediaFiles);
                              setimg_display(file);
                              setimg_display_arr(copy_Images);
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
                          //     setdata(mediaFiles);
                          //   }}
                          // />

                          <div
                            className="w-full h-full cursor-pointer"
                            onClick={() => {
                              setimg_display_show(true);
                              setvideo(false);
                              setimg_display(file);

                              setimg_display_arr(copy_Images);
                            }}
                          >
                            {" "}
                            <img
                              src={file.link}
                              alt={index + "bg images"}
                              className="h-fit w-full translate-y-[-2vw]"
                            />
                          </div>
                        )
                      ) : file?.type?.startsWith("image/") ? (
                        // This is a local image file
                        <div
                          // src={URL.createObjectURL(file)}
                          // alt={`Selected Image ${index + 1}`}
                          className="w-full h-full  cursor-pointer"
                          onClick={() => {
                            setvideo(false);
                            setmaindata(file);
                            setdisplay_modal(true);
                            setdata(mediaFiles);
                            setimg_display_arr(copy_Images);
                            setimg_display(file);
                            setimg_display_show(true);
                          }}
                        >
                          {" "}
                          <img
                            src={URL.createObjectURL(file)}
                            alt={index + "bg images"}
                            className="h-fit w-full translate-y-[-2vw]"
                          />
                        </div>
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
                            setdisplay_modal(true);
                            setmaindata(file);
                            setdata(mediaFiles);
                            setimg_display_arr(copy_Images);
                            setimg_display_show(true);
                            setimg_display(file);
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

                {/* {mediaFiles.length > 4 && (
                  <div
                    className="rounded-[0.5vw] absolute bottom-0 right-[1.7%] bg-black bg-opacity-[90%] w-[48%] flex justify-center items-center h-[49%] cursor-pointer"
                    onClick={() => {
                      setmaindata(mediaFiles[4]);
                      setdata(mediaFiles);
                      setdisplay_modal(true);
                      setimg_display_show(true);
                    }}
                  >
                    <span className="text-white text-[4vw] neuem">
                      +{mediaFiles.length - 4}
                    </span>
                  </div>
                )} */}
                {copy_Images.length > 4 && (
                  <div
                    className="rounded-[0.5vw] sm:rounded-[3vw] sm:bottom-[-1vw]  absolute bottom-0 right-[1.7%] bg-black bg-opacity-[90%] w-[48%] flex justify-center items-center  h-[49%] cursor-pointer"
                    onClick={() => {
                      setmaindata(mediaFiles[4]);
                      setdata(mediaFiles);
                      setimg_display_show(true);
                      setimg_display(copy_Images[3]);
                      setimg_display_arr(copy_Images);
                      setdisplay_modal(true);
                    }}
                  >
                    <span className="text-white text-[4vw] sm:text-[8vw] neuem">
                      +{copy_Images.length - 4}{" "}
                    </span>
                  </div>
                )}
              </div>
            </FadeInTransition>
          )}

          <div className=" flex justify-center items-center flex-col gap-[2vw] ">
            {!trimmedMediaFiles.length && (
              <Image
                src={cloud}
                alt="cloud upload image"
                className="w-[15vw] h-fit"
              />
            )}
            <label
              htmlFor="mediaInput"
              className="cursor-pointer sm:py-[4vw] sm:px-[9vw] sm:rounded-[5vw] bg-[#F3F3F3] text-[#688200] sm:text-[4vw]  text-[1vw] neuer py-[1vw] px-[2vw] rounded-[1.2vw]"
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

            {/* {!isfilelaoded && (
              <p className="text-[1.2vw] text-center neuer w-[80%]">
                Upload or simply drag and drop your media files. You can upload
                up to 20 media items, including both images and videos{" "}
              </p>
            )} */}
          </div>
        </div>

        {/* this is for the text upload*/}
        {/* text upload */}
        {/* text upload */}
        {/* text upload */}
        {/* text upload */}
        {/* text upload */}
        <div className="w-full h-[40vw] sm:rounded-[4vw] sm:gap-[5vw] sm:h-[135vw]  relative px-[3vw] flex flex-col gap-[2vw] justify-center items-end bg-white rounded-[2vw]">
          <div className="w-full  flex flex-col gap-[0.5vw] ">
            <label
              htmlFor=""
              className="neuem font-[700] text-[1.2vw] sm:text-[3.5vw]  capitalize"
            >
              Add Post Title
            </label>
            <input
              type="text"
              className="w-full border-[#C8C8C8] sm:text-[3.5vw]  sm:px-[4vw] sm:h-[13vw] sm:rounded-[5vw] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] border-[0.1vw] neuer text-[1.2vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw] capitalize"
              onChange={(e) => {
                setcopy_Title(e.target.value);
                setlocal_post_err("");
              }}
              value={copy_Title || ""}
            />
          </div>
          <div className="w-full  flex flex-col gap-[0.5vw] ">
            <label
              htmlFor=""
              className="neuem font-[700] text-[1.2vw] sm:text-[3.5vw]  capitalize"
            >
              Add Post Description{" "}
              <span className="text-[0.9vw] sm:text-[2.5vw] text-[red]">
                Kindly note : {"<br/>"} for line breaks
              </span>
            </label>
            <textarea
              placeholder="if you'd like to add a line break to your description, just use '<br/>'. For instance, using '<br/> <br/>' will move your text down two lines."
              className="w-full border-[#C8C8C8] sm:text-[3.5vw]  sm:p-[5vw] sm:h-[50vw] sm:rounded-[5vw] duration-[0.6s] transition neuer focus:outline-none focus:border-[#CCFF00] resize-none border-[0.1vw] rounded-[1.1vw] h-[10vw] py-[1vw] text-[1.2vw] px-[1.3vw]"
              name=""
              id=""
              onChange={(e) => {
                setcopy_Description(e.target.value);
                setlocal_post_err("");
              }}
              value={copy_Description || ""}
            ></textarea>
          </div>

          <div className="w-full  flex flex-col gap-[0.5vw] ">
            <label
              htmlFor=""
              className="neuem  font-[700] text-[1.2vw] sm:text-[3.5vw]  capitalize"
            >
              Add Tag
            </label>
            <input
              type="text"
              className="w-full text-[1.2vw] border-[#C8C8C8] sm:text-[3.5vw]  sm:h-[10vw] sm:rounded-[5vw]  duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] neuer border-[0.1vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw]"
            />
          </div>

          <button
            className="w-fit sm:w-full sm:px-0 sm:py-0 sm:h-[13vw] sm:rounded-[3vw] py-[0.9vw] px-[5vw] neuem text-[1.2vw] sm:text-[4vw] bg-[#CCFF00] text-black mt-[1vw] hover:bg-opacity-[40%] transition duration-[0.6s] rounded-[1.4vw]"
            onClick={() => {
              update_post();
            }}
          >
            Update Post
          </button>

          <p className="absolute neuer w-[30vw] text-[#FF0000]  text-[1vw]  left-[3vw] bottom-[3vw]">
            {local_post_err}
          </p>
        </div>
      </div>

      {/* the right hand side that is stikcy  */}
      {/*  */}
      {/*  */}
      {/*  */}
      {/*  */}
      <div className="w-[30vw] z-[99] sm:w-[94vw] sm:mx-auto py-[2vw]  px-[2vw] bg-white h-[35vw] rounded-[2vw] sm:relative  sm:top-[10vw] sm:h-[80vw] sm:gap-[3vw]  fixed right-[3.5vw] sm:right-0 sm:py-[5vw] sm:px-[5vw] sm:rounded-[4vw] top-[10vw] flex flex-col justify-between  ">
        <div className="w-full h-auto">
          <h2 className="text-[1.4vw] pb-[2vw] neuem sm:text-[4vw] ">
            Who can see this post?
          </h2>
          <ul className=" flex flex-col gap-[2vw]  sm:gap-[4vw] ">
            {options.map((option) => (
              <li
                key={option.id}
                onClick={() => {
                  handleRadioChange(option.id);
                  setlocal_post_err("");
                }}
                className="flex justify-start cursor-pointer sm:gap-[4vw]  py-[0.2vw] gap-[2vw] items-center"
              >
                <div
                  className="w-[2vw] sm:w-[5vw] sm:h-[5vw] flex justify-center items-center  h-[2vw] border-[#B7B7B7] border-[0.1vw] rounded-[0.4vw]"
                  style={{
                    backgroundColor: copy_role == option.id ? "#CCFF00" : "",
                  }}
                >
                  <i
                    className="bi text-[2vw] sm:text-[4vw] bi-check-lg"
                    style={{
                      display: copy_role == option.id ? "block" : "none",
                    }}
                  ></i>
                </div>
                <p className="neuem text-[1.4vw] sm:text-[3.5vw]  cursor-pointer">
                  {option.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full flex  sm:gap-[5vw]  gap-[2vw] justify-between items-center">
          <button
            className="bg-transparent hover:text-[#FF0000]  border-[0.1vw] border-black px-[2vw] py-[1vw] neuem text-[1vw] sm:w-full sm:h-[12vw] sm:rounded-[1vw] sm:text-[3.2vw]  w-fit text-center capitalize  transition duration-[0.6s] hover:bg-[#f8f8f8]"
            onClick={() => {
              reset_value();
            }}
          >
            <i className="bi bi-arrow-clockwise"></i> Reset defaults
          </button>
          <button
            className="bg-[#FF0000] text-white neuem text-[1vw] sm:w-full sm:h-[12vw] sm:rounded-[1vw] sm:text-[3.2vw] py-[1vw] px-[2vw]  w-fit text-center capitalize  hover:text-[black] transition duration-[0.6s]"
            onClick={() => {
              goback();
            }}
          >
            <i className="bi bi-chevron-left"></i> Back to Post
          </button>
        </div>
      </div>
      {img_display_show && (
        <Admin_Image_display
          img_display_arr={img_display_arr}
          setimg_display_arr={setimg_display_arr}
          img_display={img_display}
          setimg_display={setimg_display}
          setimg_display_show={setimg_display_show}
          video={video}
          setvideo={setvideo}
          firebase_link={firebase_link}
          setfirebase_link={setfirebase_link}
          delete_media={deleteMedia}
        />
      )}

      <div className="sm:h-[10vw] w-full h-0"></div>
    </>
  );
};

export default Admin_edit_post;
