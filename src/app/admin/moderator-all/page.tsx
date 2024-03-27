"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import {
  Timestamp,
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
import Add_moderator_header from "@/app/admin_general_component/add_moderator_header";
import axios from "axios";
import All_moderator_wrap from "./all_moderator_wrap";
import All_chats_wrap from "./chats_wrap";
import Mob_All_chats_wrap from "./mob_chats_wrap";
import Admin_Chats_modal from "./chats";
import Link from "next/link";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [moderator_is_loading, setmoderator_is_loading] = useState(true);
  const [moderator_size, setmoderator_size] = useState(0);
  const [all_chats_arr, setall_chats_arr] = useState<any>([]);
  const [all_chats_is_loading, setall_chats_is_loading] = useState(true);
  const [show_mobile_chats, setshow_mobile_chats] = useState(false);
  const [admin_messages_arr, setadmin_messages_arr] = useState<any>([]);
  const [moderator_name, setmoderator_name] = useState("");
  const [time_date, settime_date] = useState("Date");
  const [name, setname] = useState("");
  const [avatar, setavatar] = useState("");

  const [stage, setstage] = useState(1);

  useEffect(() => {
    // setpage_loader(false);
    setfrom("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const auth: any = getAuth();
  const route = useRouter();
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    setpage_loader(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));
        const moderators_query = query(
          user_ref,
          where("role", "==", "moderator"),
        );

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;
              if (snap == "admin") {
                setshowdash(true);
                setpage_loader(false);
                // getDocs(moderators_query).then((res) => {
                //   setmoderator_is_loading(false);
                //   setmoderator_size(res.size);
                // });

                const unsubscribeModerators = onSnapshot(
                  moderators_query,
                  (snapshot) => {
                    setmoderator_is_loading(false);
                    setmoderator_size(snapshot.size);
                  },
                );

                return () => unsubscribeModerators();
              } else {
                setshowdash(false);
                route.push("/");
              }
            } else {
              setshowdash(false);
              route.push("/");
            }
          })
          .catch(() => {
            console.log("error while getting user");
          });
      } else {
        setpage_loader(false);
        setpage_loader(true);
        route.push("/"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchData = async (all_chats_arr: any) => {
    try {
      setall_chats_is_loading(true);
      const chatSessionsData = await Promise.all(
        all_chats_arr.map(async (chatSessionId: any) => {
          // console.log(chatSessionId);
          const chatSessionDocRef = doc(
            collection(db, "chat_sessions"),
            chatSessionId,
          );
          const chatSessionDoc = await getDoc(chatSessionDocRef);
          return chatSessionDoc.data();
        }),
      );

      // 2. Fetch user data for each chat session
      const userDataPromises = chatSessionsData.map(async (chatSession) => {
        console.log("don22se");
        // console.log(chatSession);
        const userDocRef = query(
          collection(db, "users"),
          where("userid", "==", chatSession?.JoinedUserid),
        );
        // const userDocRef = doc(
        //   collection(db, "users"),
        //   chatSession?.JoinedUserid,
        // );
        console.log("done");

        const userDoc = await getDocs(userDocRef);

        const userData = await userDoc.docs.map((e) => {
          return e.data();
        });
        return userData;
      });

      // 3. Fetch chat text data for each chat session
      const chatTextPromises = all_chats_arr.map(async (chatSession: any) => {
        console.log(chatSession);
        const chatTextQuery = query(
          collection(db, "chat_text"),
          where("session_chat_id", "==", chatSession),
          orderBy("createdAt", "asc"),
        );
        const chatTextSnapshot = await getDocs(chatTextQuery);
        const chatTextData = chatTextSnapshot.docs.map((doc) => doc.data());
        return chatTextData;
      });

      const [userData, chatTextData] = await Promise.all([
        Promise.all(userDataPromises),
        Promise.all(chatTextPromises),
      ]);

      // Combine all data for each chat session
      const finalChatSessionData = all_chats_arr.map((id: any, index: any) => ({
        chatSessionId: id,
        chatSessionData: chatSessionsData[index],
        userData: userData[index],
        chatTextData: chatTextData[index],
      }));

      // Log the result
      console.log(finalChatSessionData);
      setall_chats_arr(finalChatSessionData);
      setall_chats_is_loading(false);

      // Set the state with the fetched data
      // setChatSessionData(finalChatSessionData);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {stage > 0 && (
            <All_moderator_wrap
              setstage={setstage}
              setshow_mobile_chats={setshow_mobile_chats}
              fetchData={fetchData}
              setmoderator_name={setmoderator_name}
            />
          )}
          {stage > 1 && (
            <All_chats_wrap
              setstage={setstage}
              all_chats_arr={all_chats_arr}
              setadmin_messages_arr={setadmin_messages_arr}
              all_chats_is_loading={all_chats_is_loading}
              moderator_name={moderator_name}
              settime_date={settime_date}
              setname={setname}
              setavatar={setavatar}
            />
          )}
          {show_mobile_chats && (
            <Mob_All_chats_wrap
              setshow_mobile_chats={setshow_mobile_chats}
              setstage={setstage}
              all_chats_arr={all_chats_arr}
              setadmin_messages_arr={setadmin_messages_arr}
              all_chats_is_loading={all_chats_is_loading}
              moderator_name={moderator_name}
              settime_date={settime_date}
              setname={setname}
              setavatar={setavatar}
            />
          )}
          {stage > 2 && (
            <Admin_Chats_modal
              setstage={setstage}
              admin_messages_arr={admin_messages_arr}
              time_date={time_date}
              name={name}
              avatar={avatar}
            />
          )}
          <Link
            href="/admin/add-moderator"
            onClick={() => {
              setpage_loader(true);
            }}
            className="bg-[#CCFF00] sm:hidden fixed top-[1vw] right-[2vw] cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center text-[1vw] rounded-[1vw] h-[2.8vw] w-[10vw]"
          >
            Add Moderators
          </Link>
        </>
      ) : null}
    </>
  );
}
