import supabase from "@/lib/supabase";

interface AddBookmarkParams {
  postId: string;
  currentUserId: string;
}

/**
 *
 * @param postId post id
 * @param currentUserId current user id
 * @returns
 * @example
 * const { mutate: addBookmarkMutate } = useMutation(addBookmark);
 */
const addBookmark = async ({ postId, currentUserId }: AddBookmarkParams) => {
  const { data, error } = await supabase
    .from("bookmark")
    .insert({ post_id: postId, user_id: currentUserId });

  if (error) return error;

  return data;
};

export default addBookmark;
