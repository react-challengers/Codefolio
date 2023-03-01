import supabase from "@/lib/supabase";

/**
 * Get comment data from comment table
 * @param currentUserId - current user id
 * @param postId - post id
 * @returns comment data
 * @example
 * const { isLoading, isError, data } = useQuery(
 *   ["comment", currentUserId, postId],
 *   ({queryKey: [currentUserId, postId]}) => getIsComment([currentUserId, postId]),
 *   {
 *     enabled: !!currentUserId && !!postId,
 *   }
 * );
 */

const getIsComment = async ([_, currentUserId, postId]: [
  string,
  string,
  string
]) => {
  const { data } = await supabase
    .from("comment")
    .select("id")
    .eq("user_id", currentUserId)
    .eq("post_id", postId)
    .single();

  return data;
};

export default getIsComment;
