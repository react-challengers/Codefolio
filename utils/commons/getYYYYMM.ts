const getYYYYMM = (date = new Date()) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month < 10 ? `0${month}` : month}`;
};

export default getYYYYMM;
