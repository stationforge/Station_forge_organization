"use client";

import { useEffect, useState } from "react";
import { useProfile_Context } from "../utils/profile_context";
import Image from "next/image";
import exit_modal from "../../../public/mob_ham_exit.webp";

import logo from "../../../public/logo.webp";
import test from "../../../public/subscription/post_1.webp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from "../utils/fire_base_config";
import { initializeApp } from "firebase/app";
import Head from "next/head";
import Link from "next/link";
const Forge = (props: any) => {
  const {
    setforge_loader,
    forge_loader,
    setpage_loader,
    Add_notification,
  }: any = useProfile_Context();
  const [comeup, setcomeup] = useState(false);
  const [go_right, setgo_right] = useState(false);
  const [go_width, setgo_width] = useState(false);
  const [is_loading_allocation, setis_loading_allocation] = useState(true);
  const [is_loading_forge, setis_loading_forge] = useState(true);
  const [uid, setuid] = useState("");
  const [can_add, setcan_add] = useState(false);
  const [adding_forge_text, setadding_forge_text] = useState(
    " Confirm to your forge library",
  );
  const [selectedProducts, setselectedProducts] = useState<any>([]);
  const [allocation_number, setallocation_number] = useState(0);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();

  // const {} = props
  // Function to hide the forge
  const hideForge = () => {
    if (globalThis.innerWidth > 650) {
      setforge_loader(false);
    } else if (globalThis.innerWidth < 650) {
      setcomeup(false);
      setTimeout(() => {
        setforge_loader(false);
      }, 700);
    }
  };

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuid(user.uid);
      } else {
        setuid;
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prevent click inside the modal content from closing the modal
  const modalClick = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setcomeup(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Trigger the slide-up effect after the component is mounted
    const timer = setTimeout(() => {
      setgo_right(true);
    }, 500); // Start the animation shortly after the component mounts

    // Optional: Clean up the timeout if the component unmounts before the animation starts
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Trigger the slide-up effect after the component is mounted
    const timer = setTimeout(() => {
      setgo_width(true);
    }, 1000); // Start the animation shortly after the component mounts

    // Optional: Clean up the timeout if the component unmounts before the animation starts
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Create a reference to the 'forge' collection filtered by 'userid'
    const forgeRef = collection(db, "forge");
    const q = query(forgeRef, where("userid", "==", uid));

    // Set up the real-time listener
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const forgeItems: any = [];
        querySnapshot.forEach((doc) => {
          forgeItems.push({ id: doc.id, ...doc.data() });
        });
        setitems(forgeItems);
        setis_loading_forge(false);
        // Store the items in state
      },
      (error) => {
        // Handle errors, such as lack of permissions
        console.error("Error fetching forge items: ", error);
      },
    );

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, [uid]); // Rerun the effect if userId changesuu
  const date = new Date();

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
  const [items, setitems] = useState([]);
  const [preload_forge_arr, setpreload_forge_arr] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const logUserAllocation = (userUid: any) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userid", "==", userUid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Assuming there's only one document with this userId
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setis_loading_allocation(false);
          setallocation_number(userData.allocations);
          if (userData.allocations == 0) {
            setcan_add(false);
          } else {
            setcan_add(true);
          }
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  // // get the allocation document
  // useEffect(() => {
  //   if (uid.length > 1) {
  //     logUserAllocation(uid);
  //   }
  // }, [uid]);
  useEffect(() => {
    if (uid.length > 1) {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userid", "==", uid));

      // Set loading state initially
      setis_loading_allocation(true);

      // Real-time listener for user allocation
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            // Assuming there's only one document with this userId
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setis_loading_allocation(false);
            setallocation_number(userData.allocations);
            if (userData.allocations < 1) {
              setcan_add(false);
            } else {
              setcan_add(true);
            }
          } else {
            // Handle the case where no matching document is found
            // You might want to set allocation_number to some default value or handle it in another way
          }
        },
        (error) => {
          console.error("Error getting document:", error);
        },
      );

      // Clean up the listener when the component unmounts
      // This ensures that the listener is removed to avoid memory leaks
      return () => unsubscribe();
    }
  }, [uid]);

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  // Handler for deleting an item
  const handleDelete = (itemId: any, productid: any) => {
    const docRef = doc(db, "forge", itemId);
    deleteDoc(docRef)
      .then(() => {
        console.log("this is the id ", itemId);
        return setselectedProducts((prevSelected: any) =>
          prevSelected.filter((id: any) => id !== productid),
        );
      })
      .catch((error) => {
        console.error("Error deleting item: ", error);
      });
  };

  const handleToggleSelection = (productId: string) => {
    setselectedProducts((prevSelected: any) => {
      if (prevSelected.includes(productId)) {
        // If already selected, deselect
        return prevSelected.filter((id: any) => id !== productId);
      } else {
        // If not selected, select
        return [...prevSelected, productId];
      }
    });
  };

  // for deleting from the forge collection

  const Add_to_libary_and_deleteDocumentFromForge = async (productId: any) => {
    const lib_ref = collection(db, "libray");

    try {
      // Add document to library if
      if (can_add) {
        const libraryDocRef = await addDoc(lib_ref, {
          downloaded: false,
          month: currentMonthName,
          productid: productId,
          userid: uid,
          createdAt: serverTimestamp(),
        });

        const q = query(
          collection(db, "forge"),
          where("productid", "==", productId),
        );

        // Get documents from forge
        const snapshot = await getDocs(q);

        // Check if there's a document to delete
        if (!snapshot.empty) {
          const documentToDelete = snapshot.docs[0];
          console.log("exist " + documentToDelete.id);

          // Delete document from forge
          const deleteForgeDocPromise = deleteDoc(
            doc(db, "forge", documentToDelete.id),
          );
          Add_notification("Added model to forge");

          // Update user allocation
          // const updateAllocationPromise = Update_User_Allocation(uid);

          // Wait for all promises to complete
          await Promise.all([deleteForgeDocPromise]);

          setselectedProducts([]);
        } else {
          console.log("No document found with productId:", productId);
          return null; // Return null or handle as appropriate if no document is found
        }
      } else {
        setadding_forge_text("Allocations exhausted");
        setTimeout(() => {
          setadding_forge_text("Confirm to your forge library");
        }, 3000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const Update_User_Allocation = (userUid: any) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userid", "==", userUid));

    getDocs(q)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // Assuming there's only one document with this userId
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setis_loading_allocation(false);
          const user_ref_persoanl = doc(db, "users", userDoc.id);
          setallocation_number(userData.allocations);
          updateDoc(user_ref_persoanl, {
            allocations: userData.allocations - selectedProducts.length,
          });
        } else {
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  };

  const handleAddForge = async () => {
    // Iterate through selectedProducts and call the function for each product
    if (selectedProducts.length == 0) {
      setadding_forge_text("Select a product ");
      setTimeout(() => {
        setadding_forge_text("Confirm to your forge library");
      }, 3000);
      return;
    } else if (selectedProducts.length > allocation_number) {
      setadding_forge_text("Insufficient Allocations ");
      setTimeout(() => {
        setadding_forge_text("Confirm to your forge library");
      }, 3000);
      return;
    } else {
      setadding_forge_text("Adding to libray");
      const updatePromises = selectedProducts.map(async (product: any) => {
        await Add_to_libary_and_deleteDocumentFromForge(product);
      });
      // Wait for all promises to complete
      try {
        await Promise.all(updatePromises);
        setselectedProducts([]);
        await Update_User_Allocation(uid);
        setadding_forge_text("Successfully Added");

        console.log("all is done now ");
        // After processing all selected products, you might want to clear the selection
        setselectedProducts([]);
      } catch (error) {
        console.error("Error:", error);
        // Handle errors if needed
      }
    }

    // After processing all selected products, you might want to clear the selection
  };
  return (
    <>
      <div
        className={`w-full h-full fixed top-0 left-0 bg-black   ${
          comeup
            ? " sm:bg-opacity-[90%]  bg-opacity-[60%]"
            : " sm:bg-opacity-[0%]  bg-opacity-[0%]"
        } flex sm:items-end  z-[999999] justify-center items-center `}
        onClick={hideForge} // Hide forge when clicking on the background
        style={{
          transition: globalThis.innerWidth > 650 ? "1s ease" : "1.5s ease ",
        }}
      >
        {/* this is for exsiting  */}
        <Image
          src={exit_modal}
          alt="exit ham"
          className="sm:block hidden w-[10vw] h-fit absolute top-[5vw] right-[3vw] "
          style={{ opacity: comeup ? 1 : 0, transition: "1s ease" }}
        />
        <div className="w-auto sm:w-full sm:px-[3vw] sm:pt-[10vw] h-auto ">
          <div
            className={` bg-[#111111] sm:bg[#131212] ${
              go_width ? "w-[46vw] sm:w-full" : "w-[21vw] sm:w-full"
            } z-[1000] h-[30vw]  sm:h-[150vw] sm:py-[3vw]  ${
              comeup
                ? "translate-y-[0vw] sm:translate-y-[0vw]"
                : "translate-y-[100vw] sm:translate-y-[220vw]"
            }  overflow-hidden flex flex-wrap sm:items-end relative rounded-[2vw] `}
            onClick={modalClick}
            style={{
              transition: globalThis.innerWidth > 650 ? "1s ease" : "1.5s ease",
            }}
          >
            {/* the first section */}

            <div className="w-[21vw] z-[700] sm:w-full sm:h-[45%]  h-full bg-[#111111] flex justify-between items-center flex-col py-[2vw] px-[1vw] gap-[1.8vw] sm:px-[3vw]">
              {/* this is the line that is usually there only on mobile */}
              <div className="hidden mt-[4vw] sm:block w-[80vw] mx-auto h-[0.2vw] bg-white bg-opacity-[30%]"></div>
              {uid.length < 5 && (
                <p className=" capitalize neuer text-white text-[1vw] sm:text-[3.5vw] sm:hidden">
                  login to view forge
                </p>
              )}

              {/* the logo */}
              {!is_loading_allocation ? (
                <>
                  <Image
                    src={logo}
                    alt="station forge logo"
                    className="w-[12vw] sm:hidden h-fit"
                  />

                  {/* the allocation information */}
                  {/* monthly allocations */}
                  <div className="w-full h-auto flex flex-col gap-[4vw] ">
                    {/* holde the first two  */}
                    <div className="w-full  h-auto flex flex-col gap-[1vw] sm:gap-[1vw]">
                      <div className="w-full  p-[1vw] sm:p-0 sm:py-[2vw] sm:border-none sm:px-[3vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw]">
                          This months allocation
                        </p>
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw] opacity-[50%]">
                          30
                        </p>
                      </div>
                      {/* this is the line that is usually there only on mobile */}

                      <div className="w-full p-[1vw] sm:py-[2vw] sm:border-none sm:px-[3vw]  flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw]">
                          Remaining
                        </p>
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw] opacity-[50%]">
                          {allocation_number}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:block w-[80vw] mx-auto h-[0.2vw] bg-white bg-opacity-[30%]"></div>
                    {/* hold the last two  */}
                    <div className="w-full h-auto flex flex-col gap-[1vw]">
                      <div className="w-full p-[1vw] sm:py-[2vw] sm:border-none sm:px-[3vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]">
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw]">
                          Total Selected
                        </p>
                        <p className="neuer text-white text-[1vw] sm:text-[3.5vw] opacity-[50%]">
                          {selectedProducts.length > 0
                            ? selectedProducts.length
                            : 0}
                        </p>
                      </div>
                      <button
                        className="w-full sm:h-[10vw] sm:text-[4vw] sm:rounded-[4vw] h-[3vw] neuer text-[1.1vw] rounded-[1.2vw] bg-[#CCFF00]"
                        onClick={handleAddForge}
                      >
                        {adding_forge_text}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-[12vw] h-[4vw] mt-[1vw] rounded-[1vw] bg-black animate-pulse sm:hidden"></div>

                  {/* the allocation information */}
                  {/* monthly allocations */}
                  <div className="w-full h-auto  sm:hidden flex flex-col gap-[4vw]">
                    {/* holde the first two  */}
                    <div className="w-full h-auto  flex flex-col gap-[1vw]">
                      <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                      <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                    </div>

                    {/* hold the last two  */}
                    <div className="w-full h-auto flex flex-col gap-[1vw]">
                      <div className="w-full h-[3.2vw] bg-black animate-pulse flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"></div>
                      <button className="w-full h-[3vw] neuer text-[1.1vw] rounded-[1.2vw] bg-[#CCFF00] animate-pulse"></button>
                    </div>
                  </div>

                  <div className="w-full hidden sm:flex flex-col gap-[4vw]">
                    {/* individaul items */}
                    <div className="flex justify-between ">
                      <div className="h-[10vw] w-[40vw] bg-black animate-pulse"></div>
                      <div className="h-[10vw] w-[20vw] bg-black animate-pulse"></div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="h-[10vw] w-[40vw] bg-black animate-pulse"></div>
                      <div className="h-[10vw] w-[20vw] bg-black animate-pulse"></div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="h-[10vw] w-[40vw] bg-black animate-pulse"></div>
                      <div className="h-[10vw] w-[20vw] bg-black animate-pulse"></div>
                    </div>

                    <div className="w-full h-[11.5vw] rounded-[3vw] bg-[#CCFF00] animate-pulse "></div>
                  </div>
                </>
              )}
            </div>
            {/* now this is the second section  */}

            <div
              className={`w-[25vw] absolute sm:px-[3vw] top-0 py-[2vw] sm:w-full sm:bg-[#111111] sm:h-[55%]    gap-[1.8vw] flex flex-col justify-start items-start right-0 h-full ${
                go_right
                  ? "translate-x-[0vw] sm:translate-x-[0vw]"
                  : "translate-x-[-30vw] sm:translate-x-[0vw]"
              }  bg-[black]`}
              style={{
                transition: "1s ease",
              }}
            >
              {!is_loading_forge ? (
                <>
                  <h2 className="neuem text-[2vw]  text-white px-[1vw] sm:hidden">
                    Forge
                  </h2>

                  <div className="w-full hidden py-[4vw] pb-[10vw] sm:flex  justify-between items-center">
                    <h1 className="neuer text-[5vw] text-white">Forge</h1>
                    <Image
                      src={logo}
                      alt="station forge logo"
                      className="w-[30vw]  h-fit"
                    />
                    <h1 className="neuer text-[3.5vw] underline underline-offset-4 text-opacity-[80%] text-white">
                      Wishlist
                    </h1>
                  </div>

                  {!items.length && (
                    <p className="neuem text-[1.3vw] sm:text-[4vw] opacity-[70%] text-white  px-[1vw]">
                      There are no items in your forge
                    </p>
                  )}
                  {uid.length < 5 && (
                    <Link
                      href={"/login"}
                      onClick={() => {
                        setpage_loader(true);
                      }}
                      className="text-[#CCFF00] top-[0.5vw] sm:block capitalize neuer  text-[1vw] sm:text-[3.5vw] hidden"
                    >
                      login to view forge
                    </Link>
                  )}

                  <div className="w-full flex sm:gap-[5vw] flex-col px-[1vw] justify-start gap-[1.6vw] scroll-container overflow-y-scroll">
                    {" "}
                    {items.map((e: any, index: any) => {
                      return (
                        <div
                          key={index}
                          className="w-full sm:rounded-[3vw] sm:bg[#111111] sm:py-[3vw] sm:pr-[3vw] sm:pl-[4vw]   p-[1vw] flex border-[0.1vw]  border-white border-opacity-[30%] justify-between items-center rounded-[1.2vw]"
                        >
                          <div className=" flex items-center sm:gap-[2.5vw] gap-[1vw]">
                            <div
                              className="w-[3vw] sm:h-[12vw] sm:w-[12vw] h-[3vw] avater_bg "
                              style={{ backgroundImage: "url(/cover.webp)" }}
                            >
                              <Image
                                src={e.image}
                                unoptimized
                                width="0"
                                height="0"
                                alt="Forge iamges"
                                className="w-full h-full"
                              />
                            </div>
                            <p className="neuer text-white text-[1vw] sm:text-[3vw]">
                              {e.title}
                            </p>
                          </div>

                          <div className="flex items-center sm:gap-[3vw] gap-[1vw]">
                            <div
                              className="text-[1.3vw] sm:text-[4vw] cursor-pointer opacity-[50%] text-white"
                              onClick={() => handleDelete(e.id, e.productid)}
                            >
                              <i className="bi bi-dash-lg"></i>
                            </div>
                            <div
                              className="w-[1vw] h-[1vw] sm:w-[4.5vw] sm:h-[4.5vw] cursor-pointer rounded-[100%] border-white border-opacity-[50%] border-[0.15vw]"
                              onClick={() => {
                                handleToggleSelection(e.productid);
                              }}
                              style={{
                                backgroundColor: selectedProducts.includes(
                                  e.productid,
                                )
                                  ? "#CCFF00"
                                  : "",
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="neuem text-[2vw] text-white mx-[1vw] w-[14vw] rounded-[1vw] h-[3vw] bg-[#111111]  animate-pulse"></h2>

                  <div className="w-full py-[4vw] gap-[10vw] hidden sm:flex ">
                    <div className="w-[20%] h-[10vw] rounded-[2vw]  bg-[black]  animate-pulse"></div>
                    <div className="w-[40%] h-[10vw] rounded-[2vw]  bg-[black]  animate-pulse"></div>
                    <div className="w-[20%] h-[10vw] rounded-[2vw]  bg-[black]  animate-pulse"></div>
                  </div>

                  <div className="w-full flex flex-col px-[1vw] justify-start gap-[1.6vw] scroll-container sm:gap-[6vw] overflow-y-scroll">
                    {" "}
                    {preload_forge_arr.map((e: any, index: any) => {
                      return (
                        <div key={index}>
                          <div className="w-full sm:rounded-[4vw] py-[2vw] flex border-[0.1vw] bg-[#111111] sm:bg-black  animate-pulse border-white border-opacity-[30%] sm:py-[8vw] justify-between items-center rounded-[1.2vw]"></div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forge;
