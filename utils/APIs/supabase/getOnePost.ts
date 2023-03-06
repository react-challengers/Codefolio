import supabase from "@/lib/supabase";

/**
 * Get one post data from post table
 * @param postId - post id
 * @returns post data
 * @example
 * const { isLoading, isError, data } = useQuery(
 *   ["post", postId],
 *   () => getOnePost(postId),
 *   {
 *   enabled: !!postId,
 *   }
 * );
 */
const getOnePost = async (postId: string) => {
  const res = await supabase
    .from("post")
    .select<string, PostType>()
    .eq("id", postId)
    .single();

  if (res.error) {
    throw new Error(res.error.message);
  }

  return res.data;
};

export default getOnePost;
