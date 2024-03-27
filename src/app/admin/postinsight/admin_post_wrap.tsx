"use client";

import React, { useEffect, useState } from "react";
import {
  formatDistanceToNow,
  format,
  differenceInHours,
  differenceInMilliseconds,
} from "date-fns";
import JsonSearch from "search-array";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  orderBy,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore"; // Import necessary Firebase modules
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../../utils/fire_base_config";
import { useProfile_Context } from "../../utils/profile_context";
import { useSearchParams } from "next/navigation";
import Admin_Post_preloader from "./admin_post_preloader";
import Admin_Post from "./admin_post";
import Pinned_modal from "./admin_pinned";
import Image from "next/image";
import searchimg from "../../../../public/admin_section/post_insight/search_black.webp";
import PostAnalytics from "./post_analytics";
import Admin_edit_post_wrap from "./admin_edit_post_wrap";

const Admin_Post_wrap = () => {
  const [posts, setPosts] = useState([]);
  const [trimmedpost, settrimmedpost] = useState([]);
  const [comment_disabled, setcomment_disabled] = useState(true);
  const [reload_pinned, setreload_pinned] = useState(false);
  const [edit_post, setedit_post] = useState(false);
  const [pinnedid, setpinnnedid] = useState("");
  const [search_value, setsearch_value] = useState("");
  const [edit_postid, setedit_postid] = useState("GaEeabMmLIXO035r2hbd");

  //   this is for pinning data
  const [hide_pinned_modal, sethide_pinned_modal] = useState(false);

  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Get the current user (if needed)
  const auth = getAuth();

  const { setfrom }: any = useProfile_Context();

  const [post_loading, setpost_loading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const colRef = collection(db, "posts");
    const col_qery = query(
      colRef,
      orderBy("pinned", "desc"),
      orderBy("createdAt", "desc"),
    );

    // Fetch the posts and listen for changes in the collection
    onSnapshot(col_qery, (querySnapshot) => {
      let mostRecentTimestamp = new Date(0); // Epoch time as the initial value
      let mostRecentPostId = "";
      // First pass to find the most recent timestamp and post ID
      querySnapshot.forEach((doc) => {
        const createdAt = doc.data().createdAt.toDate();
        if (createdAt > mostRecentTimestamp) {
          mostRecentTimestamp = createdAt; // Update the most recent timestamp
          mostRecentPostId = doc.id; // Update the most recent post ID
        }
      });
      const postArray: any = [];
      setpost_loading(true);
      querySnapshot.forEach((doc) => {
        const postId = doc.id;
        const postData = doc.data();
        const usersCollectionRef = collection(db, "users");

        const imagesCollectionRef = collection(db, "posts", postId, "images");
        const likesCollectionRef = collection(db, "posts", postId, "likes");
        const commentsCollectionRef = collection(
          db,
          "posts",
          postId,
          "comments",
        );

        const now = new Date().getTime(); // Current time in milliseconds
        const createdAt = postData.createdAt.toDate(); // Convert Firebase Timestamp to JavaScript Date
        const timestamp = createdAt.getTime();

        const pinnedCollectionRef = collection(db, "posts", postId, "pinned");

        const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true });
        const exactTime = format(createdAt, "h a"); // Format the time to "2 pm" format

        const postWithSubcollections: any = {
          postId,
          postData,
          images: [],
          trimmedimages: [],
          comments: [{}],
          liked: false,
          latest: postId === mostRecentPostId,
          likesCount: 0,
          avatar: "",
          searching_title: "",
          comment_username: "",
          trimmedDescription: "", // Initialize the trimmed description
          timeAgo, // Add the timeAgo property
          exactTime, // Add the exactTime property
          order: false, // this classifies the order of the post
        };

        // for getting the latest post information
        // // Check if the post is within the last 24 hours
        if (differenceInHours(now, createdAt) <= 48) {
          postWithSubcollections.latest = true;
          //   latestPostsTemp.push(postId);
        }
        // If this post's createdAt is after the most recent   //

        // for trimming the text
        postWithSubcollections.searching_title = doc.data().title;
        // Trim the description
        const postData_description = doc.data().description;
        if (postData_description.length > 250) {
          postWithSubcollections.trimmedDescription =
            postData_description.slice(0, 250) + "...";
        } else {
          postWithSubcollections.trimmedDescription = postData_description;
        }

        onSnapshot(likesCollectionRef, (likesSnapshot) => {
          postWithSubcollections.likesCount = likesSnapshot.size;
        });

        // Fetch images from the "images" subcollection
        onSnapshot(imagesCollectionRef, (imageSnapshot) => {
          setpost_loading(true);
          const imagesArray: any = [];
          imageSnapshot.forEach((imageDoc: any) => {
            imagesArray.push(imageDoc.data());
          });
          postWithSubcollections.images = imagesArray;
          if (imagesArray.length >= 4) {
            const trimmedLinks = imagesArray.slice(0, 4);
            postWithSubcollections.trimmedimages = trimmedLinks;
          } else {
            postWithSubcollections.trimmedimages = imagesArray;
          }

          return setpost_loading(false);
        });

        //
        // this specifies the like option
        if (auth?.currentUser) {
          const userQuery = query(
            likesCollectionRef,
            where("user_id", "==", auth?.currentUser?.uid),
          );
          onSnapshot(userQuery, (subcollectionSnapshot) => {
            onSnapshot(likesCollectionRef, (likesSnapshot) => {
              postWithSubcollections.likesCount = likesSnapshot.size;
            });
            if (!subcollectionSnapshot.empty) {
              postWithSubcollections.liked = true;
            } else {
              postWithSubcollections.liked = false;
            }
          });
        }

        postArray.push(postWithSubcollections);
      });
      setPosts(postArray);
      //   settrimmedpost(postArray);
      return setpost_loading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchParams = useSearchParams();

  const post_scroll = searchParams.get("post");

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setcomment_disabled(false);
      } else {
        setcomment_disabled(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!post_loading) {
      // Use the post ID to scroll to the corresponding element
      const element = document.getElementById(`${post_scroll}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post_loading]);

  // to unpin the post
  const unpinpost = () => {
    setpost_loading(true);
    // Update the document with the new "pinned" value
    const pinnedCollectionRef = doc(db, "posts", pinnedid);
    updateDoc(pinnedCollectionRef, { pinned: false })
      .then((res) => {
        sethide_pinned_modal(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  useEffect(() => {
    if (search_value === "") {
      settrimmedpost(posts);
    } else {
      // Custom case-insensitive search using filter
      const foundObjects = posts.filter((post: any) =>
        post.searching_title.toLowerCase().includes(search_value.toLowerCase()),
      );

      settrimmedpost(foundObjects);
    }
  }, [search_value, posts]);

  const goback = () => {
    setedit_post(!edit_post);
  };
  return (
    <>
      {!edit_post ? (
        <>
          <PostAnalytics />
          <div className="w-full flex h-fit justify-center sm:flex-col items-center py-[1vw] sm:px-[4vw] sm:py-[3vw] sm:gap-[4vw] gap-[1.4vw]">
            <h2 className="text-center neuem text-[2.7vw] sm:text-[5vw] capitalize ">
              All Posts And Insights
            </h2>{" "}
            <div className="w-auto sm:w-full  items-center  flex justify-center   relative ">
              <div className="absolute h-full sm:w-[13vw]    w-[3.2vw] pr-[0.3vw] flex justify-end items-center top-0 left-0 z-[13]">
                <Image
                  src={searchimg}
                  alt="Search icon image"
                  className="w-[1.3vw] sm:w-[5vw]  h-fit"
                />
              </div>
              <input
                type="text"
                placeholder="Search by post title"
                className="h-[3vw] w-[23vw] sm:w-full sm:pl-[15vw] sm:h-[12vw] sm:rounded-[8vw] sm:text-[4vw] text-black neuer text-[0.9vw] outline-none focus:border transition duration-[0.8s] pl-[3.5vw] pr-[1vw]  rounded-[3vw] placeholder:text-black neuer bg-[#000000] bg-opacity-[10%]  border-white border-opacity-[30%] border-[0.1vw]"
                onChange={(e) => {
                  setsearch_value(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="w-full h-[0.1vw] bg-opacity-[23%] bg-[#D9D9D9] "></div>
          {hide_pinned_modal && (
            <Pinned_modal
              unpinpost={unpinpost}
              sethide_pinned_modal={sethide_pinned_modal}
            />
          )}
          <div className="w-full  sm:gap-[10vw]  sm:px-[4vw] flex flex-col gap-[6vw] justify-center pt-[4vw] items-center">
            {!post_loading
              ? trimmedpost.map((e: any, index: any) => {
                  return (
                    <Admin_Post
                      key={index}
                      index={index}
                      order={e.order ? 4 : 1}
                      id={e.postId}
                      postdata={e}
                      disable={comment_disabled}
                      setreload_pinned={setreload_pinned}
                      setpost_loading={setpost_loading}
                      setpinnnedid={setpinnnedid}
                      sethide_pinned_modal={sethide_pinned_modal}
                      goback={goback}
                      setedit_postid={setedit_postid}
                    />
                  );
                })
              : null}
            {post_loading ? (
              <>
                <Admin_Post_preloader /> <Admin_Post_preloader />{" "}
                <Admin_Post_preloader />
              </>
            ) : null}
          </div>
        </>
      ) : (
        <Admin_edit_post_wrap edit_postid={edit_postid} goback={goback} />
      )}
    </>
  );
};

export default Admin_Post_wrap;
