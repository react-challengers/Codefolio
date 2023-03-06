import supabase from "@/lib/supabase";

/**
 * @description Post a comment to a post
 * @param comment
 * @param profileId
 * @param userId
 * @example
 * const { mutate: createComment } = useMutation(
 *   () => postComment(inputValues.comment, postId as string, userId as string),
 *   {
 *     onSuccess: async () => {
 *       await supabase.rpc("increment_comment", { row_id: postId });
 *       queryClient.invalidateQueries(["getComment"]);
 *     },
 *   }
 * );
 */
const postProfileComment = async (
  comment: string,
  profileId: string,
  userId: string
) => {
  const res = await supabase
    .from("profile_comment")
    .insert({ content: comment, profile_id: profileId, user_id: userId });
  return res;
};

export default postProfileComment;
