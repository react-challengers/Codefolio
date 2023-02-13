export const getBirthYearsArray = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  return Array.from({ length: 20 }, (_, i) => thisYear - i);
};

export const getCareerYearsArray = () => {
  return Array(20)
    .fill(null)
    .map((_, i) => `${i + 1}년`);
};
