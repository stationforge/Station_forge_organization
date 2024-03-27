/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "StationForge Subscription  - Unleash Your Imagination with Premium Miniatures",
  description:
    "Elevate your tabletop adventures with StationForge Premium, your source for exclusive and high-quality miniatures. Immerse yourself in a world of creativity, where endless possibilities await. Dive into the art of gaming and kitbashing with our premium miniature collection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Profile_Context_Dropdown>{children}</Profile_Context_Dropdown>
      </body>
    </html>
  );
}
