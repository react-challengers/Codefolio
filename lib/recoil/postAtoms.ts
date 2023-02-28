import getYYYYMM from "@/utils/commons/getYYYYMM";
import { v4 as uuidv4 } from "uuid";
import { atom } from "recoil";

const postId = atom<string>({
  key: "postId",
  default: `${uuidv4()}`,
});

const postTitle = atom<string>({
  key: "postTitle",
  default: "",
});

const postSubTitle = atom<string>({
  key: "postSubTitle",
  default: "",
});

const postTitleBackgroundColor = atom<string>({
  key: "postTitleBackgroundColor",
  default: "#fff",
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
  field: string;
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

const postPublic = atom<boolean>({
  key: "postPublic",
  default: true,
});

const postContent = atom<string>({
  key: "postContent",
  default: "",
});

export {
  postId,
  postTitle,
  postSubTitle,
  postTitleBackgroundColor,
  postLargeCategory,
  postSubCategory,
  postSkills,
  postProjectDuration,
  postMembers,
  postTags,
  postPublic,
  postContent,
};
