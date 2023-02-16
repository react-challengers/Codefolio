import { NextPage } from "next";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  CardItemContainer,
  MyPageContainer,
  MyPageTab,
  TabProfile,
  UserInfoContainer,
} from "@/Components/MyPage";
import { useQueryClient } from "@tanstack/react-query";
import { PostType } from "@/types";
import { getAllPosts } from "@/utils/APIs/supabase";
import { useRecoilValue } from "recoil";
import { myPagePhonNumber } from "@/lib/recoil";
import { UserProfileType } from "@/types";

const tabList = ["프로젝트", "팔로잉", "북마크", "좋아요", "보관함", "프로필"];
const userInfo = {
  id: "nno3onn",
  user_id: "nno3onn@naver.com",
  user_name: "허다은",
  contact_email: "nno3onn@gmail.com",
  gender: "여자",
  bookmark_folders: ["example"],
  phone: "01063058727",
  field: ["WEB"],
  skills: ["a", "b", "c"],
  careerer: "3년차",
  is_public: true,
  birth_year: 1997,
};

const ProfilePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

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
  const [itemList, setItemList] = useState<PostType[]>([]);
  const queryClient = useQueryClient();

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  const fetchAllPosts = async () => {
    const newQueryData = await queryClient.fetchQuery<PostType[]>(
      ["GET_POSTS"],
      getAllPosts
    );

    return newQueryData;
  };

  useEffect(() => {
    const queryData: PostType[] | undefined = queryClient.getQueryData([
      "GET_POSTS",
    ]);
    if (queryData) {
      setItemList(queryData);
    } else {
      fetchAllPosts().then((res) => {
        if (res) {
          setItemList(res);
        }
      });
    }
  }, []);

  // TODO: itemList 이용해서 필터링된 카드 아이템 리스트 만들기
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
