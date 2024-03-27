"use client";

import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import firebaseConfig from "./fire_base_config";

const Admin_context = createContext({});

export const Admin_context_Info = (props: any) => {
  const { children } = props;
  const [show, setshow] = useState(false);
  const [show_setting, setshow_setting] = useState(false);
  const [notification, setnotification] = useState(false);
  // this is for the settings context
  const [show_setting_modal, setshow_setting_modal] = useState(false);
  return (
    <Admin_context.Provider
      value={{
        show,
        show_setting,
        setshow_setting,
        notification,
        setnotification,
      }}
    >
      {children}
    </Admin_context.Provider>
  );
};

export const useAdmin_context = () => useContext(Admin_context);
