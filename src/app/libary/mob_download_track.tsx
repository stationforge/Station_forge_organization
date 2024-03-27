"use client ";

import { useState, useEffect } from "react";

const Mob_download_track = () => {
  const [track_hide_download, settrack_hide_download] = useState(true);
  const [track_progress, settrack_progress] = useState<any>("0");
  const [download_title, setdownload_title] = useState<any>("0");

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const storedDownloadProgress = localStorage.getItem("downloadProgress");
      if (storedDownloadProgress == null) {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
      } else if (storedDownloadProgress == "0") {
        settrack_progress(storedDownloadProgress);
        settrack_hide_download(true);
        return;
      } else {
        settrack_hide_download(false);
        settrack_progress(storedDownloadProgress);
      }
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulating the download progress update
  useEffect(() => {
    const interval = setInterval(() => {
      // settrack_progress(downloadProgress);
      const title = localStorage.getItem("title");
      if (title == null) {
        setdownload_title("");
      } else {
        setdownload_title(title);
      }
    }, 1000); // Change the interval based on your preference (every second in this case)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Simulating the download progress update
  useEffect(() => {
    localStorage.setItem("title", "");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {!track_hide_download && (
        <div className="w-full  sm:flex hidden sm:py-[2vw] sm:gap-[4vw] sm:flex-col">
          {/* first section of the download */}
          <div className="w-full flex justify-between items-center ">
            <p className="neuer text-[3.5vw] text-white ">
              {" "}
              Downloading {download_title}
            </p>
            <p className="neuer text-[3.5vw] text-white ">
              {" "}
              {track_progress} %
            </p>
          </div>

          <div className="w-full h-[2.5vw] overflow-hidden bg-[#2A2A2A] rounded-[2vw] ">
            <div
              className="h-full  bg-[#CCFF00] rounded-[2vw]"
              style={{ transition: "1s ease", width: `${track_progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Mob_download_track;
