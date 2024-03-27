"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

import { useProfile_Context } from "@/app/utils/profile_context";
import Loader from "@/app/general_components/loader";
import Header from "@/app/admin_general_component/header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import JsonSearch from "search-array";

import { initializeApp } from "firebase/app";
import firebaseConfig from "@/app/utils/fire_base_config";
import { useRouter } from "next/navigation";
import mob_filter from "../../../../public/admin_section/forge_upload/filter.webp";
import { FadeInTransition } from "react-transitions-library";
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
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import Three_d from "./three_d";
import Image_upload from "./image";
import Factions_forge_upload from "./factions";
import Option_select from "./options";
import Text_upload from "./text";
import JSZip from "jszip";
import StartUpload from "./start_upload";
import { Inter } from "next/font/google";
import Mobile_Factions_forge_upload from "./mobile_factions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [options, setoptions] = useState([
    { id: 1, label: "Public" },
    { id: 2, label: "Subscribers" },
    { id: 3, label: "Standard Tier Subscribers" },
    { id: 4, label: "Merchant Tier Subscribers" },
  ]);
  const [faction_option, setfaction_option] = useState([
    { id: 1, label: "Humanoids", sub: ["h1", "h2", "h3", "h5"] },
    { id: 2, label: "Robots", sub: ["R1", "R2", "R3", "R5"] },
    { id: 3, label: "Aliens", sub: ["A1", "A2", "A3", "A5"] },
    { id: 4, label: "Chaos", sub: ["L1", "L2", "L3", "L5"] },
  ]);
  const { page_loader, setpage_loader, setfrom }: any = useProfile_Context();
  const [showdash, setshowdash] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>("");
  const [title, settitle] = useState("");

  const [des, setdes] = useState("");
  const [local_post_err, setlocal_post_err] = useState("");
  const [uploading_moda, setuploading_moda] = useState(false);

  //   this section is for the faction
  const [active_faction, setactive_faction] = useState<any>(null);
  const [active_sub_faction, setactive_sub_faction] = useState<any>(null);
  const [sub_faction_arr, setsub_faction_arr] = useState([]);

  //   this is for the info that we would be sending out today
  const [selected_faction, setselected_faction] = useState("");
  const [selected_sub_faction, setselected_sub_faction] = useState("");
  const [zipfile_with_model, setzipfile_with_model] = useState<any>([]);
  const [zipfile_only_png, setzipfile_only_png] = useState<any>([]);
  const [selected_image_arr, setselected_image_arr] = useState<any>([]);
  const [selected_cover_img, setselected_cover_img] = useState<any>([]);
  const [selected_text, setselected_text] = useState("");
  const [selected_descrption, setselected_descrption] = useState("");
  const [isLoadingUploadModal, setisLoadingUploadModal] = useState(false);
  const [mobile_filter, setmobile_filter] = useState(false);
  const [doneUploading, setdoneUploading] = useState(false);
  const [uploading_text, setuploading_text] = useState(
    "Uploading forge allocation",
  );
  const [uploadProgress, setuploadProgress] = useState("0");
  const [finalLink, setfinalLink] = useState("");

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

  const abortControllerRef = useRef<any>(null);
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

      setuploading_moda(false);
    } catch (error) {
      console.error(`Error deleting files in folder '${folderPath}':`, error);
    }
  };

  const handleUpload = () => {
    if (zipfile_only_png.length === 0) {
      return setlocal_post_err(
        "Please ensure a zipped file containing the images is included.",
      );
    } else if (zipfile_with_model.length === 0) {
      return setlocal_post_err(
        "Please ensure a zipped file containing both images and 3D models is included.",
      );
    } else if (selected_image_arr.length === 0) {
      return setlocal_post_err(
        "Please add supporting images for this product.",
      );
    } else if (selected_text === "") {
      return setlocal_post_err("Please provide a title for this product.");
    } else if (selected_descrption === "") {
      return setlocal_post_err(
        "Please provide a description for this product.",
      );
    } else if (selectedOption === "") {
      return setlocal_post_err(
        "Please specify the roles of users who should have access to this product.",
      );
    } else if (selected_faction === "") {
      return setlocal_post_err("Please specify the faction of this product.");
    } else if (selected_sub_faction === "") {
      return setlocal_post_err(
        "Please specify the sub-faction of this product.",
      );
    } else {
      cancelled.current = false;
      setuploadProgress("0");
      setisLoadingUploadModal(true);
      setdoneUploading(false);
      setuploading_text("Uploading forge allocation");
      uploadFiles(
        zipfile_only_png[0],
        zipfile_with_model[0],
        selected_image_arr[0],
        selected_image_arr,
        "products",
      );
    }
  };

  const uploadFiles = async (
    file1: any[],
    file2: any[],
    file3: any[],

    fileArray: any[],
    storagePath: string,
  ) => {
    const storage = getStorage();
    abortControllerRef.current = new AbortController();
    const date = new Date();

    const year = new Date().getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonthName = monthNames[date.getMonth()];

    const randomNumber = Math.floor(Math.random() * 9) + 1;
    addDoc(collection(db, "products"), {
      cover_png: "",
      description: selected_descrption,
      factions: selected_faction,
      png_file: "",
      png_model_file: "",
      role: selectedOption,
      subfactions: selected_sub_faction,
      title: selected_text,
      year: year,
      // random: randomNumber,
      monthAdded: currentMonthName,
      createdAt: serverTimestamp(),
    })
      .then(async (res) => {
        // Upload the first file
        const productid = res.id;
        console.log(res.id);
        // Upload the first file
        const downloadURL1: string = await uploadFile(
          file1,
          productid,
          "pngZip.zip",
          `products/${productid}`,
          "png_file",
        );

        // Upload the second file
        const downloadURL2: string = await uploadFile(
          file2,
          productid,
          "model_&_png_Zip.zip",
          `products/${productid}`,
          "png_model_file",
        );

        // Upload the cover image file
        const downloadURL3: string = await uploadFile(
          file3,
          productid,
          "cover_image",
          `products/${productid}`,
          "cover_png",
        );

        // Upload the array of files
        const downloadURLsArray: string[] = await Promise.all(
          fileArray.map(async (file, index) => {
            return await uploadFile(
              file,
              productid,
              `supporting_${index}`,
              `products/${productid}`,
              "array_images",
            );
          }),
        );

        console.log("All files uploaded successfully.");
        setuploading_text("Forge allocation successfully updated");
        setdoneUploading(true);
        setfinalLink(
          window.location.host.includes("localhost")
            ? "http://" +
                window.location.host +
                "/product-showcase?product_id=" +
                productid
            : "https://" +
                window.location.host +
                "/product-showcase?product_id=" +
                productid,
        );
        return [
          downloadURL1,
          downloadURL2,
          downloadURL3,
          [...downloadURLsArray],
        ];
        // return;
      })
      .catch((error: any) => {
        console.error("Error uploading files:", error);
        throw error; // Re-throw the error to handle it outside this function
      });
  };

  const uploadFile = async (
    file: any,
    id: any,
    fileType: string,
    storagePath: string,
    field: any,
  ): Promise<string> => {
    const storage = getStorage();
    const storageRef = ref(storage, `${storagePath}/${fileType}`);

    return new Promise(async (resolve: any, reject: any) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (cancelled.current == true) {
            console.log("done cancelling");
            uploadTask.cancel(); // Cancel the Firebase upload
            // setIsUploading(false);
            handleCancel_init(id);
          } else {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(
              `Upload Progress (${fileType}):`,
              progress.toFixed(2),
              "%",
            );
            setuploading_text(`Uploading forge file : ${fileType}`);
            setuploadProgress(progress.toFixed(2));
          }
        },
        (error) => {
          console.error(`Error uploading ${fileType}:`, error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const productDocRef = doc(db, "products", id);
          const product_imagesRef = collection(db, "product_images");

          if (field == "png_file") {
            updateDoc(productDocRef, {
              png_file: downloadURL,
            })
              .then(() => {
                console.log("png_file uplod succefull ");
              })
              .catch((err) => {
                throw err;
              });
          } else if (field == "png_model_file") {
            updateDoc(productDocRef, {
              png_model_file: downloadURL,
            })
              .then(() => {
                console.log("png_model_file uplod succefull ");
              })
              .catch((err) => {
                throw err;
              });
          } else if (field == "cover_png") {
            updateDoc(productDocRef, {
              cover_png: downloadURL,
            })
              .then(() => {
                console.log("cover_png uplod succefull " + downloadURL);
              })
              .catch((err) => {
                throw err;
              });
          } else if (field == "array_images") {
            addDoc(product_imagesRef, {
              id: id,
              link: downloadURL,
            })
              .then(() => {
                console.log("the images array is being uploadid");
              })
              .catch((err) => {
                throw err;
              });
          }

          console.log(`${fileType} uploaded. Download URL:`, downloadURL);
          resolve(downloadURL);
        },
      );
    });
  };

  const handleCancel = () => {
    cancelled.current = true;
    setuploading_text("Canceling Forge Upload ");
  };

  const handleCancel_init = async (id: any) => {
    // Set isCanceledRef to true when the cancel button is clicked
    try {
      // delete all the ref
      const folderRef = ref(storage, `products/${id}`);
      const listResult = await listAll(folderRef);

      // Iterate through files and delete each one
      const deletePromises = listResult.items.map((item) => deleteObject(item));
      console.log("we are delteing items now ");
      setuploading_text("Deleting all uploads");
      // Wait for all delete operations to complete
      await Promise.all(deletePromises);

      const productImagesRef = collection(db, "product_images");
      setuploading_text("Deleting all records");

      // Create a query to get documents where 'id' is equal to postId
      const q = query(productImagesRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);

      // Iterate through the documents and delete each one
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      await deleteDoc(doc(db, "products", id));
      setuploading_text("All records deleted successfully");
      setisLoadingUploadModal(false);

      return;
    } catch (error) {
      console.error(
        "Error deleting documents from product_images collection:",
        error,
      );
      throw error;
    }
  };

  // Example usage:

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

  // //   this is for setting the sub factions
  useEffect(() => {
    if (active_faction == null) {
      return setsub_faction_arr([]);
    } else {
      const searcher = new JsonSearch(faction_option, {
        indice: {
          id: "id", // search the `title`
          // name: "author", // search the `author` but it's renamed as `name` in queries
        },
      });

      let foundObjects = searcher.query(active_faction);
      setactive_sub_faction(null);
      return setsub_faction_arr(foundObjects[0].sub);
    }
  }, [active_faction]);

  useEffect(() => {
    setlocal_post_err("");
  }, [
    selected_faction,
    selected_sub_faction,
    selectedOption,
    zipfile_with_model,
    selected_image_arr,
    selected_text,
    selected_descrption,
    zipfile_only_png,
  ]);

  // this is for my router funtion
  const router = useRouter();

  const reset = () => {
    setshowdash(false);
    setTimeout(() => {
      setshowdash(true);
    }, 400);
    setselected_faction("");
    setactive_faction("");
    setactive_sub_faction("");
    setselected_sub_faction("");
    setSelectedOption("");
    setzipfile_with_model([]);
    setselected_image_arr([]);
    setselected_text("");
    setselected_descrption("");
    setzipfile_only_png([]);
  };
  return (
    <>
      {page_loader && <Loader />}
      <div className=" flex justify-between  fixed top-0 border-opacity-[10%] backdrop-blur-[15px] z-[999] sm:h-[15vw]  items-center h-[4vw] px-[3vw] w-full">
        <button
          className="text-[1.5vw] sm:text-[5vw] neuem "
          onClick={() => {
            router.back();
          }}
        >
          {" "}
          <i className="bi bi-chevron-left"></i> Back
        </button>

        <button
          className="text-[1.2vw] sm:hidden sm:text-[4vw] text-[#FF0000] neuer "
          onClick={reset}
        >
          {" "}
          <i className="bi bi-trash3"></i> Discard Post
        </button>

        {/* now this is for the search filter  */}
        <div
          className="text-[black] text-opacity-[90%] hidden justify-center items-center sm:flex w-[45vw] gap-[2vw] text-[3vw] h-[10vw] bg-[#D2D1D3] rounded-[5vw] "
          onClick={() => {
            // setmobile_faction_active(true);
            setmobile_filter(true);
          }}
        >
          <p className={`${inter.className}`}>Select forge category</p>
          <Image
            src={mob_filter}
            alt="filter icon"
            className="w-[3vw] h-fit opacity-[90%]"
          />
        </div>
      </div>
      <div className="w-full  h-[5vw] sm:h-[17vw]"></div>
      {showdash ? (
        <>
          <div className="w-full px-[3vw] flex justify-between  sm:flex-col items-start ">
            {/* this is for the left section  */}
            <div className="w-auto sm:w-full flex-col gap-[4vw] sm:gap-[10vw] flex h-auto ">
              <Three_d
                setzipfile_with_model={setzipfile_with_model}
                setzipfile_only_png={setzipfile_only_png}
              />
              <Image_upload
                setselected_image_arr={setselected_image_arr}
                setselected_cover_img={setselected_cover_img}
              />
              <Text_upload
                local_post_err={local_post_err}
                setlocal_post_err={setlocal_post_err}
                setselected_text={setselected_text}
                setselected_descrption={setselected_descrption}
                selected_text={selected_text}
                selected_descrption={selected_descrption}
                handleUpload={handleUpload}
                reset={reset}
              />
            </div>

            {/* this is for the right section  */}
            <div className="w-auto sm:w-full  flex-col gap-[4vw] flex h-auto ">
              <Option_select
                options={options}
                handleRadioChange={handleRadioChange}
                selectedOption={selectedOption}
              />
              <Factions_forge_upload
                faction_option={faction_option}
                active_faction={active_faction}
                setactive_faction={setactive_faction}
                sub_faction_arr={sub_faction_arr}
                active_sub_faction={active_sub_faction}
                setactive_sub_faction={setactive_sub_faction}
                setselected_faction={setselected_faction}
                setselected_sub_faction={setselected_sub_faction}
                selected_faction={selected_faction}
                selected_sub_faction={selected_sub_faction}
              />

              {mobile_filter && (
                <Mobile_Factions_forge_upload
                  faction_option={faction_option}
                  active_faction={active_faction}
                  setactive_faction={setactive_faction}
                  sub_faction_arr={sub_faction_arr}
                  active_sub_faction={active_sub_faction}
                  setactive_sub_faction={setactive_sub_faction}
                  setselected_faction={setselected_faction}
                  setselected_sub_faction={setselected_sub_faction}
                  selected_faction={selected_faction}
                  selected_sub_faction={selected_sub_faction}
                  setmobile_filter={setmobile_filter}
                />
              )}
            </div>
          </div>

          {isLoadingUploadModal && (
            <StartUpload
              setisLoadingUploadModal={setisLoadingUploadModal}
              uploading_text={uploading_text}
              uploadProgress={uploadProgress}
              handleCancel={handleCancel}
              doneUploading={doneUploading}
              finalLink={finalLink}
            />
          )}
        </>
      ) : null}

      <div className="w-full h-[5vw] sm:h-[12vw]"></div>
    </>
  );
}
