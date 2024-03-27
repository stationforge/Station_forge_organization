"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import mob_filter from "../../../../public/admin_section/forge_upload/filter.webp";

import searchimg from "../../../../public/admin_section/post_insight/search_black.webp";
import Link from "next/link";
import { useProfile_Context } from "@/app/utils/profile_context";
import firebaseConfig from "@/app/utils/fire_base_config";
import { initializeApp } from "firebase/app";
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
import Product from "./products";
import Forge_info from "./forge_info";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Admin_Product_wrap = ({
  setproductStats_copy,
  setproductStats_copy_filter,
  productStats_copy_filter,
  update_search_text,
  selected_year,
  selected_month,
  setshow_mobile_filters,
}: any) => {
  const { setpage_loader }: any = useProfile_Context();

  const [productStats, setproductStats] = useState<any>([]);
  const app = initializeApp(firebaseConfig);

  const [hideforge_info, sethideforge_info] = useState(true);
  const [product_is_loading, setproduct_is_loading] = useState(true);
  const [info_title, setinfo_title] = useState("");
  const [info_download, setinfo_download] = useState("");
  const [info_avater, setinfo_avater] = useState("");
  const [product_id, setproduct_id] = useState("");

  // Initialize Firestore
  const db = getFirestore(app);
  useEffect(() => {
    const fetchProductStats = async () => {
      try {
        const productsCollectionRef = collection(db, "products");
        const col_qery = query(
          productsCollectionRef,
          orderBy("createdAt", "desc"),
        );
        const productsSnapshot = await getDocs(col_qery);

        const productStatsPromises = [];

        for (const productDoc of productsSnapshot.docs) {
          const productId = productDoc.id;

          // Step 1: Get the number of items with downloaded === true from the 'library' collection
          const libraryCollectionRef = collection(db, "libray");
          const libraryQuery = query(
            libraryCollectionRef,
            where("productid", "==", productId),
            where("downloaded", "==", true),
          );
          const librarySnapshot = await getDocs(libraryQuery);

          const downloadedItemCount = librarySnapshot.size;

          // Step 2: Get additional data for the product from the 'products' collection
          const productDocRef = doc(productsCollectionRef, productId);
          const productDocSnapshot = await getDoc(productDocRef);

          if (productDocSnapshot.exists()) {
            const productData = {
              productId,
              ...productDocSnapshot.data(),
              downloadedItemCount,
            };
            productStatsPromises.push(productData);
          }
        }

        const productStatsData = await Promise.all(productStatsPromises);
        setproductStats(productStatsData);
        setproduct_is_loading(false);
      } catch (error) {
        console.error("Error fetching product stats:", error);
      }
    };

    fetchProductStats();
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    setproductStats_copy(productStats);
    // setproductStats_copy_filter(productStats);
  }, [productStats]);

  const loader_items = ["", "", "", "", "", ""];
  return (
    <>
      {!hideforge_info && (
        <Forge_info
          sethideforge_info={sethideforge_info}
          product_id={product_id}
          info_title={info_title}
          info_download={info_download}
          info_avater={info_avater}
        />
      )}
      {!product_is_loading ? (
        <>
          {/* the actual ui */}
          <div className="w-full sm:border-none  h-auto border-l-[0.1vw]   border-black border-opacity-[40%]  sm:gap-[5vw] flex flex-col gap-[2vw] ">
            {/* this design for desktop */}
            <div className="w-full  h-auto flex sm:hidden items-center pl-[3vw]  sm:pl-[0vw]  justify-between gap-[1.2vw]">
              {/* the heading */}
              <h1 className="neuem text-[1.5vw]">
                All Models Added in {selected_month} {selected_year}
              </h1>

              <div className="w-auto  items-center  flex justify-center   relative ">
                <div className="absolute h-full  w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
                  <Image
                    src={searchimg}
                    alt="Search icon image"
                    className="w-[1.3vw]  h-fit"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search model"
                  className="h-[3vw] w-[23vw]  text-black neuer text-[0.9vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] placeholder:text-black neuer bg-[#000000] bg-opacity-[10%]  border-white border-opacity-[30%] border-[0.1vw]"
                  onChange={(e) => {
                    update_search_text(e.target.value);
                  }}
                />
              </div>

              <Link
                href={"/admin/forge-upload"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="bg-[#CCFF00] cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center text-[0.9vw] rounded-[1vw] h-[4vw] w-[15vw]"
              >
                Add Monthly Allocations
              </Link>
            </div>

            <div className="w-full h-[0.1vw] bg-black bg-opacity-[40%] sm:hidden"></div>

            {/* design for mobile */}
            <div className="w-full hidden sm:flex  flex-col gap-[5vw]">
              {/* the mobile heading */}
              <div className="w-full h-auto  flex justify-between items-center">
                <h1 className="neuem text-[5vw] ">Digital Uploads</h1>

                <Link
                  href={"/admin/forge-upload"}
                  onClick={() => {
                    setpage_loader(true);
                  }}
                  className="bg-[#CCFF00] flex justify-center items-center w-[40vw] text-[3vw] rounded-[2vw] h-[10vw]"
                >
                  Add Monthly Allocations
                </Link>
              </div>

              <div className="w-full bg-black bg-opacity-[30%] h-[0.5vw]"></div>

              <div className="w-full flex justify-between items-center">
                <h1 className="neuem text-[4.2vw]">
                  All Models Added in {selected_month} {selected_year}
                </h1>

                <div
                  className="text-[black] text-opacity-[90%] hidden justify-center items-center sm:flex w-[32vw] gap-[2vw] text-[3.5vw] h-[10vw] bg-[#D2D1D3] rounded-[3.5vw] "
                  onClick={() => {
                    // setmobile_faction_active(true);
                    // setmobile_filter(true);
                    setshow_mobile_filters(true);
                  }}
                >
                  <p className={`${inter.className}`}>Select date</p>
                  <Image
                    src={mob_filter}
                    alt="filter icon"
                    className="w-[3vw] h-fit opacity-[90%]"
                  />
                </div>
              </div>
              {/* the mobile input field */}
              <div className="w-full  items-center  flex justify-center   relative ">
                <div className="absolute h-full  w-[10vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
                  <Image
                    src={searchimg}
                    alt="Search icon image"
                    className="w-[5vw]  h-fit"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search model"
                  className="h-[12vw] w-full  text-black neuer text-[4vw] outline-none focus:border transition duration-[0.8s] pl-[12vw] pr-[1vw]  rounded-[6vw] placeholder:text-black neuer bg-[#000000] bg-opacity-[10%]  border-white border-opacity-[30%] border-[0.1vw]"
                  onChange={(e) => {
                    // setsearch_value(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="w-full  flex flex-wrap sm:pl-[0vw] pl-[3vw]  justify-start gap-[2.2%] sm:gap-[4%]">
              {productStats_copy_filter.map((e: any, index: any) => {
                return (
                  <Product
                    key={index}
                    data={e}
                    sethideforge_info={sethideforge_info}
                    setproduct_id={setproduct_id}
                    setinfo_title={setinfo_title}
                    setinfo_download={setinfo_download}
                    setinfo_avater={setinfo_avater}
                  />
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* this is the preloader  */}
          <div className="w-full sm:border-none  h-auto border-l-[0.1vw]   border-black border-opacity-[40%]  sm:gap-[5vw] flex flex-col gap-[2vw] ">
            {/* this design for desktop */}
            <div className="w-full  h-auto flex sm:hidden items-center pl-[3vw]  sm:pl-[0vw]  justify-between gap-[2vw]">
              {/* the heading */}
              <div className="w-full h-[4vw] bg-[#424141]  animate-pulse"></div>
              <div className="w-full h-[4vw] bg-[#424141]  animate-pulse"></div>
              <div className="w-full h-[4vw] bg-[#CCFF00]  animate-pulse"></div>
            </div>

            <div className="w-full h-[0.1vw] bg-black bg-opacity-[40%] sm:hidden"></div>

            {/* design for mobile */}
            <div className="w-full hidden sm:flex  flex-col gap-[5vw]">
              {/* the mobile heading */}
              <div className="w-full h-auto  flex justify-between items-center">
                {/* this is for the heading */}
                <div className="text-[black] text-opacity-[90%] hidden justify-center items-center sm:flex w-[50vw] gap-[2vw] text-[3.5vw] bg-[#424141]  animate-pulse  h-[13vw] rounded-[3.5vw] "></div>

                <div className="bg-[#CCFF00] animate-pulse flex justify-center items-center w-[40vw] text-[3vw] rounded-[2vw] h-[10vw]"></div>
              </div>

              <div className="w-full bg-black bg-opacity-[30%] h-[0.5vw]"></div>

              <div className="w-full flex justify-between items-center">
                <div className="text-[black] text-opacity-[90%] hidden justify-center items-center sm:flex w-[50vw] gap-[2vw] text-[3.5vw] bg-[#424141]  animate-pulse  h-[10vw] rounded-[3.5vw] "></div>

                <div className="text-[black] text-opacity-[90%] hidden justify-center items-center sm:flex w-[32vw] gap-[2vw] text-[3.5vw] bg-[#424141]  animate-pulse  h-[10vw] rounded-[3.5vw] "></div>
              </div>
              {/* the mobile input field */}
              <div className="w-full h-[12vw] rounded-[7vw]  items-center  flex justify-center bg-[#424141]  animate-pulse    relative "></div>
            </div>

            <div className="w-full  flex flex-wrap sm:pl-[0vw] pl-[3vw]  justify-start gap-[2.2%] sm:gap-[4%]">
              {loader_items.map((e: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="w-[31.7%] sm:rounded-[4vw] sm:w-[48%] rounded-[2vw] overflow-hidden auto border-black border-opacity-[17%] border-[0.1vw] sm:border-[0.35vw]  flex flex-col gap-[1vw] mb-[2.3vw] sm:mb-[4vw] sm:gap-[2.5vw]"
                  >
                    <div className="w-full bg-[#424141]  animate-pulse h-[20vw] sm:h-[46vw] overflow-hidden avater_bg "></div>
                    <p className="text-[0.9vw] neuem px-[1vw] sm:text-[3vw]">
                      {" "}
                    </p>{" "}
                    <div className="w-full mb-[1.2vw] sm:mb-[3vw] flex justify-between items-center px-[1vw] ">
                      <button className="bg-[#CCFF00]  animate-pulse  sm:text-[2.7vw] sm:h-[7vw] sm:w-[28vw] sm:rounded-[1.6vw] hover:bg-opacity-[40%] h-[3vw] w-[8vw] text-[0.8vw] rounded-[1vw]"></button>
                      <div className="bg-[#424141] animate-pulse h-[1.6vw] w-[6vw] sm:w-[12vw] sm:h-[3vw]"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};

export default Admin_Product_wrap;
