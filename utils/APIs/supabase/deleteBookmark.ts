import supabase from "@/lib/supabase";

interface DeleteBookmarkParams {
  postId: string;
  currentUserId: string;
}

/**
 *
 * @param postId post id
 * @param currentUserId current user id
 */
const deleteBookmark = async ({
  postId,
  currentUserId,
}: DeleteBookmarkParams) => {
  const { data, error } = await supabase
    .from("bookmark")
    .delete()
    .match({ post_id: postId, user_id: currentUserId });

  if (error) return error;

  return data;
};

export default deleteBookmark;
