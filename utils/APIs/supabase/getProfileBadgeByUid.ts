import supabase from "@/lib/supabase";

interface QueryKey {
  profileId: string | undefined;
  userId: string | undefined;
}

const getProfileBadgeByUid = async ({
  queryKey,
}: {
  queryKey: [string, QueryKey];
}) => {
  const { profileId, userId } = queryKey[1];
  const res = await supabase
    .from("profile_badge")
    .select("type")
    .eq("profile_id", profileId)
    .eq("user_id", userId);
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getProfileBadgeByUid;
