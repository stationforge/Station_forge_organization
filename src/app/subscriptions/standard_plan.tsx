"use client ";

import Image from "next/image";
import React, { useState } from "react";
import stan_1 from "../../../public/subscription/stan_1.webp";
import stan_2 from "../../../public/subscription/stan_2.webp";
import stan_3 from "../../../public/subscription/stan_3.webp";
import stan_4 from "../../../public/subscription/stan_4.webp";
import stan_5 from "../../../public/subscription/stan_5.webp";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  manage_subscription,
  pay_standard_Subscriptions,
  renew_subscription,
  stripe,
} from "../utils/stripe";
import { useProfile_Context } from "../utils/profile_context";

const StandardPlan = ({
  currentplan,
  email,
  uuid,
  customer,
  current_subscription_plain,
  standard_isloading,
  setstandard_isloading,
}: any) => {
  const { setpage_loader, Add_notification }: any = useProfile_Context();

  const [list, setlist] = useState([
    {
      img: stan_2,
      txt: "Early access to content",
    },
    {
      img: stan_3,
      txt: "Digital downloads",
    },
    {
      img: stan_4,
      txt: "20% OFF on all the previous months releases",
    },
    {
      img: stan_5,
      txt: "Discord access",
    },
  ]);

  const router = useRouter();

  function getNextMonthTimestamp() {
    const currentDate = new Date();
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1, 1); // Set to 1st day of next month
    return Math.floor(nextMonth.getTime() / 1000); // Convert to Unix timestamp (in seconds)
  }

  const paynow = async () => {
    if (uuid != "" && email != "") {
      try {
        setstandard_isloading(true);
        Add_notification("Initiated standard subscription");

        // console.log("this was standard");
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await pay_standard_Subscriptions(uuid, email);

        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };

  const manage_merchant_subscriptions = async () => {
    if (customer != "") {
      try {
        setstandard_isloading(true);

        const manage_session = await manage_subscription(customer);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);

        const stripe = await stripe_promise;
        if (manage_session.url && stripe) {
          router.push(manage_session.url);
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };

  const renew_subscription_to_standard = async () => {
    if (customer != "") {
      try {
        setstandard_isloading(true);
        const pusblishablekey: any =
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
        const stripe_promise = loadStripe(pusblishablekey);
        const stripe = await stripe_promise;
        const session_url = await renew_subscription(
          customer,
          uuid,
          email,
          process.env.NEXT_PUBLIC_STANDARD_PRICE,
        );
        if (session_url.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: session_url.id,
          });
        }
      } catch (error: any) {
        setstandard_isloading(false);

        console.error("Error creating Checkout session:", error);
        if (error && error.raw && error.raw.message) {
          console.error("Stripe API Error Message:", error.raw.message);
        }
        throw error;
      }
    } else {
      setstandard_isloading(false);

      return;
    }
  };
  return (
    <>
      <div className="w-[29vw] sm:w-[80vw] sm:h-[130vw]  h-[50vw] pt-[2vw] pb-[2vw] px-[1.2vw] sm:px-[6vw] flex flex-col justify-center items-center  bg-[#111111] rounded-[1.2vw] sm:border-l-[1.6vw] border-l-[0.5vw] gap-[2vw] sm:gap-[4vw] sm:rounded-[4vw]   border-[#4C89E5]">
        {/* first row div */}
        <div className="w-full flex justify-between items-center">
          <Image
            src={stan_1}
            className="w-[3vw] sm:w-[15vw] h-fit"
            alt="most popular image placeholder"
          />

          <h3 className="neuer text-[1.2vw] sm:text-[3vw] sm:py-[2vw] sm:px-[4vw] sm:rounded-[4vw] text-black bg-white py-[0.7vw] px-[1.4vw] rounded-[2.7vw]">
            Most popular{" "}
          </h3>
        </div>
        {/* second row div */}
        <div className="w-full flex   flex-col gap-[0.4vw] sm:gap-[1vw] pb-[1vw] ">
          <h2 className="text-[2.1vw] text-white neuem sm:text-[6vw]">
            Standard Tier
          </h2>
          <h3 className="text-white neuer text-opacity-[40%] sm:text-[2.7vw] text-[1vw]">
            Access to monthly releases <br className="sm:hidden" />
            (files <br className="sm:block hidden" /> are pre-supported)
          </h3>
        </div>

        {/* thired div  */}
        <div className="w-full">
          <h3 className="text-white text-[2.3vw] neuem sm:text-[4vw]">
            $10{" "}
            <span className="text-opacity-[40%] text-white  text-[1.2vw] sm:text-[3vw]">
              /Month
            </span>
          </h3>
        </div>

        {/* fourth div */}
        <ul className="w-full h-auto flex-col flex gap-[1vw] sm:gap-[3vw] pb-[1.5vw]">
          {list.map((e: any, index: any) => {
            return (
              <li key={index} className="flex gap-[1.2vw] items-center">
                <Image
                  src={e.img}
                  alt={e.txt}
                  className="w-[3vw] sm:w-[10vw] h-fit"
                />
                <p className="text-[1vw] text-white neuer sm:text-[3vw]">
                  {e.txt}
                </p>
              </li>
            );
          })}
        </ul>

        {/* fivth div  also known as button */}
        <button
          className="w-full h-[4vw]  flex justify-center items-center sm:gap-[4vw] gap-[1vw] text-[1.4vw] neuem rounded-[3.7vw] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[3.7vw] sm:h-[10vw] "
          onClick={() => {
            if (!uuid) {
              setpage_loader(true);
              router.push("/login?ref=subscription");
            } else if (!customer) {
              paynow();
            } else if (customer && currentplan == 1) {
              renew_subscription_to_standard();
            } else if (
              (customer != "" && currentplan == 3) ||
              currentplan == 4
            ) {
              manage_merchant_subscriptions();
            }
          }}
        >
          {!customer && "Join"}
          {customer &&
            currentplan == 1 &&
            current_subscription_plain == "Public user" &&
            "Renew subscription"}
          {customer && currentplan == 3 && "Manage active subscription "}
          {customer && currentplan == 4 && "Downgrade subscription "}

          {/* {customer &&
            current_subscription_plain == "Merchant tier" &&
            "Downgrade "} */}

          {standard_isloading && (
            <div className="rounded-[100%] sm:h-[7vw] sm:border-t-[1vw] sm:w-[7vw] h-[2vw] w-[2vw]  border-solid  border-t-[0.3vw] border-[black] animate-spin"></div>
          )}
        </button>

        {/* {customer == "" && (
          <button
            className="w-full h-[4vw] text-[1.6vw] neuem rounded-[3.7vw] sm:rounded-[5vw] transition duration-[0.2s] hover:bg-[#7e9426] bg-[#CCFF00] sm:text-[4vw] sm:h-[10vw] "
            onClick={paynow}
          >
            Join
          </button>
        )} */}
      </div>{" "}
    </>
  );
};

export default StandardPlan;
