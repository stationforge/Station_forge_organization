/* styles.css */
import "bootstrap-icons/font/bootstrap-icons.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Profile_Context_Dropdown } from "../utils/profile_context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Forge Support - Get Help and Assistance",
  description:
    "Get help, assistance, and answers to your questions about Station Forge. Our support team is here to assist you with any issues or inquiries you may have.",
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
