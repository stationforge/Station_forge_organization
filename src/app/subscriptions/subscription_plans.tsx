"use client ";

import React, { useEffect, useState } from "react";
import bg_image from "../../../public/login/login.webp";
import Image from "next/image";
import StandardPlan from "./standard_plan";
import mob_bg from "../../../public/subscription/mob_bg_sub.webp";
import Merchant_plan from "./merchat_plan";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import { stripe } from "../utils/stripe";

const Subscription_Plans = () => {
  const app = initializeApp(firebaseConfig);
  const [uuid, setuuid] = useState("");
  const [doc_user_ref_id, setdoc_user_ref_id] = useState("");
  const [currentplan, setcurrentplan] = useState(0);
  const [current_subscription_plain, setcurrent_subscription_plain] =
    useState("");
  const [email, setemail] = useState("");
  const [customer, setcustomer] = useState("");
  const [merchant_isloading, setmerchant_isloading] = useState(false);
  const [standard_isloading, setstandard_isloading] = useState(false);

  // Initialize Firestore
  const db = getFirestore(app);
  const auth: any = getAuth();

  // to check the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuuid(user.uid);
      } else {
        setuuid("");
        setcustomer("");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // this is to check to manage subscription

  useEffect(() => {
    if (auth.currentUser) {
      const userCollectionRef = collection(db, "users");
      const userQuery = query(
        userCollectionRef,
        where("userid", "==", auth.currentUser.uid),
      );

      const unsubscribe = onSnapshot(userQuery, (snapshot) => {
        if (!snapshot.empty) {
          snapshot.forEach((doc) => {
            // Extract user data from the document
            const userDataFromFirestore = doc.data();
            //  setUserData(userDataFromFirestore);
            setdoc_user_ref_id(doc.id);
            setmerchant_isloading(false);
            setstandard_isloading(false);
            setemail(userDataFromFirestore.Email);
            setuuid(userDataFromFirestore.userid);
            setcurrent_subscription_plain(userDataFromFirestore.subscription);
            setcustomer(userDataFromFirestore.subscriptionId);
            setcurrentplan(userDataFromFirestore.step);
          });
        } else {
          console.log("No user document found.");
          //  setUserData(null);
        }
      });

      // Clean up the listener when the component unmounts or when needed
      return () => {
        unsubscribe();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  const searchParams = useSearchParams();

  const session_id = searchParams.get("session_id");
  // useEffect(() => {
  //   // checkSubscription(session_id);
  //   const fetchsession = async () => {
  //     if (session_id) {
  //       const session: any = await stripe.checkout.sessions.retrieve(
  //         session_id ?? "",
  //       );

  //       console.log(session.customer);

  //       if (session.subscription) {
  //         const subscriptionId: any = session.subscription;

  //         // Retrieve additional information about the subscription
  //         const subscription: any = await stripe.subscriptions.retrieve(
  //           subscriptionId ?? "",
  //         );
  //         if (subscription.plan.id == "price_1OBmWvHosKgwPfXjrxDrY480") {
  //           update_user_doc(
  //             4,
  //             session.metadata.userId,
  //             "Merchant tier",
  //             session.customer,
  //           );
  //           console.log("NEXT_PUBLIC_MERCHANT_PRICE");
  //         } else if (subscription.plan.id == "price_1OGPHMHosKgwPfXjyfz6axKz") {
  //           update_user_doc(
  //             3,
  //             session.metadata.userId,
  //             "Standard tier",
  //             session.customer,
  //           );
  //           console.log("NEXT_PUBLIC_STANDARD_PRICE");
  //         }
  //       }
  //     }
  //   };

  //   fetchsession();
  // }, [session_id]);

  // const update_user_doc = async (
  //   e: number,
  //   id: string,
  //   type: string,
  //   subscriptionid: string,
  // ) => {
  //   try {
  //     const userQuery = query(
  //       collection(db, "users"),
  //       where("userid", "==", id),
  //     );
  //     const userDocs = await getDocs(userQuery);

  //     if (userDocs.empty) {
  //       console.log("No user document found for the current user");
  //       return;
  //     }

  //     const userDocRef = doc(db, "users", userDocs.docs[0].id);
  //     await updateDoc(userDocRef, {
  //       subscribedAt: serverTimestamp(),
  //       step: e,
  //       subscriptionCancelled: false,
  //       subscription: type,
  //       subscriptionId: subscriptionid,
  //     });

  //     console.log("User document updated successfully");
  //   } catch (error) {
  //     console.error("Error updating user document:", error);
  //     throw error;
  //   }
  // };
  return (
    <>
      <div className="w-full h-auto justify-center flex flex-col items-center sm:pb[6vw] pb-[3vw] relative">
        <div className="w-auto py-[2vw] sm:rounded-[2.6vw] sm:py-[5vw] sm:px-[5vw] px-[4vw] rounded-[0.8vw] border-[0.15vw]  border-opacity-[40%] border-white flex flex-col gap-[0.7vw] z-[9] bg-black">
          <h1 className="text-[2.4vw] sm:text-[5vw] neuem text-white text-center">
            choose a plan
          </h1>
          <h2 className="text-white sm:text-[3vw] text-[1.3vw] text-center neuem text-opacity-[30%]">
            We have a two part selection subscription plan <br /> that gives you
            the best fit for for you
          </h2>
        </div>
        <div className="w-full  justify-center flex flex-col items-center z-[9]  sm:pt-[7vw] pt-[3vw]">
          <p className="text-[3.2vw] neuem text-white sm:text-[7vw]">
            StationForge
          </p>

          {/* this is where the pricing would be  */}
          <div className="h-auto sm:h-[150vw] cover_scrollbar w-full sm:relative sm:overflow-x-scroll ">
            <div className="w-auto sm:px-[4vw] pt-[3vw] sm:pt-[6.5vw] sm:top-0 sm:left-0  sm:absolute justify-center items-center flex gap-[3vw] sm:gap-[5vw]">
              <StandardPlan
                email={email}
                uuid={uuid}
                currentplan={currentplan}
                customer={customer}
                current_subscription_plain={current_subscription_plain}
                standard_isloading={standard_isloading}
                setstandard_isloading={setstandard_isloading}
              />
              <Merchant_plan
                email={email}
                uuid={uuid}
                currentplan={currentplan}
                customer={customer}
                current_subscription_plain={current_subscription_plain}
                merchant_isloading={merchant_isloading}
                setmerchant_isloading={setmerchant_isloading}
              />
            </div>
          </div>
        </div>
        <Image
          src={bg_image}
          alt="background image"
          className="absolute w-full h-full sm:hidden top-0 left-0 z-[5]"
        />
        <Image
          src={mob_bg}
          alt="background image"
          className="absolute w-full h-full hidden sm:block  top-0 left-0 z-[5]"
        />
      </div>
    </>
  );
};

export default Subscription_Plans;
