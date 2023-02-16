import supabase from "@/lib/supabase";

// 이메일 유효성 검사 함수
export const email_check = (email: string): boolean => {
  const regex =
    /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return regex.test(email);
};

export const password_check = (password: string): boolean => {
  return password.length >= 8;
};

export const userName_check = (userName: string): boolean => {
  return userName.length >= 2;
};
