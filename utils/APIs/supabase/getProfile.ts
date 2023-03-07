import supabase from "@/lib/supabase";
import getUser from "./getUser";

/**
 * @TODO getSelfProfile로 개명하기
 */

const getProfile = async (
  profileUserId = ""
): Promise<UserProfileType | null> => {
  const { data } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", profileUserId)
    .single<UserProfileType>();
  return data;
};

export default getProfile;
