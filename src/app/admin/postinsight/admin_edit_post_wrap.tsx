"use client";

import React, { useState, useEffect } from "react";
import Admin_Post_preloader from "./admin_post_preloader";
import Admin_edit_post_preloader from "./admin_edit_post_preloader";
import Admin_edit_post from "./admin_edit_post";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const Admin_edit_post_wrap = (props: any) => {
  const { edit_postid, goback } = props;
  const [isloading, setisloading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [images, setImages] = useState([]);
  const [copy_title, setcopy_Title] = useState("");
  const [copy_description, setcopy_Description] = useState("");
  const [copy_role, setcopy_Role] = useState("");
  const [copy_images, setcopy_Images] = useState([]);
  const [local_post_err, setlocal_post_err] = useState("");

  //   these values are from else where
  const [mediaFiles, setMediaFiles] = useState<any>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [trimmedMediaFiles, setTrimmedMediaFiles] = useState<any>([]);
  const [isfilelaoded, setisfilelaoded] = useState(false);
  //   these are for the props
  const [data, setdata] = useState([]);
  const [maindata, setmaindata] = useState("");
  const [display_modal, setdisplay_modal] = useState(false);
  const [video, setvideo] = useState(false);

  const [progressvalue, setprogressvalue] = useState<any>("");
  const [progressongoing_vaule, setprogressongoing_vaule] = useState<any>("");
  const [is_updating, setis_updating] = useState(false);
  //
  const updatePostWithImages = async (
    allMediaFiles: any,
    postContent: any,
    postId: any,
    onProgress: any,
  ) => {
    const db = getFirestore();
    const storage = getStorage();

    try {
      // Updating the post's text content
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        title: postContent.title,
        description: postContent.description,
        role: postContent.role,
      });

      // Retrieve the existing images subcollection
      const imagesRef = collection(db, "posts", postId, "images");
      const currentImagesSnapshot = await getDocs(imagesRef);

      // Extract current image links for easier comparison
      const currentImageLinks = currentImagesSnapshot.docs.map(
        (doc) => doc.data().link,
      );

      // Determine which images to keep and which to delete
      const imagesToKeep = allMediaFiles.filter(
        (file: any) => typeof file === "object" && file.link,
      );
      const imagesToDelete = currentImageLinks.filter(
        (link) => !imagesToKeep.some((file: any) => file.link === link),
      );

      // Delete images that are no longer present
      const deletionPromises = currentImagesSnapshot.docs.map((imageDoc) => {
        const imageIndex = imageDoc.data().id; // Assuming you store an 'index' or unique identifier
        const storagePath = `posts/${postId}/${imageIndex}`;

        if (
          !imagesToKeep.some((file: any) => {
            return (
              typeof file === "object" &&
              "link" in file &&
              file.link === imageDoc.data().link
            );
          })
        ) {
          const fileRef = ref(storage, storagePath);
          return deleteObject(fileRef)
            .then(() => {
              return deleteDoc(doc(imagesRef, imageDoc.id));
            })
            .then(() => {})
            .catch((error) =>
              console.error(`Error deleting image at ${storagePath}:`, error),
            );
        }

        // If the file should be kept, resolve the promise immediately
        return Promise.resolve();
      });

      // Wait for all deletions to complete
      await Promise.all(deletionPromises);

      // Upload new images
      const newImagesToUpload = allMediaFiles.filter(
        (file: any) => file instanceof File,
      );
      let uploadCount = 0; // To keep track of the number of uploads completed

      const uploadPromises = newImagesToUpload.map((file: any, index: any) => {
        const timestamp = new Date().getTime(); // Get current timestamp

        const uniqueFileName = `${file.name}_${timestamp}`;
        const storageRef = ref(storage, `posts/${postId}/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              onProgress(index, progress, newImagesToUpload.length); // Update progress for individual file
            },
            reject, // Reject on error
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              await addDoc(imagesRef, {
                link: downloadURL,
                id: uniqueFileName,
              });
              uploadCount++;

              if (uploadCount === newImagesToUpload.length) {
              }
              resolve(downloadURL); // Resolve with the download URL
            },
          );
        });
      });

      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      // Replace with your dynamic post id
      setis_updating(false);

      getPostDetailsToState(edit_postid);
    } catch (error) {
      console.error("Error during update operations: ", error);
      throw error; // Rethrow the error for further handling
    }
  };
  // The postContent object contains the updated text fields of the post
  const postContent = {
    title: copy_title,
    description: copy_description,
    role: copy_role,
  };

  // onProgress is a callback function to handle the progress of uploads

  const update_post = () => {
    if (copy_title == "") {
      return setlocal_post_err(
        "Oops! Please provide a title for your content to continue",
      );
    } else if (copy_description == "") {
      return setlocal_post_err(
        "Oops! Please provide a  description for your content to proceed",
      );
    } else if (copy_role == "") {
      return setlocal_post_err(
        "Please select the roles of people who can view your content. It's an important step to ensure your content reaches the right audience.",
      );
    } else {
      setlocal_post_err("");
      // Example usage:
      setis_updating(true);
      setprogressvalue(0);
      updatePostWithImages(
        copy_images,
        postContent,
        edit_postid,
        (fileIndex: any, progress: any, length: any) => {
          setprogressvalue(progress);
        },
      )
        .then(() => {})
        .catch((error) => {
          console.error("An error occurred while updating the post:", error);
        });
      //  createPost(updated_media, postContent, onProgress);
    }
  };

  const getPostDetailsToState = (postId: any) => {
    const db = getFirestore();
    const postRef = doc(db, "posts", postId);

    // Get the post document
    getDoc(postRef)
      .then((postDoc) => {
        if (postDoc.exists()) {
          // Extract the data from the post document
          const postData = postDoc.data();
          setTitle(postData.title);
          setDescription(postData.description);
          setRole(postData.role); // Assuming 'role' is a field in your post document
          setcopy_Title(postData.title);
          setcopy_Description(postData.description);
          setcopy_Role(postData.role); // Assuming 'role' is a field in your post document

          // Now fetch the images from the "images" subcollection
          const imagesCollectionRef = collection(db, "posts", postId, "images");
          setisloading(true);
          return getDocs(imagesCollectionRef);
        } else {
          throw new Error("Post not found");
        }
      })
      .then((imageSnapshot) => {
        // Extract image data from the subcollection and set it to state
        const imageArray: any = imageSnapshot.docs.map((imageDoc) => ({
          id: imageDoc.id, // Store the document ID
          link: imageDoc.data().link, // Store the image link
        }));

        setImages(imageArray);
        return setcopy_Images(imageArray);
      })
      .catch((error) => {
        console.error("Error fetching post details: ", error);
        // Handle any errors that occur during the fetch, such as setting error messages in state
      });
  };

  // Call this function with the dynamic postId when the component mounts or when the postId changes
  useEffect(() => {
    window.scrollTo(0, 0);
    const postId = edit_postid; // Replace with your dynamic post id
    getPostDetailsToState(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount

  const reset_value = () => {
    setcopy_Description(description);
    setcopy_Title(title);
    setcopy_Images(images);
    setcopy_Role(role);
  };
  useEffect(() => {
    return setTrimmedMediaFiles(copy_images.slice(0, 4));
  }, [copy_images]);

  return (
    <>
      {!isloading ? (
        <Admin_edit_post_preloader />
      ) : (
        <>
          <Admin_edit_post
            goback={goback}
            setcopy_role={setcopy_Role}
            setcopy_Title={setcopy_Title}
            setcopy_Description={setcopy_Description}
            setcopy_Images={setcopy_Images}
            copy_role={copy_role}
            copy_Title={copy_title}
            local_post_err={local_post_err}
            copy_Description={copy_description}
            copy_Images={copy_images}
            setlocal_post_err={setlocal_post_err}
            update_post={update_post}
            reset_value={reset_value}
            mediaFiles={mediaFiles}
            setmediaFiles={setMediaFiles}
            isDragOver={isDragOver}
            setIsDragOver={setIsDragOver}
            trimmedMediaFiles={trimmedMediaFiles}
            settrimmedMediaFiles={setTrimmedMediaFiles}
            isfilelaoded={isfilelaoded}
            setisfilelaoded={setisfilelaoded}
            setdata={setdata}
            data={data}
            setmaindata={setmaindata}
            maindata={maindata}
            setdisplay_modal={setdisplay_modal}
            display_modal={display_modal}
            setvideo={setvideo}
            video={video}
            setis_updating={setis_updating}
          />

          {is_updating && (
            <div className="w-full h-full fixed top-0 z-[9999] left-0 bg-black bg-opacity-[50%] flex justify-center sm:px-[5vw] items-center">
              {" "}
              <div className="w-[30vw] h-[12vw] sm:h-[30vw] sm:w-full px-[2vw] gap-[2vw] flex-col rounded-[2vw] bg-white flex justify-center items-center ">
                <p className="neuer text-[1.4vw] capitalize sm:text-[4vw]">
                  Updating Post
                </p>
                <div className="w-full bg-[gray] h-[1.4vw] sm:h-[5vw] rounded-[2vw] overflow-hidden">
                  <div
                    className=" h-full bg-[#CCFF00]"
                    style={{
                      width: `${progressvalue}%`,
                      transition: "2s ease",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Admin_edit_post_wrap;
