"use client";
import Image from "next/image";
import Header from "../general_components/header";
import Profile_dropdown from "../general_components/profile_dropdown";
import Settings_modal from "../general_components/settings";
import Home_hero from "../homepage_components/hero";
import { useProfile_Context } from "../utils/profile_context";
import Head from "next/head";
import Reset_Component from "./reset_component";
import Forge from "../general_components/forge";

export default function PasswordReset() {
  const { show_setting_modal, setshow_setting_modal, forge_loader }: any =
    useProfile_Context();
  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="googlebot" content="noindex,nofollow" />
      </Head>
      {forge_loader && <Forge />}

      <Header />
      <Profile_dropdown />
      {show_setting_modal && <Settings_modal />}
      <Reset_Component />
    </>
  );
}
