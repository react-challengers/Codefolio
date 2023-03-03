import supabase from "@/lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 * Get author data from user_profile table
 * @param author - author id
 * @returns author data
 * @example
 * const { isLoading: isAuthorLoading } = useQuery(["getSingleUser", author], {
 *   queryFn: ({ queryKey }) => getSingleUser(queryKey[1] as string),
 *   onSuccess(data) {
 *     if (data) {
 *       setAuthorName(data?.user_name);
 *       setAuthorProfileImage(data?.profile_image);
 *     }
 *   },
 *   onError(error) {
 *     console.log(error);
 *   },
 *   enabled: !!author,
 * });
 */
const getSingleUser = async (userId: string) => {
  const { data, error }: PostgrestSingleResponse<UserProfileType> =
    await supabase.from("user_profile").select().eq("user_id", userId).single();

  if (error) {
    console.log(error);
    return null;
  }

  return data;
};

export default getSingleUser;
