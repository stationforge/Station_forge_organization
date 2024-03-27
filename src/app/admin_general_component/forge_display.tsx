"use client";

import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import firebaseConfig from "../utils/fire_base_config";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";

const Display_forge_modal = ({
  sethide_display_forge_modal,
  arr_data,
  forge_modal_heading,
}: any) => {
  const router = useRouter();
  const user_loading_loader = ["", "", "", "", "", ""];

  const app = initializeApp(firebaseConfig);

  const [forgesarr, setforgesarr] = useState([{}]);
  const [forgearr_is_loading, setforgearr_is_loading] = useState(true);
  // Initialize Firestore
  const db = getFirestore(app);

  useEffect(() => {
    const getProductsByIds = async () => {
      try {
        const productsCollectionRef = collection(db, "products");

        const productPromises = arr_data.map(async (productId: any) => {
          const productDocRef = doc(productsCollectionRef, productId);
          const productDocSnapshot = await getDoc(productDocRef);

          if (productDocSnapshot.exists()) {
            return { productId, ...productDocSnapshot.data() };
          } else {
            console.warn(
              `Document with ID ${productId} does not exist in the 'products' collection.`,
            );
            return null;
          }
        });

        const productsData = await Promise.all(productPromises);
        setforgesarr(productsData);
        setforgearr_is_loading(false);
        // setProducts(productsData.filter(Boolean)); // Remove any null entries
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProductsByIds();
  }, [arr_data]);

  return (
    <>
      <div
        className="w-full h-full sm:px-[5vw] bg-black bg-opacity-[80%] fixed top-0 left-0 z-[999] flex justify-center items-center"
        onClick={() => {
          sethide_display_forge_modal(true);
        }}
      >
        <div
          className="w-[35vw] relative sm:w-full sm:rounded-[5vw] sm:h-[100vw] sm:pt-[9vw] sm:pb-[4vw] sm:gap-[4vw] h-[30vw] flex-col gap-[1.2vw] sm:px-[3vw] px-[2vw] bg-white rounded-[1.5vw] flex justify-start py-[2.2vw] items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <i
            className="bi bi-x-lg text-[1.2vw] sm:right-[4vw] sm:top-[3vw] absolute top-[0.5vw] right-[1vw] sm:text-[4vw]  cursor-pointer"
            onClick={() => {
              sethide_display_forge_modal(true);
            }}
          ></i>
          {!forgearr_is_loading ? (
            <>
              {" "}
              <div className="w-full flex justify-between items-center">
                <p className="neuem text-[1.2vw] sm:text-[4vw] ">
                  {forge_modal_heading}
                </p>
                <p className="neuem text-[1.2vw] sm:text-[4vw] ">
                  {arr_data.length}
                </p>
              </div>
              <div className="w-full gap-[1.5vw] sm:gap-[3vw] overflow-y-scroll scroll-container h-full  flex flex-wrap justify-start ">
                {forgesarr.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="w-[9.2vw] sm:gap-[2vw] sm:w-[25.68vw]  sm:h-fit  gap-[0.7vw] flex flex-col items-start h-auto"
                    >
                      <div
                        className="w-full h-[9vw] sm:h-[24vw] avater_bg "
                        style={{ backgroundImage: `url(/cover.webp)` }}
                      >
                        <img
                          src={e?.cover_png}
                          alt={e.title}
                          className="h-full w-full"
                        />
                      </div>
                      <p className="neuer text-[0.9vw] capitalize sm:text-[3vw]">
                        {e.title}
                      </p>
                    </div>
                  );
                })}
              </div>{" "}
            </>
          ) : (
            <>
              {" "}
              <div className="w-full flex justify-between items-center">
                <div className="bg-[#A9A7A7] animate-pulse h-[1.5vw] w-[12vw] sm:w-[25vw] sm:h-[4vw] "></div>
                <div className="bg-[#A9A7A7] animate-pulse h-[1.5vw] w-[7vw] sm:w-[10vw] sm:h-[4vw] "></div>
              </div>
              <div className="w-full gap-[1.5vw] sm:gap-[3vw] overflow-y-scroll scroll-container h-full  flex flex-wrap justify-start ">
                {user_loading_loader.map((e: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="w-[9.2vw] sm:gap-[2vw] sm:w-[25.68vw]  sm:h-fit  gap-[0.7vw] flex flex-col items-start h-auto"
                    >
                      <div className="w-full h-[9vw] sm:h-[24vw] avater_bg bg-[#A9A7A7] animate-pulse "></div>
                      <p className="neuer text-[0.9vw] bg-[#A9A7A7] animate-pulse h-[1.5vw] w-full sm:h-[4vw] capitalize sm:text-[3vw]"></p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Display_forge_modal;
