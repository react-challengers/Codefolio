// 유효성 검사 함수
const validateFile = (file: File) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/svg+xml"];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
};

export default validateFile;
