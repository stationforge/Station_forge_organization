"use client";

import { fromUnixTime, format } from "date-fns";
import Image from "next/image";

const Each_chat = ({
  setstage,
  data,
  update_chat_session,
  moderator_id,
  setsession_id,
  setuser_data_username,
  setuser_data_avater,
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
        className="w-full  duration-[0.6s] flex justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[23vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[6.5vw] rounded-[1.5vw]"
        // onClick={() => {
        //   setstage(2);
        // }}
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
              src={data.user.avatar_url}
              alt={data.user.Username}
              className="w-full h-full"
            />
          </div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.2vw]  text-white neuer sm:text-[3.7vw]">
              {data.user.Username}
            </p>
            <p className="text-[0.9vw] text-opacity-[30%] text-white neuer sm:text-[3vw]">
              {data.SessioncreatedAt && (
                <span className="text-opacity-[50%]">
                  {format(
                    fromUnixTime(data.SessioncreatedAt.seconds),
                    "d MMMM yyyy h:mm a",
                  )}
                </span>
              )}
            </p>
          </div>
        </div>

        {data.Joinedmoderatorid ? (
          data.Joinedmoderatorid == moderator_id ? (
            <button
              className="bg-[#CCFF00] flex justify-center items-center   sm:w-[25vw] sm:h-[8vw] sm:rounded-[3vw] sm:text-[3vw] hover:bg-opacity-[50%] text-[1vw] w-[8vw] flex sm:gap-[1.2vw] gap-[0.7vw] h-[2.6vw] rounded-[0.6vw] "
              onClick={() => {
                update_chat_session(data.id);
              }}
            >
              Inchat
              {!data.isReadByModerator && (
                <div className="sm:w-[2.5vw] sm:h-[2.5vw] w-[1vw] h-[1vw] bg-[green] rounded-[100%] "></div>
              )}
            </button>
          ) : (
            <button
              className="bg-[black] text-white text-opacity-[70%] flex justify-center items-center   sm:w-[25vw] sm:h-[8vw] sm:rounded-[3vw] sm:text-[3vw] hover:bg-opacity-[50%] text-[0.9vw] w-[8vw] h-[2.6vw] rounded-[0.6vw] "
              disabled
            >
              Reserved
            </button>
          )
        ) : (
          <button
            className="bg-[#CCFF00] flex justify-center items-center   sm:w-[25vw] sm:h-[8vw] sm:rounded-[3vw] sm:text-[3vw] hover:bg-opacity-[50%] text-[1vw] w-[8vw] h-[2.6vw] rounded-[0.6vw] "
            onClick={() => {
              update_chat_session(data.id);
            }}
          >
            join session
          </button>
        )}
      </div>
    </>
  );
};

export default Each_chat;
