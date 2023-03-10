# Codefolio

<span align="center">

## [LiveDemo](https://code-folio.vercel.app/)
## [프로젝트 노션](https://www.notion.so/jeremy-kr/CodeFolio-Overview-6c02f39f8bdc47c7a7eb821329b5c90a?pvs=4)
  
</span>

## 실행방법

```sh
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
3. [Screen Shot](#screen-shot)
4. [Tech Stack](#tech-stack)
5. [ERD](#entity-relationship-diagram)
6. [Directory](#directory)

# Contributor

<div align="center">

|                                             [김상현](https://github.com/arch-spatula)                                              |                                              [윤준호](https://github.com/yunjunhojj)                                               |                                                [이승효](https://github.com/hyoloui)                                                 |                                               [이정익](https://github.com/Jeremy-Kr)                                                |                                                [허다은](https://github.com/nno3onn)                                                |
| :--------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
| <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/84452145?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/50473516?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/115724947?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/110771206?v=4" width="100" height="100"> | <img style="border-radius: 50%;" alt="Avatar" src="https://avatars.githubusercontent.com/u/60952506?v=4" width="100" height="100"> |

</div>

# 프로젝트 소개

> 부트캠프 수강생들이 작업한 프로젝트를 체계적으로 정리하여 채용과 연계할 수 있
> 는 포트폴리오 공유 서비스

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
├── Components
│   ├── Common
│   ├── CreatePost
│   ├── Detail
│   ├── Layouts
│   ├── Main
│   └── MyPage
├── README.md
├── hooks
│   ├── common
│   └── query
├── lib
│   ├── recoil
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
│   ├── icons
│   ├── images
│   └── logos
├── styles
├── supabase
├── tsconfig.json
├── types
├── types.d.ts
└── utils
    ├── APIs
    │   ├── socialLogin
    │   └── supabase
    ├── amplitude
    ├── card
    ├── commons
    ├── constant
    ├── detail
    └── notification
```
