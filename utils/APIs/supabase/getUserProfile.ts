import supabase from "@/lib/supabase";
import { PostgrestError } from "@supabase/supabase-js";

const getUserProfile = async (userId: string): Promise<UserProfileType> => {
  const { data } = await supabase
    .from("user-profile")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
};

export default getUserProfile;
