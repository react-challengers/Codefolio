import supabase from "@/lib/supabase";
import type { NextRouter } from "next/router";

interface QueryKey {
  postId: NextRouter["query"]["id"];
  userId: string | undefined;
}

const getBadgeByUid = async ({
  queryKey,
}: {
  queryKey: [string, QueryKey];
}) => {
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
