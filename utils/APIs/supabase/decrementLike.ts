import supabase from "@/lib/supabase";

/**
 *
 * @param postId post id
 */
const decrementLike = async (postId: string) => {
  await supabase.rpc("decrement_like", { row_id: postId });
};

export default decrementLike;
