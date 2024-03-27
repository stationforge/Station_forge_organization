"use client ";

import React, { useState, useEffect } from "react";
import forge_download_img from "../../../../public/admin_section/digital_sales/forge_downloaded.webp";
import Image from "next/image";
import { format, fromUnixTime } from "date-fns";

const New_Each_subscriber = ({
  userdata,
  sethideProfile,
  showuser_profile,
  setcustom_all_libary_arr,
  setuuid,
  sethide_display_forge_modal,
}: any) => {
  const [currentYear, setCurrentYear] = useState("");
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const currentDate: any = new Date();
    const lastDayOfMonth: any = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    );

    // Calculate the remaining days until the end of the current month
    const remainingDays: any = Math.ceil(
      (lastDayOfMonth - currentDate) / (1000 * 60 * 60 * 24),
    );

    setDaysRemaining(remainingDays);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

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
  useEffect(() => {
    // Get the current date
    // Extract the year as a string
    const year = date.getFullYear().toString();

    // Set the current month and year in the state
    setCurrentYear(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <>
      <div className="w-full  flex justify-between items-center neuer sm:text-[2.8vw]  text-[0.9vw] ">
        <div className="w-[25%] sm:gap-[2vw]  h-auto flex items-center gap-[0.5vw]">
          <div
            className="w-[3.5vw] h-[3.5vw] sm:w-[9vw] sm:h-[9vw] rounded-[100%] avater_bg overflow-hidden  "
            style={{ backgroundImage: `url(/cover.webp)` }}
          >
            {" "}
            <img
              src={
                userdata.avater != ""
                  ? userdata.avater
                  : "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w"
              }
              alt="user_img"
              className="w-full h-full"
            />
          </div>
          <p
            className="underline underline-offset-4 hover:text-[gray] hover:text-opacity-[50%] cursor-pointer"
            onClick={() => {
              showuser_profile(userdata.userId);
            }}
          >
            {userdata.name} ({userdata.username})
          </p>
        </div>
        <div className="w-[20%]  h-auto">{userdata.formattedDate}</div>
        <div
          className="w-[20%]  h-auto"
          onClick={() => {
            console.log(userdata);
          }}
        >
          {userdata?.subscribedAt?.seconds
            ? format(
                fromUnixTime(userdata.subscribedAt.seconds),
                "d MMMM yyyy h:mm a",
              )
            : "Subscription date not available"}
        </div>
        <div className="w-[20%] sm:gap-[2vw] h-auto flex items-center font-[900] gap-[0.5vw]">
          <Image
            src={forge_download_img}
            alt="forge download img"
            className="w-[7vw] sm:w-[14vw] h-fit "
          />
          {userdata.libraryData.length}{" "}
          {userdata.libraryData.length == 0 ? "forge" : "forges"}
          <button
            className=" bg-[#F5F5F5] px-[0.8vw] py-[0.3vw] text-[#95B611] rounded-[2vw]  sm:px-[1.5vw] sm:py-[0.7vw] sm:rounded-[3vw]"
            onClick={() => {
              setcustom_all_libary_arr(userdata.libraryData);
              sethide_display_forge_modal(false);
            }}
          >
            View <i className="bi bi-chevron-right"></i>
          </button>
        </div>
        <div className="w-[15%]  h-auto text-center">
          {daysRemaining} {daysRemaining > 1 ? "days" : "day"}
        </div>
      </div>
    </>
  );
};

export default New_Each_subscriber;
