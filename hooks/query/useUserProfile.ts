import { getUserProfile, patchUserProfile } from "@/utils/APIs/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const USER_PROFILE = "user_profile";

/**
 * user_profile 테이블에 관한 query hook입니다.
 * @see https://tanstack.com/query/v5/docs/react/guides/optimistic-updates
 * @TODO updateCache함수 구현
 * @TODO 최초 데이터를 유출하지 말고 갱신된 쿼리캐시를 유출하기
 * @TODO 변수명 변경: const { profileCache, setProfileCache, updateProfileData } = useUserProfile();
 */

const useUserProfile = () => {
  const queryClient = useQueryClient();

  // get
  const { data } = useQuery([USER_PROFILE], getUserProfile, {});

  // null이면 갱신
  const profileData: UserProfileType = {
    id: data?.id ?? "",
    user_id: data?.user_id ?? "",
    user_name: data?.user_name ?? "",
    phone: data?.phone ?? "01000000000",
    contact_email: data?.contact_email ?? "",
    profile_image: data?.profile_image ?? "",
    background_color: data?.background_color ?? "#ffffff",
    birth_year: data?.birth_year ?? new Date().getFullYear(),
    self_profile: data?.self_profile ?? "",
    gender: data?.gender ?? "선택안함",
    is_public: data?.is_public ?? true,
    field: data?.field ?? [],
    skills: data?.skills ? data?.skills : [],
    career: data?.career ?? "신입",
    bookmark_folders: data?.bookmark_folders ?? [],
  };

  // 최초 데이터 갱신
  useEffect(() => {
    queryClient.setQueryData([USER_PROFILE], profileData);
  }, []);

  // patch
  const { mutate: updateProfileData } = useMutation(patchUserProfile, {
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: [USER_PROFILE] });
      const previousProfile = queryClient.getQueriesData([USER_PROFILE]);
      queryClient.setQueriesData<UserProfileType | undefined>(
        [USER_PROFILE],
        newProfile
      );

      return { newProfile, previousProfile };
    },
    onError: (_err, _newProfile, context) => {
      queryClient.setQueriesData([USER_PROFILE], context?.previousProfile);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE] });
    },
  });

  return { profileData, updateProfileData };
};

export default useUserProfile;
