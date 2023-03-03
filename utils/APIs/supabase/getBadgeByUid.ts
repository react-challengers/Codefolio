import supabase from "@/lib/supabase";

const getBadgeByUid = async ({ queryKey }: any) => {
  const { postId, userId } = queryKey[1];
  const res = await supabase
    .from("post_badge")
    .select("type")
    .eq("post_id", postId)
    .eq("user_id", userId);
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getBadgeByUid;
