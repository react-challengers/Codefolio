import supabase from "@/lib/supabase";
import getUser from "./getUser";

const getUserProfile = async (): Promise<UserProfileType | null> => {
  const user = await getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", user.id)
    .single();
  return data;
};

export default getUserProfile;
