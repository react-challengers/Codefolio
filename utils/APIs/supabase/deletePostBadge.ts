import supabase from "@/lib/supabase";

interface DeleteBookmarkParams {
  postId: string;
  userId: string;
  type: PostBadge;
}

/**
 *
 * @param postId post id
 * @param userId current user id
 * @param type badge type
 */
const deletePostBadge = async ({
  postId,
  userId,
  type,
}: DeleteBookmarkParams) => {
  const { data, error } = await supabase
    .from("post_badge")
    .delete()
    .match({ post_id: postId, user_id: userId, type });

  if (error) return error;

  return data;
};

export default deletePostBadge;
