"use client";

const Moderator_each_chat_preloader = () => {
  return (
    <>
      <div className="w-full flex  justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[23vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[6.5vw] rounded-[1.5vw]">
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4vw] sm:h-[12vw] sm:gap-[4vw]  ">
          <div className="w-[4vw] h-[4vw] sm:h-[12vw] sm:w-[12vw] bg-black animate-pulse  avater_bg rounded-[100%]"></div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.1vw] w-[10vw] h-[1.4vw] bg-black animate-pulse  text-white neuer sm:text-[3.7vw] sm:w-[27vw] sm:h-[4vw]"></p>
            <p className="text-[1.1vw] w-[8vw] h-[1vw] bg-black animate-pulse  text-white neuer sm:text-[3.7vw] sm:w-[18vw] sm:h-[3.5vw]"></p>
          </div>
        </div>

        <div className="bg-[#CCFF00]   sm:text-[2.8vw] sm:w-[25vw] sm:h-[8vw] sm:rounded-[3vw] hover:bg-opacity-[50%] text-[1vw] w-[8vw] h-[2.6vw] rounded-[1vw] animate-pulse"></div>
      </div>
    </>
  );
};

export default Moderator_each_chat_preloader;
