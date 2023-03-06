import supabase from "@/lib/supabase";

interface DeleteBookmarkParams {
  profileId: string;
  userId: string;
  type: ProfileBadge;
}

/**
 *
 * @param postId post id
 * @param userId current user id
 * @param type badge type
 */
const deleteProfileBadge = async ({
  profileId,
  userId,
  type,
}: DeleteBookmarkParams) => {
  const { data, error } = await supabase
    .from("profile_badge")
    .delete()
    .match({ profile_id: profileId, user_id: userId, type });

  if (error) return error;

  return data;
};

export default deleteProfileBadge;
