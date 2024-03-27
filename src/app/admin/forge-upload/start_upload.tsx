"use client";

import Link from "next/link";

const StartUpload = ({
  setisLoadingUploadModal,
  handleCancel,
  uploading_text,
  uploadProgress,
  doneUploading,
  finalLink,
}: any) => {
  return (
    <>
      <div className="w-full h-full fixed top-0 left-0 sm:px-[4vw] bg-[black] z-[999] bg-opacity-[60%] flex justify-center items-center">
        <div className="w-[30vw] h-[18vw] sm:w-full sm:h-[60vw] sm:gap-[5vw] sm:rounded-[4vw] relative flex-col bg-white rounded-[2vw] flex justify-center items-center gap-[1.5vw] px-[2vw] sm:px-[4vw]">
          {doneUploading && (
            <i
              className="text-[1.6vw] sm:text-[7vw] sm:right-[4vw] sm:top-[3vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] absolute capitalize top-[0.7vw] right-[1.5vw] text-[#FF0000] bi bi-x-circle"
              onClick={() => {
                setisLoadingUploadModal(false);
              }}
            ></i>
          )}
          <p className="text-center text-[1.2vw] neuer sm:text-[4vw]">
            {uploading_text}
          </p>

          {/* the progress  */}
          <div className="w-full h-[1.4vw] sm:h-[3vw] sm:rounded-[3vw] overflow-hidden rounded-[1vw] bg-[#D9D9D9] ">
            <div
              className="h-full bg-[#CCFF00]"
              style={{ width: `${uploadProgress}%`, transition: "2s ease" }}
            ></div>
          </div>
          {doneUploading ? (
            <>
              <Link
                href={finalLink}
                target="_blank"
                className=" py-[1vw] sm:text-[4vw] sm:py-[2vw] sm:px-[9vw] px-[3.2vw] text-[1vw] bg-[#CCFF00]  transition duration-[0.6s] hover:bg-transparent hover:border-black hover:border-[0.1vw] border-[#CCFF00] border-[0.1vw] rounded-[1.2vw] "
                id="cancelUploadButton"
                // onClick={() => {
                //   handleCancelUpload();
                // }}
              >
                View
              </Link>
            </>
          ) : (
            <button
              className=" py-[1vw] px-[2.2vw] text-[1vw] sm:text-[4vw] sm:py-[2vw] sm:px-[9vw] hover:bg-[#CCFF00]  transition duration-[0.6s] border-black border-[0.1vw] rounded-[1.2vw] "
              id="cancelUploadButton"
              onClick={() => {
                //   setuploading_text("Beginning Cancel ...");
                handleCancel();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default StartUpload;
