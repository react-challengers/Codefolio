const getPostDate = (date: string) => {
  const postDate = new Date(date);
  const year = postDate.getFullYear();
  const month = postDate.getMonth() + 1;
  const day = postDate.getDate();
  return `${year}.${month}.${day}`;
};

export default getPostDate;
