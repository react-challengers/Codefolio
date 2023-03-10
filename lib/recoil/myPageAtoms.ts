import { atom, selector } from "recoil";

const myPageId = atom({ key: "myPageId", default: "" });

const myPagePhonNumber = atom({
  key: "myPagePhonNumber",
  default: "",
});

const myPageUserName = atom({ key: "userName", default: "" });

const myPageContactEmail = atom({
  key: "myPageContactEmail",
  default: "",
});

const myPageSelfProfile = atom({
  key: "myPageSelfProfile",
  default: "",
});

const myPageUserId = atom({
  key: "myPageUserId",
  default: "",
});

const myPageBackgroundImage = atom({
  key: "myPageBackgroundImage",
  default: "",
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

const myPageBirthYear = atom({
  key: "myPageBirthYear",
  default: "선택안함",
});

const myPageCareer = atom({ key: "myPageCareer", default: "신입" });

const myPageBookmarkFolders = atom<string[]>({
  key: "myPageBookmarkFolders",
  default: [],
});

const myPageGitHub = atom({ key: "myPageGitHub", default: "" });

// client only state만 존재합니다.
const myPageIsEditingProfileContainer = atom({
  key: "myPageIsEditingProfileContainer",
  default: false,
});

const myPageGithub = atom({
  key: "myPageGithub",
  default: "https://github.com",
});

const myPageCurrentTab = atom({
  key: "myPageCurrentTab",
  default: 0,
});

// state 결합하는 곳입니다.
const myPageUserProfile = selector({
  key: "myPageUserProfile",
  get: ({ get }) => {
    const id = get(myPageId);
    const phoneNumber = get(myPagePhonNumber);
    const userName = get(myPageUserName);
    const contactEmail = get(myPageContactEmail);
    const selfProfile = get(myPageSelfProfile);
    const userId = get(myPageUserId);
    const backgroundImage = get(myPageBackgroundImage);
    const profileImage = get(myPageProfileImage);
    const gender = get(myPageGender);
    const isPublic = get(myPageIsPublic);
    const field = get(myPageField);
    const skills = get(myPageSkills);
    const birthYear = get(myPageBirthYear);
    const career = get(myPageCareer);
    const bookmarkFolders = get(myPageBookmarkFolders);
    const github = get(myPageGitHub);

    // schema 유효성 검증
    const userProfile: UserProfileType = {
      id,
      phone: phoneNumber,
      user_name: userName,
      contact_email: contactEmail,
      self_profile: selfProfile,
      user_id: userId,
      background_image: backgroundImage,
      profile_image: profileImage,
      gender,
      is_public: isPublic,
      field,
      skills,
      birth_year: birthYear,
      career,
      bookmark_folders: bookmarkFolders,
      github,
    };
    return userProfile;
  },
});

export {
  myPagePhonNumber,
  myPageId,
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPageBackgroundImage,
  myPageUserId,
  myPageProfileImage,
  myPageUserProfile,
  myPageGender,
  myPageIsPublic,
  myPageField,
  myPageSkills,
  myPageBirthYear,
  myPageCareer,
  myPageBookmarkFolders,
  myPageGithub,
  // 순수 클라이언트 state
  myPageIsEditingProfileContainer,
  myPageCurrentTab,
};
