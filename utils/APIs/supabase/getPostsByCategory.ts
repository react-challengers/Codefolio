import supabase from "@/lib/supabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

/**
 *
 * @param category sub_category
 * @returns posts by category
 */
const getPostsByCategory = async (category: string) => {
  const res: PostgrestSingleResponse<PostType[]> = await supabase
    .from("post")
    .select("*")
    .eq("sub_category", category)
    .order("created_at", { ascending: false });

  return res;
};

export default getPostsByCategory;
