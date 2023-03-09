// url 유효성 검사 함수
const checkUrl = (url: string, isGithub = false): boolean => {
  const expression = isGithub
    ? /^https:\/\/github.com\/[^ "]+$/
    : /^https:\/\/[^ "]+$/;
  const regex = new RegExp(expression);

  return regex.test(url);
};

export default checkUrl;
