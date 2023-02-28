import supabase from "@/lib/supabase";

/**
 * Deletes a post from the database
 * @param postId - The id of the post to delete
 * @returns
 */
const deletePost = async (postId: string) => {
  const { data, error } = await supabase.from("post").delete().eq("id", postId);

  if (error) return error;

  return data;
};

export default deletePost;
