import supabase from "@/lib/supabase";

/**
 *
 * @param id post id
 * @param comment edited comment
 * @example
 * const { mutate: editCommentMutate } = useMutation(editComment);
 * editCommentMutate(id, comment);
 */
const editComment = async (
  id: string,
  comment: string,
  dbType: "comment" | "profile_comment"
) => {
  const res = await supabase
    .from(dbType)
    .update({ content: comment })
    .eq("id", id);

  return res;
};

export default editComment;
