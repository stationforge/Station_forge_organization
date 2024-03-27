"use client";

const DeletPost_modal = (props: any) => {
  const { setshowdeletemodal, delete_info, deletepost } = props;
  return (
    <>
      <div
        className="w-full z-[99999] bg-[black] bg-opacity-[60%]  flex justify-center items-center sm:px-[3vw]  h-full fixed top-0 left-0"
        onClick={() => {
          setshowdeletemodal(false);
        }}
      >
        <div
          className="bg-white w-[30vw] sm:w-full h-[17vw] sm:h-[45vw] sm:rounded-[3vw] rounded-[1.2vw] gap-[3vw] sm:gap-[4vw] px-[2.3vw] flex flex-col justify-center items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h1 className="neuer text-[1.2vw] sm:text-[4vw] text-center ">
            Are you sure you want <br /> to delete this post
          </h1>

          <div className="w-full h-auto flex justify-center gap-[2vw] sm:gap-[4vw] items-center">
            <button
              className="neuer border-[#FF0000] text-[1.3vw] sm:text-[3.5vw] sm:rounded-[4vw] sm:h-[13vw] transition duration-[0.6s] border-[0.1vw] hover:border-black hover:bg-transparent hover:text-black w-full h-[3.4vw] flex justify-center items-center text-white rounded-[1.2vw] bg-[#FF0000]"
              onClick={() => {
                deletepost();
              }}
            >
              {delete_info}
            </button>
            <button
              className="neuer border-[black] text-[1.3vw] sm:text-[3.5vw] sm:rounded-[4vw] sm:h-[13vw] transition duration-[0.6s] border-[0.1vw]  hover:bg-[black] hover:text-white w-full h-[3.4vw] flex justify-center items-center  rounded-[1.2vw] bg-transparent text-black"
              onClick={() => {
                setshowdeletemodal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeletPost_modal;
