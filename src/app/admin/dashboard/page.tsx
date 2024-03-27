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
import Dashboard_hero_section from "./dashboard_hero";
import {
  Timestamp,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import New_Subscribers_wrap from "./new_subscribers_wrap";
import Digital_sales_analytics from "./digital_sales_analytics";
import Dashboard_post_analytics from "./post_insight";
import Admin_Settings_modal from "@/app/admin_general_component/admin_settings";
import { useAdmin_context } from "@/app/utils/admin_context";
import Notification_modal from "@/app/admin_general_component/notifications";
import Payment_analysis from "./payment_analysis";

export default function Home() {
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    setfrom,
  }: any = useProfile_Context();

  const [showdash, setshowdash] = useState(false);
  const [admin_username, setadmin_username] = useState("");

  const [all_subscribers_in_dashboard, setall_subscribers_in_dashboard] =
    useState(0);
  const [all_subscribers_is_loading, setall_subscribers_is_loading] =
    useState(true);

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

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;
              setadmin_username(res.docs[0].data().Username);
              if (snap == "admin") {
                setshowdash(true);
                setpage_loader(false);
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

  const { show_setting, setshow_setting, notification }: any =
    useAdmin_context();

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          <Header
            position={"fixed"}
            padding={"0 2vw"}
            top={"1vw"}
            blur={false}
          />

          {show_setting && <Admin_Settings_modal />}
          {notification && <Notification_modal />}

          <div className="w-full   h-[40vw] px-[2vw] py-[1vw] sm:h-[190vw] flex  sm:relative top-[1vw] left-0 ">
            <div className=" w-full  bg-[#000002] drop-shadow-2xl sm:drop-shadow-none sm:rounded-[4vw] rounded-[2vw] relative h-full">
              <Dashboard_hero_section
                admin_username={admin_username}
                all_subscribers_in_dashboard={all_subscribers_in_dashboard}
                all_subscribers_is_loading={all_subscribers_is_loading}
              />
            </div>
          </div>
          {/* // this is for analytics */}
          <div className="flex my-[2vw] sm:gap-[10vw]  sm:py-[10vw] sm:flex-col">
            <div className="w-[58vw] sm:w-full h-auto">
              <Digital_sales_analytics />
            </div>
            <div className="w-[40vw] sm:w-full h-auto">
              <Dashboard_post_analytics />
            </div>
          </div>

          <div className="w-full px-[2vw] py-[2vw] sm:mt-[8vw]    h-auto">
            <New_Subscribers_wrap
              setall_subscribers_in_dashboard={setall_subscribers_in_dashboard}
              setall_subscribers_is_loading={setall_subscribers_is_loading}
            />
          </div>
          <Payment_analysis />
          <div className="w-full sm:h-[40vw] "></div>
        </>
      ) : null}
    </>
  );
}
