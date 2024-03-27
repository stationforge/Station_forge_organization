"use client ";

import React, { useState, useEffect } from "react";
import Each_subscriber from "./each_subscriber";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { format } from "date-fns";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Sub_user_profile from "@/app/admin_general_component/sub_user_profile";
// import Subscription_statistics from "./sub_statistics";
// import Each_subscriber_loadeer from "./each_sub_loader";
import Display_forge_modal from "@/app/admin_general_component/forge_display";
import New_Each_subscriber from "./each_subscriber";
import New_Each_subscriber_loadeer from "./new_subscripton_loader";
const New_Subscribers_wrap = ({
  setall_subscribers_in_dashboard,
  setall_subscribers_is_loading,
}: any) => {
  const subscribe_filter = [
    {
      step: 0,
      msg: "All ",
    },
    {
      step: 3,
      msg: "Standard ",
    },
    {
      step: 4,
      msg: "Merchant ",
    },
  ];

  const user_loading_loader = ["", "", "", "", ""];
  const [allusers, setallusers] = useState<any>([]);
  const [allusers_copy, setallusers_copy] = useState<any>([]);
  const [custom_all_libary_arr, setcustom_all_libary_arr] = useState<any>([]);
  const [allusers_loading, setallusers_loading] = useState<any>(true);
  const [hide_display_forge_modal, sethide_display_forge_modal] =
    useState<any>(true);
  const [forge_modal_heading, setforge_modal_heading] = useState<any>(
    "All forges downloaded",
  );
  const [hideProfile, sethideProfile] = useState(true);
  const [selected_filer, setselected_filer] = useState(0);
  const [selected_fiter_text, setselected_fiter_text] = useState("Users");
  const [subscriber_stats, setsubscriber_stats] = useState({});
  const [subscriber_stats_is_loading, setsubscriber_stats_is_loading] =
    useState(true);
  const [uuid, setuuid] = useState("");
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Get all documents from the 'users' collection
        const usersCollectionRef = collection(db, "users");
        // const user_query = query(
        //   usersCollectionRef,
        //   where("role", "==", "moderator"),
        //   orderBy("createdAt", "desc"),
        // );
        // Calculate the timestamp for 2 weeks ago
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 20);
        const twoWeeksAgoTimestamp = Timestamp.fromDate(twoWeeksAgo);

        // Query users who subscribed about 2 weeks ago
        const userSpecificQuery = query(
          usersCollectionRef,
          where("subscribedAt", ">=", twoWeeksAgoTimestamp),
          orderBy("subscribedAt", "desc"),
        );

        const usersSnapshot = await getDocs(userSpecificQuery);
        setall_subscribers_in_dashboard(usersSnapshot.size);
        setall_subscribers_is_loading(false);
        const userPromises: any = [];

        usersSnapshot.forEach((userDoc) => {
          const data = userDoc.data();
          const userId = data.userid;
          const avater = data.avatar_url;
          const username = data.Username;
          const name = data.name;
          const step = data.step;
          const createdAt = data.createdAt;
          const subscribedAt = data.subscribedAt;
          const timestampFromFirebase = new Date(createdAt.toMillis()); // Convert to JavaScript Date object

          const formattedDate = format(timestampFromFirebase, "do MMMM yyyy");

          // Step 2: Get documents from the 'library' collection where userId matches and downloaded is true
          const libraryCollectionRef = collection(db, "libray");
          const libraryQuery = query(
            libraryCollectionRef,
            where("userid", "==", userId),
            where("downloaded", "==", true),
          );

          const libraryPromise = getDocs(libraryQuery).then(
            (librarySnapshot) => {
              const libraryData = librarySnapshot.docs.map(
                (doc) => doc.data().productid,
              );
              return {
                userId,
                avater,
                username,
                name,
                formattedDate,
                libraryData,
                step,
                subscribedAt,
              };
            },
          );

          userPromises.push(libraryPromise);
        });

        // Step 3: Wait for all library promises to resolve
        const results = await Promise.all(userPromises);

        // Step 4: Log the results
        // console.log("Results:", results);
        setallusers(results);
        setallusers_copy(results);
        setallusers_loading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  // useEffect to filter and log the desired results when allusers state changes
  useEffect(() => {
    const filterAndLogResults = () => {
      if (!allusers || allusers.length === 0) {
        return;
      }

      // Step 1: Filter users with step === 3
      const step3Users = allusers.filter((user: any) => user.step === 3);

      // Step 2: Filter users with step === 4
      const step4Users = allusers.filter((user: any) => user.step === 4);

      // Step 3: Create the final object
      const resultObject = {
        "Standard ": step3Users.length,
        "Premium ": step4Users.length,
      };

      setsubscriber_stats(resultObject);
      setsubscriber_stats_is_loading(false);
      // Step 4: Log the final result
    };

    // Call the filterAndLogResults function when allusers state changes
    filterAndLogResults();
  }, [allusers]); // Include allusers as a dependency to trigger the effect when it changes

  const showuser_profile = (e: string) => {
    setuuid(e);
    sethideProfile(false);
    // sethideProfile(false);
  };

  const filter_subscribers = (e: number) => {
    if (e == 0) {
      setallusers_copy(allusers);
    } else {
      const filter_users = allusers.filter((user: any) => user.step === e);
      setallusers_copy(filter_users);
    }
  };
  return (
    <>
      {!hideProfile && (
        <Sub_user_profile uuid={uuid} sethideProfile={sethideProfile} />
      )}

      {!hide_display_forge_modal && (
        <Display_forge_modal
          arr_data={custom_all_libary_arr}
          sethide_display_forge_modal={sethide_display_forge_modal}
          forge_modal_heading={forge_modal_heading}
        />
      )}
      <div className="w-full   sm:pb-[8vw] sm:pt-[5vw]  sm:rounded-[4vw] pt-[1vw]  pb-[3vw] px-[1.5vw]    rounded-[2vw] bg-white flex-col">
        {/* this is for the mini header on here */}
        <div className="w-full sm:flex-col sm:gap-[3vw] sm:items-start pt-[1vw] pb-[2vw] h-auto gap-[1.5vw] flex justify-start items-center">
          <h1 className="neuem text-[1.6vw]  sm:text-[5vw] ">
            All New Subscribers{" "}
            <span className="text-[0.8vw] text-black text-opacity-[50%] sm:text-[2.5vw]">
              in the last 14 days
            </span>
          </h1>
          <div className="w-auto  flex gap-[0.6vw] sm:rounded-[3vw] sm:gap[1vw] sm:px-[2vw] sm:py-[2vw] px-[0.6vw] py-[0.2vw] border-[0.1vw]  border-black border-opacity-[50%] rounded-[0.7vw]">
            {subscribe_filter.map((e: any, index: any) => {
              return (
                <button
                  key={index}
                  className="neuer sm:rounded-[3vw] sm:text-[3.5vw] sm:h-[8vw] sm:w-[20vw] text-[1vw] h-[3vw] rounded-[0.7vw] w-[6vw]  text-black text-opacity-[50%]"
                  style={{
                    backgroundColor:
                      e.step == selected_filer ? "#CCFF00" : "transparent",
                    transition: "0.4s ease",
                  }}
                  onClick={() => {
                    setselected_filer(e.step);
                    setselected_fiter_text(e.msg);
                    filter_subscribers(e.step);
                  }}
                >
                  {e.msg}
                </button>
              );
            })}
          </div>

          <p className="neuer text-black text-opacity-[60%] text-[1vw] sm:text-[3.5vw]">
            {" "}
            All{" "}
            {selected_filer == 0
              ? "Subscribers "
              : selected_fiter_text + "Subscribers"}{" "}
            ({allusers_copy.length})
          </p>
        </div>

        <div className="w-full sm:overflow-x-scroll sm:max-h-[70vh]  max-h-[50vh] overflow-y-scroll admin_scroll_container">
          <div className="w-full  sm:w-[250vw]   sm:gap-[5vw] flex-col  flex gap-[1.3vw]">
            <div className="w-full sm:py-[3vw]   flex justify-between items-center neuer py-[1vw] text-[1vw] sm:text-[3.2vw] font-[900]">
              <div className="w-[25%]  h-auto">Name</div>
              <div className="w-[20%]  h-auto">Join Date</div>
              <div className="w-[20%]  h-auto">Last Subscription</div>
              <div className="w-[20%]  h-auto">Number of forges downloaded</div>
              <div className="w-[15%]  h-auto">Days remaining for renewal </div>
            </div>

            {!allusers_loading ? (
              <>
                {allusers_copy.map((e: any, index: any) => {
                  return (
                    <>
                      <New_Each_subscriber
                        key={index}
                        userdata={e}
                        setuuid={setuuid}
                        sethideProfile={sethideProfile}
                        showuser_profile={showuser_profile}
                        setcustom_all_libary_arr={setcustom_all_libary_arr}
                        sethide_display_forge_modal={
                          sethide_display_forge_modal
                        }
                      />

                      <div className="w-full h-[0.15vw] sm:h-[1vw] bg-black bg-opacity-[12%]"></div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {user_loading_loader.map((e: any, index: any) => {
                  return (
                    <>
                      <New_Each_subscriber_loadeer
                        key={index}
                        userdata={e}
                        setuuid={setuuid}
                        sethideProfile={sethideProfile}
                        showuser_profile={showuser_profile}
                      />

                      <div className="w-full h-[0.15vw] sm:h-[0.5vw] bg-black bg-opacity-[12%] animate-pulse"></div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-[2vw] sm:h-[10vw]"></div>
    </>
  );
};

export default New_Subscribers_wrap;
