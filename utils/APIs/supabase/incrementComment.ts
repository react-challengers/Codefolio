import supabase from "@/lib/supabase";

const incrementComment = async (postId: string) => {
  await supabase.rpc("increment_comment", { row_id: postId });
};

export default incrementComment;
