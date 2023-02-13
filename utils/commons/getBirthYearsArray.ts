const getBirthYearsArray = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  return Array.from({ length: 20 }, (_, i) => thisYear - i);
};

export default getBirthYearsArray;
