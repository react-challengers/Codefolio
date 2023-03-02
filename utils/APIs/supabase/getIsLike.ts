import supabase from "@/lib/supabase";

/**
 * Get like data from like table
 * @param currentUserId - current user id
 * @param postId - post id
 * @returns like data
 * @example
 * const { isLoading, isError, data } = useQuery(
 *   ["like", currentUserId, postId],
 *   ({queryKey: [currentUserId, postId]}) => getIsLike([currentUserId, postId]),
 *   {
 *     enabled: !!currentUserId && !!postId,
 *   }
 * );
 */

const getIsLike = async ([_, currentUserId, postId]: [
  string,
  string,
  string
]) => {
  const { data } = await supabase
    .from("like")
    .select("id")
    .eq("user_id", currentUserId)
    .eq("post_id", postId)
    .single();

  return data;
};

export default getIsLike;
