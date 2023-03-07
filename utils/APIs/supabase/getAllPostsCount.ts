import supabase from "@/lib/supabase";

const getAllPostsCount = async () => {
  const res = await supabase
    .from("post")
    .select("*", { count: "exact", head: true });

  if (res.error) {
    throw new Error(res.error.message);
  }

  if (res.count !== null && res.count !== undefined) {
    return res.count;
  }
  return undefined;
};

export default getAllPostsCount;
