"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Loader = () => {
  const [startloading, setstartloading] = useState("w-[0%]");
  const [loadingState, setLoadingState] = useState("fast");

  // useEffect to set the animation when the component mounts
  useEffect(() => {
    setstartloading("w-[100%]");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // After 2 seconds, change the loader to slow
    const timeout = setTimeout(() => {
      setLoadingState("slow");
    }, 1500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  //   useEffect(() => {
  //     const url = `${pathname}?${searchParams}`;
  //     // You can now use the current URL
  //     // ...
  //   }, [pathname, searchParams]);
  return (
    <>
      <div className="-w-full h-auto ">
        <div
          className={` ${startloading} h-[8px] rounded-r-[2vw] bg-[#CCFF00]  fixed top-0 left-0  z-[9999999999] transition-width ${
            loadingState === "fast" ? "duration-[14s]" : "duration-[24s]"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Loader;
