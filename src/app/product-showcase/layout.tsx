/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StationForge Showcase  - Explore Our 3D Designs",
  description:
    "Our product showcase features a realm of 3D-printable miniatures, each crafted with precision and imaginative flair for tabletop enthusiasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "black" }}>
        <Profile_Context_Dropdown>{children}</Profile_Context_Dropdown>
      </body>
    </html>
  );
}
