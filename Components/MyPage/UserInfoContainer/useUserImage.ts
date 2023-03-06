import { useUserProfile } from "@/hooks/query";
import convertEase64ToFile from "@/utils/commons/convertBase64ToFile";
import uploadImage from "@/utils/commons/uploadImage";
import { ChangeEvent } from "react";

type URLType = "profile_image" | "background_image";

/**
 * UserInfoContainer에서만 사용하는 custom hook입니다.
 * @param {URLType}
 * @example
 * const { handleImage: handleProfileImage } = useUserImage("profile_image");
 * const { handleImage: handleBackgroundImage } = useUserImage("background_image");
 */

const useUserImage = (urlType: URLType) => {
  const { profileData, updateProfileData } = useUserProfile();
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = async (uploadedBlob) => {
      const imgDataUrl = uploadedBlob.target?.result; // input의 파일을 base64로 받습니다.
      if (typeof imgDataUrl !== "string") return;
      const imgFile = await convertEase64ToFile(imgDataUrl);
      const publicImageURL = await uploadImage(imgFile, "profile-image");
      if (!publicImageURL) return;
      updateProfileData({ ...profileData, [urlType]: publicImageURL });
    };
  };

  return { handleImage };
};

export default useUserImage;
