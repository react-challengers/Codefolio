import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";

type StorageName = "post-image" | "profile-image" | "background-image";
type IsFolder = string;

const uploadImage = async (
  file: File,
  storageName: StorageName,
  foldering?: IsFolder
) => {
  const imgPath = uuidv4();
  try {
    await supabase.storage.from(storageName).upload(foldering || imgPath, file);

    const { data } = await supabase.storage
      .from(storageName)
      .getPublicUrl(foldering || imgPath);
    return data.publicUrl;
  } catch (error) {
    return "";
  }
};

export default uploadImage;
