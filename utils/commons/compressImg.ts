import imageCompression from "browser-image-compression";
// 이미지 압축
const compressImg = async (blob: File): Promise<File | void> => {
  const options = {
    maxSizeMB: 1,
    initialQuality: 0.55, // initial 0.7
  };
  const result = await imageCompression(blob, options)
    .then((res) => res)
    .catch((e) => console.log(e, "압축 에러"));
  return result;
};

export default compressImg;
