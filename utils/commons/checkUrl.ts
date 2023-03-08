// url 유효성 검사 함수
const checkUrl = (url: string): boolean => {
  const expression = /^(ftp|http|https):\/\/github.com\/[^ "]+$/;
  const regex = new RegExp(expression);

  return regex.test(url);
};

export default checkUrl;
