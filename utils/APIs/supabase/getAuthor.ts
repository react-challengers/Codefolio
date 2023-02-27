import supabase from "@/lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 * Get author data from user_profile table
 * @param author - author id
 * @returns author data
 * @example
 * const { isLoading: isAuthorLoading } = useQuery(["getAuthor", author], {
 *   queryFn: ({ queryKey }) => getAuthor(queryKey[1] as string),
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
const getAuthor = async (author: string) => {
  const { data }: PostgrestSingleResponse<UserProfileType> = await supabase
    .from("user_profile")
    .select()
    .eq("user_id", author)
    .single();

  return data;
};

export default getAuthor;
