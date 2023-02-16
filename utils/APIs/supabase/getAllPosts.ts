import supabase from "@/lib/supabase";

const getAllPosts = async () => {
  const res = await supabase.from("post").select("*");
  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.data;
};

export default getAllPosts;
