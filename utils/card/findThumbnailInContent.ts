const findThumbnailInContent = (thumbnail: string) => {
  // https://xxfgrnzupwpguxifhwsq.supabase.co/storage/v1/object/public/post-image/a6b4c159-e98f-4762-a6bb-dbf64f6ccc94/a6b4c159-e98f-4762-a6bb-dbf64f6ccc94 형식이 포함된 첫번째 url을 찾는다.

  const regex =
    /https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/post-image\/[a-z0-9-]+\/[a-z0-9-]+/g;

  const result = thumbnail.match(regex);
  if (result) {
    return result[0];
  }
  return "/images/thumnail_default.webp";
};

export default findThumbnailInContent;
