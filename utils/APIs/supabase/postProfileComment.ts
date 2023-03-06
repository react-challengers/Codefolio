import supabase from "@/lib/supabase";

const postProfileComment = async (
  comment: string,
  profileId: string,
  userId: string
) => {
  const res = await supabase
    .from("profile_comment")
    .insert({ content: comment, profile_id: profileId, user_id: userId });
  return res;
};

export default postProfileComment;
