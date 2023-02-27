import { largeCategoryState, subCategoryState } from "@/lib/recoil/atoms";

import {
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
} from "@/lib/recoil/postAtoms";
import userLoginCheck from "@/lib/recoil/userLoginCheck";

import {
  myPageUserProfile,
  myPageId,
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
  myPageBookmarkFolders,
  myPageIsEditingProfileContainer,
} from "@/lib/recoil/myPageAtoms";

export {
  userLoginCheck,
  largeCategoryState,
  subCategoryState,
  // post
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
  // myPage
  myPageId,
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
  myPageBookmarkFolders,
  myPageIsEditingProfileContainer,
};
