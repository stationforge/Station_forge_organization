"use client ";

import React, { useEffect, useState } from "react";
import { useOnboarding_Context } from "../utils/onboarding_context";
import searchimg from "../../../public/support/search_icon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProfile_Context } from "../utils/profile_context";
import mob_filter from "../../../public/home/mob_filter.webp";
import Link from "next/link";
import Download_modal from "./download_modal";
import { Inter } from "next/font/google";
import Mobile_Allocations from "./mob_allocations";
import Mob_download_track from "./mob_download_track";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

const Models_in_libary = (props: any) => {
  const route = useRouter();
  const {
    products,
    setshow_mobile_filter_allocation,
    setshow_download_modal,
    setdownloadmodal_png_link,
    setdownloadmodal_pngwith_model,
    libraryItems,
    setdownload_text,
    setcurrently_downloading_id,
    setsearch_text,
    is_libary_empty,
    search_text,
    is_network_err,
  } = props;
  const [opacity, setopacity] = useState(0.5);

  useEffect(() => {
    localStorage.setItem("downloadid", "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {
    toggleDropdown,
    setpage_loade,
    download_product_id,
    settrimmed_text,
    trimmed_text,
  }: any = useProfile_Context();
  const date = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthName = monthNames[date.getMonth()];
  const [local_product_id, setlocal_product_id] = useState("");

  const [items, setitems] = useState([
    {
      img: "/onboarding/1.webp",
      txt: "Grimguard seargeant A",
      price: "343",
    },
    {
      img: "/onboarding/2.webp",
      txt: "Grimguard officer",
      price: "343",
    },
    {
      img: "/onboarding/3.webp",
      txt: "Grimguard priest",
      price: "343",
    },
    {
      img: "/onboarding/4.webp",
      txt: "Orkaz Strappaz Front",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
    {
      img: "/onboarding/5.webp",
      txt: "Orkaz Strappaz Sideback",
      price: "343",
    },
    {
      img: "/onboarding/6.webp",
      txt: "Orkaz Strappaz Side",
      price: "343",
    },
    {
      img: "/onboarding/7.webp",
      txt: "Orkaz Strappaz Face",
      price: "343",
    },
    {
      img: "/onboarding/8.webp",
      txt: "Vaskar Orkaz Hunter Front",
      price: "343",
    },
    {
      img: "/onboarding/9.webp",
      txt: "Vaskar Orkaz Hunter Back",
      price: "343",
    },
  ]);
  const handledownload = (png: any, model: any, title: any, id: any) => {
    setdownloadmodal_png_link(png);
    setdownload_text(title);
    setdownloadmodal_pngwith_model(model);
    setcurrently_downloading_id(id);
    setshow_download_modal(true);
  };

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgressid = localStorage.getItem("downloadid");

      if (storedDownloadProgressid == null) {
        setlocal_product_id("");
      } else if (storedDownloadProgressid == "0") {
        setlocal_product_id("");
        return;
      } else {
        setlocal_product_id(storedDownloadProgressid);
      }
      // console.log("this is runin");
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-[68%]  sm:w-full sm:px-[3vw] sm:border-none sm:gap-[8vw]  h-auto pb-[1vw] pt-[2.26vw]  border-r-[white] border-r-[0.1vw]  border-l-[white] border-l-[0.13vw] border-opacity-[10%]  flex flex-col gap-[1vw]">
        <Mob_download_track />
        <div className="w-full flex justify-between items-center pb-[1vw] px-[2vw]">
          <h3 className="neuer text-[2.2vw]  text-white  sm:text-[7vw]">
            All Models <p className="sm:block hidden">In Libary</p>
          </h3>
          <div className="w-auto relative sm:hidden  z-[999999999]">
            <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
              <Image
                src={searchimg}
                unoptimized
                width="0"
                height="0"
                alt="Search icon image"
                className="w-[1.3vw]  h-fit"
              />
            </div>
            <input
              type="text"
              placeholder="Search model"
              onChange={(e) => {
                setsearch_text(e.target.value);
              }}
              className="h-[3vw] w-[23vw] placeholder:text-white text-white neuer text-[1.1vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
              value={search_text || ""}
            />
          </div>

          {/* now this is for the search filter  */}
          <div
            className="text-[white] text-opacity-[90%] hidden justify-center items-center sm:flex w-[38vw] gap-[2vw] text-[3vw] h-[10vw] bg-[#181515] rounded-[5vw] "
            onClick={() => {
              setshow_mobile_filter_allocation(true);
            }}
          >
            <p className={`${inter.className}`}>Monthly Filter</p>
            <Image
              src={mob_filter}
              alt="filter icon"
              className="w-[3vw] h-fit opacity-[90%]"
            />
          </div>
        </div>

        {/* this is for the mobile input  */}

        <div className="w-auto sm:block hidden relative z-[999999999]">
          <div className="absolute h-full   w-[12vw]  flex justify-center items-center top-0 left-0 z-[13]">
            <Image
              src={searchimg}
              unoptimized
              width="0"
              height="0"
              alt="Search icon image"
              className="w-[5vw]   h-fit"
            />
          </div>
          <input
            type="text"
            placeholder="Search model"
            onChange={(e) => {
              setsearch_text(e.target.value);
            }}
            value={search_text || ""}
            className="h-[12vw] w-full  sm:block hidden placeholder:text-white text-white neuer text-[3.5vw] outline-none focus:border transition duration-[0.8s] pl-[12vw] pr-[1vw]  rounded-[7vw] backdrop-blur-[15px] bg-[white] bg-opacity-[10%] "
          />
        </div>
        <div className="h-[0.1vw] bg-white sm:hidden bg-opacity-[10%] w-full"></div>

        <div className="w-full sm:gap-[3vw] sm:px-0  flex flex-wrap justify-start px-[1.8vw] gap-[1.7vw]">
          {is_network_err && (
            <div className="w-full h-[23vw] sm:text-[3.5vw]  flex justify-center items-center text-[white] neuer text-opacity-[70%] text-[1.4vw]">
              Something went wrong, Kindly refresh this page
            </div>
          )}
          {is_libary_empty && (
            <div className="w-full h-[23vw] sm:text-[3.5vw]  flex justify-center items-center text-[white] neuer text-opacity-[70%] text-[1.4vw]">
              There are no Items in your libary
            </div>
          )}
          {libraryItems.length == 0 && !is_libary_empty && !is_network_err && (
            <div className="w-full h-[23vw] sm:text-[3.5vw]  flex justify-center items-center text-[white] neuer text-opacity-[70%] text-[1.4vw]">
              No item matches your search
            </div>
          )}
          {libraryItems.map((e: any, index: any) => {
            // if (index == 9 ) {

            // }
            return (
              <>
                <div
                  key={index}
                  //   scroll={true}
                  className="w-[19.7vw] sm:w-[45.5vw]  sm:gap-[3.5vw] sm:rounded-[4vw]  border-white  border border-opacity-[30%] overflow-hidden cursor-pointer hover:scale-[1.008] transition duration-[0.6s] h-auto flex flex-col gap-[1.3vw] rounded-[2vw]"
                >
                  <div
                    className="w-full sm:h-[45vw]  avater_bg h-[20vw] overflow-hidden"
                    style={{ backgroundImage: "url(/cover.webp)" }}
                  >
                    <Image
                      src={e.coverImage}
                      alt={e.title}
                      unoptimized
                      width="0"
                      height="0"
                      className="w-full h-full scale-[1.2]"
                    />
                  </div>
                  <div className="w-full sm:px-[2vw] px-[1vw] flex justify-between  items-center">
                    <p className="neuem text-[1.2vw] text-white sm:text-[3vw]">
                      {e.title}
                    </p>
                  </div>
                  <div className="w-full  flex px-[1vw]  mb-[1vw] justify-between items-center ">
                    <button
                      className="bg-[#CCFF00] sm:text-[3vw] hover:bg-opacity-[70%] sm:ml-[2vw] sm:py-[1.2vw] sm:px-[5vw] sm:rounded-[3vw] sm:mb-[2vw]   rounded-[1.2vw] py-[0.5vw] px-[1.8vw] neuer text-black w-fit h-fit  text-[1vw]"
                      style={{
                        backgroundColor: e.downloaded ? "#111111" : "#CCFF00",
                        color: e.downloaded ? "#B7B7B7" : "black",
                      }}
                      disabled={e.downloaded}
                      onClick={() => {
                        if (e.download) {
                          return;
                        } else if (e.id == local_product_id) {
                          return;
                        } else {
                          handledownload(
                            e.downloadPngLink,
                            e.downloadPngModelLink,
                            e.title,
                            e.id,
                          );
                        }
                      }}
                    >
                      {e.downloaded
                        ? "Downloaded "
                        : e.id == local_product_id
                        ? "Downloading"
                        : "Download"}
                    </button>

                    <p className="text-[1vw] sm:text-[2.7vw] sm:mr-[1vw] text-white text-opacity-[50%] neuer">
                      In Library
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Models_in_libary;
