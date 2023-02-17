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
  myPageUserProfile,
  myPageUserName,
  myPageContactEmail,
  myPageSelfProfile,
  myPagePhonNumber,
  myPageUserId,
  myPageBackgroundColor,
  myPageProfileImage,
  myPageGender,
  myPageBirthYear,
  myPageCareer,
  myPageField,
  myPageIsPublic,
  myPageSkills,
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
  myPageUserProfile,
  myPageUserName,
  myPageSelfProfile,
  myPageContactEmail,
  myPagePhonNumber,
  myPageUserId,
  myPageBackgroundColor,
  myPageProfileImage,
  myPageGender,
  myPageBirthYear,
  myPageCareer,
  myPageField,
  myPageIsPublic,
  myPageSkills,
};
