import supabase from "@/lib/supabase";

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return "";
  return data.user;
};

export default getUser;
