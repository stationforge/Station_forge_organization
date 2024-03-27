"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Moderator_info = ({ username, password, setstage }: any) => {
  const [copied_username, setcopied_username] = useState(false);
  const [copied_password, setcopied_password] = useState(false);
  const [opacity, setopacity] = useState(false);

  const copyToClipboard = async (text: string, num: number) => {
    try {
      await navigator.clipboard.writeText(text);
      if (num == 1) {
        setcopied_username(true);
      } else if (num == 2) {
        setcopied_password(true);
      }
    } catch (err) {}
  };

  //   this is for copyig username
  useEffect(() => {
    if (copied_username) {
      setTimeout(() => {
        setcopied_username(false);
      }, 1000);
    }
  }, [copied_username]);

  //   this is for copying password
  useEffect(() => {
    if (copied_password) {
      setTimeout(() => {
        setcopied_password(false);
      }, 1000);
    }
  }, [copied_password]);

  useEffect(() => {
    setopacity(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={`w-full h-[100vh] bg-black relative overflow-hidden flex justify-center items-center ${
          !opacity ? "opacity-[0%]" : "opacity-[100%]"
        }  `}
        style={{ transition: "2s ease " }}
      >
        <div className="w-[30vw] px-[2.5vw] sm:px-[4vw] sm:py-[8vw] rounded-[2vw] sm:rounded-[4vw] py-[2.5vw] bg-[#D9D9D9] bg-opacity-[10%] h-auto sm:w-[95vw] sm:px-[3vw]  z-[5] sm:gap-[5vw] gap-[1.2vw] flex flex-col justify-center">
          <h2 className="text-white text-[1.3vw] sm:text-[4vw] neuer text-center">
            Moderator account created
          </h2>

          <div className="w-full  flex justify-between h-auto  text-[1.1vw] sm:text-[3.5vw]">
            <p className=" text-white text-opacity-[50%] flex gap-[1vw] sm:gap-[3vw] items-center">
              Username{" "}
              <span className="text-white text-opacity-[100%] text-[1vw] sm:text-[3.2vw]">
                {username}
              </span>
            </p>
            {copied_username ? (
              <p className="text-white text-[0.9vw] text-opacity-[70%] sm:text-[3vw]">
                copied
              </p>
            ) : (
              <i
                className=" text-white cursor-pointer bi bi-copy"
                onClick={() => {
                  copyToClipboard(username, 1);
                }}
              ></i>
            )}
          </div>

          <div className="w-full  flex justify-between h-auto  text-[1.1vw] sm:text-[3.5vw]">
            <p className=" text-white text-opacity-[50%] flex gap-[1vw] sm:gap-[3vw] items-center">
              Password{" "}
              <span className="text-white text-opacity-[100%] text-[1vw] sm:text-[3.2vw]">
                {password}
              </span>
            </p>
            {copied_password ? (
              <p className="text-white text-[0.9vw] text-opacity-[70%] sm:text-[3vw]">
                copied
              </p>
            ) : (
              <i
                className=" text-white cursor-pointer bi bi-copy"
                onClick={() => {
                  copyToClipboard(password, 2);
                }}
              ></i>
            )}
          </div>
          <Link
            href={"/admin/chats"}
            className="w-full h-[3.3vw]  sm:h-[13vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center"
          >
            Back to messages
          </Link>
          <button
            className="w-full h-[3.3vw]  sm:h-[13vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center"
            type="submit"
            onClick={() => {
              setstage(1);
            }}
          >
            Add more moderators
          </button>
        </div>
        {/* Background images */}
      </div>
    </>
  );
};

export default Moderator_info;
