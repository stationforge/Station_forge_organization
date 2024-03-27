"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import Media_post from "./media_post";
import { FadeInTransition } from "react-transitions-library";
import Text_upload from "./text_upload";
import success from "../../../../public/admin_section/post_upload/success.webp";
import Link from "next/link";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  runTransaction,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export default function Home() {
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>("");
  const [media, setmedia] = useState(true);
  const [title, settitle] = useState("");
  const [select_modal, setselect_modal] = useState(true);
  //   const [cancelled, setcancelled] = useState(false);
  const [des, setdes] = useState("");
  const [local_post_err, setlocal_post_err] = useState("");
  const [updated_media, setupdated_media] = useState([]);
  const [postContent, setPostContent] = useState({
    description: des,
    role: selectedOption,
    title: title,
  });
  const [upload_number, setupload_number] = useState("");
  const [upload_progress, setupload_progress] = useState<any>("");
  const [local_postid, setlocal_postid] = useState("");
  const [uploading_moda, setuploading_moda] = useState(false);
  const [uploading_text, setuploading_text] = useState("Uploading post");
  const [done, setdone] = useState(false);
  const [refresh_media_post, setrefresh_media_post] = useState(false);
  const [final_post_data, setfinal_post_data] = useState("false");

  useEffect(() => {
    // setpage_loader(false);
    // Create a new object with the updated `description` property
    const updatedPostContent = {
      ...postContent,
      description: des,
      role: selectedOption,
      title: title,
    };

    // Update the state with the new object
    setPostContent(updatedPostContent);
  }, [selectedOption, des, title]);

  initializeApp(firebaseConfig);
  const auth: any = getAuth();
  const route = useRouter();
  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);
  const cancelled = useRef(false);
  // Initialize Firebase storage and Firestore
  const storage = getStorage();
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    setpage_loader(true);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        const user_ref = collection(db, "users");
        const user_query = query(user_ref, where("userid", "==", user.uid));

        getDocs(user_query)
          .then((res) => {
            if (!res.empty) {
              const snap = res.docs[0].data().role;

              if (snap == "admin") {
                setshowdash(true);
                setpage_loader(false);
              } else {
                setshowdash(false);
                route.push("/");
              }
            } else {
              setshowdash(false);
              route.push("/");
            }
          })
          .catch(() => {
            console.log("error while getting user");
          });
      } else {
        setpage_loader(false);
        setpage_loader(true);
        route.push("/"); // User is not authenticated, you can keep them on the current page or redirect them to a login page
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createPost = (mediaFiles: any, postContent: any, onProgress: any) => {
    setuploading_text("Uploading data ...");
    setrefresh_media_post(false);
    setupload_progress("0%");
    setupload_number("");
    setuploading_moda(true);
    const storage = getStorage();
    // const db = getFirestore();
    const postRef = collection(db, "posts");
    // const local_postid = useRef(null);
    // const cancelled = useRef(false); // Create a ref for cancelled state

    // Create a Firestore transaction
    runTransaction(db, async (transaction) => {
      const postDocRef = await addDoc(postRef, {
        createdAt: serverTimestamp(),
        description: postContent.description,
        role: postContent.role,
        title: postContent.title,
        pinned: false,
      });
      cancelled.current = false;

      if (postDocRef) {
        const documentRef = doc(postRef, postDocRef.id);
        getDoc(documentRef)
          .then((docSnapshot) => {
            if (docSnapshot.exists()) {
              const documentData = docSnapshot.data();
              setfinal_post_data(
                window.location.host.includes("localhost")
                  ? "http://" +
                      window.location.host +
                      "/subscriptions?post=" +
                      docSnapshot.id
                  : "https://" +
                      window.location.host +
                      "/subscriptions?post=" +
                      docSnapshot.id,
              );

              // remember thats its https for online secure sites  but not for localhost
              // setfinal_post_data(
              //   "https://" +
              //     window.location.host +
              //     "/subscriptions?post=" +
              //     docSnapshot.id,
              // );
            }
          })
          .catch((error) => {
            console.error("Error getting the document:", error);
          });
      }

      //   local_postid.current = postDocRef.id; // Set the local post ID
      const imagesRef = collection(db, "posts", postDocRef.id, "images");
      const postId = postDocRef.id;
      () => {
        return setlocal_postid(postDocRef.id);
      };
      // Calculate the total number of files being uploaded
      const totalFiles = mediaFiles.length;
      let uploadedFiles = 0;

      for (let index = 0; index < totalFiles; index++) {
        if (cancelled.current) {
          setuploading_text("Cancelling Data  ...");
          setupload_progress("100%");
          // Check if upload is cancelled.current

          deleteDoc(doc(db, "posts", postDocRef.id))
            .then(() => {
              deleteFilesInFolder(`posts/${postId}`);
              setuploading_text("Cancel Successfull ...");
            })
            .catch((err) => {
              console.log(err);
              setuploading_text(err.message);
            });
          break;
        }

        setuploading_text("Uploading Images ...");

        const file = mediaFiles[index];
        const timestamp = new Date().getTime(); // Get current timestamp
        const uniqueFileName = `${file.name}_${timestamp}`;
        const storageRef = ref(storage, `posts/${postId}/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Add an event listener to track the upload progress
        uploadTask.on("state_changed", (snapshot: any) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          setupload_number(index + 1 + "/" + updated_media.length);
          setupload_progress(progress);
          uploadedFiles++;

          const overallProgress = Math.round(
            (uploadedFiles / totalFiles) * 100,
          );
          onProgress(overallProgress);
        });

        try {
          await uploadTask;
          if (cancelled.current) {
            setuploading_text("Cancelling Data  ...");
            setupload_progress("100%");
            uploadTask.cancel(); // Cancel the Firebase upload
            const value = await deleteDoc(doc(db, "posts", postDocRef.id));
            deleteFilesInFolder(`posts/${postId}`);
            setuploading_text("Cancel Successfull ...");

            // Check if upload is cancelled.current after awaiting
            break;
          }

          const downloadURL = await getDownloadURL(storageRef);
          const image = { link: downloadURL, id: uniqueFileName };
          const imageDocRef = await addDoc(imagesRef, image);
        } catch (error) {
          throw error;
        }
      }
    })
      .then((res) => {
        setuploading_text("Post successfully updated");

        if (!cancelled.current) {
          setdone(true);
        }

        // viewpost(docSnapshot.id);
      })
      .catch(async (error) => {
        console.error("Error creating post and images:", error);

        if (cancelled.current) {
          // Delete the post document and "images" subcollection
          await deleteDoc(doc(db, "posts", "khkj"));
          const querySnapshot = await getDocs(
            collection(db, `posts/${local_postid}/images`),
          );
          querySnapshot.forEach((doc: any) => {
            deleteObject(ref(storage, `posts/${local_postid}/${doc.id}`));
            deleteDoc(doc.ref);
          });
        }
      });

    // Add the onClick event handler for the cancel button
    const handleCancelUpload = () => {
      cancelled.current = true;
      setuploading_text("Cancelling Data  ...");
      setupload_progress("100%");
      //   setcancelled(true); // Set the cancelled state to true
    };
    const cancelUploadButton = document.getElementById("cancelUploadButton");
    if (cancelUploadButton) {
      cancelUploadButton.addEventListener("click", handleCancelUpload);
    }
    // Return the handleCancelUpload function for use in your component
    return handleCancelUpload;
  };

  useEffect(() => {
    const cancelUploadButton = document.getElementById("cancelUploadButton");
    if (cancelUploadButton) {
      cancelUploadButton.addEventListener("click", () => {
        cancelled.current = true;
        //   setcancelled(true); // Set the cancelled state to true
      });
    }
  }, [uploading_moda]);
  // Function to track and log progress
  const onProgress = (progress: any) => {
    // console.log("Overall Progress:", progress, "%");
  };

  const handleRadioChange = (id: any) => {
    setSelectedOption(id);
    setlocal_post_err("");
  };

  const deleteFilesInFolder = async (folderPath: any) => {
    const storage = getStorage();
    const folderRef = ref(storage, folderPath);

    try {
      // List all files in the folder
      const listResult = await listAll(folderRef);

      // Iterate through files and delete each one
      const deletePromises = listResult.items.map((item) => deleteObject(item));

      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      // Optionally, delete the folder itself
      // Note: The folder must be empty for this to work
      // await deleteObject(folderRef);

      setuploading_text(" Successfull ...");
      setuploading_moda(false);
    } catch (error) {
      console.error(`Error deleting files in folder '${folderPath}':`, error);
    }
  };

  // Usage
  //   const folderPath = "posts/your-folder-name";
  //   deleteFilesInFolder(folderPath);

  const handleUpload = () => {
    if (media) {
      if (updated_media.length == 0) {
        return setlocal_post_err(
          "Please  upload your media, or if you prefer, you can go back to selecting text only.",
        );
      } else if (title == "") {
        return setlocal_post_err(
          "Oops! Please provide a title for your content to continue",
        );
      } else if (des == "") {
        return setlocal_post_err(
          "Oops! Please provide a  description for your content to proceed",
        );
      } else if (selectedOption == "") {
        return setlocal_post_err(
          "Please select the roles of people who can view your content. It's an important step to ensure your content reaches the right audience.",
        );
      } else {
        cancelled.current = false;
        setlocal_post_err("");
        createPost(updated_media, postContent, onProgress);
      }
    } else if (!media) {
      if (title == "") {
        return setlocal_post_err(
          "Oops! Please provide a title for your content to continue",
        );
      } else if (des == "") {
        return setlocal_post_err(
          "Oops! Please provide a  description for your content to proceed",
        );
      } else if (selectedOption == "") {
        return setlocal_post_err(
          "Please select the roles of people who can view your content. It's an important step to ensure your content reaches the right audience.",
        );
      } else {
        cancelled.current = false;
        setlocal_post_err("");
        createPost(updated_media, postContent, onProgress);
      }
    }
  };

  const refresh = () => {
    setrefresh_media_post(true);
    setupdated_media([]);
    setSelectedOption("");
    settitle("");
    setdes("");
    setfinal_post_data("");
    setupload_number("");
    setupload_progress("");
    cancelled.current = false;
    setdone(false);
    setuploading_moda(false);
    if (media) {
      setmedia(false);

      setTimeout(() => {
        setmedia(true);
      }, 300);
    }
  };

  return (
    <>
      {page_loader && <Loader />}
      {showdash ? (
        <>
          {select_modal && (
            <div className="w-full fixed z-[99999] sm:px-[3vw] h-full bg-black bg-opacity-[60%] top-0 left-0 flex justify-center items-center">
              <FadeInTransition
                timeout={1200}
                from={0}
                to={1}
                in={true}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  itemsCenter: "center",
                }}
              >
                <div className="w-[27vw] sm:rounded-[4vw] sm:gap-[4vw] sm:py-[6vw] sm:px-[4vw] sm:w-full relative px-[2vw] flex-col flex justify-center items-center gap-[2vw] bg-white h-auto py-[3vw] rounded-[1.2vw]">
                  <Link
                    href={"/admin/dashboard"}
                    onClick={() => {
                      setpage_loader(true);
                    }}
                    className="text-[#FF0000] sm:top-[2vw] neuem text-[1.1vw] sm:text-[3.5vw]  absolute w-fit text-center top-[0.7vw]  hover:text-[black] transition duration-[0.6s "
                  >
                    <i className="bi bi-speedometer"> </i>
                    Go to Dashboard
                  </Link>
                  <p className="text-[1.2vw] sm:pt-[5vw] sm:text-[4vw] neuem text-center">
                    Select post type
                  </p>

                  {/* the options */}
                  <div
                    className="w-full h-auto py-[1vw] sm:py-[6vw] sm:rounded-[5vw] bg-[#F5F5F5] rounded-[1.2vw]  cursor-pointer transition duration-[0.6s] hover:bg-[#cbcbcb]  flex flex-col"
                    onClick={() => {
                      setmedia(true);
                      setselect_modal(false);
                      setupdated_media([]);
                    }}
                  >
                    <div className="w-full h-fit  flex justify-center items-center sm:gap-[2vw] gap-[0.4vw]">
                      <i className="text-[1.6vw] sm:text-[4vw] bi bi-card-image"></i>
                      <div className="w-[0.3vw]  h-[0.3vw] sm:h-[1vw] sm:w-[1vw] rounded-[100%] bg-black"></div>
                      <i className="text-[1.6vw] sm:text-[4vw]  bi bi-play-circle"></i>
                    </div>
                    <p className="neuem text-center text-[1.2vw] sm:text-[4vw] ">
                      Media
                    </p>
                  </div>

                  {/* options */}
                  <div
                    className="w-full h-auto py-[1vw] sm:py-[6vw] sm:rounded-[5vw] bg-[#F5F5F5] rounded-[1.2vw] cursor-pointer transition duration-[0.6s] hover:bg-[#cbcbcb]  flex flex-col"
                    onClick={() => {
                      setmedia(false);
                      setselect_modal(false);
                      setupdated_media([]);
                    }}
                  >
                    <div className="w-full h-fit  flex justify-center items-center gap-[0.4vw]">
                      <i className="text-[1.6vw] bi bi-pencil-square sm:text-[4vw]"></i>
                    </div>
                    <p className="neuem text-center text-[1.2vw] sm:text-[4vw]">
                      Text
                    </p>
                  </div>
                </div>
              </FadeInTransition>
            </div>
          )}
          <FadeInTransition
            timeout={1200}
            from={0}
            to={1}
            in={true}
            style={{ width: globalThis.innerWidth < 650 ? "100vw" : "100%" }}
          >
            <div className="w-full h-auto px-[3.5vw] sm:py-[10vw]  flex justify-start sm:justify-center  sm:gap-[3vw] py-[5vw] sm:flex-col  relative">
              <div className="w-[60vw] gap-[3vw] flex flex-col sm:gap-[7vw] justify-center sm:w-full h-auto ">
                {" "}
                {media && (
                  <Media_post
                    setupdated_media={setupdated_media}
                    setlocal_post_err={setlocal_post_err}
                    updated_media={updated_media}
                  />
                )}
                <Text_upload
                  title={title}
                  des={des}
                  settitle={settitle}
                  setdes={setdes}
                  local_post_err={local_post_err}
                  handleUpload={handleUpload}
                  setlocal_post_err={setlocal_post_err}
                />
              </div>

              {/*  */}

              {/*  */}
              {/* this is the is stciky bar  */}
              <h2 className="text-[1.4vw] hidden sm:block sm:mt-[4vw]  sm:text-[4vw] neuem">
                Who can see this post?
              </h2>
              <div className="w-[30vw] sm:w-full sm:py-[5vw] sm:px-[5vw] sm:rounded-[4vw] sm:top-0 sm:h-[60vw] sm:gap-[3vw] sm:right-0   z-[99] py-[2vw] px-[2vw] bg-white h-[35vw] rounded-[2vw] sm:relative fixed right-[3.5vw] top-[5vw] flex flex-col justify-start ">
                <h2 className="text-[1.4vw] sm:hidden pb-[2vw] sm:text-[4vw] neuem">
                  Who can see this post?
                </h2>
                <ul className=" flex flex-col gap-[2vw] sm:gap-[4vw] ">
                  {options.map((option) => (
                    <li
                      key={option.id}
                      onClick={() => {
                        handleRadioChange(option.id);
                      }}
                      className="flex justify-start cursor-pointer sm:gap-[4vw] py-[0.2vw] gap-[2vw] items-center"
                    >
                      <div
                        className="w-[2vw] sm:w-[5vw] sm:h-[5vw] flex justify-center items-center  h-[2vw] border-[#B7B7B7] border-[0.1vw] rounded-[0.4vw]"
                        style={{
                          backgroundColor:
                            selectedOption == option.id ? "#CCFF00" : "",
                        }}
                      >
                        <i
                          className="bi text-[2vw] sm:text-[4vw] bi-check-lg"
                          style={{
                            display:
                              selectedOption == option.id ? "block" : "none",
                          }}
                        ></i>
                      </div>
                      <p className="neuem text-[1.4vw] sm:text-[3.5vw] cursor-pointer">
                        {option.label}
                      </p>
                    </li>
                  ))}
                </ul>

                <button
                  className="text-[#FF0000] neuem text-[1.1vw] sm:text-[3.5vw] absolute sm:bottom-[2vw] w-fit text-center bottom-[-3vw] left-[50%] translate-x-[-50%] hover:text-[black] transition duration-[0.6s]"
                  onClick={refresh}
                >
                  <i className="bi bi-trash3"></i> Discard post
                </button>
              </div>
            </div>
          </FadeInTransition>

          <button
            className="fixed top-[1.6vw] sm:text-[4vw] sm:top-[2.5vw] left-[2.5vw] text-[1.5vw] neuem "
            onClick={() => {
              setselect_modal(true);
              refresh();
            }}
          >
            {/* this modal is what selects the modal out */}
            <i className="bi bi-chevron-left"></i> Back
          </button>

          {/* this is the upload progress */}
          {uploading_moda && (
            <div className="w-full h-full fixed top-0 sm:px-[4vw] left-0 z-[99999] flex justify-center items-center bg-black bg-opacity-[60%]">
              <div className="bg-white rounded-[1.4vw] relative sm:gap-[3vw] flex-col w-[28vw] px-[1.5vw] h-[19vw] flex justify-center sm:px-[4vw] sm:rounded-[6vw] sm:w-[90%] sm:h-[50vw] items-center gap-[2vw]">
                <p className="text-[1.2vw] neuer sm:text-[4vw]">
                  {uploading_text}
                </p>
                {!done && (
                  <span className="text-[#CCFF00] sm:text-[3.5vw] absolute capitalize top-[0.7vw] right-[1.5vw]">
                    {upload_number}
                  </span>
                )}
                {done && (
                  <i
                    className="text-[1.6vw] sm:text-[7vw] sm:right-[3vw] sm:top-[2vw] hover:text-opacity-[90%] cursor-pointer duration-[0.6s] transition text-opacity-[50%] absolute capitalize top-[0.7vw] right-[1.5vw] text-[#FF0000] bi bi-x-circle"
                    onClick={refresh}
                  ></i>
                )}
                {!done && (
                  <div className="w-full h-[1.1vw] sm:h-[3vw] overflow-hidden flex bg-[#D9D9D9] rounded-[1vw]">
                    <div
                      className="h-full bg-[#CCFF00] transition duration-[3s]"
                      style={{
                        width: upload_progress + "%",
                        transition: "2s ease",
                      }}
                    ></div>
                  </div>
                )}

                {done && (
                  <Image
                    src={success}
                    alt="success image"
                    className="w-[5.5vw] sm:w-[15vw] h-fit"
                  />
                )}

                {!done && (
                  <button
                    className=" py-[1vw] sm:py-[3vw] sm:text-[4vw] sm:px-[10vw] px-[2.2vw] text-[1vw] hover:bg-[#CCFF00]  transition duration-[0.6s] border-black border-[0.1vw] rounded-[1.2vw] "
                    id="cancelUploadButton"
                    onClick={() => {
                      setuploading_text("Beginning Cancel ...");
                    }}
                  >
                    Cancel
                  </button>
                )}

                {done && (
                  <Link
                    href={final_post_data}
                    target="_blank"
                    className=" py-[1vw] px-[3.2vw]  sm:py-[3vw] sm:text-[4vw] sm:px-[10vw] text-[1vw] bg-[#CCFF00]  transition duration-[0.6s] hover:bg-transparent hover:border-black hover:border-[0.1vw] border-[#CCFF00] border-[0.1vw] rounded-[1.2vw] "
                    id="cancelUploadButton"
                    // onClick={() => {
                    //   handleCancelUpload();
                    // }}
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* <h1
            className=" fixed top-[2vw] right-0 text-[3vw] "

            // onClick={() => {
            //   // handleCancelUpload();
            // }}
          >
            this is the number: {upload_number} , while this is the progress :{" "}
            {upload_progress}
          </h1> */}
        </>
      ) : null}
    </>
  );
}
