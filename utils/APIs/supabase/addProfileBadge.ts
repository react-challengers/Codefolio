import supabase from "@/lib/supabase";

interface AddBookmarkParams {
  profileId: string;
  userId: string;
  type: ProfileBadge;
}

/**
 *
 * @param profileId post id
 * @param userId current user id
 * @param type badge type
 */
const addProfileBadge = async ({
  profileId,
  userId,
  type,
}: AddBookmarkParams) => {
  const { data, error } = await supabase
    .from("profile_badge")
    .insert({ profile_id: profileId, user_id: userId, type });

  console.log(error);
  if (error) return error;

  return data;
};

export default addProfileBadge;
