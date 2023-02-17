import { atom } from "recoil";

const myPagePhonNumber = atom<string>({
  key: "myPagePhonNumber",
  default: "01063058727",
});

const myPageUserName = atom({ key: "userName", default: "허다은" });

const myPageContactEmail = atom({
  key: "myPageContactEmail",
  default: "nno3onn@gmail.com",
});

const myPageSelfProfile = atom({
  key: "myPageselfProfile",
  default:
    "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요",
});

const myPageBackgroundColor = atom({
  key: "myPageBackgroundColor",
  default: "#ffffff",
});

export {
  myPagePhonNumber,
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPageBackgroundColor,
};
