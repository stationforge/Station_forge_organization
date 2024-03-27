"use client";

import React from "react";

const Subscription_statistics = ({
  subscriber_stats,
  subscriber_stats_is_loading,
  standard_amout,
  merchant_amout,
}: any) => {
  const loadere_arr = ["", "", ""];
  return (
    <>
      {!subscriber_stats_is_loading ? (
        <>
          <div className="w-full sm:flex-col sm:px-[1.5vw] sm:py-[5vw] gap-[4vw] py-[3vw]  flex justify-center items-center">
            <div className="w-full px-[2vw] sm:px-[4vw] border-[#A9A7A7] border-[0.1vw]  bg-white h-[19vw] sm:h-[43vw] sm:rounded-[5vw] gap-[2vw] rounded-[2vw] flex justify-center items-center flex-col">
              <h1 className="neuem text-[2.3vw]  sm:text-[4.8vw]">
                Standard Tier
              </h1>
              <div className="w-full  flex justify-between items-center ">
                <div className="w-[40%] items-center capitalize flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Subscribers
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    <p className="w-fit">{subscriber_stats["Standard "]}</p>
                  </div>
                </div>
                <div className="w-[0.1vw] bg-[#E7E6E8] h-[4vw] sm:h-[12vw] sm:w-[0.5vw] "></div>

                <div className="w-[40%]  flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Amount Paid
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    ${standard_amout}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-[2vw] sm:px-[4vw] border-[#A9A7A7] border-[0.1vw]  bg-white h-[19vw] sm:h-[43vw] sm:rounded-[5vw] gap-[2vw] rounded-[2vw] flex justify-center items-center flex-col">
              <h1 className="neuem text-[2.3vw]  sm:text-[4.8vw]">
                Merchant Tier
              </h1>
              <div className="w-full  flex justify-between items-center ">
                <div className="w-[40%] items-center capitalize flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Subscribers
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    <p className="w-fit">{subscriber_stats["Premium "]}</p>
                  </div>
                </div>
                <div className="w-[0.1vw] bg-[#E7E6E8] h-[4vw] sm:h-[12vw] sm:w-[0.5vw] "></div>

                <div className="w-[40%]  flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Amount Paid
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    <p className="w-fit"> ${merchant_amout}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-[2vw] sm:px-[4vw] border-[#A9A7A7] border-[0.1vw]  bg-white h-[19vw] sm:h-[43vw] sm:rounded-[5vw] gap-[2vw] rounded-[2vw] flex justify-center items-center flex-col">
              <h1 className="neuem text-[2.3vw]  sm:text-[4.8vw]">
                All Subscribers
              </h1>
              <div className="w-full  flex justify-between items-center ">
                <div className="w-[40%] items-center capitalize flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Subscribers
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    <p className="w-fit">
                      {subscriber_stats["Premium "] +
                        subscriber_stats["Standard "]}
                    </p>
                  </div>
                </div>
                <div className="w-[0.1vw] bg-[#E7E6E8] h-[4vw] sm:h-[12vw] sm:w-[0.5vw] "></div>

                <div className="w-[40%]  flex flex-col gap-[1.2vw]">
                  <p className="text-black text-[1vw] sm:text-[3.4vw] text-center text-opacity-[60%]">
                    Total Amount Paid
                  </p>

                  <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#E7E6E8]  flex justify-center items-center">
                    <p className="w-fit"> ${merchant_amout + standard_amout}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="w-full sm:flex-col sm:px-[1.5vw] sm:py-[5vw] gap-[4vw] py-[3vw]  flex justify-center items-center">
            {loadere_arr.map((_, index) => {
              return (
                <div
                  key={index}
                  className="w-full px-[2vw] sm:px-[4vw] border-[#A9A7A7] border-[0.1vw]  bg-white h-[19vw] sm:h-[43vw] sm:rounded-[5vw] gap-[2vw] rounded-[2vw] flex justify-center items-center flex-col"
                >
                  <div className="bg-[#A9A7A7] animate-pulse w-[15vw] rounded-[1vw] sm:h-[8vw] sm:w-[30vw] h-[4vw]"></div>
                  <div className="w-full  flex justify-between items-center ">
                    <div className="w-[40%] items-center capitalize flex flex-col gap-[1.2vw]">
                      <div className="bg-[#A9A7A7] h-[2vw]  animate-pulse sm:h-[4vw] w-full"></div>

                      <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#A9A7A7] animate-pulse  flex justify-center items-center"></div>
                    </div>
                    <div className="w-[0.1vw] bg-[#E7E6E8] h-[4vw] sm:h-[12vw] sm:w-[0.5vw] "></div>

                    <div className="w-[40%] items-center capitalize flex flex-col gap-[1.2vw]">
                      <div className="bg-[#A9A7A7] h-[2vw]  animate-pulse sm:h-[4vw] w-full"></div>

                      <div className="h-[4vw] neuem text-[1.2vw] sm:text-[3.5vw] sm:w-full sm:h-[13vw] border-[0.1vw] border-[#9F9F9F] w-[10vw] rounded-[1vw] bg-[#A9A7A7] animate-pulse  flex justify-center items-center"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Subscription_statistics;
