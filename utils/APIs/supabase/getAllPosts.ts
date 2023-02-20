import supabase from "@/lib/supabase";

const getAllPosts = async () => {
  const res = await supabase
    .from("post")
    .select("*")
    .order("created_at", { ascending: false });
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getAllPosts;
