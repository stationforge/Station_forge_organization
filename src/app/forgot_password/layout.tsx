/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Admin_context_Info } from "@/app/utils/admin_context";
import Head from "next/head";
import { Profile_Context_Dropdown } from "../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "StationForge -Forgot password ",
  description: "Fill in your info  here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Profile_Context_Dropdown>
          <Admin_context_Info>{children}</Admin_context_Info>
        </Profile_Context_Dropdown>
      </body>
    </html>
  );
}
