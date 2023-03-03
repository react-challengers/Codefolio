import supabase from "@/lib/supabase";

// 이메일 유효성 검사 함수
export const checkEmail = (email: string): string => {
  const regex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

  if (email === "") return "이메일을 입력해주세요.";
  if (!regex.test(email)) return "이메일 형식에 맞지 않는 메일 주소입니다. ";
  return "";
};

export const checkPassword = (password: string): string => {
  if (password === "") return "비밀번호를 입력해주세요.";
  if (password.length < 8) return "비밀번호는 8자리 이상입니다. ";
  return "";
};

export const checkSamePassword = (
  password: string,
  passwordCheck: string
): string => {
  if (passwordCheck === "") return "비밀번호를 한번 더 입력해주세요.";
  if (password !== passwordCheck) return "비밀번호가 일치하지 않습니다.";
  return "";
};

export const checkUserName = (userName: string): string => {
  if (userName === "") return "이름을 입력해주세요.";
  if (userName.length < 2) return "이름은 두글자 이상입니다. ";

  return "";
};

export const postUserProfile = async (
  userProfileUserId: string | undefined,
  userProfileEmail: string | undefined,
  userProfileUserName: string | undefined
) => {
  const { error } = await supabase.from("user_profile").insert({
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
