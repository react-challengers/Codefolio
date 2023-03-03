import { atom } from "recoil";

const postErrorBoxText = atom<string>({
  key: "postErrorBoxText",
  default: "",
});

const postTitleVaildate = atom<string>({
  key: "postTitleVaildate",
  default: "",
});

const postSubTitleVaildate = atom<string>({
  key: "postSubTitleVaildate",
  default: "",
});

const postSubCategoryVaildate = atom<string>({
  key: "postSubCategoryVaildate",
  default: "",
});

const postSkillsVaildate = atom<string>({
  key: "postSkillsVaildate",
  default: "",
});

const postProjectDurationVaildate = atom<string>({
  key: "postProjectDurationVaildate",
  default: "",
});

const postMembersVaildate = atom<string>({
  key: "postMembersVaildate",
  default: "",
});
const postTagsVaildate = atom<string>({
  key: "postTagsVaildate",
  default: "",
});

const postGithubUrlVaildate = atom<string>({
  key: "postGithubUrlVaildate",
  default: "",
});

const postDeployedUrlVaildate = atom<string>({
  key: "postDeployedUrlVaildate",
  default: "",
});

const postContentVaildate = atom<string>({
  key: "postContentVaildate",
  default: "",
});

export {
  postTitleVaildate,
  postSubTitleVaildate,
  postSubCategoryVaildate,
  postSkillsVaildate,
  postProjectDurationVaildate,
  postMembersVaildate,
  postGithubUrlVaildate,
  postDeployedUrlVaildate,
  postContentVaildate,
  postErrorBoxText,
  postTagsVaildate,
};
