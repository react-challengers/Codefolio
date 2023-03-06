// 앞 3자리는 010 뒤 8자리는 0~9에 해당하는지 유효성을 검증합니다.
const checkIsPhoneNumber = (phoneNumber: string): boolean =>
  /^[0]{1}[1]{1}[0]{1}[0-9]{8}/.test(phoneNumber);

export default checkIsPhoneNumber;
