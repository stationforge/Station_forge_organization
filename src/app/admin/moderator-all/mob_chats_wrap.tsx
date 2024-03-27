"use client";

import { useEffect, useState } from "react";
import Moderator_header from "./left_header";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";
import Each_moderator from "./each_moderator";
import Each_moderator_preloader from "./all_moderator_preloader";
import Each_chat from "./each_chat";
import Each_chat_preloader from "./each_chat_preloader";

const Mob_All_chats_wrap = ({
  setshow_mobile_chats,
  all_chats_is_loading,
  all_chats_arr,
  moderator_name,
  setadmin_messages_arr,
  setstage,
  settime_date,
  setname,
  setavatar,
}: any) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [allmoderator_is_loading, setallmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  const [move_right, setmove_right] = useState(false);
  const [moderatorData, setmoderatorData] = useState<any>([]);
  // Initialize Firestore
  const db = getFirestore(app);

  const items = ["", "", "", "", "", ""];

  useEffect(() => {
    setmove_right(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div
        className={`fixed h-full  bg-black  ${
          !move_right ? " bg-opacity-[0%]" : " bg-opacity-[80%]"
        }  left-0 sm:flex justify-center items-end  sm:w-full sm:z-[999] hidden cover_scrollbar overflow-hidden `}
        onClick={() => {
          setmove_right(false);
          setTimeout(() => {
            setshow_mobile_chats(false);
          }, 900);
        }}
        style={{ transition: "1.5s ease " }}
      >
        <div
          className={` ${
            move_right ? "left-0" : "left-[-100vw]"
          } fixed h-[20vw] w-full backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black  px-[4vw] bottom-[0vw] flex items-center`}
          style={{ transition: "0.5s ease " }}
        >
          <h2 className="text-white text-[4.4vw] ">{moderator_name} Chats</h2>
        </div>
        <div
          className={`w-full h-[130vw] max-h-[80vh] bg-black   sm:w-full  overflow-y-scroll scroll-container  ${
            move_right ? "translate-y-0" : "translate-y-[180vw]"
          }  `}
          style={{ transition: "1.5s ease " }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* this is the header */}

          <div className="w-full pt-[4vw] justify-center flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[2vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[7vw] sm:mb-[23vw]">
            {all_chats_is_loading
              ? items.map((e: any, index: any) => {
                  return <Each_chat_preloader key={index} />;
                })
              : all_chats_arr.map((e: any, index: any) => {
                  return (
                    <Each_chat
                      key={index}
                      data={e}
                      setstage={setstage}
                      settime_date={settime_date}
                      setadmin_messages_arr={setadmin_messages_arr}
                      setname={setname}
                      setavatar={setavatar}
                    />
                  );
                })}

            {all_chats_arr.length == 0 && (
              <div className="w-full py-[15vw] text-center text-white neuer text-opacity-[50%] text-[4vw]">
                {" "}
                No Messages here{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mob_All_chats_wrap;
