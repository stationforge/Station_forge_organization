"use client";

import React, { useEffect, useRef, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import { initializeApp } from "firebase/app";
import exit_modal from "../../../public/mob_ham_exit.webp";
import firebaseConfig from "../utils/fire_base_config";
import station_forge from "../../../public/chats/station_forge.webp";
import avatar from "../../../public/setings/avatar.jpg";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { fromUnixTime } from "date-fns";
import format from "date-fns/format";
import axios from "axios";
import Is_typing from "./typing";

const Chats_modal = () => {
  const [loading, setloading] = useState(false);
  const [btn_disabled, setbtn_disabled] = useState(false);
  const [create_new_sess, setcreate_new_sess] = useState(true);
  const [show_end_and_start_btn, setshow_end_and_start_btn] = useState(false);

  const [time_date, settime_date] = useState("Date");
  const [chat_session_id, setchat_session_id] = useState("");
  const [moderator_name, setmoderator_name] = useState("");
  const [moderator_avater, setmoderator_avater] = useState("");
  const [mod_is_typing, setmod_is_typing] = useState(false);
  const [chat_text, setchat_text] = useState("");
  const [chat_data_arr, setchat_data_arr] = useState<any>([]);

  const [userIsTyping, setuserIsTyping] = useState(false);

  // profile context
  const { setnew_message, update_message_notification }: any =
    useProfile_Context();

  // Explicitly define the type for useRef
  const new_session = useRef<any>(false);
  const {
    show_chat_modal,
    setshow_chat_modal,
    sess_id,
    create_chat_session,
  }: any = useProfile_Context();
  const [hide, sethide] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  // const chats = [
  //   {
  //     msg: "Hi good afternoon i would love to enquire about forges",
  //     user: true,
  //   },
  //   {
  //     msg: "Hello",
  //     user: false,
  //   },
  //   {
  //     msg: "Thank you for using station forge",
  //     user: false,
  //   },
  //   {
  //     msg: "Hi good afternoon i would love to enquire about forges",
  //     user: true,
  //   },
  //   {
  //     msg: "Hello",
  //     user: false,
  //   },
  //   {
  //     msg: "Thank you for using station forge",
  //     user: false,
  //   },
  //   {
  //     msg: "Hi good afternoon i would love to enquire about forges",
  //     user: true,
  //   },
  //   {
  //     msg: "Hello",
  //     user: false,
  //   },
  //   {
  //     msg: "Thank you for using station forge",
  //     user: false,
  //   },
  // ];

  const [uuid, setuuid] = useState("");
  // useEffect(() => {
  //   setconfirm_ImageWasChanged(ImageWasChanged);
  // }, [ImageWasChanged]);
  const ref_modal = useRef<any>(null);

  const router = useRouter();

  // firebase init

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Initialize services

  // get authentication
  const auth: any = getAuth();

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
        // User is authenticated, redirect to a protected route
        // Replace with your protected route
      } else {
        // User is not authenticated, you can keep them on the current page or redirect them to a login page
        router.push("/login");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   function handleClickOutside(event: any) {
  //     console.log(event.target, ref_modal.current);
  //     if (event.target.classList.contains("chats")) {
  //       console.log("this is tracking");
  //       console.log(ref_modal.current);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const show_test_funtion = async () => {
    const moderator_ref = collection(db, "users");
    const q = query(
      moderator_ref,
      where("role", "==", "moderator"),
      where("role", "==", "admin"),
    );
    const users_ref = collection(db, "users");
    const user_q = query(users_ref, where("userid", "==", currentUserUid));
    const querySnapshot = await getDocs(q);
    const user_snapshot = await getDocs(user_q);

    const moderatorUsers: any = [];
    querySnapshot.forEach((doc) => {
      moderatorUsers.push(doc.data().Email);
    });

    const name = user_snapshot.docs[0].data().Username;

    // console.log(moderatorUsers);

    // // make the post request to send emails to all moderators and admins
    // let data = JSON.stringify({
    //   user_id: currentUserUid,
    // });
    axios
      .post(
        "/api/contact",
        { email: moderatorUsers, name: name },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const currentUserUid = auth.currentUser?.uid;

  const create_new_session = () => {
    const chatSessionsRef = collection(db, "chat_sessions");
    const chatTextref = collection(db, "chat_text");
    if (new_session.current) {
      return;
    }
    addDoc(chatSessionsRef, {
      Endedsession: false,
      JoinedUserid: currentUserUid,
      SessioncreatedAt: serverTimestamp(),
      Moderator_is_typing: false,
      Joinedmoderatorid: "",
    })
      .then((doc) => {
        setshow_end_and_start_btn(true);
        setmoderator_avater("");
        setmoderator_name("");

        // // make the post request to send emails to all moderators and admins
        show_test_funtion();

        addDoc(chatTextref, {
          createdAt: serverTimestamp(),
          from: "moderator",
          message:
            "Hello , how can we help you today. Please allow for sometime our customer support would be with you in a moment ",
          session_chat_id: doc.id,
        })
          .then(() => {
            setchat_session_id(doc.id);
            update_message_notification();
            setbtn_disabled(false);
          })
          .catch((err) => {
            console.log("error whie creating new text" + err);
          });
      })
      .catch((err) => {
        console.log("Error creating a new chat session " + err);
      });
  };

  useEffect(() => {
    if (!currentUserUid) {
      // No user is authenticated, you might want to handle this case
      return;
    }

    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionsQuery = query(
      chatSessionsRef,
      where("JoinedUserid", "==", currentUserUid),
      where("Endedsession", "==", false),
    );

    const unsubscribe = onSnapshot(chatSessionsQuery, (snapshot) => {
      if (snapshot.empty) {
        // Handle case when there are no documents

        create_new_session();

        return;
      }

      snapshot.forEach(async (doc) => {
        // Handle each document
        const chatSessionData = doc.data();
        console.log("this is what i jus", chatSessionData.Moderator_is_typing);
        setmod_is_typing(chatSessionData.Moderator_is_typing);
        setchat_session_id(doc.id);
        setshow_end_and_start_btn(true);
        // Convert Firebase Timestamp to JavaScript Date

        // // Assuming your timestamp field is named 'SessioncreatedAt'
        // !chatSessionData.isReadByUser
        //   ? update_message_notification()
        //   : setnew_message(false);

        const timestampValue = doc.data().SessioncreatedAt;
        if (timestampValue) {
          // Convert Firebase Timestamp to JavaScript Date
          const date = fromUnixTime(timestampValue?.seconds);

          // Format the date using date-fns
          const formattedDate = format(date, "d MMMM, yyyy "); // Customize the format as needed

          settime_date(formattedDate);
        }

        scrollToBottom();
        const _moderator_id = snapshot.docs[0].data().Joinedmoderatorid;
        if (_moderator_id) {
          // Fetch user data using the user_id
          const user_query = query(
            collection(db, "users"),
            where("userid", "==", _moderator_id),
          );
          const user_data = await getDocs(user_query);
          const user = user_data.docs[0].data();
          setmoderator_avater(user.avatar_url);
          setmoderator_name(user.Username);
        }
      });
    });

    return () => {
      // Unsubscribe when the component unmounts
      unsubscribe();
    };
  }, [currentUserUid]); // Dependency on currentUserUid, so it re-subscribes when the user logs in or out

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollHeight = scrollAreaRef.current.scrollHeight;
      scrollAreaRef.current.scrollTo({
        top: scrollHeight,
        behavior: "smooth",
      });
    }
  };
  const handlesubmit = (e: any) => {
    e.preventDefault();
    setbtn_disabled(true);
    setchat_text("");
    setbtn_disabled(false);
    scrollToBottom();
    if (chat_text.length > 0 && chat_session_id) {
      const chatTextref = collection(db, "chat_text");

      addDoc(chatTextref, {
        createdAt: serverTimestamp(),
        from: "user",
        message: chat_text,
        session_chat_id: chat_session_id,
      })
        .then(() => {
          // setchat_session_id(doc.id);
          update_moderator_is_typing(false);

          // setchat_text("");
          setbtn_disabled(false);
          scrollToBottom();
          update_chat_session();
        })
        .catch((err) => {
          console.log("error whie creating new text" + err);
          setbtn_disabled(false);
        });
    }
  };

  const update_chat_session = () => {
    if (chat_session_id) {
      const user_query = doc(collection(db, "chat_sessions"), chat_session_id);

      updateDoc(user_query, {
        isReadByModerator: false,
      })
        .then(() => {})
        .catch((error) => {
          console.log("Error updating document" + error);
        });
    }
  };

  useEffect(() => {
    if (chat_session_id) {
      const chatTextRef = collection(db, "chat_text");
      const chatTextQuery = query(
        chatTextRef,
        where("session_chat_id", "==", chat_session_id),
        orderBy("createdAt", "asc"),
      );

      const unsubscribe = onSnapshot(chatTextQuery, (snapshot) => {
        if (snapshot.empty) {
          // Handle case when there are no documents
          //  create_new_session();
          return;
        }

        const chatTextDataArray: any = [];
        snapshot.forEach((doc) => {
          // Handle each document
          const chatTextData = doc.data();
          chatTextDataArray.push({
            chatTextId: doc.id,
            chatTextData: chatTextData,
          });
        });
        setchat_data_arr(chatTextDataArray);

        setTimeout(() => {
          scrollToBottom();
          update_reading_status();
        }, 1000);

        // console.log(chatTextDataArray);
      });
      return () => {
        // Unsubscribe when the component unmounts
        unsubscribe();
      };
    }
  }, [chat_session_id]); // Dependency on chatid, so it re-subscribes when chatid changes

  const update_reading_status = () => {
    if (chat_session_id) {
      const user_query = doc(collection(db, "chat_sessions"), chat_session_id);
      updateDoc(user_query, {
        isNotReadByUser: false,
      });
    }
  };

  const updateChatSessionEndedStatus = async () => {
    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionDocRef = doc(chatSessionsRef, chat_session_id);
    setcreate_new_sess(false);
    try {
      await updateDoc(chatSessionDocRef, {
        Endedsession: true,
      });
      setchat_text("");
      setchat_session_id("");
      setcreate_new_sess(false);
      setmoderator_avater("");
      setmoderator_name("");
      setbtn_disabled(true);
    } catch (error) {
      console.error("Error updating chat session:", error);
      // Handle the error according to your requirements
    }
  };
  useEffect(() => {
    sethide(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update_moderator_is_typing = async (e: any) => {
    const chatSessionsRef = collection(db, "chat_sessions");
    const chatSessionDocRef = doc(chatSessionsRef, chat_session_id);
    await updateDoc(chatSessionDocRef, {
      User_is_typing: e,
    });
  };

  const resetTypingStatus = () => {
    setuserIsTyping(false);
    update_moderator_is_typing(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(resetTypingStatus, 3000); // Adjust the delay as needed (e.g., 3000 milliseconds)
    return () => clearTimeout(timeoutId);
  }, [userIsTyping]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      <div
        className={`w-full fixed top-0 left-0 h-full z-[9999] bg-black ${
          hide ? "bg-opacity-[0%]" : "bg-opacity-[70%] "
        } `}
        style={{ transition: "1.2s ease" }}
        onClick={() => {
          sethide(true);
          setTimeout(() => {
            setshow_chat_modal(false);
          }, 700);
        }}
      >
        <div
          className={`w-[33vw] chats sm:max-h-[100vh] sm:h-full sm:w-full fixed pt-[6.5vw] sm:pt-[25vw] pb-[6vw] rounded-l-[1vw]   h-[96vh] max-h-[96vh]  sm:py-[5vw] px-[1.5vw]  top-[50%] translate-y-[-50%]  z-[999]   sm:gap-[4vw]  bg-[#111111] settings flex flex-col gap-[1.5vw] border-[#434343] overflow-hidden ${
            hide ? "right-[-50vw] sm:right-[-110vw]" : "right-0 sm:right-0"
          } border transition duration-[1.5s]`}
          ref={ref_modal}
          style={{ transition: "1.5s ease" }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {/* this is for the top relative box  */}
          <div className="w-full fixed top-0 left-0 h-[5.5vw] bg-[#1F1E1E]  sm:h-[22vw]  bg-opacity-[50%] flex justify-start items-center neuer px-[1.3vw] gap-[1vw]  sm:px-[2vw] border-b-[0.2vw] border-white border-opacity-[60%]">
            <div className="w-full flex gap-[1vw] h-full items-center sm:gap-[3vw]">
              <i
                className="bi bi-chevron-left cursor-pointer text-white text-[1.2vw] sm:text-[6vw]"
                onClick={() => {
                  sethide(true);
                  setTimeout(() => {
                    setshow_chat_modal(false);
                  }, 1000);
                }}
              ></i>

              <div
                className=" h-[3.2vw] w-[3.2vw] sm:h-[10vw] overflow-hidden sm:w-[10vw] rounded-[100%] avater_bg"
                style={{ backgroundImage: "url(/chats/station_forge.webp)" }}
              >
                {" "}
                {moderator_avater && (
                  <Image
                    unoptimized
                    width="0"
                    height="0"
                    src={moderator_avater}
                    alt={moderator_name}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/*the name of the moderator for now its  talk to support */}
              <div className="w-fit  flex-col flex gap-[0.5vw] sm:gap-[1.2vw] ">
                <p className="text-[1vw] text-white sm:text-[4vw] ">
                  {moderator_name ? `${moderator_name} ` : "Talk to support"}
                </p>
                <p className="text-[0.8vw]  text-white  sm:text-[3vw] italic text-opacity-[50%]">
                  {moderator_name ? "Online" : "24/7 Support line"}
                </p>
              </div>
            </div>

            {show_end_and_start_btn && (
              <button
                className="sm:w-[30vw] w-[10vw] h-[3vw] rounded-[1vw] hover:bg-opacity-[30%] bg-black text-white text-[1vw] sm:text-[3vw] sm:h-[10vw] sm:rounded-[3vw]  neuer   "
                style={{
                  backgroundColor: chat_session_id.length ? "black" : "#CCFF00",
                  color: chat_session_id.length ? "white" : "black",
                }}
                onClick={() => {
                  if (!chat_session_id.length) {
                    new_session.current = false;
                    create_new_session();
                  } else {
                    new_session.current = true;
                    setcreate_new_sess(false);
                    updateChatSessionEndedStatus();
                  }
                }}
              >
                {chat_session_id.length ? "End session" : "Start chat"}
              </button>
            )}
          </div>

          {/* this is for the bottom input for sending messages relative box  */}
          <div className="w-full h-[5.5vw] sm:h-[20vw] sm:bg-opacity-[100%]  fixed bottom-0 neuer left-0 bg-[#1F1E1E] rounded-t-[1.7vw]  bg-opacity-[50%] flex justify-center items-center px-[1.3vw]  ">
            <form
              onSubmit={handlesubmit}
              className="h-[3.2vw] sm:h-[13vw]   w-full relative "
            >
              <input
                type="text"
                placeholder="Type text here"
                className="w-full h-full pl-[1vw] sm:pl-[3vw] sm:pr-[19vw] pr-[5vw] sm:rounded-[6vw] text-white text-opacity-[85%] text-[1vw] sm:text-[3.5vw] bg-[#2C2C2C] bg-opacity-[56%] outline-none border-[0.14vw]  border-opacity-[30%] focus:border-opacity-[70%] border-white transition duration-[0.6s] rounded-[2vw]"
                onChange={(e) => {
                  setchat_text(e.target.value);
                  setbtn_disabled(false);
                  update_moderator_is_typing(true);
                  setuserIsTyping(true);
                }}
                value={chat_text || ""}
              />

              <div className="absolute  flex items-center h-full right-[1vw] sm:right-[2vw] top-[50%] translate-y-[-50%]">
                <button
                  type="submit"
                  disabled={btn_disabled}
                  className="  hover:bg-opacity-[80%] bg-[#CCFF00] px-[1vw] text-[0.9vw] py-[0.4vw] rounded-[2vw]  sm:text-[3.5vw] sm:px-[4vw] sm:py-[2vw] sm:rounded-[6vw] "
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          {/* the date teh chat started  */}

          {/* this is for the chats */}
          <div
            className="w-full flex  overflow-y-scroll cover_scrollbar flex-col sm:px-[2vw] pb-[1vw] sm:pb-[18vw] sm:gap-[4vw] h-full gap-[0.6vw] "
            ref={scrollAreaRef}
          >
            <div className="w-full flex justify-center h-[2vw] sm:h-[9vw]  neuer">
              <p className="text-white text-[0.9vw] h-full px-[1vw] py-[0.4vw] border-white border-[0.1vw] flex items-center rounded-[2vw] border-opacity-[50%] sm:text-[4vw]  sm:px-[5vw] sm:rounded-[4vw] ">
                {time_date}
              </p>
            </div>
            {chat_data_arr.map((e: any, index: any) => {
              return (
                <div
                  className={`w-full flex   ${
                    e.chatTextData.from != "user"
                      ? "justify-start"
                      : "justify-end"
                  }  h-auto bg-white"`}
                  key={index}
                >
                  <div
                    className={`w-fit rounded-[1vw] text-[0.8vw] sm:text-[3vw] sm:max-w-[41vw] sm:py-[1.5vw] sm:px-[2vw] sm:rounded-[2.5vw] py-[0.7vw] px-[0.8vw]  max-w-[12vw] h-auto border-[0.1vw] ${
                      e.chatTextData.from != "user"
                        ? "border-white border-opacity-[50%] text-white"
                        : "border-[#CCFF00] bg-[#CCFF00] text-black "
                    }  h-[2vw]`}
                  >
                    <p className={` `}>{e.chatTextData.message}</p>
                  </div>
                </div>
              );
            })}

            <div className="">{mod_is_typing && <Is_typing />}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chats_modal;
