import { atom } from "recoil";

/**
 * 현재 1개의 atom만 있기 때문에 export default를 사용합니다. 확장하면 해제합니다.
 */

const myPagePhonNumber = atom<string>({
  key: "myPagePhonNumber",
  default: "01063058727",
});

export default myPagePhonNumber;
