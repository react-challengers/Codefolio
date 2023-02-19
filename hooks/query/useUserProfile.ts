import {
  getUser,
  patchUserProfile,
  getUserProfile,
} from "@/utils/APIs/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * user-profile의 서버 데이터를 읽고 쓰기
 * @
 */
const useUserProfile = () => {
  // 본인 id 쿼리
  // const { data: authData } = useQuery(["profile"], getUser);

  // if (!authData || authData instanceof AuthError) return;
  // const profileId = authData;

  // user profile 쿼리
  // const { data: profileData } = useQuery(
  //   ["profile", `${profileId?.id}`],
  //   () => getUserProfile(profileId?.id),
  //   { enabled: !!profileId }
  // );
  // console.log(profileData);

  // const userProfileData = profileData as UserProfileType;

  const { mutate: updateProfileData } = useMutation(patchUserProfile);

  return { updateProfileData };
};

export default useUserProfile;
