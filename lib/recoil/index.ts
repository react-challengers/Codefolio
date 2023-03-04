import { largeCategoryState, subCategoryState } from "@/lib/recoil/atoms";

import {
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
} from "@/lib/recoil/postAtoms";

import {
  postTitleVaildate,
  postSubTitleVaildate,
  postSubCategoryVaildate,
  postSkillsVaildate,
  postProjectDurationVaildate,
  postMembersVaildate,
  postTagsVaildate,
  postGithubUrlVaildate,
  postDeployedUrlVaildate,
  postContentVaildate,
  postErrorBoxText,
} from "@/lib/recoil/postValidateAtoms";

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
  myPageCurrentTab,
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
  // post validate
  postTitleVaildate,
  postSubTitleVaildate,
  postSubCategoryVaildate,
  postSkillsVaildate,
  postProjectDurationVaildate,
  postMembersVaildate,
  postTagsVaildate,
  postGithubUrlVaildate,
  postDeployedUrlVaildate,
  postContentVaildate,
  postErrorBoxText,
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
  myPageCurrentTab,
  // search
  searchValueState,
  // notification
  isNotificationState,
};
