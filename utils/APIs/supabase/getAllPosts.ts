import supabase from "@/lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

// TODO: Add pagination
// TODO: 필요한 데이터만 가져오도록 수정

const getAllPosts = async () => {
  const res = await supabase
    .from("post")
    .select<string, PostType>("*")
    .order("created_at", { ascending: false });
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getAllPosts;
