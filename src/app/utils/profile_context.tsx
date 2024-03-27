"use client";

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import firebaseConfig from "./fire_base_config";

// Initialize the data base connection

const Profile_Context = createContext({});

export const Profile_Context_Dropdown = (props: any) => {
  const { children } = props;
  const [show, setshow] = useState(false);
  const [forge_loader, setforge_loader] = useState(false);
  const [hide_download, sethide_download] = useState(true);
  const [loggedIn_id, setloggedIn_id] = useState("");
  const [show_chat_modal, setshow_chat_modal] = useState(false);
  const [new_message, setnew_message] = useState(false);
  const [from, setfrom] = useState("");

  const [downloadProgress, setdownloadProgress] = useState("");
  const [download_product_id, setdownload_product_id] = useState("");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth: any = getAuth();
  const [page_loader, setpage_loader] = useState(false);
  // Function to toggle the dropdown
  function toggleDropdown(e: any) {
    // e.preventDefault();
    e.stopPropagation();
    if (show) {
      setshow(false);
    }
    if (!show) {
      setshow(true);
    }
  }

  // Use useEffect to check if the user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setloggedIn_id(user.uid);
      } else {
        setloggedIn_id("");
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // the funtion is for updating notifications on to the database that reads to the admin panel
  const Add_notification = (e: any) => {
    const chatTextref = collection(db, "notifications");

    addDoc(chatTextref, {
      createdAt: serverTimestamp(),
      message: e,
      user_id: auth.currentUser?.uid,
    });
  };
  // this is for downloading content from the libary
  // Function to update the "downloaded" field to true
  const updateDownloadedStatus = async (
    userId: any,
    productId: any,
    updatedoc: any,
  ) => {
    // Create a reference to the "library" collection
    const libraryCollectionRef = doc(db, "libray", productId);

    // Update the "downloaded" field to true
    updateDoc(libraryCollectionRef, {
      downloaded: updatedoc,
      downloadedAt: serverTimestamp(),
    })
      .then(() => {
        setdownload_product_id("");
        localStorage.removeItem("downloadProgress");
        localStorage.removeItem("downloadid");
        localStorage.removeItem("title");
        setdownloadProgress("");
        Add_notification("Downloaded model from libary");
      })
      .catch((error: any) => {
        console.error("Error updating downloaded status:", error);
      });
  };

  const handle_download = (url: any, title: any, id: any, update_doc: any) => {
    // Assuming `url` is the download URL you have
    const xhr = new XMLHttpRequest();

    xhr.responseType = "blob";

    // Add a `progress` event listener
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        // `event.loaded` is how much data has been downloaded
        // `event.total` is the total size of the file (if `Content-Length` is provided by the server)
        const percentComplete = (event.loaded / event.total) * 100;
        // console.log(`Download progress: ${percentComplete.toFixed(2)}%`);
        // Save download progress to local storage
        localStorage.setItem("downloadProgress", percentComplete.toFixed(2));
        localStorage.setItem("downloadid", id);
        localStorage.setItem("title", title);
        if (hide_download) {
          setTimeout(() => {
            sethide_download(false);
          }, 1000);
        } else {
          sethide_download(false);
        }

        setdownloadProgress(` ${percentComplete.toFixed(2)}`);
        setdownload_product_id(id);
        // Here you can also update a progress bar or similar UI element if you have one
      }
    };

    xhr.onload = function () {
      if (this.status === 200) {
        // Download complete, the file is in `xhr.response`
        const blob = xhr.response;
        setTimeout(() => {
          sethide_download(true);
        }, 2000);
        // Usage
        updateDownloadedStatus(loggedIn_id, id, update_doc);

        // Here you would typically create a URL for the blob and prompt the user to save the file
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = `${title}.zip`; // Provide the default filename for the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);

        // After the download is complete, you can update your Firestore here
        // ...
      }
    };

    xhr.onerror = function () {
      // Handle the download failure
    };

    xhr.open("GET", url);
    xhr.send();
  };

  // this is for the settings context
  const [show_setting_modal, setshow_setting_modal] = useState(false);

  // lets handle the chat system here
  const [sess_id, setsess_id] = useState("");
  const session_ref = collection(db, "chat_sessions");

  const update_message_notification = () => {
    setnew_message(true);
    playNotificationSound();
  };

  const playNotificationSound = () => {
    const audio = new Audio("/message_mp3/message.mp3"); // Replace with the actual path
    audio.play();
  };

  return (
    <Profile_Context.Provider
      value={{
        show,
        setshow,
        toggleDropdown,
        show_setting_modal,
        setshow_setting_modal,
        page_loader,
        setpage_loader,
        from,
        setfrom,
        forge_loader,
        setforge_loader,
        handle_download,
        downloadProgress,
        download_product_id,
        hide_download,
        show_chat_modal,
        setshow_chat_modal,
        new_message,
        setnew_message,
        update_message_notification,
        // create_chat_session,
        sess_id,
        Add_notification,
      }}
    >
      {children}
    </Profile_Context.Provider>
  );
};

export const useProfile_Context = () => useContext(Profile_Context);
