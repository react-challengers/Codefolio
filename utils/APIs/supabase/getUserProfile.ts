import supabase from "@/lib/supabase";
import getUser from "./getUser";

/**
 * @TODO getSelfProfile로 개명하기
 */

const getUserProfile = async (profileUserId = "") => {
  // 비로그인 프로필 접근 가능
  if (profileUserId) {
    const { data } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", profileUserId)
      .single<UserProfileType>();
    return data;
  }
  // 로그인 상태 본인 프로필
  const user = await getUser();
  if (user) {
    const { data } = await supabase
      .from("user_profile")
      .select("*")
      .eq("user_id", user.id)
      .single<UserProfileType>();
    return data;
  }
  return null;
};

export default getUserProfile;
