/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Onboarding_Context_Dropdown } from "../utils/onboarding_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to StationForge: Crafting Miniature Worlds",
  description:
    "Step into the enchanting universe of StationForge, your gateway to crafting 3D-printable tabletop miniatures. Unleash your imagination, design unique characters, and embark on epic adventures. Start your journey now and forge your own miniature destiny!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative  overflow-hidden h-full">
        <Onboarding_Context_Dropdown>{children}</Onboarding_Context_Dropdown>

        {/* {children} */}
      </body>
    </html>
  );
}
