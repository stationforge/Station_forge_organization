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
import Details_modal from "./details_modal";

const All_moderator_wrap = ({
  setstage,
  setshow_mobile_chats,
  fetchData,
  setmoderator_name,
}: any) => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [allmoderator_is_loading, setallmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  const [moderatorData, setmoderatorData] = useState<any>([]);
  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      const userRef = collection(db, "users");
      const chatSessionsRef = collection(db, "chat_sessions");

      try {
        const moderatorsQuery = query(
          userRef,
          where("role", "==", "moderator"),
          orderBy("createdAt", "desc"),
        );
        const moderatorsSnapshot = await getDocs(moderatorsQuery);
        setmoderator_is_loading(false);
        setmoderator_size(moderatorsSnapshot.size);

        const moderatorPromises = moderatorsSnapshot.docs.map(async (doc) => {
          const moderator = doc.data();
          const chatSessionsQuery = query(
            chatSessionsRef,
            where("Joinedmoderatorid", "==", moderator.userid),
          );
          const chatSessionsSnapshot = await getDocs(chatSessionsQuery);
          const chatSessionIds = chatSessionsSnapshot.docs.map((doc) => doc.id);

          return {
            moderator,
            chatSessionIds,
          };
        });

        const allModeratorData = await Promise.all(moderatorPromises);
        setallmoderator_is_loading(false);
        setmoderatorData(allModeratorData);
        console.log(allModeratorData);
      } catch (error) {
        console.log("An error occurred", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items = ["", "", "", "", "", ""];

  const [show_modal, setshow_modal] = useState(false);
  const [username, setusername] = useState("");
  const [id, setid] = useState("");
  const get_detials = (username: any, id: any) => {
    setusername(username);
    setid(id);
    setshow_modal(true);
  };
  return (
    <>
      <div className=" fixed h-full w-[calc(100vw/3)] sm:border-none sm:w-full border-r-white border-opacity-[20%] border-r-[0.14vw] z-[99] bg-black overflow-y-scroll scroll-container">
        {/* this is the header */}
        <Moderator_header
          moderator_size={moderator_size}
          moderator_is_loading={moderator_is_loading}
        />
        <div className="w-full justify-center flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[1vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[7vw] sm:mt-[21vw]">
          {allmoderator_is_loading
            ? items.map((e: any, index: any) => {
                return <Each_moderator_preloader key={index} />;
              })
            : moderatorData.map((e: any, index: any) => {
                return (
                  <Each_moderator
                    key={index}
                    data={e}
                    setstage={setstage}
                    setshow_mobile_chats={setshow_mobile_chats}
                    fetchData={fetchData}
                    setmoderator_name={setmoderator_name}
                    show_modal={show_modal}
                    setshow_modal={setshow_modal}
                    get_detials={get_detials}
                  />
                );
              })}
        </div>
      </div>

      {show_modal && (
        <Details_modal
          username={username}
          e={id}
          setshow_modal={setshow_modal}
        />
      )}
    </>
  );
};

export default All_moderator_wrap;
