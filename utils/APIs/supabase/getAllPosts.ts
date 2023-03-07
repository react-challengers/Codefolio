import supabase from "@/lib/supabase";

const getAllPosts = async ({ pageParam = 1 }) => {
  const perPage = 12;
  const res = await supabase
    .from("post")
    .select<string, PostType>(`*`)
    .order("created_at", { ascending: false })
    .range((pageParam - 1) * perPage, pageParam * perPage - 1)
    .limit(perPage);

  if (res.error) {
    console.log("error", res.error);
    return [];
  }
  return res.data;
};

export default getAllPosts;
