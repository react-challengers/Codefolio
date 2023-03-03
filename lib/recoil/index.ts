import { largeCategoryState, subCategoryState } from "@/lib/recoil/atoms";

import {
  postId,
  postTitle,
  postSubTitle,
  postCoverImage,
  postLargeCategory,
  postSubCategory,
  postSkills,
  postProjectDuration,
  postMembers,
  postTags,
  postGithubUrl,
  postDeployedUrl,
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
  myPageBackgroundImage,
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

import searchValueState from "@/lib/recoil/searchValue";

import isNotificationState from "@/lib/recoil/notificationAtoms";

export {
  userLoginCheck,
  largeCategoryState,
  subCategoryState,
  // post
  postId,
  postTitle,
  postSubTitle,
  postCoverImage,
  postLargeCategory,
  postSubCategory,
  postSkills,
  postProjectDuration,
  postMembers,
  postTags,
  postGithubUrl,
  postDeployedUrl,
  postContent,
  // myPage
  myPageId,
  myPageUserProfile,
  myPageUserName,
  myPageSelfProfile,
  myPageContactEmail,
  myPagePhonNumber,
  myPageUserId,
  myPageBackgroundImage,
  myPageProfileImage,
  myPageGender,
  myPageBirthYear,
  myPageCareer,
  myPageField,
  myPageIsPublic,
  myPageSkills,
  myPageBookmarkFolders,
  myPageIsEditingProfileContainer,
  // search
  searchValueState,
  // notification
  isNotificationState,
};
