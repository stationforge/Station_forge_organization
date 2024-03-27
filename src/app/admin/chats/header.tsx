"use client";

import Image from "next/image";
import logo from "../../../../public/logo.webp";
import Link from "next/link";
import logout from "../../../../public/logout.png";
import { useProfile_Context } from "@/app/utils/profile_context";
import { getAuth, signOut } from "firebase/auth";

const Moderator_header = () => {
  const { setpage_loader }: any = useProfile_Context();
  //  init authentication
  const auth = getAuth();
  return (
    <>
      <div className="w-full h-[6vw] sm:h-[20vw]  px-[3vw] flex items-center justify-between ">
        {/* logo */}
        <Link
          href={"/"}
          onClick={() => {
            setpage_loader(true);
          }}
        >
          <Image
            src={logo}
            alt="Stationforge logo"
            className="w-[10vw] sm:w-[30vw] h-fit"
          />
        </Link>

        <button
          className="text-[1vw] text-white neuer flex items-center gap-[0.4vw] sm:text-[4vw] sm:gap-[1.8vw] hover:opacity-[60%]"
          onClick={() => {
            signOut(auth);
          }}
        >
          Log out{" "}
          <Image
            src={logout}
            alt="logout"
            className="w-[2.2vw]   h-fit sm:w-[8vw]"
          />
        </button>
      </div>
    </>
  );
};

export default Moderator_header;
