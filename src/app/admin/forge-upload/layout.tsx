/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../..//utils/profile_context";
import { Admin_context_Info } from "@/app/utils/admin_context";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StationForge Control Center - Forge Upload ",
  description:
    "Welcome to the StationForge Control Center, where you can efficiently manage and oversee the upload of your digital forge uploads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <body style={{ backgroundColor: "#E7E6E8" }}>
        <Profile_Context_Dropdown>
          <Admin_context_Info>{children}</Admin_context_Info>
        </Profile_Context_Dropdown>
      </body>
    </html>
  );
}
