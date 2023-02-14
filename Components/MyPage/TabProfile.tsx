import { useState } from "react";
import EditProfileContainer from "./EditProfileContainer";
import PrivateProfileContainer from "./PrivateProfileContainer";
import ShowProfileContainer from "./ShowProfileContainer";

interface TabProfileProps {
  isPrivate?: boolean;
  userInfo: UserProfileType;
}

const TabProfile = ({ isPrivate = false, userInfo }: TabProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isPrivate) {
    return <PrivateProfileContainer />;
  }

  if (isEditing) {
    return (
      <EditProfileContainer userInfo={userInfo} setIsEditing={setIsEditing} />
    );
  }

  return (
    <ShowProfileContainer userInfo={userInfo} setIsEditing={setIsEditing} />
  );
};

export default TabProfile;
