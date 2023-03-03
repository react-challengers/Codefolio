import { atom } from "recoil";

const searchValueState = atom<string>({
  key: "searchValueState",
  default: "",
});

export default searchValueState;
