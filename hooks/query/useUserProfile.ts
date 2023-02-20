import { getUserProfile, patchUserProfile } from "@/utils/APIs/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USER_PROFILE = "user_profile";

/**
 * @see https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
 */

const useUserProfile = () => {
  const queryClient = useQueryClient();

  // get
  const { data: profileData } = useQuery([USER_PROFILE], getUserProfile, {});

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
