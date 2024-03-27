/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "./../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Forge Library - Curated Miniatures at Your Fingertips",
  description:
    "Browse your personalized collection of miniatures and download your favorites to bring your tabletop world to life. Your next adventure awaits in the StationForge Library.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Profile_Context_Dropdown>{children}</Profile_Context_Dropdown>
      </body>
    </html>
  );
}
