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

const All_chats_wrap = ({
  all_chats_is_loading,
  all_chats_arr,
  moderator_name,
  setstage,
  setadmin_messages_arr,
  settime_date,
  setname,
  setavatar,
}: any) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [move_right, setmove_right] = useState(false);
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
        className={`fixed h-full w-[calc(100vw/3)] left-[calc(100vw/3)] sm:hidden cover_scrollbar overflow-hidden ${
          move_right ? "translate-x-0" : "translate-x-[calc(-100vw/3)]"
        } `}
        style={{ transition: "1.5s ease " }}
      >
        <div className="w-full h-full sm:border-none sm:w-full border-r-white overflow-y-scroll scroll-container border-opacity-[20%] border-r-[0.14vw]  sm:hidden">
          {/* this is the header */}
          <div
            className={` ${
              move_right ? "left-0" : "left-[calc(-100vw/3)]"
            } fixed h-[6vw] w-[calc(100vw/3.05)] backdrop-blur-[14px] bg-opacity-[30%] z-[99999] bg-black  pl-[2vw] top-0 flex items-center`}
            style={{ transition: "1.2s ease " }}
          >
            <h2 className="text-white text-[1.4vw] ">{moderator_name} Chats</h2>
          </div>
          <div className="w-full justify-center flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[2vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[7vw] sm:mt-[21vw]">
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
                      setadmin_messages_arr={setadmin_messages_arr}
                      settime_date={settime_date}
                      setname={setname}
                      setavatar={setavatar}
                    />
                  );
                })}

            {all_chats_arr.length == 0 && (
              <div className="w-full py-[5vw] text-center text-white neuer text-opacity-[50%] text-[1vw]">
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

export default All_chats_wrap;
