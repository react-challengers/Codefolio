import supabase from "@/lib/supabase";

/**
 *
 * @param category sub_category
 * @returns posts by category
 */
const getPostsByCategory = async (category: string) => {
  const res = await supabase
    .from("post")
    .select<string, PostType>("*")
    .eq("sub_category", category)
    .order("created_at", { ascending: false });

  return res;
};

export default getPostsByCategory;
