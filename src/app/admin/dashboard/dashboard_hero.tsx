"use client ";

import { useProfile_Context } from "@/app/utils/profile_context";
import Link from "next/link";
import post_icon from "../../../../public/admin_section/dashboard/post_icon.webp";
import sub_icon from "../../../../public/admin_section/dashboard/sub_icon.webp";
import up from "../../../../public/admin_section/dashboard/up.png";
import down from "../../../../public/admin_section/dashboard/down.png";
import digital_icon from "../../../../public/admin_section/dashboard/digital_sales.webp";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Timestamp,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const Dashboard_hero_section = ({
  admin_username,
  all_subscribers_in_dashboard,
  all_subscribers_is_loading,
}: any) => {
  const { setpage_loader }: any = useProfile_Context();

  const [sales_is_loading, setsales_is_loading] = useState(true);
  const [post_is_loading, setpost_is_loading] = useState(true);
  const [subscriber_is_loading, setsubscriber_is_loading] = useState(true);
  const [
    digital_sales_currentMonthDownloads,
    setdigital_sales_CurrentMonthDownloads,
  ] = useState(0);
  const [
    digital_sales_previousMonthDownloads,
    setdigital_sales_PreviousMonthDownloads,
  ] = useState(0);
  const [digital_sales_percentageChange, setdigital_sales_PercentageChange] =
    useState(0);
  const [total_digital_sales, settotal_digital_sales] = useState(0);
  const [digital_sales_isIncrease, setdigital_sales_IsIncrease] =
    useState<any>(null);

  const [currentMonthPostEngagement, setCurrentMonthPostEngagement] =
    useState(0);
  const [previousMonthPostEngagement, setPreviousMonthPostEngagement] =
    useState(0);
  const [postEngagementPercentageChange, setPostEngagementPercentageChange] =
    useState(0);
  const [isPostEngagementIncrease, setIsPostEngagementIncrease] =
    useState<any>(null);
  const [total_posts, settotal_posts] = useState(0);

  const [currentMonthSubscribers, setCurrentMonthSubscribers] = useState(0);
  const [previousMonthSubscribers, setPreviousMonthSubscribers] = useState(0);
  const [subscribersPercentageChange, setSubscribersPercentageChange] =
    useState(0);
  const [isSubscribersIncrease, setIsSubscribersIncrease] = useState<any>(null);
  const [total_subscribers, settotal_subscribers] = useState(0);
  // this is for loading the digital sales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const libraryCollection = collection(db, "libray");

        const currentDate = new Date();
        const currentMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        );
        const currentMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
          ),
        );

        const previousMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
        const previousMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0,
            23,
            59,
            59,
          ),
        );

        const currentMonthQuery = query(
          libraryCollection,
          where("downloadedAt", ">=", currentMonthStart),
          where("downloadedAt", "<=", currentMonthEnd),
          where("downloaded", "==", true),
        );
        const previousMonthQuery = query(
          libraryCollection,
          where("downloadedAt", ">=", previousMonthStart),
          where("downloadedAt", "<=", previousMonthEnd),
          where("downloaded", "==", true),
        );
        // Query documents where 'downloadedAt' is not empty
        const downloadedDocumentsQuery = query(
          libraryCollection,
          where("downloadedAt", "!=", null),
        );

        const downloadedDocumentsSnapshot = await getDocs(
          downloadedDocumentsQuery,
        );

        settotal_digital_sales(downloadedDocumentsSnapshot.size);

        const currentMonthSnapshot = await getDocs(currentMonthQuery);
        const currentMonthData = currentMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setdigital_sales_CurrentMonthDownloads(currentMonthData.length);

        const previousMonthSnapshot = await getDocs(previousMonthQuery);
        const previousMonthData = previousMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setdigital_sales_PreviousMonthDownloads(previousMonthData.length);

        const digital_sales_percentageChangeValue =
          currentMonthData.length !== 0
            ? ((currentMonthData.length - previousMonthData.length) /
                currentMonthData.length) *
              100
            : 0;
        const roundedDigitalSalesPercentageChange = parseFloat(
          digital_sales_percentageChangeValue.toFixed(1),
        );

        setdigital_sales_PercentageChange(roundedDigitalSalesPercentageChange);

        // Determine if it's an increase or decrease
        setdigital_sales_IsIncrease(
          currentMonthData.length >= previousMonthData.length,
        );
        setsales_is_loading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // this is for loading the postengagement
  useEffect(() => {
    const fetchPostEngagementData = async () => {
      try {
        const db = getFirestore();
        const libraryCollection = collection(db, "post_engagement");

        const currentDate = new Date();
        const currentMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        );
        const currentMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
          ),
        );

        const previousMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
        const previousMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0,
            23,
            59,
            59,
          ),
        );

        const currentMonthQuery = query(
          libraryCollection,
          where("createdAt", ">=", currentMonthStart),
          where("createdAt", "<=", currentMonthEnd),
        );
        const previousMonthQuery = query(
          libraryCollection,
          where("createdAt", ">=", previousMonthStart),
          where("createdAt", "<=", previousMonthEnd),
        );

        const post_size = collection(db, "posts");
        const post_size_snapshot = await getDocs(post_size);
        settotal_posts(post_size_snapshot.size);

        const currentMonthSnapshot = await getDocs(currentMonthQuery);
        const currentMonthData = currentMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setCurrentMonthPostEngagement(currentMonthData.length);

        const previousMonthSnapshot = await getDocs(previousMonthQuery);
        const previousMonthData = previousMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setPreviousMonthPostEngagement(previousMonthData.length);

        const postEngagementPercentageChangeValue =
          currentMonthData.length !== 0
            ? ((currentMonthData.length - previousMonthData.length) /
                currentMonthData.length) *
              100
            : 0;

        const roundedpostengagementPercentageChange = parseFloat(
          postEngagementPercentageChangeValue.toFixed(1),
        );
        setPostEngagementPercentageChange(
          roundedpostengagementPercentageChange,
        );

        // Determine if it's an increase or decrease
        setIsPostEngagementIncrease(
          currentMonthData.length >= previousMonthData.length,
        );
        setpost_is_loading(false);
      } catch (error) {
        console.error("Error fetching post engagement data:", error);
      }
    };

    fetchPostEngagementData();
  }, []); // The empty dependency array ensures that this useEffect only runs once on component mount

  // this is for checking subsribers states
  useEffect(() => {
    const fetchSubscribersData = async () => {
      try {
        const db = getFirestore();
        const usersCollectionRef = collection(db, "users");

        // Calculate the timestamp for the start and end of the current month
        const currentDate = new Date();
        const currentMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
        );
        const currentMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0,
            23,
            59,
            59,
          ),
        );

        // Calculate the timestamp for the start and end of the previous month
        const previousMonthStart = Timestamp.fromDate(
          new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
        );
        const previousMonthEnd = Timestamp.fromDate(
          new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            0,
            23,
            59,
            59,
          ),
        );

        // Query users who subscribed in the current month and have not canceled their subscription
        const currentMonthQuery = query(
          usersCollectionRef,
          where("subscribedAt", ">=", currentMonthStart),
          where("subscribedAt", "<=", currentMonthEnd),
          where("subscriptionCancelled", "==", false),
        );

        // Query users who subscribed in the previous month and have not canceled their subscription
        const previousMonthQuery = query(
          usersCollectionRef,
          where("subscribedAt", ">=", previousMonthStart),
          where("subscribedAt", "<=", previousMonthEnd),
          where("subscriptionCancelled", "==", false),
        );

        // Query users where subscribedAt has a value and is not null
        const subscribedUsersQuery = query(
          usersCollectionRef,
          where("subscribedAt", "!=", null),
        );

        const subscribedUsersSnapshot = await getDocs(subscribedUsersQuery);
        settotal_subscribers(subscribedUsersSnapshot.size);

        const currentMonthSnapshot = await getDocs(currentMonthQuery);
        const currentMonthData = currentMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setCurrentMonthSubscribers(currentMonthData.length);

        const previousMonthSnapshot = await getDocs(previousMonthQuery);
        const previousMonthData = previousMonthSnapshot.docs.map((doc) =>
          doc.data(),
        );
        setPreviousMonthSubscribers(previousMonthData.length);

        const subscribersPercentageChangeValue =
          currentMonthData.length !== 0
            ? ((currentMonthData.length - previousMonthData.length) /
                currentMonthData.length) *
              100
            : 0;

        const roundedsusbscribersPercentageChange = parseFloat(
          subscribersPercentageChangeValue.toFixed(1),
        );
        setSubscribersPercentageChange(roundedsusbscribersPercentageChange);

        // Determine if it's an increase or decrease
        setIsSubscribersIncrease(
          currentMonthData.length >= previousMonthData.length,
        );
        setsubscriber_is_loading(false);
      } catch (error) {
        console.error("Error fetching subscribers data:", error);
      }
    };

    fetchSubscribersData();
  }, []); // The empty dependency array ensures that this useEffect only runs once on component mount

  return (
    <>
      <div className="w-full  px-[2vw] sm:px-0 flex mt-[8vw] sm:mt-[30vw] flex-col sm:gap-[10vw] gap-[2vw]">
        {/* the first row is for the path and the ctn  */}
        <div className="w-full sm:hidden h-auto flex justify-between sm:justify-center items-center  neuer text-[1vw] ">
          <p className="text-opacity-[30%] text-white sm:hidden">
            Home /{" "}
            <span className="text-white text-opacity-[100%]">Dashboard</span>
          </p>
          <Link
            href={"/admin/postupload"}
            onClick={() => {
              setpage_loader(true);
            }}
            className="bg-[#CCFF00]  cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center text-[1vw] rounded-[1vw] h-[3.5vw] w-[12vw]"
          >
            Add new post
          </Link>{" "}
        </div>

        {/* the second div carries the stats on here */}
        {/* these designs are hidden for mobile screens . mobile screen design below  */}
        <div className="w-full h-auto flex sm:hidden justify-between items-end  ">
          {/* this is for the first column */}
          <div className="w-[34%] h-auto    flex flex-col   gap-[4vw] ">
            {/* the header of the first section on this row  */}
            <div className="w-full flex flex-col gap-[0.2vw]">
              <h1 className="neuem  text-[2.3vw] text-white ">
                Good Day, {admin_username}
              </h1>
              <p className="neuer text-[1.2vw] text-white text-opacity-[40%] ">
                Track and manage all forge digital and physical sales
              </p>
            </div>

            {/* this is the colored section on this row  */}

            <div className="w-full h-[13vw] bg-[#CCFF00] items-center px-[1.5vw] flex gap-[2vw] justify-between rounded-[2vw]">
              <div className="flex flex-col w-auto gap-[2.5vw] ">
                {all_subscribers_is_loading ? (
                  <div className="w-[80%] h-[2vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-[2vw] neuem">
                    {all_subscribers_in_dashboard}{" "}
                    <span className="text-[1vw] neuer">New Subscribers</span>
                  </p>
                )}

                <p className="text-[1vw] neuem">
                  See all new subscribed members
                </p>
              </div>
              <button
                onClick={() => {
                  //   setpage_loader(true);
                }}
                className="bg-[black] cursor-pointer hover:bg-opacity-[40%] neuer text-white flex justify-center items-center text-[1vw] rounded-[1vw] h-[3.5vw] w-[12vw]"
              >
                See new members
              </button>{" "}
            </div>
          </div>

          {/* this is for the second columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image src={post_icon} alt="post_img" className="w-[5vw] h-fit" />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              Total posts
            </p>

            {/* this is the loader for the number of sales*/}
            {post_is_loading ? (
              <div className="w-[50%] h-[2.5vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white neuem text-[2vw] ">{total_posts}</p>
            )}

            {/* this is the loader */}
            {post_is_loading ? (
              <div className="w-[30%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <div className="w-full flex justify-start items-center gap-[0.3vw] ">
                <Image
                  src={!isPostEngagementIncrease ? down : up}
                  alt="up arrow "
                  className="w-[1vw] h-fit"
                />
                <p
                  className="text-[#77DC5E] text-[1vw] neuer"
                  style={{
                    color: isPostEngagementIncrease ? "#77DC5E" : "#DC5E5E",
                  }}
                >
                  {" "}
                  {postEngagementPercentageChange}%
                </p>
              </div>
            )}

            {/* this is the loader to show whether increase of decrease  */}
            {post_is_loading ? (
              <div className="w-[80%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
                {isPostEngagementIncrease
                  ? "  Increase vs last month"
                  : "  Decrease vs last month"}
              </p>
            )}
          </div>

          {/* this is for the third columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image src={sub_icon} alt="post_img" className="w-[5vw] h-fit" />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              All Subscribers
            </p>

            {/* this is the loader for the number of sales*/}
            {subscriber_is_loading ? (
              <div className="w-[50%] h-[2.5vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white neuem text-[2vw] ">
                {total_subscribers}
              </p>
            )}

            {/* this is the loader */}
            {subscriber_is_loading ? (
              <div className="w-[30%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <div className="w-full flex justify-start items-center gap-[0.3vw] ">
                <Image
                  src={!isSubscribersIncrease ? down : up}
                  alt="up arrow "
                  className="w-[1vw] h-fit"
                />
                <p
                  className="text-[#77DC5E] text-[1vw] neuer"
                  style={{
                    color: isSubscribersIncrease ? "#77DC5E" : "#DC5E5E",
                  }}
                >
                  {" "}
                  {subscribersPercentageChange}%
                </p>
              </div>
            )}

            {/* this is the loader to show whether increase of decrease  */}
            {subscriber_is_loading ? (
              <div className="w-[80%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
                {isSubscribersIncrease
                  ? "  Increase vs last month"
                  : "  Decrease vs last month"}
              </p>
            )}
          </div>

          {/* this is for the fourth columen */}
          <div className="w-[20%] h-[21vw]  justify-center  flex-col flex bg-[#151515] rounded-[2vw] px-[2vw]   gap-[1.3vw] ">
            <Image
              src={digital_icon}
              alt="post_img"
              className="w-[5vw] h-fit"
            />
            <p className="text-white text-opacity-[40%] neuer text-[1.4vw] ">
              Digital sales
            </p>

            {/* this is the loader for the number of sales*/}
            {sales_is_loading ? (
              <div className="w-[50%] h-[2.5vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white neuem text-[2vw] ">
                {total_digital_sales}
              </p>
            )}

            {/* this is the loader */}
            {sales_is_loading ? (
              <div className="w-[30%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <div className="w-full flex justify-start items-center gap-[0.3vw] ">
                <Image
                  src={!digital_sales_isIncrease ? down : up}
                  alt="up arrow "
                  className="w-[1vw] h-fit"
                />
                <p
                  className="text-[#77DC5E] text-[1vw] neuer"
                  style={{
                    color: digital_sales_isIncrease ? "#77DC5E" : "#DC5E5E",
                  }}
                >
                  {" "}
                  {digital_sales_percentageChange}%
                </p>
              </div>
            )}

            {/* this is the loader to show whether increase of decrease  */}
            {sales_is_loading ? (
              <div className="w-[80%] h-[2vw] bg-[black] animate-pulse "></div>
            ) : (
              <p className="text-white text-opacity-[40%] neuer text-[1vw] ">
                {digital_sales_isIncrease
                  ? "  Increase vs last month"
                  : "  Decrease vs last month"}
              </p>
            )}
          </div>
        </div>

        {/* this is for tthe mobile screen */}
        {/* mobile design begins */}
        <div className="w-full hidden sm:flex  flex-col gap-[3vw]">
          <div className="w-full flex flex-col gap-[4vw] px-[3vw]">
            <div className="w-full flex justify-between items-start  ">
              <h1 className="neuem  text-[7vw] text-white ">
                Good <br /> DY, {admin_username}
              </h1>
              <Link
                href={"/admin/postupload"}
                onClick={() => {
                  setpage_loader(true);
                }}
                className="bg-[#151515] text-white text-opacity-[60%] sm:w-[30vw] sm:h-[11vw] sm:text-[3vw] sm:rounded-[2vw] cursor-pointer hover:bg-opacity-[40%] neuer flex justify-center items-center "
              >
                Add new post
              </Link>{" "}
            </div>

            <p className="neuer text-[3.5vw] text-white text-opacity-[40%] ">
              Track and manage all forge digital and <br /> physical sales
            </p>
          </div>

          <div className="w-full overflow-x-scroll  cover_scrollbar  flex h-auto  py-[3vw] ">
            <div className="w-[200vw] pl-[3vw] pr-[4vw] justify-start gap-[4vw] flex ">
              {/* this is for the second columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={post_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />
                <p className="text-white  text-opacity-[40%] neuer text-[4vw] ">
                  Total posts
                </p>

                {/* this is the loader for the post engagement */}
                {post_is_loading ? (
                  <div className="w-[50%] h-[8vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white neuem text-[6vw] ">{total_posts}</p>
                )}
                {/* this is the loader */}
                {post_is_loading ? (
                  <div className="w-[50%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <div className="w-full flex justify-start items-center gap-[2vw] ">
                    <Image
                      src={!isPostEngagementIncrease ? down : up}
                      alt="up arrow "
                      className="w-[4vw] h-fit"
                    />
                    <p
                      className="text-[#77DC5E] text-[3.5vw] neuer"
                      style={{
                        color: isPostEngagementIncrease ? "#77DC5E" : "#DC5E5E",
                      }}
                    >
                      {postEngagementPercentageChange}%
                    </p>
                  </div>
                )}

                {/* this is the loader to show whether increase of decrease  */}
                {post_is_loading ? (
                  <div className="w-[80%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                    {isPostEngagementIncrease
                      ? "  Increase vs last month"
                      : "  Decrease vs last month"}
                  </p>
                )}
              </div>

              {/* this is for the third columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={sub_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />

                <p className="text-white  text-opacity-[40%] neuer text-[4vw] ">
                  All Subscribers
                </p>
                {/* this is the loader for the post engagement */}
                {subscriber_is_loading ? (
                  <div className="w-[50%] h-[8vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white neuem text-[6vw] ">
                    {total_subscribers}
                  </p>
                )}
                {/* this is the loader */}
                {subscriber_is_loading ? (
                  <div className="w-[50%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <div className="w-full flex justify-start items-center gap-[2vw] ">
                    <Image
                      src={!isSubscribersIncrease ? down : up}
                      alt="up arrow "
                      className="w-[4vw] h-fit"
                    />
                    <p
                      className="text-[#77DC5E] text-[3.5vw] neuer"
                      style={{
                        color: isSubscribersIncrease ? "#77DC5E" : "#DC5E5E",
                      }}
                    >
                      {subscribersPercentageChange}%
                    </p>
                  </div>
                )}

                {/* this is the loader to show whether increase of decrease  */}
                {subscriber_is_loading ? (
                  <div className="w-[80%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                    {isSubscribersIncrease
                      ? "  Increase vs last month"
                      : "  Decrease vs last month"}
                  </p>
                )}
              </div>

              {/* this is for the fourth columen */}
              <div className="w-[60vw] h-[70vw]  justify-center  flex-col flex bg-[#151515] rounded-[5vw] px-[4vw]   gap-[5vw] ">
                <Image
                  src={digital_icon}
                  alt="post_img"
                  className="w-[15vw] h-fit"
                />
                <p className="text-white text-opacity-[40%] neuer text-[4vw] ">
                  Digital sales
                </p>

                {/* this is the loader for the number of sales*/}
                {sales_is_loading ? (
                  <div className="w-[50%] h-[8vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white neuem text-[6vw] ">
                    {total_digital_sales}
                  </p>
                )}
                {/* this is the loader */}
                {sales_is_loading ? (
                  <div className="w-[50%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <div className="w-full flex justify-start items-center gap-[2vw] ">
                    <Image
                      src={!digital_sales_isIncrease ? down : up}
                      alt="up arrow "
                      className="w-[4vw] h-fit"
                    />
                    <p
                      className="text-[#77DC5E] text-[3.5vw] neuer"
                      style={{
                        color: digital_sales_isIncrease ? "#77DC5E" : "#DC5E5E",
                      }}
                    >
                      {digital_sales_percentageChange}%
                    </p>
                  </div>
                )}

                {/* this is the loader to show whether increase of decrease  */}
                {sales_is_loading ? (
                  <div className="w-[80%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-white text-opacity-[40%] neuer text-[3.5vw] ">
                    {digital_sales_isIncrease
                      ? "  Increase vs last month"
                      : "  Decrease vs last month"}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* this is for the coloure mobile section  */}
          <div className="w-full h-auto px-[3vw]">
            <div className="w-full h-[30vw] bg-[#CCFF00] items-center px-[2vw] flex gap-[2vw] justify-between rounded-[4vw]">
              <div className="flex flex-col w-auto gap-[5vw] ">
                {all_subscribers_is_loading ? (
                  <div className="w-[80%] h-[5vw] bg-[black] animate-pulse "></div>
                ) : (
                  <p className="text-[5vw] neuem">
                    {all_subscribers_in_dashboard}{" "}
                    <span className="text-[3.3vw] neuer">New Subscribers</span>
                  </p>
                )}

                <p className="text-[3vw] neuem">
                  See all new subscribed members
                </p>
              </div>
              <button
                onClick={() => {
                  //   setpage_loader(true);
                }}
                className="bg-[black] cursor-pointer hover:bg-opacity-[40%] neuer text-white flex justify-center items-center text-[2.5vw] rounded-[3vw] h-[12vw] w-[35vw]"
              >
                See new members
              </button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_hero_section;
