import supabase from "@/lib/supabase";

type StorageName = "post-image" | "profile-image" | "background-image";

const uploadImage = async (file: File, storageName: StorageName) => {
  const imgPath = crypto.randomUUID();
  try {
    await supabase.storage.from(storageName).upload(imgPath, file);

    const { data } = await supabase.storage
      .from(storageName)
      .getPublicUrl(imgPath);
    return data.publicUrl;
  } catch (error) {
    return "";
  }
};

export default uploadImage;
