import supabase from "@/lib/supabase";

interface DeleteLikeProps {
  postId: string;
  currentUserId: string;
}

/**
 * @param postId post id
 */
const deleteLike = async ({ postId, currentUserId }: DeleteLikeProps) => {
  const { data, error } = await supabase
    .from("like")
    .delete()
    .match({ post_id: postId, user_id: currentUserId });

  if (error) return error;

  return data;
};

export default deleteLike;
