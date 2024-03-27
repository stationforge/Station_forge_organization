"use client";
import { initializeApp } from "firebase/app";
import React, { useState, useEffect } from "react";

import firebaseConfig from "@/app/utils/fire_base_config";
import { format, formatDistanceToNow } from "date-fns";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Penalty_options from "./penalty_options";
import Display_forge_modal from "./forge_display";
import Single_Display_forge_modal from "./single_forge_display";
const Sub_user_profile = ({ sethideProfile, uuid }: any) => {
  const hide_modal = () => {
    sethideProfile(true);
  };
  const [role, setrole] = useState("");
  const [loading, setloading] = useState(true);
  const [custom_all_libary_arr, setcustom_all_libary_arr] = useState<any>([]);
  const [forge_modal_heading, setforge_modal_heading] = useState("");
  const [all_libary_arr, setall_libary_arr] = useState<any>([]);
  const [filtered_libray_arr, setfiltered_libray_arr] = useState<any>([]);
  const [the_last_downloaded_data, setthe_last_downloaded_data] = useState<any>(
    [],
  );

  const [hide_penalty_options, sethide_penalty_options] = useState(true);
  const [hide_display_forge_modal, sethide_display_forge_modal] =
    useState(true);
  const [hide_single_display_forge_modal, sethide_single_display_forge_modal] =
    useState(true);

  const [lastdownload_title, setlastdownload_title] = useState<any>("");
  const [lastdownload_time, setlastdownload_time] = useState<any>("");
  const [download_libary_arr, setdownload_libary_arr] = useState<any>([]);
  const [profile_data, setprofile_data] = useState<any>({});
  const [user_doc_id, setuser_doc_id] = useState("");
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch user data from the "users" collection
        const usersCollectionRef = collection(db, "users");
        const usersQuery = query(
          usersCollectionRef,
          where("userid", "==", uuid),
        );
        const usersSnapshot = await getDocs(usersQuery);
        setuser_doc_id(usersSnapshot.docs[0].id);
        const userData = usersSnapshot.docs.map((doc) => doc.data());

        // Assuming setprofile_data and setrole are state-setting functions
        setprofile_data(userData[0]);
        setrole(() => {
          switch (userData[0].step) {
            case 1:
              return "Public";
            case 2:
              return "Subscribers";
            case 3:
              return "Standard Tier";
            case 4:
              return "Merchant Tier";
            default:
              return "Unknown Subscription";
          }
        });

        // Step 2: Fetch data from the "library" collection
        const libraryCollectionRef = collection(db, "libray");
        const libraryQuery = query(
          libraryCollectionRef,
          where("userid", "==", uuid),
        );
        const librarySnapshot = await getDocs(libraryQuery);

        // Step 3: Filter out items with downloaded === true
        const excludedLibraryData = librarySnapshot.docs
          .filter((libraryDoc) => libraryDoc.data().downloaded)
          .map((libraryDoc) => libraryDoc.data().productid);

        // Step 4: Fetch additional data from the "products" collection based on product ID
        const libraryData = librarySnapshot.docs.map(async (libraryDoc) => {
          const libraryDocData = libraryDoc.data();

          // Step 5: Fetch additional data from the "products" collection based on product ID
          const productId = libraryDocData.productid;
          const productDocRef = doc(db, "products", productId);
          const productDocSnapshot = await getDoc(productDocRef);
          const productData = productDocSnapshot.data();

          // Combine the library data with product data
          return { ...libraryDocData, productData };
        });

        // Step 7: Log the original library data
        const originalLibraryData = librarySnapshot.docs.map(
          (doc) => doc.data().productid,
        );
        const colRef = collection(db, "libray");
        const col_qery = query(
          colRef,
          where("downloaded", "==", true),
          where("userid", "==", uuid),
          orderBy("downloadedAt", "desc"),
        );

        const lastDownloaded = await getDocs(col_qery);
        if (!lastDownloaded.empty) {
          const download_data = lastDownloaded.docs[0];

          const lastdownload_ref = doc(
            db,
            "products",
            download_data.data().productid,
          );
          // console.log(download_data.data().productid);
          const lastdownload_final_data = await getDoc(lastdownload_ref);
          // Get the relative time
          const timestamp = download_data.data().downloadedAt;
          const relativeTime = formatDistanceToNow(
            new Date(timestamp.toDate()),
            {
              addSuffix: true,
            },
          );

          setlastdownload_time(relativeTime);
          if (lastdownload_final_data.exists()) {
            const download_title = lastdownload_final_data.data().title;
            const download_data = lastdownload_final_data.id;
            setthe_last_downloaded_data(download_data);
            setlastdownload_title(download_title);
          }
        }
        // setlastdownload_title(lastdownload_final_data.data().title)
        // console.log(originalLibraryData);
        // console.log(excludedLibraryData);
        setall_libary_arr(originalLibraryData);
        setfiltered_libray_arr(excludedLibraryData);
        // Step 8: Set loader to false after obtaining all information
        // setLoader(false);
        setloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [uuid]); // Include uuid as a dependency to refetch data if it changes
  return (
    <>
      <div
        className="w-full h-full sm:px-[3vw] bg-opacity-[70%] z-[999] bg-black fixed top-0 left-0 flex justify-center items-center"
        onClick={hide_modal}
      >
        <div
          className="w-[45vw] sm:w-full sm:h-[120vw] sm:gap-[4vw] h-[40vw] max-h-[96vh] gap-[2vw] bg-white sm:rounded-[5vw] rounded-[3vw] flex flex-col px-[2vw] items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {loading ? (
            <>
              {/* this section is for preloaders */}
              {/* this section is for preloaders */}
              {/* this section is for preloaders */}
              {/* this section is for preloaders */}
              {/* this section is for preloaders */}
              {/* this section is for preloaders */}
              {/* the first section */}

              <div className="w-full h-auto flex flex-col sm:gap-[3vw]  gap-[0.75vw]   justify-center  items-center ">
                <div className="w-full  flex h-[6.2vw] sm:h-[16vw] justify-between  items-start  relative ">
                  <p className=" sm:h-[8vw] sm:w-[25vw] bg-[#D9D9D9] animate-pulse rounded-[2vw] h-[3vw] w-[10vw] neuer text-[0.8vw] sm:text-[3vw] sm:rounded-[3vw] "></p>

                  <div className="w-[6vw] sm:w-[16vw] sm:h-[16vw] overflow-hidden absolute left-[50%] translate-x-[-50%] top-0 h-[6vw] rounded-[100%] bg-[#D9D9D9] animate-pulse "></div>

                  <i
                    className="bi bi-x-lg text-[2vw] sm:text-[6vw]  cursor-pointer"
                    onClick={hide_modal}
                  ></i>
                </div>

                <h1 className="h-[2.5vw] rounded-[1vw] w-[10vw] sm:w-[30vw] sm:h-[9vw] sm:rounded-[2vw] bg-[#D9D9D9] animate-pulse "></h1>

                <div className="w-full sm:gap-[1.5vw]  flex justify-between text-center gap-[1vw] items-center text-[0.9vw] sm:text-[2.5vw] text-black text-opacity-[50%] neuer">
                  <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:h-[9vw] animate-pulse "></div>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>
                  <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:h-[9vw] animate-pulse "></div>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>

                  <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:h-[9vw] animate-pulse "></div>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>

                  <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:h-[9vw] animate-pulse "></div>
                </div>
              </div>

              {/* the profile section */}
              <div className="w-full flex items-center flex-col sm:gap-[4vw] gap-[1vw]">
                <div className="bg-[#D9D9D9] w-[10vw] sm:w-[30vw] h-[3vw] rounded-[2vw] sm:rounded-[4vw] sm:h-[9vw] animate-pulse "></div>

                <div className="w-full flex flex-wrap justify-start  gap-[2%]">
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw]  gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                  <div className="w-[38%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                  <div className="w-[38%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-[80%] sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <div className="sm:text-[2.5vw] h-[1.2vw] bg-[#D9D9D9] animate-pulse sm:h-[3vw] text-[0.75vw]  neuer "></div>
                    <div className="rounded-[3vw]  w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]   bg-[#D9D9D9] animate-pulse px-[1vw] text-[0.9vw] neuem"></div>
                  </div>
                </div>
              </div>

              {/* the ctn section */}

              <div className="w-full h-auto flex  sm:gap-[4vw]   gap-[2vw]  justify-between  items-center">
                <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:rounded-[3vw] rounded-[1.2vw] sm:h-[10.5vw] animate-pulse "></div>

                <div className="bg-[#D9D9D9] w-full h-[3.7vw] sm:rounded-[3vw] rounded-[1.2vw] sm:h-[10.5vw] animate-pulse "></div>
              </div>
            </>
          ) : (
            <>
              {" "}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* this section is for the actual data */}
              {/* the first section */}
              <div className="w-full h-auto flex flex-col sm:gap-[3vw]  gap-[0.75vw]   justify-center  items-center ">
                <div className="w-full  flex h-[6.2vw] sm:h-[16vw] justify-between  items-start  relative ">
                  <p className="border-black border-[0.1vw] w-fit rounded-[2vw] px-[1.5vw] py-[0.7vw] neuer text-[0.8vw] sm:text-[3vw] sm:rounded-[3vw] ">
                    {role}
                  </p>

                  <div className="w-[6vw] sm:w-[16vw] sm:h-[16vw] overflow-hidden absolute left-[50%] translate-x-[-50%] top-0 h-[6vw] rounded-[100%]  ">
                    <img
                      src={
                        profile_data.avatar_url != ""
                          ? profile_data.avatar_url
                          : "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193&_gl=1*18pfgon*_ga*MTg2NzQwODY0MS4xNjk0ODM5ODQ1*_ga_CW55HF8NVT*MTY5ODU4MTA5Ny40OC4xLjE2OTg1ODExNDEuMTYuMC4w"
                      }
                      alt="user_img"
                      className="h-full w-full"
                    />
                  </div>

                  <i
                    className="bi bi-x-lg text-[2vw] sm:text-[6vw]  cursor-pointer"
                    onClick={hide_modal}
                  ></i>
                </div>

                <h1 className="text-[1.2vw] sm:text-[4.2vw] neuem">
                  {profile_data.Username}
                </h1>

                <div className="w-full  flex justify-between text-center gap-[1vw] items-center text-[0.9vw] sm:text-[2.5vw] text-black text-opacity-[50%] neuer">
                  <p
                    className="w-full underline underline-offset-4 hover:text-black cursor-pointer"
                    onClick={() => {
                      sethide_single_display_forge_modal(false);
                    }}
                  >
                    {lastdownload_time == "" && lastdownload_title == ""
                      ? "No available download"
                      : "Last download"}{" "}
                    {lastdownload_time} {lastdownload_title}
                  </p>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>
                  <p
                    className="w-full underline underline-offset-4 hover:text-black cursor-pointer"
                    onClick={() => {
                      setcustom_all_libary_arr(filtered_libray_arr);
                      setforge_modal_heading("All forges downloaded");
                      sethide_display_forge_modal(false);
                    }}
                  >
                    Downloaded {filtered_libray_arr.length} items
                  </p>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>

                  <p className="w-full underline underline-offset-4 hover:text-black cursor-pointer">
                    Renewed subscription 6 times
                  </p>
                  <div className="w-[0.25vw] sm:w-[1vw] sm:h-[8vw] h-[2.2vw] bg-black bg-opacity-[40%]"></div>

                  <p
                    className="w-full underline underline-offset-4 hover:text-black cursor-pointer"
                    onClick={() => {
                      setcustom_all_libary_arr(all_libary_arr);
                      setforge_modal_heading("All forges in libray");

                      sethide_display_forge_modal(false);
                    }}
                  >
                    Added {all_libary_arr.length} items to forge Libary
                  </p>
                </div>
              </div>
              {/* the profile section */}
              <div className="w-full flex items-center flex-col sm:gap-[4vw] gap-[1vw]">
                <h1 className="text-[1.2vw] sm:text-[4.5vw] neuer text-center ">
                  Profile information
                </h1>

                <div className="w-full flex flex-wrap justify-start  gap-[2%]">
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw]  gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Public name
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.name == ""
                          ? "Name unavaliable"
                          : profile_data.name
                      }
                    />
                  </div>
                  <div className="w-[38%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Public description
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.description == ""
                          ? "Description unavaliable"
                          : profile_data.description
                      }
                    />
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Public Email
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.Email == ""
                          ? "Email unavaliable"
                          : profile_data.Email
                      }
                    />
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Username
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.Username == ""
                          ? "Username unavaliable"
                          : profile_data.Username
                      }
                    />
                  </div>
                  <div className="w-[38%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Birthday
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-[80%] sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.birthday == ""
                          ? "Birthday unavaliable"
                          : profile_data.birthday
                      }
                    />
                  </div>
                  <div className="w-[28%] h-auto  flex flex-col mb-[1.2vw] sm:mb-[3vw] gap-[0.5vw]">
                    <label className="sm:text-[2.5vw] text-[0.75vw]  neuer ">
                      Country
                    </label>
                    <input
                      type="text"
                      className="rounded-[3vw] w-full sm:rounded-[3vw] sm:font-[400] h-[3vw] sm:h-[9vw] sm:text-[2.7vw] sm:px-[3vw]  bg-[#F0F0F0] px-[1vw] text-[0.9vw] neuem"
                      disabled
                      value={
                        profile_data.country == ""
                          ? "Country unavaliable"
                          : profile_data.country
                      }
                    />
                  </div>
                </div>
              </div>
              {/* the ctn section */}
              <div className="w-full h-auto flex  sm:gap-[4vw]   gap-[2vw]  justify-between  items-center">
                <button
                  className=" w-full h-[3.5vw] sm:h-[12vw] text-[1vw] sm:text-[3.5vw] bg-[#CCFF00] rounded-[2vw] justify-center items-center flex hover:bg-opacity-[60%]"
                  onClick={() => {
                    setforge_modal_heading("All forges downloaded");

                    setcustom_all_libary_arr(filtered_libray_arr);
                    sethide_display_forge_modal(false);
                  }}
                >
                  See All Downloads
                </button>
                <button
                  className=" w-full h-[3.5vw] sm:h-[12vw] text-[1vw] sm:text-[3.5vw] bg-[#FF0000] text-white rounded-[2vw] justify-center items-center flex hover:bg-opacity-[60%]"
                  onClick={() => {
                    sethide_penalty_options(false);
                  }}
                >
                  Penalize
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {!hide_penalty_options && (
        <Penalty_options
          user_doc_id={user_doc_id}
          sethide_penalty_options={sethide_penalty_options}
        />
      )}

      {!hide_display_forge_modal && (
        <Display_forge_modal
          arr_data={custom_all_libary_arr}
          sethide_display_forge_modal={sethide_display_forge_modal}
          forge_modal_heading={forge_modal_heading}
        />
      )}

      {!hide_single_display_forge_modal && (
        <Single_Display_forge_modal
          data={the_last_downloaded_data}
          sethide_single_display_forge_modal={
            sethide_single_display_forge_modal
          }
          lastdownload_time={lastdownload_time}
          forge_modal_heading={forge_modal_heading}
        />
      )}
    </>
  );
};

export default Sub_user_profile;
