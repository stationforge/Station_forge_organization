"use client";

import { useEffect, useState } from "react";

const Mobile_Filters = ({
  selected_month,
  setselected_month,
  selected_year,
  setselected_year,
  setshow_mobile_filters,
}: any) => {
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
  const date = new Date();
  const currentYear = new Date().getFullYear(); // Get the current year
  const years = [
    currentYear,
    currentYear + 1,
    currentYear + 2,
    currentYear + 3,
  ]; // Add more years as needed
  const currentMonthName = monthNames[date.getMonth()];

  useEffect(() => {
    setselected_year(currentYear);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [comeup, setcomeup] = useState(false);

  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hidemodal = () => {
    setcomeup(false);
    setTimeout(() => {
      setshow_mobile_filters(false);
    }, 700);
  };

  return (
    <>
      <div
        className="w-full z-[999] hidden sm:flex h-full fixed top-0 left-0 bg-black bg-opacity-[70%]  justify-center items-end"
        onClick={hidemodal}
      >
        <div
          className={` w-full  h-[135vw] bg-[#D9D9D9] rounded-t-[5vw] py-[9vw] flex flex-col gap-[8vw] ${
            !comeup ? "translate-y-[200vw] " : "translate-y-0"
          } `}
          style={{ transition: "1.5s ease" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="w-full  px-[2vw] flex flex-col gap-[1vw]">
            <h1 className="neuer text-[4vw] px-[1vw] ">Select year</h1>

            <select
              className="w-full cursor-pointer h-[12vw] outline-none  text-[4vw] neuer px-[4vw] rounded-[6vw]"
              //   value={selectedYear}
              onChange={(e) => {
                setselected_year(parseInt(e.target.value));
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {/* select month */}
          <div className="w-full flex flex-col px-[3vw]  gap-[3vw]">
            <div className="w-full flex justify-between items-center ">
              <h1 className="neuer text-[4vw]  px-[1vw] ">Select month</h1>

              <button
                className="w-[25vw] h-[10vw] hover:bg-opacity-[40%] bg-[#CCFF00] rounded-[3vw] text-[4vw] neuer"
                onClick={() => {
                  setselected_month("");
                }}
              >
                View all
              </button>
            </div>

            <div className="w-full h-auto bg-white justify-center rounded-[5vw] pt-[6vw] pb-[3vw] px-[2vw] flex flex-wrap gap-[3vw] ">
              {monthNames.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex justify-center h-[13vw] rounded-[3vw] mb-[3vw] bg-[#EEEEEE] w-[30%] text-[3.5vw] cursor-pointer hover:bg-opacity-[40%] items-center neuer text-black"
                    style={{
                      backgroundColor: selected_month == e ? "#CCFF00" : "",
                      transition: "0.4s ease",
                    }}
                    onClick={() => {
                      setselected_month(e);
                    }}
                  >
                    <p className="">{e}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobile_Filters;
