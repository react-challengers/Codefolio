import { patchUserProfile } from "@/utils/APIs/supabase";
import { useMutation } from "@tanstack/react-query";

/**
 * @TODO 현재는 user_profile에 쓰기만 가능합니다. 의존성 쿼리 패턴으로 읽기 구현이 필요합니다.
 */
const useUserProfile = () => {
  // 본인 id 쿼리
  // const { data: authData } = useQuery(["profile"], getUser);

  // user_profile 쿼리
  // const { data: profileData } = useQuery(
  //   ["profile", `${profileId?.id}`],
  //   () => getUserProfile(profileId?.id),
  //   { enabled: !!profileId }
  // );

  const { mutate: updateProfileData } = useMutation(patchUserProfile);

  return { updateProfileData };
};

export default useUserProfile;
