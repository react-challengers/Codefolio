import supabase from "@/lib/supabase";

/**
 *
 * @param postId post id
 */
const decrementComment = async (postId: string) => {
  await supabase.rpc("decrement_comment", { row_id: postId });
};

export default decrementComment;
