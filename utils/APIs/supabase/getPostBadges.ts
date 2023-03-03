import supabase from "@/lib/supabase";

const getPostBadges = async ({ queryKey }: any) => {
  const { postId } = queryKey[1];
  if (!postId) return null;

  const res = await supabase
    .from("post_badge")
    .select("*")
    .eq("post_id", postId);
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getPostBadges;
