import supabase from "@/lib/supabase";

const getNotification = async (currentUserId: string) => {
  const { data, error } = await supabase
    .from("notification")
    .select("*")
    .eq("target_id", currentUserId);

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export default getNotification;
