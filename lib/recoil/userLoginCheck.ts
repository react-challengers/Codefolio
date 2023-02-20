import { atom } from "recoil";

const userLoginCheck = atom<boolean>({
  key: "userLoginCheck",
  default: false,
});

export default userLoginCheck;
