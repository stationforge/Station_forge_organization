"use client";

import { useEffect, useState } from "react";
import Each_chat from "./each_chat";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import Moderator_each_chat_preloader from "./preloader";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const New_chats = ({
  session_id,
  setsession_id,
  moderator_id,
  setstage,
  setuser_data_username,
  setuser_data_avater,
}: any) => {
  const items = ["", "", "", "", "", ""];
  const app = initializeApp(firebaseConfig);
  const [session_data, setsession_data] = useState<any>([]);
  const [session_data_is_loading, setsession_data_is_loading] = useState(true);

  //   the state below is to store the username and avater
  const [username, setusername] = useState("");
  const [avater, setavater] = useState("");

  const db = getFirestore(app); // Initialize your Firestore instance

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create a query for chat sessions where Endedsession is false
        const chatSessionsQuery = query(
          collection(db, "chat_sessions"),
          where("Endedsession", "==", false),
        );

        // Set up the snapshot listener
        const unsubscribe = onSnapshot(chatSessionsQuery, async (snapshot) => {
          const chatSessionsDataPromises = snapshot.docs.map(async (doc) => {
            // Retrieve data from each document
            const data = doc.data();
            const user_id = data.JoinedUserid;

            // Fetch user data using the user_id
            const user_query = query(
              collection(db, "users"),
              where("userid", "==", user_id),
            );
            const user_data = await getDocs(user_query);
            const user = user_data.docs[0].data();
            setusername(user.Username);
            setavater(user.avatar_url);

            // Return an object with combined data
            return {
              id: doc.id,
              ...data,
              user: user,
            };
          });

          // Wait for all promises to resolve
          const chatSessionsData: any = await Promise.all(
            chatSessionsDataPromises,
          );

          // Log the array containing all the data
          //   console.log(chatSessionsData);
          //   setsession_id(chatSessionsData?.id);
          setsession_data(chatSessionsData);
          setsession_data_is_loading(false);

          console.log(chatSessionsData);
        });

        // Return the cleanup function to unsubscribe when the component unmounts
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error("An error occurred", error);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Make sure to include an empty dependency array to run this effect only once

  const update_chat_session = (doc_id: any) => {
    if (doc_id) {
      const user_query = doc(collection(db, "chat_sessions"), doc_id);

      updateDoc(user_query, {
        Joinedmoderatorid: moderator_id,
        isReadByModerator: true,
      })
        .then(() => {
          setsession_id(doc_id);
          setuser_data_avater(avater);
          setuser_data_username(username);
          setstage(1);
        })
        .catch((error) => {
          setstage(0);
          console.log("Error updating document" + error);
        });
    }
  };

  //   const handleChatClick = async (id: any) => {
  //     // Update the isReadByModerator field for all associated messages
  //     const chatQuery = query(
  //       collection(db, "chat_text"),
  //       where("session_chat_id", "==", id),
  //       //   where("isReadByModerator", "==", false),
  //     );

  //     const chatData = await getDocs(chatQuery);

  //     chatData.docs.forEach((doc) => {
  //       if (doc.exists()) {
  //         const chatDocRef = doc(collection(db, "chat_text"), doc.id);
  //         updateDoc(chatDocRef, { isReadByModerator: true });
  //       }
  //     });

  //     // ... (existing code)
  //   };

  return (
    <>
      {" "}
      <div className=" fixed h-full w-[calc(100vw/2.5)]  sm:border-none sm:w-full border-r-white border-opacity-[20%] border-r-[0.14vw] z-[99] bg-black overflow-y-scroll scroll-container">
        <div className="w-full justify-center  flex  sm:gap-[4vw] sm:pb-[5vw]  flex-col px-[3vw] sm:px-[2vw] gap-[1.5vw] pb-[1vw]  mt-[3vw] sm:mt-[15vw]">
          {session_data_is_loading
            ? items.map((e: any, index: any) => {
                return <Moderator_each_chat_preloader key={index} />;
              })
            : session_data.map((e: any, index: any) => {
                return (
                  <Each_chat
                    key={index}
                    data={e}
                    update_chat_session={update_chat_session}
                    moderator_id={moderator_id}
                    setstage={setstage}
                    setsession_id={setsession_id}
                    setuser_data_username={setuser_data_username}
                    setuser_data_avater={setuser_data_avater}
                    // handleChatClick={handleChatClick}
                  />
                );
              })}
        </div>
      </div>
    </>
  );
};

export default New_chats;
