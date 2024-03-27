// ProfileLayout.js
import { Profile_Context_Dropdown } from "./utils/profile_context";

const ProfileLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <Profile_Context_Dropdown>{children}</Profile_Context_Dropdown>
    </html>
  );
};

export default ProfileLayout;
