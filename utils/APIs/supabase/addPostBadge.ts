import supabase from "@/lib/supabase";

interface AddBookmarkParams {
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
const addPostBadge = async ({ postId, userId, type }: AddBookmarkParams) => {
  const { data, error } = await supabase
    .from("post_badge")
    .insert({ post_id: postId, user_id: userId, type });

  console.log(error);
  if (error) return error;

  return data;
};

export default addPostBadge;
