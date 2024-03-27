/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import "react-circular-progressbar/dist/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "./utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to StationForge - Your Miniature Masterpiece Destination",
  description: "Crafting quality tabletop miniatures for your creativity",
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
