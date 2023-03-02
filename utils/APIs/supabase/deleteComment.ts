import supabase from "@/lib/supabase";

/**
 * Delete a comment
 * @param id - comment id
 * @example
 * const { mutate: deleteCommentMutate } = useMutation(deleteComment);
 * deleteCommentMutate(id);
 */
const deleteComment = async (id: string) => {
  const res = await supabase.from("comment").delete().eq("id", id);
  return res;
};

export default deleteComment;
