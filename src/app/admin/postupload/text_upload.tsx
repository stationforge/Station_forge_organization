"use client";

const Text_upload = (props: any) => {
  const {
    settitle,
    title,
    des,
    setlocal_post_err,
    setdes,
    handleUpload,
    local_post_err,
  } = props;
  return (
    <>
      <div className="w-full h-[40vw] sm:h-[135vw] sm:rounded-[4vw] relative px-[3vw] flex flex-col gap-[2vw] justify-center items-end bg-white rounded-[2vw] sm:gap-[5vw]">
        <div className="w-full  flex flex-col gap-[0.5vw] ">
          <label
            htmlFor=""
            className="neuem font-[700] text-[1.2vw] sm:text-[3.5vw] capitalize"
          >
            Add Post Title
          </label>
          <input
            type="text"
            className="w-full border-[#C8C8C8] sm:px-[4vw] sm:h-[13vw] sm:rounded-[5vw] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] border-[0.1vw] neuer text-[1.2vw] sm:text-[3.5vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw] capitalize"
            onChange={(e) => {
              settitle(e.target.value);
              setlocal_post_err("");
            }}
            value={title || ""}
          />
        </div>
        <div className="w-full  flex flex-col gap-[0.5vw] ">
          <label
            htmlFor=""
            className="neuem font-[700] text-[1.2vw] sm:text-[3.5vw] capitalize"
          >
            Add Post Description{" "}
            <span className="text-[0.9vw] sm:text-[2.5vw] text-[red]">
              Kindly note : {"<br/>"} for line breaks
            </span>
          </label>
          <textarea
            placeholder="if you'd like to add  a line break to your description, just use '<br/>'. For instance, using '<br/> <br/>' will move your text down two lines."
            className="w-full border-[#C8C8C8]  sm:p-[5vw] sm:h-[30vw] sm:rounded-[5vw] duration-[0.6s] transition neuer focus:outline-none focus:border-[#CCFF00] resize-none border-[0.1vw] rounded-[1.1vw] h-[10vw] py-[1vw] text-[1.2vw] sm:text-[3.5vw] px-[1.3vw]"
            name=""
            id=""
            onChange={(e) => {
              setdes(e.target.value);
              setlocal_post_err("");
            }}
            value={des || ""}
          ></textarea>
        </div>

        <div className="w-full  flex flex-col gap-[0.5vw] ">
          <label
            htmlFor=""
            className="neuem  font-[700] text-[1.2vw] sm:text-[3.5vw] capitalize"
          >
            Add Tag
          </label>
          <input
            type="text"
            className="w-full text-[1.2vw] sm:text-[3.5vw] sm:h-[20vw] sm:rounded-[5vw] border-[#C8C8C8] duration-[0.6s] transition focus:outline-none focus:border-[#CCFF00] neuer border-[0.1vw] rounded-[1.1vw] h-[3.2vw] pl-[1vw]"
          />
        </div>

        <button
          className="w-fit py-[0.9vw] sm:w-full sm:px-0 sm:py-0 sm:h-[13vw] sm:rounded-[3vw] px-[5vw] neuem text-[1.2vw]  sm:text-[4vw] bg-[#CCFF00] text-black mt-[1vw] hover:bg-opacity-[40%] transition duration-[0.6s] rounded-[1.4vw]"
          onClick={() => {
            handleUpload();
          }}
        >
          Post
        </button>

        <p className="absolute sm:w-full sm:text-[3vw] neuer w-[30vw] text-[#FF0000]  text-[1vw]  left-[3vw] bottom-[3vw]">
          {local_post_err}
        </p>
      </div>
    </>
  );
};

export default Text_upload;
