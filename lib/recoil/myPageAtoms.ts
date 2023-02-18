import { atom, selector } from "recoil";

const myPagePhonNumber = atom<string>({
  key: "myPagePhonNumber",
  default: "",
});

const myPageUserName = atom({ key: "userName", default: "" });

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

const myPageBackgroundColor = atom({
  key: "myPageBackgroundColor",
  default: "#ffffff",
});

const myPageProfileImage = atom({
  key: "myPageProfileImage",
  default: "",
});

const myPageGender = atom<Gender>({ key: "myPageGender", default: "선택안함" });

const myPageIsPublic = atom({ key: "myPageIsPublic", default: true });

const myPageField = atom<string[]>({ key: "myPageField", default: [] });

const myPageSkills = atom<string[]>({
  key: "myPageSkills",
  default: [],
});

const myPageBirthYear = atom({ key: "myPageBirthYear", default: 0 });

const myPageCareer = atom({ key: "myPageCareer", default: "신입" });

// state 결합
const myPageUserProfile = selector({
  key: "myPageUserProfile",
  get: ({ get }) => {
    const phoneNumber = get(myPagePhonNumber);
    const userName = get(myPageUserName);
    const contactEmail = get(myPageContactEmail);
    const selfProfile = get(myPageSelfProfile);
    const userId = get(myPageUserId);
    const backgroundColor = get(myPageBackgroundColor);
    const profileImage = get(myPageProfileImage);
    const gender = get(myPageGender);
    const isPublic = get(myPageIsPublic);
    const field = get(myPageField);
    const skills = get(myPageSkills);
    const birthYear = get(myPageBirthYear);
    const career = get(myPageCareer);
    return {
      phoneNumber,
      userName,
      contactEmail,
      selfProfile,
      userId,
      backgroundColor,
      profileImage,
      gender,
      isPublic,
      field,
      skills,
      birthYear,
      career,
    };
  },
});

export {
  myPagePhonNumber,
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPageBackgroundColor,
  myPageUserId,
  myPageProfileImage,
  myPageUserProfile,
  myPageGender,
  myPageIsPublic,
  myPageField,
  myPageSkills,
  myPageBirthYear,
  myPageCareer,
};
