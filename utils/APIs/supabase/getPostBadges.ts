import supabase from "@/lib/supabase";

interface QueryKey {
  postId: string | string[] | undefined;
}

const getPostBadges = async ({
  queryKey,
}: {
  queryKey: [string, QueryKey];
}) => {
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
