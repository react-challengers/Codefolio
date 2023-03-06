import supabase from "@/lib/supabase";

/**
 * Get bookmark data from bookmark table
 * @param currentUserId - current user id
 * @param postId - post id
 * @returns bookmark data
 * @example
 * const { isLoading, isError, data } = useQuery(
 *   ["bookmark", currentUserId, postId],
 *   ({queryKey: [currentUserId, postId]}) => getIsBookMark([currentUserId, postId]),
 *   {
 *     enabled: !!currentUserId && !!postId,
 *   }
 * );
 */

const getIsBookMark = async ([_, currentUserId, postId]: [
  string,
  string,
  string
]) => {
  const { data } = await supabase
    .from("bookmark")
    .select("id")
    .eq("user_id", currentUserId)
    .eq("post_id", postId)
    .single();

  return data;
};

export default getIsBookMark;
