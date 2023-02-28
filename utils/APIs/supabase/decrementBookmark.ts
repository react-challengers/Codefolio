import supabase from "@/lib/supabase";

/**
 *
 * @param postId post id
 */
const decrementBookmark = async (postId: string) => {
  await supabase.rpc("decrement_bookmark", { row_id: postId });
};

export default decrementBookmark;
