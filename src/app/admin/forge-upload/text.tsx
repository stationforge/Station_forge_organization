"use client";

const Text_upload = ({
  local_post_err,
  setselected_text,
  setselected_descrption,
  setlocal_post_err,
  selected_text,
  selected_descrption,
  handleUpload,
  reset,
}: any) => {
  return (
    <>
      <div className="w-full  h-[37vw] sm:h-[130vw] relative px-[3vw] sm:gap-[5vw] flex flex-col gap-[2vw] justify-center items-end bg-white rounded-[2vw]">
        <div className="w-full  flex flex-col sm:gap-[5vw]  gap-[0.5vw] ">
          <div className="w-full  flex flex-col gap-[0.5vw] ">
            <label
              htmlFor=""
              className="neuem font-[700] text-[1.2vw] sm:text-[4vw] capitalize"
            >
              Add Post Title
            </label>
            <input
              type="text"
              className="w-full sm:px-[3vw] sm:h-[12vw] sm:rounded-[3vw] sm:text-[4vw] border-[#C8C8C8] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] border-[0.1vw] neuer text-[1.2vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw] capitalize"
              onChange={(e) => {
                setselected_text(e.target.value);
                setlocal_post_err("");
              }}
              value={selected_text || ""}
            />
          </div>
          <div className="w-full  flex flex-col gap-[0.5vw]">
            <label
              htmlFor=""
              className="neuem font-[700] text-[1.2vw]  sm:text-[4vw] capitalize"
            >
              Add Description{" "}
            </label>
            <textarea
              className="w-full sm:text-[4vw] sm:p-[4vw] border-[#C8C8C8] sm:h-[30vw] sm:rounded-[4vw] duration-[0.6s] transition neuer focus:outline-none focus:border-[#CCFF00] resize-none border-[0.1vw] rounded-[1.1vw] h-[10vw] py-[1vw] text-[1.2vw] px-[1.3vw]"
              name=""
              id=""
              onChange={(e) => {
                setselected_descrption(e.target.value);
                setlocal_post_err("");
              }}
              value={selected_descrption || ""}
            ></textarea>
          </div>
        </div>

        <div className="w-full  flex flex-col gap-[0.5vw] ">
          <label
            htmlFor=""
            className="neuem  font-[700] sm:text-[3.5vw] text-[1.2vw] capitalize"
          >
            Add Tag
          </label>
          <input
            type="text"
            className="w-full text-[1.2vw] sm:h-[12vw] sm:rounded-[3vw] sm:text-[4vw] border-[#C8C8C8] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] neuer border-[0.1vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw]"
          />
        </div>

        <button
          className="w-fit py-[0.9vw] sm:w-full sm:py-[5vw] sm:rounded-[3vw] sm:text-[4vw] px-[5vw] neuem text-[1.2vw] bg-[#CCFF00] text-black mt-[1vw] hover:bg-opacity-[40%] transition duration-[0.6s] rounded-[1.4vw]"
          onClick={() => {
            handleUpload();
          }}
        >
          Post
        </button>

        <div className="w-full flex justify-center ">
          <button
            className="text-[1.2vw] sm:w-fit sm:block hidden sm:text-[4vw] text-[#FF0000] neuer "
            onClick={reset}
          >
            {" "}
            <i className="bi bi-trash3"></i> Discard Post
          </button>
        </div>

        <p className="absolute sm:relative sm:w-full neuer sm:text-[3.5vw] w-[30vw] text-[#FF0000]  text-[1vw]  left-[3vw] bottom-[3vw]">
          {local_post_err}
        </p>
      </div>
    </>
  );
};

export default Text_upload;
