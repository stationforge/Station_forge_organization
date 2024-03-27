"use client";

import { initializeApp } from "firebase/app";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import firebaseConfig from "../../utils/fire_base_config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { EDGE_RUNTIME_WEBPACK } from "next/dist/shared/lib/constants";
import Sub_user_profile from "@/app/admin_general_component/sub_user_profile";

const Forge_info = ({
  sethideforge_info,
  user_doc_id,
  product_id,
  info_download,
  info_title,
  info_avater,
}: any) => {
  const router = useRouter();

  const app = initializeApp(firebaseConfig);

  const [allitems_arr, setallitems_arr] = useState<any>([]);
  const [hideProfile, sethideProfile] = useState<any>(true);
  const [forge_info_is_loading, setforge_info_is_loading] = useState<any>(true);
  const [uuid, setuuid] = useState<any>("");

  // Initialize Firestore
  const db = getFirestore(app);

  const [latest_time, setlatest_time] = useState("");

  useEffect(() => {
    const fetchDownloadedUsersInfo = async () => {
      try {
        const itemsArray: any = []; // Create an array to store the fetched items

        // Step 1: Get library documents where productid equals the provided product_id
        const libraryCollectionRef = collection(db, "libray");
        const libraryQuery = query(
          libraryCollectionRef,
          where("downloaded", "==", true),
          where("productid", "==", product_id),
          orderBy("downloadedAt", "desc"),
        );
        const librarySnapshot = await getDocs(libraryQuery);

        for (const libraryDoc of librarySnapshot.docs) {
          const libraryData = libraryDoc.data();
          const userId = libraryData.userid;

          // Step 2: Check if the document was downloaded
          if (libraryData.downloaded) {
            // Step 3: Get user information for the downloaded user
            const userQuery = query(
              collection(db, "users"),
              where("userid", "==", userId),
            );
            const userSnapshot = await getDocs(userQuery);

            userSnapshot.forEach((userDoc) => {
              const userData = userDoc.data();
              const name = userData.username + " " + userData.name;

              const downloadedAtTimestamp = libraryData.downloadedAt.toMillis();
              const relativeTime = formatDistanceToNow(downloadedAtTimestamp, {
                addSuffix: true,
              });

              // Push the item to the array
              itemsArray.push({
                userId,
                name: name,
                avater: userData.avatar_url,
                userData,
                username: userData.Username,
                time: relativeTime,
              });
            });
          }
        }

        // Set the state with the array of items
        setallitems_arr(itemsArray);
        setforge_info_is_loading(false);
      } catch (error) {
        console.error("Error fetching downloaded users info:", error);
      }
    };

    fetchDownloadedUsersInfo();
  }, [product_id]);

  // useEffect(() => {
  //   console.log(allitems_arr);
  // }, [allitems_arr]);

  const example = ["", "", "", ""];
  return (
    <>
      <div
        className="w-full h-full sm:px-[3vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethideforge_info(true);
        }}
      >
        <div
          className="w-[40vw] sm:w-full relative sm:rounded-[5vw] sm:h-[110vw] sm:gap-[2vw] h-[40vw] flex-col gap-[1.2vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <i
            className="bi bi-x-lg text-[2vw] sm:top-[2vw] sm:right-[2vw] sm:text-[6vw] absolute top-[1vw] right-[1vw]  cursor-pointer"
            onClick={() => {
              sethideforge_info(true);
            }}
          ></i>
          {!forge_info_is_loading ? (
            <>
              <div
                className="w-[6vw] h-[6vw] sm:w-[18vw] sm:h-[18vw] avater_bg  rounded-[100%] overflow-hidden"
                style={{ backgroundImage: `url(/cover.webp)` }}
              >
                <img
                  src={info_avater}
                  alt="user avater img"
                  className="w-full h-full"
                />
              </div>

              <h1 className="text-[1.5vw] neuem sm:text-[4.6vw]">
                {info_title}
              </h1>

              <p className="text-black text-opacity-[40%] txt-[1vw] sm:text-[3vw]">
                Downloaded {info_download} Times
              </p>
              <p className="text-black text-opacity-[40%] text-[1vw] sm:text-[3vw]">
                Last download {allitems_arr[0]?.time} by{" "}
                {allitems_arr[0]?.username}
              </p>

              <h1 className="text-[1.2vw] neuem sm:text-[3.8vw]">
                All profiles that downloaded
              </h1>

              <div className="w-full h-[0.1vw] bg-black bg-opacity-[30%]"></div>

              <div className="w-full h-[15vw] sm:gap-[6vw] sm:h-[40vw]  gap-[2vw] flex flex-col  items-center overflow-y-scroll">
                {allitems_arr.map((e: any, index: any) => {
                  return (
                    <div
                      className="w-full sm:px-[2vw]  px-[1vw] flex justify-between items-center"
                      key={index}
                    >
                      {/* the cover imag */}
                      <div className="flex gap-[1vw] sm:gap-[2vw] items-center">
                        <div
                          className="w-[6vw] sm:w-[14vw] sm:h-[12.5vw] sm:rounded-[2vw] overflow-hidden   h-[5vw] avater_bg rounded-[1vw]"
                          style={{ backgroundImage: `url(/cover.webp)` }}
                        >
                          <img
                            src={e.avater}
                            alt="avater img"
                            className="w-full h-full"
                          />
                        </div>

                        <div className="flex flex-col gap-[1vw] ">
                          <p className=" text-[1vw] neuem sm:text-[3.7vw]">
                            {e.username}
                          </p>
                          <p className="text-[0.9vw] sm:text-[3.3vw] neuer text-black text-opacity-[50%]">
                            {e.time}
                          </p>
                        </div>
                      </div>

                      <button
                        className="bg-[#F5F5F5] sm:h-[10vw]  sm:w-[30vw] text-[1vw] sm:text-[3.5vw] hover:text-black h-[2.5vw] rounded-[1vw] sm:rounded-[4vw] w-[10vw] flex justify-center items-center text-[#95B611] "
                        onClick={() => {
                          setuuid(e.userId);
                          sethideProfile(false);
                        }}
                      >
                        View profile <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="w-[6vw] h-[6vw] sm:w-[18vw] sm:h-[18vw]  bg-[#D9D9D9] animate-pulse avater_bg  rounded-[100%] overflow-hidden"></div>
              <div className=" bg-[#D9D9D9] animate-pulse h-[2vw] w-[20vw] sm:h-[6vw] sm:w-[38vw]"></div>

              <div className=" bg-[#D9D9D9] animate-pulse h-[2vw] w-[10vw] sm:h-[6vw] sm:w-[20vw]"></div>
              <div className=" bg-[#D9D9D9] animate-pulse h-[1.6vw] w-[25vw] sm:h-[4vw] sm:w-[70vw]"></div>
              <div className=" bg-[#D9D9D9] animate-pulse h-[2vw] w-[18vw] sm:h-[6vw] sm:w-[30vw]"></div>

              <div className="w-full h-[0.1vw] bg-black bg-opacity-[30%]"></div>

              <div className="w-full h-[15vw] sm:gap-[6vw] sm:h-[40vw]  gap-[2vw] flex flex-col  items-center overflow-y-scroll">
                {example.map((e: any, index: any) => {
                  return (
                    <div
                      className="w-full sm:px-[2vw]  px-[1vw] flex justify-between items-center"
                      key={index}
                    >
                      {/* the cover imag */}
                      <div className="flex gap-[1vw] sm:gap-[2vw] items-center">
                        <div className="w-[6vw] sm:w-[14vw] sm:h-[12.5vw] sm:rounded-[2vw] overflow-hidden  bg-[#D9D9D9] animate-pulse   h-[5vw] avater_bg rounded-[1vw]"></div>

                        <div className="flex flex-col gap-[1vw] ">
                          <div className=" bg-[#D9D9D9] animate-pulse h-[1.5vw] w-[10vw] sm:h-[4vw] sm:w-[20vw]"></div>
                          <div className=" bg-[#D9D9D9] animate-pulse h-[1.5vw] w-[7vw] sm:h-[3vw] sm:w-[15vw]"></div>
                        </div>
                      </div>

                      <button className=" sm:h-[10vw]  sm:w-[30vw] text-[1vw] sm:text-[3.5vw] hover:text-black h-[2.5vw] rounded-[1vw]  bg-[#D9D9D9] animate-pulse sm:rounded-[4vw] w-[10vw] flex justify-center items-center text-[#95B611] "></button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* this is for the loader  */}
        </div>
      </div>
      {!hideProfile && (
        <Sub_user_profile sethideProfile={sethideProfile} uuid={uuid} />
      )}
    </>
  );
};

export default Forge_info;
