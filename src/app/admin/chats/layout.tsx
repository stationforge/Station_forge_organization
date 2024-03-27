/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../..//utils/profile_context";
import { Admin_context_Info } from "@/app/utils/admin_context";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "StationForge Control Center ",
  description: "Welcome, Supreme Moderatrs : Monitor customer support   here",
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
