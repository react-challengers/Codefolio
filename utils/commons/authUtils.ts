import supabase from "@/lib/supabase";

// 이메일 유효성 검사 함수
export const checkEmail = (email: string): boolean => {
  const regex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return regex.test(email);
};

export const checkPassword = (password: string): boolean => {
  return password.length >= 8;
};

export const checkUserName = (userName: string): boolean => {
  return userName.length >= 2;
};

export const postUserProfile = async (
  userProfileUserId: string | undefined,
  userProfileEmail: string | undefined,
  userProfileUserName: string | undefined
) => {
  const { error } = await supabase.from("user-profile").insert({
    user_id: userProfileUserId,
    user_name: userProfileUserName,
    contact_email: userProfileEmail,
    gender: "",
    is_public: true,
    profile_image: "",
    self_profile: "",
  });

  if (error) {
    alert("유저 입력 에러발생");
  }
};
