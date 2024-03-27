"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Details_modal = ({ username, e, setshow_modal }: any) => {
  const [copied_username, setcopied_username] = useState(false);
  const [copied_password, setcopied_password] = useState(false);
  const [opacity, setopacity] = useState(false);
  const [password, setpassword] = useState("");
  const [password_text, setpassword_text] = useState("update");
  const [error, seterror] = useState("");

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
  const get_detials = () => {
    if (password.length == 0) {
      setpassword_text("kindly fill new password");
      return;
    }
    setpassword_text("updating");
    seterror("");

    axios
      .post(
        "/api/moderator_info",
        { uid: e, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.error) {
          setpassword_text(" Error");
          seterror(res.data.error.message);
        } else {
          setpassword_text("update completed");
          seterror("");
        }

        // setTimeout(() => {
        //   setpassword_text("update");
        // }, 5000);
      })
      .catch((err) => {
        setpassword_text("some error occurred");
        seterror("Some error occured");

        console.log(err);
      });
  };
  return (
    <>
      <div
        className={`w-full h-[100vh]  fixed top-0 left-0 bg-black z-[99999]  overflow-hidden flex justify-center items-center ${
          !opacity ? "bg-opacity-[0%]" : "bg-opacity-[70%]"
        }  `}
        style={{ transition: "0.5s ease " }}
        // onClick={() => {
        //   setshow_modal(false);
        // }}
      >
        <div className="bg-black">
          <div
            className="w-[30vw] px-[2.5vw]   sm:py-[8vw] rounded-[2vw] sm:rounded-[4vw] py-[2.5vw] bg-[#D9D9D9] bg-opacity-[10%] h-auto sm:w-[95vw] sm:px-[3vw]  z-[5] sm:gap-[5vw] gap-[1.2vw] flex flex-col justify-center"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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
            <p className="text-[red] sm:text-[3.5vw] text-[0.9vw]">{error}</p>
            <div className="w-full h-[4vw]  sm:h-[15vw] ">
              <input
                type="text"
                className="w-full h-full bg-black text-white px-[1vw] sm:px-[4vw] sm:rounded-[3vw] rounded-[0.5vw] text-[1vw] sm:text-[3.5vw] focus:outline-none "
                placeholder="Input new password here "
                onChange={(e) => {
                  setpassword(e.target.value);
                  setpassword_text("update");
                  seterror("");
                }}
              />
            </div>
            <button
              className="w-full h-[3.3vw]  sm:h-[13vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] bg-[#CCFF00] transition duration-[0.2s] hover:bg-[#7e9426] neuem rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center capitalize items-center"
              type="submit"
              onClick={() => {
                get_detials();
              }}
            >
              {password_text}
            </button>
            <button
              className="w-full h-[3.3vw]  sm:h-[13vw] sm:rounded-[4vw] sm:text-[4vw] sm:px-[3vw] border-[#CCFF00] border-[0.1vw] text-white transition duration-[0.2s] hover:bg-[#7e9426] neuer sm:border-[0.5vw] rounded-[1.1vw] mt-[0.2vw] text-[1.06vw] flex justify-center items-center"
              type="submit"
              onClick={() => {
                setshow_modal(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
        {/* Background images */}
      </div>
    </>
  );
};

export default Details_modal;
