import { atom } from "recoil";

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

export { myPageUserName, myPageContactEmail, myPageSelfProfile };
