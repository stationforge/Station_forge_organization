"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Loader from "../general_components/loader";
import Header from "../general_components/header";
import Settings_modal from "../general_components/settings";
import Profile_dropdown from "../general_components/profile_dropdown";

import { FadeInTransition } from "react-transitions-library";
import Showcase_header from "./showcase_header";
import Showcase_body from "./showcase_body";
import { useSearchParams } from "next/navigation";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import firebaseConfig from "../utils/fire_base_config";
import Showcase_preloader from "./body_preloader";
import Review from "./reviews";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Review_preloader from "./review_preloader";
import Forge from "../general_components/forge";
import Similar_models from "./similar_model";
import Preloader_for_Similar_models_preloader from "./similar_model_preloader";

export default function Home() {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();
  const {
    show_setting_modal,
    setshow_setting_modal,
    page_loader,
    setpage_loader,
    forge_loader,
    setfrom,
  }: any = useProfile_Context();

  useEffect(() => {
    setpage_loader(false);
    setfrom("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchParams = useSearchParams();

  const product_id = searchParams.get("product_id");
  const faction = searchParams.get("faction");

  // the search param is above
  const [product_arr, setproduct_arr] = useState<any>({});
  const [product_images, setproduct_images] = useState([{}]);
  const [cover_img_link, setcover_img_link] = useState("");
  const [disable, setdisable] = useState(true);
  const [hackdisable, sethackdisable] = useState(true);
  const [is_loading, setis_loading] = useState(true);
  const [uuid, setuuid] = useState("");
  const [reviewsWithUserDetails, setReviewsWithUserDetails] = useState<any>([]);
  const [reviewisloading, setreviewisloading] = useState(true);
  const [review_empty, setreview_empty] = useState(false);
  const [trimmedReviews, setTrimmedReviews] = useState<any>([]);

  // for the similar models

  const [similarArr, setsimilarArr] = useState<any>([]);
  const [similarArrIsLoading, setsimilarArrIsLoading] = useState(true);
  const [check_network, setcheck_network] = useState(false);
  const [check_empty, setcheck_empty] = useState(false);

  // this is for the gorge text . it is outside so we can monitor it form the similar model state
  const [forge_text, setforge_text] = useState("Add to forge");

  // for the user step
  const [userSTep, setuserStep] = useState("");
  useEffect(() => {
    if (product_id) {
      const docRef = doc(db, "products", product_id); // "products" is the collection, productId is the ID
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const { title, description, cover_png, role } = docSnap.data();
            const productData = {
              title,
              description,
              cover_png,
              role,
              // Assuming 'coverImage' is the field name for the cover image in your document
            };
            setcover_img_link(cover_png);
            setproduct_arr(productData); // Update state with the structured product data

            // Now, fetch related images from the product_images collection
            // where the 'productId' field matches the product_id
            const imagesCollectionRef = collection(db, "product_images");
            const q = query(imagesCollectionRef, where("id", "==", product_id));
            // getDocs(q);
            return getthumbnails(product_id, productData);
          } else {
            // Document not found
            return Promise.reject("No such document!");
          }
        })

        .catch((err) => {
          // Handle the error
          // setError(err.message);
          console.log(err);
        });
    } else {
      // setError('No product ID provided');
      // setLoading(false);
    }
  }, [product_id]);

  const getthumbnails = (docid: any, firstele: any) => {
    const imagesCollectionRef = collection(db, "product_images");
    const q = query(imagesCollectionRef, where("id", "==", docid));
    return getDocs(q)
      .then((querySnapshot) => {
        // Process the querySnapshot to get image data

        const imagesData: any = [];

        // Add the rest of the images from the product_images collection to the array
        querySnapshot.forEach((doc) => {
          const imageData: any = doc.data();
          if (imageData.link !== firstele.cover_png) {
            // Avoid duplicating the cover image
            imagesData.push(imageData); // This assumes that the image URL is stored in a field named 'url'
          }
        });

        setproduct_images(imagesData); // Update state with the array of image data objects
        return setis_loading(false); // Log the array of image data objects
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // check for loggedin users
  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is authenticated, redirect to a protected route
        // router.push("/"); // Replace with your protected routef
        setuuid(user.uid);
        setdisable(false);
        sethackdisable(false);
        logUserRole(user.uid);
      } else {
        setdisable(true);
        sethackdisable(true);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check the guys permission
  const logUserRole = (userUid: any) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userid", "==", userUid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Assuming there's only one document with this userId
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setuserStep(userData.step + 1);
          console.log(userData.step + 1);
        } else {
          console.log("No matching documents.");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  useEffect(() => {
    const colRef = collection(db, "reviews");
    const colQuery = query(
      colRef,
      where("id", "==", product_id),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(
      colQuery,
      (reviewsSnapshot) => {
        if (reviewsSnapshot.empty) {
          setreview_empty(true);
        } else {
          setreview_empty(false);
        }

        const userDetailsPromises = reviewsSnapshot.docs.map((reviewDoc) => {
          const reviewData = reviewDoc.data();
          const usersCollectionRef = collection(db, "users");
          const userQuery = query(
            usersCollectionRef,
            where("userid", "==", reviewData.userId),
          );

          return getDocs(userQuery).then((userDocSnapshot) => {
            if (!userDocSnapshot.empty) {
              const userCommentInfo = userDocSnapshot.docs[0].data();
              return {
                avatar:
                  userCommentInfo.avatar_url &&
                  userCommentInfo.avatar_url.length > 2
                    ? userCommentInfo.avatar_url
                    : "https://firebasestorage.googleapis.com/v0/b/fir-9-dojo-24129.appspot.com/o/avatar.jpg?alt=media&token=eb3bea40-608e-46c7-a13e-17f13946f193",
                name:
                  userCommentInfo.name && userCommentInfo.name.length > 1
                    ? userCommentInfo.name
                    : "User***** ",
                text: reviewData.text,
              };
            }
            return null; // Return null if the user is not found, we will filter out nulls later.
          });
        });

        Promise.all(userDetailsPromises)
          .then((reviewsWithUsers) => {
            const filteredReviewsWithUsers = reviewsWithUsers.filter(Boolean);
            console.log("Data loaded successfully.");
            setReviewsWithUserDetails(filteredReviewsWithUsers);
          })
          .catch((error) => {
            console.error("Error loading data:", error);
            // Handle the error, e.g., show an error message to the user
          })
          .finally(() => {
            setreviewisloading(false);
          });
      },
      (error) => {
        console.error("Error in snapshot listener:", error);
        // Handle the error, e.g., show an error message to the user
        setreviewisloading(false);
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [
    product_id,
    setreview_empty,
    setreviewisloading,
    setReviewsWithUserDetails,
  ]);

  useEffect(() => {
    const fetchSimilarModels = async () => {
      try {
        const productsRef = collection(db, "products");
        const productsQuery = query(
          productsRef,
          where("cover_png", "!=", product_arr.cover_png),
          where("factions", "==", faction),
        );

        const productsSnapshot = await getDocs(productsQuery);

        if (!productsSnapshot.empty) {
          const allSimilarModels = productsSnapshot.docs.map((productDoc) => {
            const { id } = productDoc;
            const { title, factions, cover_png } = productDoc.data();
            return {
              title,
              id,
              cover_png,
              factions,
            };
          });

          // Shuffle the array to get a random order
          const shuffledModels = allSimilarModels.sort(
            () => Math.random() - 0.5,
          );

          // Take the first 4 elements from the shuffled array
          const selectedModels = shuffledModels.slice(0, 4);

          setsimilarArr(selectedModels);
          setcheck_network(false);
          setcheck_empty(false);
        } else {
          setcheck_network(true);
          setcheck_empty(false);
        }
        setsimilarArrIsLoading(false);
      } catch (error) {
        console.error("Error fetching similar models:", error);
        setsimilarArrIsLoading(false);
        setcheck_network(false);
        setcheck_empty(true);
      }
    };

    if (product_arr?.cover_png) {
      fetchSimilarModels();
    }
  }, [db, product_id, product_arr, faction]);

  useEffect(() => {
    setTrimmedReviews(reviewsWithUserDetails.slice(0, 4));
  }, [reviewsWithUserDetails]);

  const seeall_review = () => {
    return setTrimmedReviews(reviewsWithUserDetails);
  };
  const seeless_review = () => {
    return setTrimmedReviews(reviewsWithUserDetails.slice(0, 4));
  };

  return (
    <>
      {page_loader && <Loader />}
      {forge_loader && <Forge />}

      <Showcase_header />

      <div className="w-full h-fit z-[99] sm:h-[20vw] hidden sm:block fixed top-[0vw] ">
        <Header />
      </div>

      {show_setting_modal && <Settings_modal />}
      <div className="w-full h-[9vw] sm:h-[30vw] "></div>
      <FadeInTransition
        timeout={1500}
        from={0}
        to={1}
        in={true}
        style={{ width: "100%" }}
      >
        {!is_loading ? (
          <Showcase_body
            product_arr={product_arr}
            cover_img_link={cover_img_link}
            setcover_img_link={setcover_img_link}
            product_images={product_images}
            disable={disable}
            userSTep={userSTep}
            uuid={uuid}
            product_id={product_id}
            forge_text={forge_text}
            setforge_text={setforge_text}
          />
        ) : (
          <Showcase_preloader />
        )}
        <div className="w-full h-[7vw] sm:h-[12vw] "></div>
        {!similarArrIsLoading ? (
          <Similar_models
            similarArr={similarArr}
            check_empty={check_empty}
            check_network={check_network}
            setforge_text={setforge_text}
          />
        ) : (
          <Preloader_for_Similar_models_preloader />
        )}

        <div className="w-full h-[5vw] sm:h-[5vw] "></div>
        {!reviewisloading ? (
          <Review
            disable={disable}
            hackdisable={hackdisable}
            setdisable={setdisable}
            sethackdisable={sethackdisable}
            trimmedReviews={trimmedReviews}
            review_empty={review_empty}
            uuid={uuid}
            seeall_review={seeall_review}
            seeless_review={seeless_review}
            size={reviewsWithUserDetails.length}
          />
        ) : (
          <Review_preloader />
        )}
      </FadeInTransition>

      <div className="w-full h-[5vw]  sm:h-[10vw]"></div>
    </>
  );
}
