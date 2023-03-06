import supabase from "@/lib/supabase";

/**
 * @description Post a comment to a post
 * @param comment
 * @param postId
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
const postComment = async (comment: string, postId: string, userId: string) => {
  const res = await supabase
    .from("comment")
    .insert({ content: comment, post_id: postId, user_id: userId });
  return res;
};

export default postComment;
