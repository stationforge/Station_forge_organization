"use client";
import Image from "next/image";
import Header from "./../general_components/header";
import React, { useState, useEffect } from "react";
import Profile_dropdown from "./../general_components/profile_dropdown";
import { useProfile_Context } from "./../utils/profile_context";
import JsonSearch from "search-array";

import Settings_modal from "./../general_components/settings";
import Loader from "./../general_components/loader";
// import Products from "./homepage_components/products";
import {
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
import { initializeApp } from "firebase/app";
import firebaseConfig from "./../utils/fire_base_config";
import Forge from "./../general_components/forge";
import Models_in_libary from "./model";
import Allocations from "./allocations";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Allocations_preloader from "./left_preloader";
import Models_in_libary_prelaoder from "./right_prelaoder";
import Download_modal from "./download_modal";
import Mobile_Allocations from "./mob_allocations";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();
  const router = useRouter();

  const [left, setleft] = useState("150vw");
  const [right, setright] = useState("-80vw");
  const [products, setproducts] = useState([]);
  const [trimmed_product, settrimmed_product] = useState([]);
  const [trimmed_text, settrimmed_text] = useState("");
  const [search_text, setsearch_text] = useState("");
  const [libraryItems, setlibraryItems] = useState<any>([]);
  const [libary_is_loading, setlibary_is_loading] = useState(true);
  const [downloadmodal_png_link, setdownloadmodal_png_link] = useState("");
  const [downloadmodal_pngwith_model, setdownloadmodal_pngwith_model] =
    useState("");
  const [download_text, setdownload_text] = useState("");
  const [currently_downloading_id, setcurrently_downloading_id] = useState("");
  const [show_download_modal, setshow_download_modal] = useState(false);
  const [is_network_err, setis_network_err] = useState(false);
  const [is_libary_empty, setis_libary_empty] = useState(false);
  const [show_mobile_filter_allocation, setshow_mobile_filter_allocation] =
    useState(false);

  const [uid, setuid] = useState("");
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        router.push("/login?ref=libray");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Reference to the user's library in the 'library' collection
    const libraryRef = collection(db, "libray");
    const q = query(
      libraryRef,
      where("userid", "==", uid),
      orderBy("createdAt", "desc"),
    );

    // Set loading state initially
    setlibary_is_loading(true);

    // Real-time listener for the user's library
    // setis_network_err(true);
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const postArray = [];
      // console.log("empty ohh");
      if (!querySnapshot.empty) {
        setis_network_err(false);
        setis_libary_empty(false);
      } else if (!navigator.onLine) {
        //  console.log("empty ohh");
        setis_libary_empty(false);
        setis_network_err(true);
      } else if (querySnapshot.empty) {
        //  console.log("empty ohh");
        setis_libary_empty(true);
        setis_network_err(false);
      }
      for (const change of querySnapshot.docs) {
        const libraryData = change.data();
        const productRef = doc(db, "products", libraryData.productid);

        try {
          // Fetch product data
          const productDoc = await getDoc(productRef);

          if (productDoc.exists()) {
            const productData = productDoc.data();
            const libray_collections = {
              month: libraryData.month,
              id: change.id,
              coverImage: productData.cover_png,
              title: productData.title,
              downloadPngLink: productData.png_file,
              downloadPngModelLink: productData.png_model_file,
              downloaded: libraryData.downloaded,
            };
            postArray.push(libray_collections);
          } else {
          }
        } catch (error) {
          setis_network_err(true);
          console.error("Error fetching product data:", error);
        }
      }

      // Set loading state to false after data processing
      setlibary_is_loading(false);

      // Set the state outside the loop
      setlibraryItems(postArray);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [uid]);

  // Use useEffect to set the animation
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
  }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setleft("0");
    setright("0");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs only on mount

  useEffect(() => {
    if (trimmed_text === "") {
      settrimmed_product(libraryItems);
    } else {
      // Custom case-insensitive search using filter
      const foundObjects = libraryItems.filter((item: any) =>
        item.month.toLowerCase().includes(trimmed_text.toLowerCase()),
      );

      settrimmed_product(foundObjects);
    }
  }, [trimmed_text, libraryItems]);

  useEffect(() => {
    if (search_text === "") {
      settrimmed_product(libraryItems);
    } else {
      // Custom case-insensitive search using filter
      const foundObjects = libraryItems.filter((item: any) =>
        item.title.toLowerCase().includes(search_text.toLowerCase()),
      );

      settrimmed_product(foundObjects);
    }
  }, [search_text]);

  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}
      <Profile_dropdown />
      <div className="w-full h-fit z-[99]  fixed top-[0vw] ">
        <Header />
      </div>
      {show_mobile_filter_allocation && (
        <Mobile_Allocations
          settrimmed_text={settrimmed_text}
          setshow_mobile_filter_allocation={setshow_mobile_filter_allocation}
          trimmed_text={trimmed_text}
        />
      )}

      {show_setting_modal && <Settings_modal />}
      {show_download_modal && (
        <Download_modal
          pnglink={downloadmodal_png_link}
          modellink={downloadmodal_pngwith_model}
          download_text={download_text}
          setshow_download_modal={setshow_download_modal}
          currently_downloading_id={currently_downloading_id}
        />
      )}
      <div className="w-full h-[10vw] sm:h-[26vw]"></div>
      <div
        className="w-full h-auto  flex transition duration-[2s] "
        style={{
          transform: `translateY(${left})`,
        }}
      >
        {" "}
        {!libary_is_loading ? (
          <>
            <Allocations
              settrimmed_text={settrimmed_text}
              trimmed_text={trimmed_text}
            />
            <Models_in_libary
              products={trimmed_product}
              is_network_err={is_network_err}
              is_libary_empty={is_libary_empty}
              setshow_download_modal={setshow_download_modal}
              libraryItems={trimmed_product}
              setdownload_text={setdownload_text}
              setdownloadmodal_png_link={setdownloadmodal_png_link}
              setdownloadmodal_pngwith_model={setdownloadmodal_pngwith_model}
              setcurrently_downloading_id={setcurrently_downloading_id}
              setsearch_text={setsearch_text}
              search_text={search_text}
              settrimmed_text={settrimmed_text}
              setshow_mobile_filter_allocation={
                setshow_mobile_filter_allocation
              }
              trimmed_text={trimmed_text}
            />
          </>
        ) : (
          <>
            <Allocations_preloader />
            <Models_in_libary_prelaoder />
          </>
        )}
      </div>
      <div className="w-full hidden sm:block h-[8vw]"></div>
    </>
  );
}
