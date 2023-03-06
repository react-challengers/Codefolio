import supabase from "@/lib/supabase";

const getNotification = async (currentUserId: string) => {
  const { data, error } = await supabase
    .from("notification")
    .select<string, NotificationType>("*")
    .eq("target_id", currentUserId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return [];
  }

  return data;
};

export default getNotification;
