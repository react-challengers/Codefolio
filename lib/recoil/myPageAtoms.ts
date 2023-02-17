import { atom } from "recoil";

const myPagePhonNumber = atom<string>({
  key: "myPagePhonNumber",
  default: "",
});

const myPageUserName = atom({ key: "userName", default: "허다은" });

const myPageContactEmail = atom({
  key: "myPageContactEmail",
  default: "",
});

const myPageSelfProfile = atom({
  key: "myPageselfProfile",
  default: "",
});

const myPageUserId = atom({
  key: "myPageUserId",
  default: "",
});

export {
  myPagePhonNumber,
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPageUserId,
};
