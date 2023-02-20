import { useState } from "react";
import EditProfileContainer from "./EditProfileContainer";
import PrivateProfileContainer from "./PrivateProfileContainer";
import ShowProfileContainer from "./ShowProfileContainer";

interface TabProfileProps {
  isPrivate?: boolean;
}

const TabProfile = ({ isPrivate = false }: TabProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isPrivate) {
    return <PrivateProfileContainer />;
  }

  if (isEditing) {
    return <EditProfileContainer setIsEditing={setIsEditing} />;
  }

  return <ShowProfileContainer setIsEditing={setIsEditing} />;
};

export default TabProfile;
