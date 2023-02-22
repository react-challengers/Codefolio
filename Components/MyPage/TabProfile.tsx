import { myPageIsEditingProfileContainer } from "@/lib/recoil";
import { useRecoilValue } from "recoil";
import EditProfileContainer from "./EditProfileContainer";
import PrivateProfileContainer from "./PrivateProfileContainer";
import ShowProfileContainer from "./ShowProfileContainer";

interface TabProfileProps {
  isPrivate?: boolean;
}

const TabProfile = ({ isPrivate = false }: TabProfileProps) => {
  const isEditing = useRecoilValue(myPageIsEditingProfileContainer);

  if (isPrivate) {
    return <PrivateProfileContainer />;
  }

  if (isEditing) {
    return <EditProfileContainer />;
  }

  return <ShowProfileContainer />;
};

export default TabProfile;
