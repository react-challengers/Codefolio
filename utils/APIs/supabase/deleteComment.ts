import supabase from "@/lib/supabase";

/**
 * Delete a comment
 * @param id - comment id
 * @example
 * const { mutate: deleteCommentMutate } = useMutation(deleteComment);
 * deleteCommentMutate(id);
 */
const deleteComment = async (
  id: string,
  dbType: "comment" | "profile_comment"
) => {
  const res = await supabase.from(dbType).delete().eq("id", id);
  return res;
};

export default deleteComment;
