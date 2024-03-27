import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StationForge - Sign In",
  description:
    "Sign in to StationForge and embark on your creative journey. Access your miniature crafting tools, designs, and community. Join us today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Profile_Context_Dropdown>{children}</Profile_Context_Dropdown>
      </body>
    </html>
  );
}
