import supabase from "@/lib/supabase";
import getUser from "./getUser";

/**
 * @TODO getSelfProfile로 개명하기
 */

const getUserProfile = async (
  profileUserId = ""
): Promise<UserProfileType | null> => {
  const user = await getUser();
  if (!user) return null;
  if (!profileUserId) {
    const { data } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .single<UserProfileType>();
    return data;
  }
  const { data } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", profileUserId)
    .single<UserProfileType>();
  return data;
};

export default getUserProfile;
