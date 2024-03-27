"use client";

import { createContext, useContext, useState } from "react";

const Onboarding_Context = createContext({});

export const Onboarding_Context_Dropdown = (props: any) => {
  const { children } = props;
  const [step, setstep] = useState(1);
  const [mobile_step, setmobile_step] = useState(1);

  // this is for the settings context
  const [show_setting_modal, setshow_setting_modal] = useState(false);
  return (
    <Onboarding_Context.Provider
      value={{ step, setstep, mobile_step, setmobile_step }}
    >
      {children}
    </Onboarding_Context.Provider>
  );
};

export const useOnboarding_Context = () => useContext(Onboarding_Context);
