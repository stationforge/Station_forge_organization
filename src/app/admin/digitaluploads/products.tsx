"use client ";

const Product = ({
  data,
  sethideforge_info,
  setinfo_title,
  setproduct_id,
  setinfo_download,
  setinfo_avater,
}: any) => {
  return (
    <>
      <div className="w-[31.7%] sm:rounded-[4vw] sm:w-[48%] rounded-[2vw] overflow-hidden auto border-black border-opacity-[17%] border-[0.1vw] sm:border-[0.35vw]  flex flex-col gap-[1vw] mb-[2.3vw] sm:mb-[4vw] sm:gap-[2.5vw]">
        <div
          className="w-full h-[20vw] sm:h-[46vw] overflow-hidden avater_bg "
          style={{ backgroundImage: `url(/cover.webp)` }}
        >
          <img
            src={data.cover_png}
            alt="model img"
            className="w-full h-full "
          />
        </div>
        <p className="text-[0.9vw] neuem px-[1vw] sm:text-[3vw]">
          {" "}
          {data.title}
        </p>{" "}
        <div className="w-full mb-[1.2vw] sm:mb-[3vw] flex justify-between items-center px-[1vw] ">
          <button
            className="bg-[#CCFF00] sm:text-[2.7vw] sm:h-[7vw] sm:w-[28vw] sm:rounded-[1.6vw] hover:bg-opacity-[40%] h-[3vw] w-[8vw] text-[0.8vw] rounded-[1vw]"
            onClick={() => {
              setproduct_id(data.productId);
              setinfo_download(data.downloadedItemCount);
              setinfo_title(data.title);
              sethideforge_info(false);
              setinfo_avater(data.cover_png);
            }}
          >
            View more details
          </button>
          <p className="text-black text-opacity-[40%] sm:text-[2.3vw] sm:text-center text-[0.8vw] neuer w-fit">
            Downloaded {data.downloadedItemCount} Times
          </p>
        </div>
      </div>
    </>
  );
};

export default Product;
