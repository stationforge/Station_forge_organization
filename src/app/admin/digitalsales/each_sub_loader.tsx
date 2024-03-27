"use client ";

import React, { useState, useEffect } from "react";
import forge_download_img from "../../../../public/admin_section/digital_sales/forge_downloaded.webp";
import Image from "next/image";

const Each_subscriber_loadeer = ({
  userdata,
  sethideProfile,
  showuser_profile,
  setuuid,
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
          <div className="w-[3.5vw] h-[3.5vw] sm:w-[9vw] sm:h-[9vw] rounded-[100%] avater_bg overflow-hidden bg-[#A9A7A7] animate-pulse "></div>
          <div className="bg-[#A9A7A7] animate-pulse h-[1.3vw] w-[10vw] sm:w-[25vw] sm:h-[4vw]"></div>
        </div>
        <div className="w-[20%]  h-auto">
          {" "}
          <div className="bg-[#A9A7A7] animate-pulse h-[1.3vw] w-[10vw] sm:w-[25vw] sm:h-[4vw]"></div>
        </div>
        <div className="w-[20%]  h-auto">
          <div className="bg-[#A9A7A7] animate-pulse h-[1.3vw] w-[10vw] sm:w-[25vw] sm:h-[4vw]"></div>
        </div>
        <div className="w-[20%] sm:gap-[2vw] h-auto flex items-center font-[900] gap-[0.5vw]">
          <div className="bg-[#A9A7A7] animate-pulse h-[1.3vw] w-[10vw] sm:w-[25vw] sm:h-[4vw]"></div>
        </div>
        <div className="w-[15%]  h-auto text-center">
          <div className="bg-[#A9A7A7] animate-pulse h-[1.3vw] w-[10vw] sm:w-[25vw] sm:h-[4vw]"></div>
        </div>
      </div>
    </>
  );
};

export default Each_subscriber_loadeer;
