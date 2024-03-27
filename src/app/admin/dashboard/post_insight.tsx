// pages/postAnalytics.js
import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import downloads from "../../../../public/admin_section/dashboard/downloads.png";
// Register chart components
ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
import {
  getFirestore,
  collection,
  getDocs,
  orderBy,
  where,
  query,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import Image from "next/image";
const Dashboard_post_analytics = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const chartRef = useRef(null);
  // const [selectedYear, setSelectedYear] = useState("2023");
  // const [selectedMonth, setSelectedMonth] = useState("01");
  const [chartData, setChartData] = useState<any>({
    // ... existing data and labels
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "",
        data: [0, 0, 0, 0], // Make sure these are valid numbers
        fill: true,
        // backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "",
        borderWidth: 0, // Ensure this is greater than 0
        tension: 0.4, // Smoothness of the line
        pointBackgroundColor: "",
        pointBorderColor: "",
        pointHoverBackgroundColor: "",
        pointBorderWidth: 3, // Increase point border width
        pointHoverBorderWidth: 4,
        pointRadius: 5, // Increase point size
        pointHoverRadius: 7, // Increase point size on hover
        pointHoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  });
  // useEffect(() => {
  //   if (chartRef.current) {
  //     const chart: any = chartRef.current;
  //     const ctx: any = chart.ctx; // Or chart.canvas.getContext('2d') if necessary
  //     const gradient = ctx.createLinearGradient(0, 0, 0, chart.height);

  //     gradient.addColorStop(0.6, "rgba(76, 137, 229, 1)"); // Light blue with opacity
  //     gradient.addColorStop(1, "rgba(204, 255, 0, 0.1)"); // Yellow with opacity
  //     // Update chart data
  // setChartData({
  //   labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  //   datasets: [
  //     {
  //       label: "",
  //       data: [0, 180, 220, 200], // Make sure these are valid numbers
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderWidth: 5, // Ensure this is greater than 0
  //       tension: 0.4,
  //       borderColor: gradient, // Smoothness of the line
  //       pointBackgroundColor: "white",
  //       pointBorderColor: "black",
  //       pointHoverBackgroundColor: "white",
  //       pointBorderWidth: 3, // Increase point border width
  //       pointHoverBorderWidth: 4,
  //       pointRadius: 5, // Increase point size
  //       pointHoverRadius: 7, // Increase point size on hover
  //       pointHoverBorderColor: "rgba(75,192,192,1)",
  //     },
  //   ],
  // });
  //   }
  // }, [chartRef]);

  // const fetchPostData = async () => {
  //   const postsCollectionRef = collection(db, "posts"); // Adjust 'posts' to your collection name
  //   const data = await getDocs(postsCollectionRef);

  //   // Process your data here
  //   // Example processing (adjust according to your data structure):
  //   const analyticsData = data.docs.map((doc) => ({
  //     ...doc.data(),
  //     id: doc.id,
  //   }));

  //   // Extract labels and data for the chart
  //   const labels = analyticsData.map((item: any) => item.label); // Replace 'item.label' with your actual label field
  //   const dataPoints = analyticsData.map((item: any) => item.dataPoint); // Replace 'item.dataPoint' with your actual data field

  //   // setChartData({
  //   //   labels: labels,
  //   //   datasets: [
  //   //     {
  //   //       label: "All posts for this month",
  //   //       data: dataPoints,
  //   //       fill: true,
  //   //       backgroundColor: "rgba(75,192,192,0.2)",
  //   //       borderColor: "rgba(75,192,192,1)",
  //   //       tension: 0.4,
  //   //     },
  //   //   ],
  //   // });
  // };

  //  setChartData((prevChartData) => ({
  //    ...prevChartData,
  //    datasets: [
  //      {
  //        ...prevChartData.datasets[0],
  //        data: dataPoints,
  //      },
  //    ],
  //  }));

  // useEffect(() => {
  //   fetchPostData();
  // }, []);
  const currentYear = new Date().getFullYear();
  const lastFiveYears = Array.from(
    { length: 5 },
    (_, index) => currentYear - index,
  );
  const months = Array.from({ length: 12 }, (_, index) => index);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const db = firebase.firestore();
        const collectionRef = collection(db, "post_engagement");

        // Calculate the start and end of the selected month
        const startOfMonth = new Date(selectedYear, selectedMonth, 1);
        const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

        const querySnapshot = await getDocs(
          query(
            collectionRef,
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<=", endOfMonth),
          ),
        );

        const weeklyData = [0, 0, 0, 0];

        // Calculate weekly sums
        querySnapshot.forEach((doc) => {
          const createdAt = doc.data().createdAt.toDate();
          const week = Math.floor((createdAt.getDate() - 1) / 7); // Assuming a week starts from day 1

          weeklyData[week] += 1; // Increment by 1 for each post engagement
        });

        setChartData({
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "",
              data: weeklyData, // Make sure these are valid numbers
              fill: true,
              backgroundColor: ["#E0E0E0", "#CCFF00", "#E0E0E0", "#CCFF00"], // Specify colors for each bar
              borderWidth: 0, // Ensure this is greater than 0
              tension: 0.1,
              borderColor: "#CCFF00", // Smoothness of the line
              borderRadius: 10, // Set the border radius for the bars
              pointBackgroundColor: "white",
              pointBorderColor: "black",
              pointHoverBackgroundColor: "white",
              pointBorderWidth: 3, // Increase point border width
              pointHoverBorderWidth: 4,
              pointRadius: 1, // Increase point size
              pointHoverRadius: 7, // Increase point size on hover
              pointHoverBorderColor: "rgba(75,192,192,1)",
            },
          ],
        });

        // Log the final figures to the console
        console.log(
          `Weekly Sums for ${getMonthName(selectedMonth)} ${selectedYear}:`,
          weeklyData,
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);
  // ffect runs once when the component mounts

  // Helper function to get the name of the month
  const getMonthName = (monthIndex: any) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // You can set this to false to control the aspect ratio via CSS
    scales: {
      y: {
        border: { dash: [8, 2] }, // for the grid lines
        grid: {
          color: "#aaa", // for the grid lines
          tickColor: "#aaa", // for the tick mark
          tickBorderDash: [5, 4], // also for the tick, if long enough
          tickLength: 20, // just to see the dotted line
          tickWidth: 2,
          lineWidth: 2,
          offset: true,
          drawTicks: false, // true is default
          drawOnChartArea: false, // true is default
        },

        beginAtZero: true,
      },
      x: {
        border: { dash: [8, 2] }, // for the grid lines
        grid: {
          color: "#aaa", // for the grid lines
          tickColor: "#aaa", // for the tick mark
          tickBorderDash: [5, 4], // also for the tick, if long enough
          tickLength: 20, // just to see the dotted line
          tickWidth: 2,
          lineWidth: 2,
          offset: true,
          drawTicks: false, // true is default
          drawOnChartArea: false, // true is default
        },

        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // This will show the legend
      },
      title: {
        display: false,
        text: "Post Analytics", // Title of the chart
      },
    },
    elements: {
      point: {
        radius: 0, // Size of the point
        borderWidth: 2, // Border width of the point
        hoverRadius: 6, // Size of the point when hovered
        hoverBorderWidth: 3, // Border width when hovered
      },
      line: {
        borderWidth: 3, // Thickness of the line
      },
      //   cutout: false, // Set cutout to false to remove overflowing lines
    },
  };

  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const collectionRef = collection(db, "post_engagement");

        // Calculate the start and end of the selected month
        const startOfMonth = new Date(selectedYear, selectedMonth, 1);
        const endOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

        const totalPostsSnapshot = await getDocs(
          query(
            collectionRef,
            where("createdAt", ">=", startOfMonth),
            where("createdAt", "<=", endOfMonth),
          ),
        );

        const totalPostsCount = totalPostsSnapshot.size;
        setTotalPosts(totalPostsCount);

        console.log(
          `Total Posts for ${getMonthName(selectedMonth)} ${selectedYear}:`,
          totalPostsCount,
        );
      } catch (error) {
        console.error("Error fetching total posts:", error);
      }
    };

    fetchTotalPosts();
  }, [selectedYear, selectedMonth]); // Trigger effect when year or month changes

  return (
    <div className=" px-[1vw] ">
      <div className="bg-white w-full rounded-[2vw] px-[3vw] sm:h-auto sm:gap-[5vw]  h-[40vw] flex flex-col gap-[1.3vw] py-[2vw] ">
        <h2 className="neuem text-[2vw] font-[800] sm:text-[7vw]  ">
          Total posts Insights
        </h2>

        <div className="flex w-[20vw] gap-[2vw] sm:w-[80vw]   justify-between">
          <select
            className="w-full h-[3vw] border rounded-[1vw] px-[1vw] cursor-pointer text-[1vw] sm:text-[4vw] sm:px-[5vw] sm:h-[12vw] sm:rounded-[3vw] focus:outline-none"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {lastFiveYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className="w-full h-[3vw] border rounded-[1vw] px-[1vw] cursor-pointer text-[1vw] sm:text-[4vw] sm:px-[5vw] sm:h-[12vw] sm:rounded-[3vw] focus:outline-none"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {getMonthName(month)}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full h-[38vw] sm:h-[60vw]">
          <Bar data={chartData} ref={chartRef} options={options} />
        </div>

        <div className="flex text-[1vw] items-center gap-[1vw] sm:text-[3vw] w-full justify-between sm:gap-[2vw] ">
          <div className="flex items-center sm:gap-[2vw] gap-[0.5vw]">
            <Image
              src={downloads}
              alt="downloads"
              className="w-[3vw] sm:w-[12vw] h-fit"
            />{" "}
            <p className="font-bold">
              Total post engagement <br />
              <span className="font-medium">
                {getMonthName(selectedMonth)}{" "}
              </span>
            </p>
          </div>

          <p className="font-bold text-[2.3vw] sm:text-[4vw]"> {totalPosts}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_post_analytics;
