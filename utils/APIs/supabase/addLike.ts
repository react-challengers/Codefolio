import supabase from "@/lib/supabase";

interface AddLikeParams {
  postId: string;
  currentUserId: string;
}

/**
 *
 * @param postId post id
 * @param currentUserId current user id
 */
const addLike = async ({ postId, currentUserId }: AddLikeParams) => {
  const { data, error } = await supabase.from("like").insert({
    post_id: postId,
    user_id: currentUserId,
  });

  if (error) return error;

  return data;
};

export default addLike;
