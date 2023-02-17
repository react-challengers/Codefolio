import { largeCategoryState, subCategoryState } from "@/lib/recoil/atoms";

import {
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
} from "@/lib/recoil/postAtoms";
import userLoginCheck from "@/lib/recoil/userLoginCheck";

import {
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPagePhonNumber,
  myPageUserId,
  myPageBackgroundColor,
  myPageProfileImage,
} from "@/lib/recoil/myPageAtoms";

export {
  userLoginCheck,
  largeCategoryState,
  subCategoryState,
  // post
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
  // myPage
  myPageUserName,
  myPageSelfProfile,
  myPageContactEmail,
  myPagePhonNumber,
  myPageUserId,
  myPageBackgroundColor,
  myPageProfileImage,
};
