import supabase from "@/lib/supabase";

const postNotificationRead = async (id: string) => {
  const { data, error } = await supabase
    .from("notification")
    .update({ is_read: true })
    .match({ id });

  if (error) {
    console.error(error.message);
  }

  return data;
};

export default postNotificationRead;
