import getYYYYMM from "@/utils/commons/getYYYYMM";
import { atom } from "recoil";

const postId = atom<string>({
  key: "postId",
  default: "",
});

const postTitle = atom<string>({
  key: "postTitle",
  default: "",
});

const postSubTitle = atom<string>({
  key: "postSubTitle",
  default: "",
});

const postTitleBackgroundImage = atom<string>({
  key: "postTitleBackgroundImage",
  default: "",
});

const postLargeCategory = atom<string>({
  key: "postLargeCategory",
  default: "웹",
});

const postSubCategory = atom<string>({
  key: "postSubCategory",
  default: "",
});

const postSkills = atom<string[]>({
  key: "postSkills",
  default: [],
});

const postProjectDuration = atom<[string, string]>({
  key: "postProjectDuration",
  default: [getYYYYMM(), getYYYYMM()],
});

interface MembersType {
  name: string;
  field: string[] | string;
  github: string;
}

const postMembers = atom<MembersType[]>({
  key: "postMembers",
  default: [],
});

const postTags = atom<string[]>({
  key: "postTags",
  default: [],
});

const postGithubUrl = atom<string>({
  key: "postGithubUrl",
  default: "",
});

const postDeployedUrl = atom<string>({
  key: "postDeplyedUrl",
  default: "",
});

const postContent = atom<string>({
  key: "postContent",
  default: "",
});

const postThubmnailCheck = atom<boolean>({
  key: "postThubmnailCheck",
  default: true,
});

export {
  postId,
  postTitle,
  postSubTitle,
  postTitleBackgroundImage,
  postLargeCategory,
  postSubCategory,
  postSkills,
  postProjectDuration,
  postMembers,
  postTags,
  postGithubUrl,
  postDeployedUrl,
  postContent,
  postThubmnailCheck,
};
