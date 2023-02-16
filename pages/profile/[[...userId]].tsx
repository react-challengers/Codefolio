import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import {
  CardItemContainer,
  MyPageContainer,
  MyPageTab,
  TabProfile,
  UserInfoContainer,
} from "@/Components/MyPage";
import { useRecoilValue } from "recoil";
import { myPagePhonNumber } from "@/lib/recoil";
import { UserProfileType } from "@/types";

const tabList = ["프로젝트", "팔로잉", "북마크", "좋아요", "보관함", "프로필"];

const cardItem = {
  imageSrc: "OK-LGTM.png",
  imageAlt: "Test",
  tagItems: ["Components", "API"],
  title: "React Profiler API로 컴포넌트 측정하기",
  subTitle: "조금씩 추상화하면서 설계하기",
  date: "2023.02.10",
  likes: 203,
  comments: 57,
  field: "WEB",
  linkURL: `/detail/${1}`,
};

const ProfilePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const itemList = new Array(10).fill(cardItem);

  const phone = useRecoilValue(myPagePhonNumber);

  const userInfo: UserProfileType = {
    id: "nno3onn",
    user_id: "nno3onn@naver.com",
    user_name: "허다은",
    contact_email: "nno3onn@gmail.com",
    gender: "여자",
    bookmark_folders: ["example"],
    phone,
    field: "WEB",
    skills: ["a", "b", "c"],
    career: "3년차",
    is_public: true,
    birth_year: 1997,
  };

  const { user_name: userName, contact_email: contactEmail } = userInfo;

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  return (
    <MyPageContainer>
      <UserInfoContainer
        username={userName}
        email={contactEmail}
        selfProfile="안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
      />
      <MyPageTab
        tabList={tabList}
        currentTab={currentTab}
        onClick={handleClick}
      />
      <ContentContainer>
        {currentTab === 5 ? (
          <TabProfile userInfo={userInfo} />
        ) : (
          <CardItemContainer itemList={itemList} />
        )}
      </ContentContainer>
    </MyPageContainer>
  );
};

const ContentContainer = styled.div`
  width: 64rem;
`;

export default ProfilePage;
