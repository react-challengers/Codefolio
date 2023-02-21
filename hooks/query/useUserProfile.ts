import { getUserProfile, patchUserProfile } from "@/utils/APIs/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USER_PROFILE = "user_profile";

/**
 * @see https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
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
    skills: data?.skills ?? [],
    career: data?.career ?? "신입",
    bookmark_folders: data?.bookmark_folders ?? [],
  };

  console.log(data?.field);

  queryClient.setQueryData([USER_PROFILE], profileData);

  // patch
  const { mutate: updateProfileData } = useMutation(patchUserProfile, {
    onMutate: async (newProfile) => {
      await queryClient.cancelQueries({ queryKey: [USER_PROFILE] });
      const previousProfile = queryClient.getQueriesData([USER_PROFILE]);
      queryClient.setQueriesData([USER_PROFILE], newProfile);

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
