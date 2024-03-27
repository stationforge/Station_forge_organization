/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../..//utils/profile_context";
import { Admin_context_Info } from "@/app/utils/admin_context";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StationForge Control Center - Post Insights & Traffic Analysis",
  description:
    "Welcome to the StationForge Control Center, your hub for comprehensive insights and traffic data on all the posts across our dynamic 3D platform. Dive into in-depth analytics and tools to optimize your content and thrive in the 3D industry",
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
