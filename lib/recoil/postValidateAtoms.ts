import { atom } from "recoil";

const postErrorBoxText = atom<string>({
  key: "postErrorBoxText",
  default: "",
});

const postTitleValidate = atom<string>({
  key: "postTitleValidate",
  default: "",
});

const postSubTitleValidate = atom<string>({
  key: "postSubTitleValidate",
  default: "",
});

const postSubCategoryValidate = atom<string>({
  key: "postSubCategoryValidate",
  default: "",
});

const postSkillsValidate = atom<string>({
  key: "postSkillsValidate",
  default: "",
});

const postProjectDurationValidate = atom<string>({
  key: "postProjectDurationValidate",
  default: "",
});

interface MembersValidateType {
  name: string;
  field: string;
  github: string;
}

const postMembersValidate = atom<MembersValidateType[]>({
  key: "postMembersValidate",
  default: [],
});
const postTagsValidate = atom<string>({
  key: "postTagsValidate",
  default: "",
});

const postGithubUrlValidate = atom<string>({
  key: "postGithubUrlValidate",
  default: "",
});

const postDeployedUrlValidate = atom<string>({
  key: "postDeployedUrlValidate",
  default: "",
});

const postContentValidate = atom<string>({
  key: "postContentValidate",
  default: "",
});

export {
  postTitleValidate,
  postSubTitleValidate,
  postSubCategoryValidate,
  postSkillsValidate,
  postProjectDurationValidate,
  postMembersValidate,
  postGithubUrlValidate,
  postDeployedUrlValidate,
  postContentValidate,
  postErrorBoxText,
  postTagsValidate,
};
