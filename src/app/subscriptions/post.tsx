"use client";

import React, { useState, useEffect } from "react";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
  updateDoc,
  addDoc,
  getDoc,
  doc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import firebaseConfig from "../utils/fire_base_config";

import Comments_modal from "./comment";
import { headers } from "next/headers";
import Image_display from "./img_display";
import Subscrption_Likes_modal from "./likes_modal";

const Post = (props: any) => {
  const [liked, setliked] = useState(false);

  const [showmore, setshowmore] = useState(false);
  const [showcomment, setshowcomment] = useState(false);

  const [commentvalue, setcommentvalue] = useState("");

  // the component coming from the parent
  const { postdata, id, order, disable, index } = props;

  const [err, seterr] = useState(false);

  const [likes, setlikes] = useState(0);
  const [comment_info_data, setcomment_info_data] = useState<any>([]);

  // this handles the copy function
  const [copied, setcopied] = useState("");
  const [hostlink, sethostlink] = useState("");

  // this is for the image display
  const [img_display_arr, setimg_display_arr] = useState([]);

  const [img_display, setimg_display] = useState("");

  const [img_display_show, setimg_display_show] = useState(false);

  const [pinned, setpinned] = useState(false);
  const [local_comments, setlocal_comments] = useState([{}]);

  // likdes data
  const [likes_data, setlikes_data] = useState<any>([]);

  const [video, setvideo] = useState(false);
  const videoExtensions = [
    "mp4",
    "mov",
    "avi",
    "mkv",
    "webm",
    "flv",
    "wmv",
    "3gp",
    "mpeg",
    "ogv",
    "ogg",
  ];
  // this handles the display of the like modal
  const [activeModalIndex, setActiveModalIndex] = useState<any>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        activeModalIndex !== null &&
        !document
          .getElementById(`brand-${activeModalIndex}`)
          ?.contains(event.target as Node)
      ) {
        setActiveModalIndex(null); // Close the modal if click is outside
      }
    };

    // Add click event listener to the entire document
    document.addEventListener("click", handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [activeModalIndex]);
  useEffect(() => {
    sethostlink(window.location.host);
    const likesCollectionRef = collection(
      db,
      "posts",
      postdata.postId,
      "likes",
    );
    const usersCollectionRef = collection(db, "users");
    const commentsCollectionRef = collection(
      db,
      "posts",
      postdata.postId,
      "comments",
    );

    onSnapshot(likesCollectionRef, (likesSnapshot) => {
      // postWithSubcollections.likesCount = likesSnapshot.size;

      // const likes_array: any[] = [];
      // setcomment_info_data([]);
      const likes_array: any[] = [];
      // setcomment_info_data([]);

      if (!likesSnapshot.empty) {
        likesSnapshot.forEach((commentDoc: any) => {
          const likes_data = commentDoc.data();
          const userId = likes_data.user_id;

          if (userId) {
            const comment_query = query(
              usersCollectionRef,
              where("userid", "==", userId),
            );

            getDocs(comment_query)
              .then((res) => {
                if (!res.empty) {
                  const userlike_info = res?.docs[0]?.data();
                  likes_array.push({
                    name: userlike_info.Username,
                    avatar: userlike_info.avatar_url,
                  });

                  setlikes(likesSnapshot.size);
                  setlikes_data(likes_array);
                  console.log(likes_array);
                }
              })
              .catch((err) => {
                console.error("Error fetching user info: ", err);
              });
          }
        });
      }
    });

    if (auth?.currentUser) {
      const userQuery = query(
        likesCollectionRef,
        where("user_id", "==", auth?.currentUser?.uid),
      );
      onSnapshot(userQuery, (subcollectionSnapshot) => {
        if (!subcollectionSnapshot.empty) {
          setliked(true);
        } else {
          setliked(false);
        }
      });
    }

    onSnapshot(commentsCollectionRef, async (commentSnapshot) => {
      const commentArray: any[] = [];
      const promises: Promise<any>[] = [];

      commentSnapshot.forEach((commentDoc: any) => {
        const commentData = commentDoc.data();
        const userId = commentData.userid;

        const comment_query = query(
          usersCollectionRef,
          where("userid", "==", userId),
        );

        const promise = getDocs(comment_query)
          .then((res) => {
            const userCommentInfo = res?.docs[0]?.data();
            commentArray.push({
              avatar: userCommentInfo.avatar_url,
              name:
                userCommentInfo.name.length > 1
                  ? userCommentInfo.name
                  : "User***** ",
              text: commentData.comment,
            });
          })
          .catch((err) => {
            console.error("Error fetching user information:", err);
          });

        promises.push(promise);
      });

      try {
        await Promise.all(promises);
        // Once all promises are resolved, set the comment data
        setcomment_info_data(commentArray);
        console.log(commentArray.length);
      } catch (error) {
        // Handle any errors here
        console.error("Error fetching comments:", error);
      }
    });

    if (auth?.currentUser) {
      const userQuery = query(
        likesCollectionRef,
        where("user_id", "==", auth?.currentUser?.uid),
      );
      onSnapshot(userQuery, (subcollectionSnapshot) => {
        if (!subcollectionSnapshot.empty) {
          setliked(true);
        } else {
          setliked(false);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setlikes(postdata.likesCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  // const [img_items, setimg_items] = useState<any>([]);

  // firebase init
  // Initialize the data base connection
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app);

  // Define the main collection reference
  const colRef = collection(db, "posts");

  // Get the current user (if needed)
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        seterr(false);
      } else {
        seterr(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlelike = async (postid: any) => {
    if (auth.currentUser) {
      const imagesCollectionRef = collection(
        db,
        "posts",
        postdata.postId,
        "likes",
      );
      const likeDocRef = doc(imagesCollectionRef, auth.currentUser?.uid);
      // Query the Firestore collection to find the user
      const userQuery = query(
        imagesCollectionRef,
        where("user_id", "==", auth.currentUser?.uid),
      );
      // Check if the user's like already exists
      const likeDoc = await getDoc(likeDocRef);
      const update_like = { user_id: auth?.currentUser?.uid };

      getDocs(userQuery).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Assuming each username is unique, there should be only one matching user
          const userDoc = querySnapshot.docs[0];
          // const userData = userDoc.data();
          const docid = userDoc.id;

          const delete_doc_reference = doc(
            db,
            "posts",
            postdata.postId,
            "likes",
            docid,
          );
          deleteDoc(delete_doc_reference)
            .then(() => {
              setlikes(postdata.likesCount);
            })
            .catch((error) => {
              console.error("Error removing like: ", error);
            });
        } else {
          addDoc(imagesCollectionRef, update_like)
            .then((res) => {
              setlikes(postdata.likesCount);
              update_engagement("likes", postdata.postId);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    } else {
      setliked(!liked);
    }
  };

  const handlecomment = (e: any) => {
    if (commentvalue != "") {
      // setcomment_info_data(comment_info_data);

      const comment_CollectionRef = collection(db, "posts", e, "comments");
      const authid = auth.currentUser?.uid;
      const commentinfo = { comment: commentvalue, userid: authid };

      addDoc(comment_CollectionRef, commentinfo)
        .then((res) => {
          setcomment_info_data(comment_info_data);
          setcommentvalue("");
          update_engagement("commented", postdata.postId);
          get_current_comments(e);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const get_current_comments = async (e: any) => {
    const commentsCollectionRef = collection(db, "posts", e, "comments");
    const usersCollectionRef = collection(db, "users");

    try {
      const commentSnapshot = await getDocs(commentsCollectionRef);
      const commentArray: any[] = [];

      await Promise.all(
        commentSnapshot.docs.map(async (commentDoc: any) => {
          const commentData = commentDoc.data();
          const userId = commentData.userid;
          const comment_query = query(
            usersCollectionRef,
            where("userid", "==", userId),
          );

          const res = await getDocs(comment_query);
          const userCommentInfo = res?.docs[0]?.data();

          commentArray.push({
            avatar: userCommentInfo.avatar_url,
            name:
              userCommentInfo.name.length > 1
                ? userCommentInfo.name
                : "User***** ",
            text: commentData.comment,
          });
        }),
      );

      // Once all comments are collected, set them and log the length
      setcomment_info_data(commentArray);
      console.log(commentArray.length);
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    // Set a timer to reset the text after 1000 milliseconds (1 second)
    const timer = setTimeout(() => {
      setcopied("");
    }, 2000);

    // Clean up the timer when the component unmounts or when the effect re-runs
    return () => {
      clearTimeout(timer);
    };
  }, [copied]); // Empty dependency array ensures the effect runs only once

  // update the engagement collection
  const update_engagement = (e: string, idp: any) => {
    const collection_ref = collection(db, "post_engagement");
    addDoc(collection_ref, {
      type: e,
      userid: auth?.currentUser?.uid,
      createdAt: serverTimestamp(),
      post_id: idp,
    })
      .then(() => {
        // console.log("this is engagement");
      })
      .catch((err) => {
        console.log("New error" + err);
      });
  };
  return (
    <>
      <section
        className={` w-[58vw] sm:w-full sm:gap-[5vw] sm:rounded-[3vw] h-auto flex flex-col py-[4vw] gap-[3vw] sm:py-[10vw] bg-[#111111] rounded-[1.5vw]`}
        id={id}
        style={{ order: order }}
      >
        {/*the heading */}

        <div className="w-full px-[4vw] flex flex-col gap-[0.7vw]  items-start">
          <div className="w-full flex items-center text-[1vw] gap-[0.5vw] sm:gap-[1vw] sm:text-[2.6vw] text-opacity-[70%] text-white neuer">
            <p className="">{postdata.timeAgo}</p>
            <div className="rounded-[100%] bg-white bg-opacity-[30%] h-[0.3vw] w-[0.3vw] sm:h-[0.9vw] sm:w-[0.9vw]"></div>{" "}
            <p>{postdata.exactTime}</p>
          </div>
          <h2 className="text-white capitalize text-[2.2vw] sm:text-[5vw] neuem">
            {postdata.postData.title}
          </h2>
        </div>
        {/* the images */}
        {postdata.images.length > 0 && (
          <div
            className="w-full flex flex-wrap gap-[1vw] sm:gap-[1.5vw] relative  justify-center items-center px-[0vw]"
            onClick={() => {
              update_engagement("Media_view", postdata.postId);
            }}
          >
            {postdata.trimmedimages.map((e: any, index: any) => {
              const isVideoLink = videoExtensions.some((ext) =>
                e.link.includes(`.${ext}`),
              );

              if (isVideoLink) {
                return (
                  <div
                    key={index}
                    className="w-[28vw]  sm:w-[44.5vw] sm:h-[36vw]  relative h-[24vw] cursor-pointer hover:scale-[1.01] transition duration-[0.6s] avater_bg rounded-[1.5vw] overflow-hidden "
                    style={{
                      backgroundImage: `url(/subscription/video_loader.webp)`,
                    }}
                    onClick={() => {
                      setvideo(true);
                      setimg_display_arr(postdata.images);
                      setimg_display(e.link);
                      setimg_display_show(true);
                    }}
                  >
                    <video
                      src={e.link}
                      muted
                      playsInline
                      loop={true}
                      autoPlay
                      className="aspect-[1/0.9] scale-y-[1.8] scale-x-[1.4] w-full"
                    ></video>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="w-[28vw] sm:w-[44.5vw] sm:h-[36vw] avater_bg  relative h-[24vw] cursor-pointer hover:scale-[1.01] transition duration-[0.6s] avater_bg rounded-[1.5vw] overflow-hidden "
                    style={{ backgroundImage: "url(/cover.webp)" }}
                    onClick={() => {
                      setvideo(false);
                      setimg_display_arr(postdata.images);
                      setimg_display(e.link);
                      setimg_display_show(true);
                    }}
                  >
                    {" "}
                    <img
                      src={e.link}
                      alt={index + "bg images"}
                      className="h-full w-full scale-[2]"
                    />
                  </div>
                );
              }
            })}
            {postdata.images.length > 4 && (
              <div
                className="absolute sm:w-[44.7vw] sm:h-[36.1vw] sm:right-[0.67vw] right-[0.45vw] bottom-0 h-[24vw] bg-[#000000] cursor-pointer  transition duration-[0.6s] bg-opacity-[78%] rounded-[1.5vw] flex justify-center items-center w-[28.1vw] "
                onClick={() => {
                  setimg_display_arr(postdata.images);
                  setimg_display(postdata.images[3].link);
                  setimg_display_show(true);
                }}
              >
                <p className="neuem text-[4vw] sm:text-[10vw] text-white text-center ">
                  +{postdata.images.length - 4}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="w-full px-[4vw] text-white sm:gap-[3vw] text-opacity-[50%] sm:text-[3.5vw] text-[1.2vw] flex flex-col gap-[0.7vw] items-start ">
          {showmore ? (
            <p
              className="w-[100%] neuer"
              dangerouslySetInnerHTML={{
                __html: postdata.postData.description,
              }}
            ></p>
          ) : (
            <p
              className="w-[100%] neuer"
              dangerouslySetInnerHTML={{ __html: postdata.trimmedDescription }}
            ></p>
          )}

          {postdata.postData.description.length >= 249 && (
            <span
              className="text-[#CCFF00] cursor-pointer hover:underline hover:underline-offset-4 transition duration-[0.6s] neuem"
              onClick={() => {
                setshowmore(!showmore);
              }}
            >
              {showmore ? "See less" : "Read more"}
            </span>
          )}

          {/* the icons */}
          <div className="w-full relative py-[1vw]  h-auto  flex justify-between items-center">
            <div className="w-auto flex justify-start gap-[2vw] sm:gap-[4vw]">
              {" "}
              <i
                className={`bi bi-heart-fill  text-[1.3vw] sm:text-[4vw] ${
                  liked ? "opacity-[100%]" : "opacity-[50%]"
                } hover:opacity-[100%] duration-[0.6s] transition cursor-pointer`}
                onClick={handlelike}
                style={{ color: liked ? "#CCFF00" : "white" }}
              ></i>
              <i
                className="bi relative bi-upload text-white text-[1.3vw] sm:text-[4vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                style={{ color: copied == "copied url" ? "#CCFF00" : "white" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    hostlink + "/subscriptions?post=" + postdata.postId,
                  );
                  setcopied("copied url");
                }}
              >
                <p
                  className="text-[0.8vw] w-[4.5vw] sm:text-[2vw] sm:bottom-[-2vw] sm:right-[-2vw] sm:w-[10vw]  text-opacity-[70%] absolute bottom-[-0.8vw] right-[-1.8vw]"
                  style={{ color: "white" }}
                >
                  {copied}
                </p>
              </i>
              {/* <i
                className="bi bi-pin-angle-fill text-white text-[1.3vw] opacity-[70%] hover:opacity-[100%] duration-[0.6s] transition cursor-pointer"
                onClick={handlepinned}
              ></i> */}
            </div>

            <div
              className="w-auto flex gap-[1vw] justify-end items-center cursor-pointer"
              onClick={() => {
                setActiveModalIndex(index);
              }}
            >
              <p className="text-[1vw] text-[#CCFF00] neuer sm:text-[3vw]">
                {postdata.likesCount}{" "}
                {postdata.likesCount < 2 ? "Like" : "Likes"}
              </p>
              <i className="bi bi-bar-chart-fill text-white text-[1.3vw] sm:text-[4vw] hover:opacity-[100%] duration-[0.6s] transition opacity-[70%] cursor-pointer"></i>
            </div>

            {activeModalIndex == index && (
              <Subscrption_Likes_modal
                index={index}
                likes={likes}
                setActiveModalIndex={setActiveModalIndex}
                likes_array={likes_data}
              />
            )}
          </div>

          <button
            className="text-white bg-transparent neuer sm:text-[3vw] text-opacity-[50%]"
            onClick={() => {
              // setcomment_info_data(postdata.comments);
              setshowcomment(true);
            }}
          >
            See{" "}
            {comment_info_data.length > 0 && `all ${comment_info_data.length} `}
            comments
          </button>

          {/* the form to handle comments  */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlecomment(postdata.postId);
            }}
            className="w-full h-auto   mt-[0vw] relative text-[1vw] sm:text-[3vw]"
          >
            <input
              type="text"
              placeholder={err ? "Login to comment" : "Write a  comment"}
              className="w-full h-[3.4vw]  sm:h-[9vw] outline-none focus:border-opacity-[100%] sm:border-[0.3vw] border-[0.1vw] border-white border-opacity-[50%] sm:rounded-[5vw] sm:pl-[4vw] sm:pr-[12vw]  pr-[4.5vw] rounded-[2.5vw] text-white text-opacity-[80%] pl-[2vw] neuer transition duration-[0.6s] bg-[#1B1B1B]"
              onChange={(e: any) => {
                setcommentvalue(e.target.value);
              }}
              disabled={disable}
              value={commentvalue || ""}
            />
            <button
              type="submit"
              disabled={disable}
              className="text-[#CCFF00] sm:text-[3vw] neuer text-[1.2vw]  absolute sm:right-[4vw] right-[1.3vw] hover:hover:text-[#7e9426] transition duration-[0.5s] top-[-50%] translate-y-[50%] h-full"
            >
              Post{" "}
            </button>
          </form>
        </div>
      </section>

      {showcomment && (
        <Comments_modal commentwrap={comment_info_data} hide={setshowcomment} />
      )}
      {img_display_show && (
        <Image_display
          img_display_arr={img_display_arr}
          setimg_display_arr={setimg_display_arr}
          img_display={img_display}
          setimg_display={setimg_display}
          setimg_display_show={setimg_display_show}
          video={video}
          setvideo={setvideo}
        />
      )}
    </>
  );
};
export default Post;
