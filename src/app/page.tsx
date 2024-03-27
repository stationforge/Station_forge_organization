"use client";
import Image from "next/image";
import Header from "./general_components/header";
import React, { useState, useEffect } from "react";
import Profile_dropdown from "./general_components/profile_dropdown";
import { useProfile_Context } from "./utils/profile_context";
import Settings_modal from "./general_components/settings";
import Home_hero from "./homepage_components/hero";
import Loader from "./general_components/loader";
import Products from "./homepage_components/products";
import Fractions from "./homepage_components/factions";
import JsonSearch from "search-array";
import imageCompression from "browser-image-compression";

import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/fire_base_config";
import Forge from "./general_components/forge";
import Product_preloader from "./homepage_components/right_preloader";
import Fractions_preloader from "./homepage_components/left_preloader";
import Mobile_factions from "./homepage_components/mobile_factions";
import Chats_modal from "./general_components/chat";
import axios from "axios";

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const [left, setleft] = useState("150vw");
  const [right, setright] = useState("-80vw");
  const [product_is_loading, setproduct_is_loading] = useState(true);
  const [products, setproducts] = useState<any>([]);
  const [copy_products, setcopy_products] = useState([]);
  const [second_copy_products, setsecond_copy_products] = useState([]);
  const [faction_data, setfaction_data] = useState(null);
  const [sub_faction_arr, setsub_faction_arr] = useState([]);
  const [active_sub_faction, setactive_sub_faction] = useState(null);
  const [search_text, setsearch_text] = useState("");
  const [is_network_err, setis_network_err] = useState(false);
  // Use useEffect to set the animation
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
    show_chat_modal,
    setshow_chat_modal,
  }: any = useProfile_Context();

  const [mobile_faction_active, setmobile_faction_active] = useState(false);

  const [faction_option, setfaction_option] = useState([
    { id: null, label: "New", sub: [] },
    { id: 1, label: "Humanoids", sub: ["h1", "h2", "h3", "h5"] },
    { id: 2, label: "Robots", sub: ["R1", "R2", "R3", "R5"] },
    { id: 3, label: "Aliens", sub: ["A1", "A2", "A3", "A5"] },
    { id: 4, label: "Chaos", sub: ["L1", "L2", "L3", "L5"] },
  ]);

  const [active_faction, setactive_faction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjust based on your pagination needs
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
    setsearch_text("");

    if (active_faction == null) {
      setcopy_products(products);
      return;
    }

    // Custom search using filter
    const foundObjects = products.filter(
      (product: any) => product.factions === faction_data,
    );
    setsecond_copy_products(foundObjects);
    setcopy_products(foundObjects);
  }, [active_faction]);

  // //   this is for setting the  searching out the product from the title
  useEffect(() => {
    setactive_faction(null);
    setactive_sub_faction(null);

    if (search_text === "") {
      setcopy_products(products);
      return;
    }

    // Custom case-insensitive search using filter
    const foundObjects = products.filter((product: any) =>
      product.title.toLowerCase().includes(search_text.toLowerCase()),
    );

    setsecond_copy_products(foundObjects);
    setcopy_products(foundObjects);
  }, [search_text]);

  //   this is for setting the sub factions
  useEffect(() => {
    setsearch_text("");

    if (active_faction == null) {
      setsub_faction_arr([]);

      return;
    } else {
      const searcher = new JsonSearch(faction_option, {
        indice: {
          id: "id", // search the `title`
          // name: "author", // search the `author` but it's renamed as `name` in queries
        },
      });

      let foundObjects = searcher.query(active_faction);
      setactive_sub_faction(null);
      return setsub_faction_arr(foundObjects[0]?.sub);
    }
  }, [active_faction]);

  useEffect(() => {
    setsearch_text("");

    if (active_sub_faction == null) {
      // setsub_faction_arr([]);
      // setcopy_products(second_copy_products);
      return;
    } else {
      // Custom case-insensitive search using filter
      const foundObjects = products.filter((product: any) =>
        product.subfactions.includes(active_sub_faction),
      );

      setcopy_products(foundObjects);
      console.log(foundObjects);
      // return setsub_faction_arr(foundObjects[0]?.sub);
    }
  }, [active_sub_faction]);

  useEffect(() => {
    setcopy_products(products);
    // setsecond_copy_products(products);
  }, [products]);

  useEffect(() => {
    const db = getFirestore();
    const productsRef = collection(db, "products");

    // for pagiantion

    const col_qery = query(productsRef, orderBy("createdAt", "desc"));
    setis_network_err(true);
    const unsubscribe = onSnapshot(col_qery, (querySnapshot) => {
      setproduct_is_loading(true);
      const productsArray = querySnapshot.docs.map((doc) => {
        const { cover_png, title, factions, subfactions } = doc.data();
        setis_network_err(false);
        return {
          id: doc.id,
          cover_png,
          title,
          factions,
          subfactions,
        };
      });
      setproducts(productsArray);
      setproduct_is_loading(false);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []); //

  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}
      <Profile_dropdown />
      <div className="w-full h-fit z-[99] sm:h-[20vw]   fixed top-[-0.9vw] ">
        <Header />
      </div>

      {show_setting_modal && <Settings_modal />}

      {mobile_faction_active && (
        <div className="w-full h-full sm:block hidden sm:top sm:relative">
          <Mobile_factions
            faction_option={faction_option}
            setmobile_faction_active={setmobile_faction_active}
            setactive_faction={setactive_faction}
            active_faction={active_faction}
            setfaction_data={setfaction_data}
            sub_faction_arr={sub_faction_arr}
            active_sub_faction={active_sub_faction}
            setactive_sub_faction={setactive_sub_faction}
          />
        </div>
      )}
      <Home_hero />
      <div className="w-full h-[4vw] sm:h-[25vw]"></div>
      <div
        className="w-full h-auto sm:px-[3vw] flex transition duration-[2s] "
        style={{
          transform: `translateY(${left})`,
        }}
      >
        {!product_is_loading ? (
          <>
            <Fractions
              faction_option={faction_option}
              setactive_faction={setactive_faction}
              active_faction={active_faction}
              setfaction_data={setfaction_data}
              sub_faction_arr={sub_faction_arr}
              active_sub_faction={active_sub_faction}
              setactive_sub_faction={setactive_sub_faction}
            />
            <Products
              products={copy_products}
              setmobile_faction_active={setmobile_faction_active}
              setsearch_text={setsearch_text}
              is_network_err={is_network_err}
              search_text={search_text}
            />
          </>
        ) : (
          <>
            <Fractions_preloader />
            <Product_preloader />
          </>
        )}
      </div>

      {/* <button
        className="w-[100vw] h-[100vh]"
        onClick={() => {

          axios
            .delete(
              `https://pop-up-x6pg.onrender.com/banner/6595408b026be0da5721b3f4`,
            )
            .then((res) => {
              console.log(res.data);
            })
            .catch((error) => {
              console.error("Error deleting banner:", error);
            });
        }}
      >
        click me{" "}
      </button> */}
    </>
  );
}
