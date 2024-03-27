"use client";

const Each_moderator_preloader = () => {
  return (
    <>
      <div className="w-full flex justify-between sm:rounded-[4vw]  sm:px-[3vw] sm:h-[28vw]  items-center  bg-[#0D0C0C] px-[1.2vw] h-[8vw] rounded-[1.5vw]">
        {/* the avatar , username , and chats moderated */}
        <div className="w-auto flex justify-start items-center gap-[1.2vw] h-[4.5vw] sm:h-[12vw] sm:gap-[4vw]  ">
          <div className="w-[4.5vw] h-[4.5vw] sm:h-[12vw] sm:w-[12vw] bg-black animate-pulse  avater_bg rounded-[100%]"></div>

          <div className="h-full flex flex-col justify-between ">
            <p className="text-[1.1vw] w-[10vw] h-[2vw] bg-black animate-pulse  text-white neuer sm:text-[3.7vw] sm:w-[27vw] sm:h-[5vw]"></p>
            <p className="text-[1.1vw] w-[8vw] h-[1.8vw] bg-black animate-pulse  text-white neuer sm:text-[3.7vw] sm:w-[18vw] sm:h-[4.5vw]"></p>
          </div>
        </div>

        <div className="h-[4.5vw] sm:h-[15vw]  flex flex-col justify-between">
          <button className="bg-[#CCFF00] sm:h-[7vw] sm:w-[25vw] sm:text-[2.8vw] sm:rounded-[2vw] hover:bg-opacity-[50%] text-[1vw] rounded-[1vw] w-[8vw] h-[2.2vw] animate-pulse"></button>

          <button className=" bg-black animate-pulse h-[1vw] sm:h-[5vw]"></button>
        </div>
      </div>
    </>
  );
};

export default Each_moderator_preloader;
