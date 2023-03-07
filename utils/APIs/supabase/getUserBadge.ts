import supabase from "@/lib/supabase";

const getUserBadge = async ({ queryKey }: any) => {
  const { profileId } = queryKey[1];
  const res = await supabase
    .from("profile_badge")
    .select("type")
    .eq("profile_id", profileId);
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getUserBadge;
