import supabase from "@/lib/supabase";

const getProfileBadgeByUid = async ({ queryKey }: any) => {
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
