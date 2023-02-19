import supabase from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

const getUserProfile = async (
  userId: string
): Promise<UserProfileType | PostgrestError> => {
  const { data, error } = await supabase
    .from("user-profile")
    .select("*")
    .eq("user_id", userId)
    .single();
  if (error) return error;
  return data;
};

export default getUserProfile;
