# Codefolio

<span align="center">

## [LiveDemo](https://code-folio.vercel.app/)

</span>

## 실행방법

```
$ git clone https://github.com/react-challengers/Codefolio.git
$ yarn
$ yarn dev
```

`http://localhost:3000` 접속

###### env.local

###### NEXT_PUBLIC_SUPABASE_URL=SUPABASE_URL

###### NEXT_PUBLIC_SUPABASE_ANON_KEY=SUPABASE_KEY

## 목차

1. [Contributer](#contributor)
2. [프로젝트 소개](#프로젝트-소개)
3. [Tach Stack](#tach-stack)
4. [Directory](#directory)
5. [Screen Shot](#screen-shot)

# Contributor

<div align="center">

|                                             [김상현](https://github.com/arch-spatula)                                              |                                              [윤준호](https://github.com/yunjunhojj)                                               |                                                [이승효](https://github.com/hyoloui)                                                 |                                               [이정익](https://github.com/Jeremy-Kr)                                                |                                                [허다은](https://github.com/nno3onn)                                                |
| :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/84452145?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/50473516?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/115724947?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/110771206?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/60952506?v=4" width="100" height="100"> |

</div>

# 프로젝트 소개

> 부트캠프 수강생들이 작업한 프로젝트를 체계적으로 정리하여 채용과 연계할 수 있는 포트폴리오 공유 서비스

# Tech Stack

<div align="center">

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a5e1d4bc-447d-417c-90bd-e90297efd82a/codefolio-cloudcraft.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230221%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230221T004444Z&X-Amz-Expires=86400&X-Amz-Signature=5515b2602eb3dd22bcd3f7ea094b93047b1257ed4ac45b314b9ad5fc7c9a3c74&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22codefolio-cloudcraft.png%22&x-id=GetObject)

</div>

- 프레임워크로 Next.js를 사용합니다.
- Next와 잘 어울리는 배포 시스템인 Vercel을 이용합니다.
- 빠른 백엔드 구축을 위해 BaaS 서비스인 Supabase를 사용합니다.
- 로컬 상태관리를 위해 recoil을 사용합니다.
- 서버 상태관리를 위해 react-query를 사용합니다.
- CSS in JS를 사용하기 위해 styled-components를 사용합니다.
- Text Editor는 toast/ui의 Editor를 사용합니다.
- 유틸리티를 편리하게 사용하기 위해 lodash를 사용합니다.

- Tech Stack 결정 과정
  [라이브러리 선정](https://www.notion.so/134c5edeb0d74724a7c381ca08e10c1f)

# Entity-Relationship Diagram

[직접 보기](https://www.erdcloud.com/d/h6pszoAJmTXDsDgcE)


![image](https://user-images.githubusercontent.com/115724947/223598438-d334bea5-751a-45ce-825d-791af5f0fb36.png)


# Directory

```
.
├── Components
│   ├── Common
│   │   ├── Auth
│   │   │   ├── AuthButton.tsx
│   │   │   ├── AuthInput.tsx
│   │   │   ├── ErrorMessageBox.tsx
│   │   │   ├── HelperTextBox.tsx
│   │   │   └── index.ts
│   │   ├── Card
│   │   │   ├── CardItem.tsx
│   │   │   └── IconWithCount.tsx
│   │   ├── ConfirmModal.tsx
│   │   ├── DefaultButton.tsx
│   │   ├── DropDown.tsx
│   │   ├── HelperTextBox.tsx
│   │   ├── Input.tsx
│   │   ├── LongButton.tsx
│   │   ├── Modal.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── ProfileImage.tsx
│   │   ├── Skill
│   │   │   ├── Skill.tsx
│   │   │   └── SkillList.tsx
│   │   ├── Tags.tsx
│   │   ├── Toggle.tsx
│   │   └── index.ts
│   ├── CreatePost
│   │   ├── ImageUploadText.tsx
│   │   ├── Post
│   │   │   ├── FieldDropDown.tsx
│   │   │   ├── FieldPicker.tsx
│   │   │   ├── Post.tsx
│   │   │   ├── PostErrorMessage.tsx
│   │   │   ├── PostTitle.tsx
│   │   │   ├── ProjectInfo.tsx
│   │   │   ├── ProjectInfoDropDown.tsx
│   │   │   └── WithPeople.tsx
│   │   └── PostEditor.tsx
│   ├── Detail
│   │   ├── Comment
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentInput.tsx
│   │   │   ├── CommentItem.tsx
│   │   │   └── CommentList.tsx
│   │   ├── DetailArticle.tsx
│   │   ├── DetailBadges.tsx
│   │   ├── DetailBadgesContainer.tsx
│   │   ├── DetailContent.tsx
│   │   ├── DetailHeader
│   │   │   ├── DeleteModal.tsx
│   │   │   ├── DetailHeader.tsx
│   │   │   └── ShowMoreModal.tsx
│   │   ├── DetailSide
│   │   │   ├── DetailBadgeModal.tsx
│   │   │   ├── DetailBox.tsx
│   │   │   ├── DetailSide.tsx
│   │   │   ├── DetailSideBadges.tsx
│   │   │   ├── DetailSideContainer.tsx
│   │   │   ├── DetailSidePeople.tsx
│   │   │   ├── DetailSideProject.tsx
│   │   │   └── DetailWith.tsx
│   │   ├── DetailTitle.tsx
│   │   ├── RelatedProject
│   │   │   ├── RelatedProject.tsx
│   │   │   ├── SwiperNextButton.tsx
│   │   │   └── SwiperPrevButton.tsx
│   │   └── index.ts
│   ├── Layouts
│   │   ├── CreatePostIcon.tsx
│   │   ├── Footer.tsx
│   │   ├── GNB.tsx
│   │   ├── Notification.tsx
│   │   ├── NotificationBookmarkIcon.tsx
│   │   ├── NotificationCommentIcon.tsx
│   │   ├── NotificationIcons.tsx
│   │   ├── NotificationItem.tsx
│   │   ├── NotificationLikeIcon.tsx
│   │   ├── SearchBar.tsx
│   │   └── index.ts
│   ├── Main
│   │   ├── CategoryTag.tsx
│   │   ├── DetailModal.tsx
│   │   ├── HomeDropDownIcon.tsx
│   │   ├── MainSection.tsx
│   │   ├── SideBar
│   │   │   ├── LargeCategory.tsx
│   │   │   └── SideBar.tsx
│   │   └── index.ts
│   └── MyPage
│       ├── CardItemContainer.tsx
│       ├── MyPageContainer.tsx
│       ├── MypageTab.tsx
│       ├── TabProfile
│       │   ├── BadgeIcon.tsx
│       │   ├── DropDown.tsx
│       │   ├── EditProfileContainer.tsx
│       │   ├── GoodJobBadge.tsx
│       │   ├── PositionTag.tsx
│       │   ├── PrivateProfileContainer.tsx
│       │   ├── ProfileComment.tsx
│       │   ├── ProfileCommentInput.tsx
│       │   ├── ProfileContainer.tsx
│       │   ├── ShowProfileContainer.tsx
│       │   ├── SwitchButton.tsx
│       │   └── TabProfile.tsx
│       ├── UserInfoContainer
│       │   ├── Banner.tsx
│       │   ├── UserInfoContainer.tsx
│       │   └── useUserImage.ts
│       └── index.ts
├── README.md
├── hooks
│   ├── common
│   │   ├── index.ts
│   │   ├── useInput.ts
│   │   ├── useScrollTop.ts
│   │   ├── useStopScroll.ts
│   │   └── useSubscribeRoute.ts
│   ├── index.ts
│   └── query
│       ├── index.ts
│       ├── useCheckInteraction.ts
│       ├── useOutsideClick.ts
│       └── useUserProfile.ts
├── lib
│   ├── recoil
│   │   ├── InfiniteScroll.ts
│   │   ├── atoms.ts
│   │   ├── index.ts
│   │   ├── myPageAtoms.ts
│   │   ├── notificationAtoms.ts
│   │   ├── postAtoms.ts
│   │   ├── postValidateAtoms.ts
│   │   ├── searchValue.ts
│   │   └── userLoginCheck.ts
│   └── supabase.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── pages
│   ├── 404.tsx
│   ├── 500.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── auth
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── create-post.tsx
│   ├── detail
│   │   └── [id].tsx
│   ├── edit-post
│   │   └── [id].tsx
│   ├── index.tsx
│   ├── on-boarding.tsx
│   ├── profile
│   │   └── [[...userId]].tsx
│   └── search.tsx
├── public
│   ├── favicon.ico
│   ├── icons
│   │   ├── 36-communication.svg
│   │   ├── 36-implementation.svg
│   │   ├── 36-initiative.svg
│   │   ├── 36-pencil.svg
│   │   ├── 36-puzzle.svg
│   │   ├── arrow-up.svg
│   │   ├── arrow.svg
│   │   ├── arrow_down.svg
│   │   ├── badge-check.svg
│   │   ├── badge-code.svg
│   │   ├── badge-light.svg
│   │   ├── badge-setting.svg
│   │   ├── bookmark.svg
│   │   ├── bookmarkHover.svg
│   │   ├── bottom_arrow.svg
│   │   ├── cancel.svg
│   │   ├── chat.svg
│   │   ├── check.svg
│   │   ├── close.png
│   │   ├── close.svg
│   │   ├── color_fill.svg
│   │   ├── comment.svg
│   │   ├── commentHover.svg
│   │   ├── disable_check.svg
│   │   ├── edit.svg
│   │   ├── enable_check.svg
│   │   ├── favicon.ico
│   │   ├── github.svg
│   │   ├── ico-edit.svg
│   │   ├── ico-heart.svg
│   │   ├── ico-photo.svg
│   │   ├── ico_ExclamationMark.svg
│   │   ├── ico_close_16.svg
│   │   ├── ico_github.svg
│   │   ├── ico_google.svg
│   │   ├── image-upload-text.svg
│   │   ├── image_upload.svg
│   │   ├── like.svg
│   │   ├── likeHover.svg
│   │   ├── logout.svg
│   │   ├── more-on.svg
│   │   ├── more.svg
│   │   ├── next_button.svg
│   │   ├── notification.svg
│   │   ├── pencil.svg
│   │   ├── person.svg
│   │   ├── post.svg
│   │   ├── prev_button.svg
│   │   ├── private.svg
│   │   ├── puzzle.svg
│   │   ├── search.svg
│   │   ├── tool.svg
│   │   ├── trash_can.svg
│   │   └── 메인
│   │       └── mdi_comment-outline.svg
│   ├── images
│   │   ├── anonImage.png
│   │   ├── anonImage.webp
│   │   ├── anonProfile.jpeg
│   │   ├── error_boy.png
│   │   ├── favicon.ico
│   │   ├── login_background.png
│   │   ├── ogImage.png
│   │   └── signup_background.png
│   ├── logos
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   └── mainLogo.svg
│   ├── next.svg
│   ├── thirteen.svg
│   └── vercel.svg
├── styles
│   ├── global.css
│   ├── reset.css
│   ├── styled.d.ts
│   └── theme.ts
├── supabase
│   ├── config.toml
│   └── seed.sql
├── tsconfig.json
├── types
│   ├── enums.ts
│   └── supabase.ts
├── types.d.ts
├── utils
│   ├── APIs
│   │   ├── index.ts
│   │   ├── socialLogin
│   │   │   └── index.ts
│   │   └── supabase
│   │       ├── addBookmark.ts
│   │       ├── addLike.ts
│   │       ├── addPostBadge.ts
│   │       ├── addProfileBadge.ts
│   │       ├── decrementBookmark.ts
│   │       ├── decrementComment.ts
│   │       ├── decrementLike.ts
│   │       ├── deleteBookmark.ts
│   │       ├── deleteComment.ts
│   │       ├── deleteLike.ts
│   │       ├── deletePost.ts
│   │       ├── deletePostBadge.ts
│   │       ├── deleteProfileBadge.ts
│   │       ├── editComment.ts
│   │       ├── getAllPosts.ts
│   │       ├── getAllPostsCount.ts
│   │       ├── getBadgeByUid.ts
│   │       ├── getCurrentUser.ts
│   │       ├── getInfinitePosts.ts
│   │       ├── getIsBookmark.ts
│   │       ├── getIsComment.ts
│   │       ├── getIsLike.ts
│   │       ├── getNotification.ts
│   │       ├── getOnePost.ts
│   │       ├── getPostBadges.ts
│   │       ├── getPostsByCategory.ts
│   │       ├── getProfile.ts
│   │       ├── getProfileBadgeByUid.ts
│   │       ├── getSingleUser.ts
│   │       ├── getUser.ts
│   │       ├── getUserBadge.ts
│   │       ├── getUserProfile.ts
│   │       ├── incrementBookmark.ts
│   │       ├── incrementComment.ts
│   │       ├── incrementLike.ts
│   │       ├── index.ts
│   │       ├── patchUserProfile.ts
│   │       ├── postComment.ts
│   │       ├── postNotificationRead.ts
│   │       └── postProfileComment.ts
│   ├── amplitude
│   │   └── amplitude.ts
│   ├── card
│   │   ├── findThumbnailInContent.ts
│   │   ├── getPostDate.ts
│   │   └── index.ts
│   ├── commons
│   │   ├── authUtils.ts
│   │   ├── authValidate.ts
│   │   ├── checkIsPhoneNumber.ts
│   │   ├── checkUrl.ts
│   │   ├── compressImg.ts
│   │   ├── convertBase64ToFile.ts
│   │   ├── getYYYYMM.ts
│   │   ├── getYearsArray.ts
│   │   ├── index.ts
│   │   ├── uploadImage.ts
│   │   ├── validationImage.ts
│   │   └── viewCreateAt.ts
│   ├── constant
│   │   └── index.ts
│   ├── detail
│   │   └── getTextColorByBackgroundColor.ts
│   └── notification
│       └── createNotificationContent.ts
```

# Screen Shot

## Main

![스크린샷 2023-03-08 오후 2 19 01](https://user-images.githubusercontent.com/115724947/223626150-ce1e481e-cf49-4ea2-b410-6d8441a70f5f.png)

## Detail

![스크린샷 2023-03-08 오후 2 25 54](https://user-images.githubusercontent.com/115724947/223626925-9c9b23f5-d8f1-4e17-9dc0-e9a07dd63a30.png)

## Post

![스크린샷 2023-03-08 오후 2 24 37](https://user-images.githubusercontent.com/115724947/223626787-19ca90d4-db7d-4dbe-a40b-0ebc1d4d6fe4.png)

## MyPage

![스크린샷 2023-03-08 오후 2 26 28](https://user-images.githubusercontent.com/115724947/223627014-df0ea0e2-dea5-4a92-b7bf-78d6d0b5714d.png)

## Profile

![스크린샷 2023-03-08 오후 2 28 02](https://user-images.githubusercontent.com/115724947/223627219-160579ab-1b40-4fed-a524-7b1a85aee158.png)
