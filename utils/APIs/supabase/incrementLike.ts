import supabase from "@/lib/supabase";

const incrementLike = async (postId: string) => {
  await supabase.rpc("increment_like", {
    row_id: postId,
  });
};

export default incrementLike;
