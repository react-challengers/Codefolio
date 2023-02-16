import { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import CardItemContainer from "@/Components/Mypage/CardItemContainer";
import MyPageContainer from "@/Components/Mypage/MyPageContainer";
import MypageTab from "@/Components/Mypage/MypageTab";
import TabProfile from "@/Components/Mypage/TabProfile";
import UserInfoContainer from "@/Components/Mypage/UserInfoContainer";
import { useRecoilValue } from "recoil";
import {
  myPageContactEmail,
  myPageSelfProfile,
  myPageUserName,
} from "@/lib/recoil";
import { Field } from "@/utils/constant/enums";
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

  const userName = useRecoilValue(myPageUserName);
  const contactEmail = useRecoilValue(myPageContactEmail);
  const selfProfile = useRecoilValue(myPageSelfProfile);

  const userInfo: UserProfileType = {
    id: "nno3onn",
    user_id: "nno3onn@naver.com",
    user_name: userName,
    contact_email: contactEmail,
    gender: "여자",
    bookmark_folders: ["example"],
    phone: "01063058727",
    field: Field.WEB,
    skills: ["a", "b", "c"],
    career: "3년차",
    is_public: true,
    birth_year: 1997,
    self_profile: selfProfile,
  };

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  return (
    <MyPageContainer>
      <UserInfoContainer />
      <MypageTab
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
