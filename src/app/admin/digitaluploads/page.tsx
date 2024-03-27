"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import { FadeInTransition } from "react-transitions-library";
import success from "../../../../public/admin_section/post_upload/success.webp";
import Link from "next/link";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  runTransaction,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
  where,
  query,
} from "firebase/firestore";
import Admin_Product_wrap from "./admin_product_wrap";
import Filters from "./filter";
import Mobile_Filters from "./mobile_filters";
import { useAdmin_context } from "@/app/utils/admin_context";
import Admin_Settings_modal from "@/app/admin_general_component/admin_settings";
import Notification_modal from "@/app/admin_general_component/notifications";

export default function Home() {
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [selected_month, setselected_month] = useState("");
  const [selected_year, setselected_year] = useState("");
  const [productStats_copy, setproductStats_copy] = useState<any>([]);
  const [productStats_monthly_copy, setproductStats_monthly_copy] =
    useState<any>([]);
  const [productStats_copy_filter, setproductStats_copy_filter] = useState<any>(
    [],
  );

  const [show_mobile_filters, setshow_mobile_filters] = useState(false);

  const [search_value, setsearch_value] = useState("");

  initializeApp(firebaseConfig);
  const auth: any = getAuth();
  const route = useRouter();
  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  // Initialize Firebase storage and Firestore
  const storage = getStorage();
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

  // useEffect for filtering based on selected_month
  useEffect(() => {
    if (selected_month == "" && productStats_monthly_copy.length > 0) {
      setproductStats_copy_filter(productStats_monthly_copy);
    } else if (selected_month !== "" && productStats_monthly_copy.length > 0) {
      const lowerCaseSelectedMonth = selected_month;
      const filteredData = productStats_monthly_copy.filter((data: any) =>
        data.monthAdded.includes(lowerCaseSelectedMonth),
      );
      setproductStats_copy_filter(filteredData);
    }
  }, [selected_month]);

  // useEffect for filtering based on selected_year
  // useEffect for filtering based on selected_year
  useEffect(() => {
    if (selected_year !== "") {
      const lowerCaseSelectedYear = selected_year.toString().toLowerCase();
      // Assuming 'data' is your data structure
      const filteredData = productStats_copy.filter((data: any) =>
        data.year.toString().includes(lowerCaseSelectedYear),
      );
      setproductStats_copy_filter(filteredData);
      setproductStats_monthly_copy(filteredData);
      setselected_month("");
    }
  }, [selected_year, productStats_copy]);

  // useefect for showing the intial data with the current year

  // useEffect(() => {
  //   if (selected_year !== "") {
  //     const lowerCaseSelectedYear = selected_year.toString().toLowerCase();
  //     // Assuming 'data' is your data structure
  //     const filteredData = productStats_copy.filter((data: any) =>
  //       data.year.toString().includes(lowerCaseSelectedYear),
  //     );
  //     setproductStats_copy_filter(filteredData);
  //     setproductStats_monthly_copy(filteredData);
  //     setselected_month("");
  //   }
  // }, [selected_year]);

  const update_search_text = (e: any) => {
    setsearch_value(e);
  };

  useEffect(() => {
    // console.log(search_value);
    if (search_value == "" && productStats_monthly_copy.length > 0) {
      setproductStats_copy_filter(productStats_monthly_copy);
    } else if (search_value !== "" && productStats_monthly_copy.length > 0) {
      const lowerCasesearch_value = search_value.toLowerCase();
      const filteredData = productStats_monthly_copy.filter((data: any) =>
        data.title.toLowerCase().includes(lowerCasesearch_value),
      );
      setselected_month("");
      setproductStats_copy_filter(filteredData);
    }
  }, [search_value]);
  const { show_setting, setshow_setting, notification }: any =
    useAdmin_context();

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {" "}
          <Header />
          {show_setting && <Admin_Settings_modal />}
          {notification && <Notification_modal />}
          <div className="w-full h-[10vw] sm:h-[27vw]"></div>
          {/* this is for the digital sales record  */}
          <div className="w-full  flex justify-center  px-[2vw] py-[2vw]   h-auto">
            {/* this is for the factions */}
            {/* this filter is hidden for mobile screesn */}
            <div className="w-[30%] sm:hidden sticky top-0 left-0 h-[10vw]">
              <Filters
                setselected_month={setselected_month}
                selected_month={selected_month}
                selected_year={selected_year}
                setselected_year={setselected_year}
                productStats_copy={productStats_copy}
              />
            </div>
            {/* this filter is for mobile */}
            {show_mobile_filters && (
              <Mobile_Filters
                setselected_month={setselected_month}
                selected_month={selected_month}
                selected_year={selected_year}
                setselected_year={setselected_year}
                setshow_mobile_filters={setshow_mobile_filters}
              />
            )}

            {/* this is for teh product */}
            <div className="w-[70%] sm:w-full h-auto   ">
              <Admin_Product_wrap
                update_search_text={update_search_text}
                setproductStats_copy={setproductStats_copy}
                productStats_copy={productStats_copy}
                selected_month={selected_month}
                setproductStats_copy_filter={setproductStats_copy_filter}
                productStats_copy_filter={productStats_copy_filter}
                selected_year={selected_year}
                setshow_mobile_filters={setshow_mobile_filters}
              />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
