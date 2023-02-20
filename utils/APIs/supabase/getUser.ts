import supabase from "@/lib/supabase";

const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return error;
  return data.user;
};

export default getUser;
