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

# Tach Stack

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

# Directory

```
├── Components
│   ├── Common
│   │   ├── Auth
│   │   ├── Card
│   │   └── Skill
│   ├── CreatePost
│   │   └── Post
│   ├── Detail
│   │   ├── Comment
│   │   ├── DetailContent.tsx
│   │   ├── DetailHeader
│   │   ├── DetailSide
│   │   ├── DetailTitle.tsx
│   │   └── RelatedProject
│   ├── Layouts
│   ├── Main
│   │   ├── DetailModal.tsx
│   │   ├── MainSection.tsx
│   │   └── SideBar
│   └── MyPage
│       ├── CardItemContainer.tsx
│       ├── MyPageContainer.tsx
│       ├── MypageTab.tsx
│       ├── TabProfile
│       └── UserInfoContainer
├── README.md
├── hooks
│   ├── common
│   └── query
├── lib
│   ├── recoil
│   └── supabase.ts
├── pages
│   ├── 404.tsx
│   ├── 500.tsx
│   ├── _app.tsx
│   ├── _document.tsx
│   ├── auth
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── create-post.tsx
│   ├── detail
│   │   └── [id].tsx
│   ├── edit-post
│   │   └── [id].tsx
│   ├── index.tsx
│   └── profile
│       └── [[...userId]].tsx
├── public
├── styles
│   ├── global.css
│   ├── reset.css
│   ├── styled.d.ts
│   └── theme.ts
├── supabase
├── types
│   ├── enums.ts
│   └── supabase.ts
├── types.d.ts
└── utils
    ├── APIs
    │   ├── socialLogin
    │   └── supabase
    ├── card
    ├── commons
    └── constant
```

# Screen Shot

## Main

<img width="2488" alt="main-page" src="https://user-images.githubusercontent.com/110771206/220218098-a7b4ae92-3848-492a-9522-d3822527bc84.png">

## Detail

![Detail Screen Shot](https://user-images.githubusercontent.com/110771206/220218567-07ecf734-5a5a-4160-a0c5-02409c5d9ab3.png)

## Post

![Post Screen Shot](https://user-images.githubusercontent.com/110771206/220218836-df920e9f-c4dc-49ce-9893-326869c8c662.png)

## MyPage

![MyPage Screen Shot](https://user-images.githubusercontent.com/110771206/220219231-f573296d-9262-46bc-b7fa-f5679873cc7f.png)

## Profile

![Profile Screen Shot](https://user-images.githubusercontent.com/110771206/220219528-05a06279-fb0e-4645-9951-1ecbceb64005.png)
