import supabase from "@/lib/supabase";

/**
 *
 * @param postId post id
 */
const incrementBookmark = async (postId: string) => {
  await supabase.rpc("increment_bookmark", { row_id: postId });
};

export default incrementBookmark;
