"use client";

import { fromUnixTime } from "date-fns";
import format from "date-fns/format";
import Image from "next/image";

const Each_chat = ({
  data,
  setstage,
  setadmin_messages_arr,
  settime_date,
  setname,
  setavatar,
}: any) => {
  const truncateText = (text: any, numWords: any) => {
    const words = text?.split(" ");
    const truncatedWords = words?.slice(0, numWords);
    const truncatedText = truncatedWords?.join(" ");

    // Add ellipsis if the text is truncated
    return words?.length > numWords
      ? `${truncatedText} . . . .`
      : truncatedText;
  };
  return (
    <>
      <div
        className="w-full cursor-pointer hover:bg-opacity-[40%] hover:border transition duration-[0.6s] flex justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[23vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[6.5vw] rounded-[1.5vw]"
        onClick={() => {
          setstage(3);
          setadmin_messages_arr(data.chatTextData);
          const timestampValue = data.chatSessionData.SessioncreatedAt;
          // // Convert Firebase Timestamp to JavaScript Date
          const date = fromUnixTime(timestampValue?.seconds);

          // // Format the date using date-fns
          const formattedDate = format(date, "d MMMM, yyyy "); // Customize the format as needed
          settime_date(formattedDate);
          // console.log(formattedDate);
          setname(data.userData[0].Username);
          setavatar(data.userData[0].avatar_url);
        }}
      >
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4vw] sm:h-[12vw] sm:gap-[4vw]  ">
          <div
            className="w-[4vw] h-[4vw] overflow-hidden sm:h-[12vw] sm:w-[12vw]  avater_bg rounded-[100%]"
            style={{ backgroundImage: `url(/light_cover.webp)` }}
          >
            <Image
              unoptimized
              width="0"
              height="0"
              src={data.userData[0].avatar_url}
              alt={data.userData[0].name}
              className="w-full h-full"
            />
          </div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.2vw]  text-white neuer sm:text-[3.7vw]">
              {data.userData[0].Username}{" "}
              {data.userData[0].name && `(${data.userData[0].name})`}
            </p>
            <p className="text-[0.9vw] text-opacity-[30%] text-white neuer sm:text-[3vw]">
              {truncateText(
                data.chatTextData[1]?.message || data.chatTextData[0]?.message,
                7,
              ) || "No messages yet"}
            </p>
          </div>
        </div>

        <div className="bg-[#CCFF00] flex justify-center items-center rounded-[100%]  sm:w-[10vw] sm:h-[10vw] sm:text-[3vw] hover:bg-opacity-[50%] text-[0.8vw]  w-[2.8vw] h-[2.8vw]">
          {data.chatTextData.length}
        </div>
      </div>
    </>
  );
};

export default Each_chat;
