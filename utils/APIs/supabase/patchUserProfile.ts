import supabase from "@/lib/supabase";

const patchUserProfile = async (userProfile: UserProfileType) => {
  const { data, error } = await supabase
    .from("user-profile")
    .update(userProfile)
    .eq("user_id", userProfile.user_id)
    .single();
  if (error) return error;
  return data;
};

export default patchUserProfile;
