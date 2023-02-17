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
import { getAllPosts } from "@/utils/APIs/supabase";
import { useRecoilValue } from "recoil";
import {
  myPageContactEmail,
  myPageSelfProfile,
  myPageUserName,
  myPagePhonNumber,
  myPageBackgroundColor,
} from "@/lib/recoil";

const tabList = ["프로젝트", "팔로잉", "북마크", "좋아요", "보관함", "프로필"];

const ProfilePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const userName = useRecoilValue(myPageUserName);
  const contactEmail = useRecoilValue(myPageContactEmail);
  const selfProfile = useRecoilValue(myPageSelfProfile);
  const phone = useRecoilValue(myPagePhonNumber);
  const userBackground = useRecoilValue(myPageBackgroundColor);

  const userInfo: Omit<UserProfileType, "id"> = {
    user_id: "nno3onn@naver.com",
    user_name: userName,
    contact_email: contactEmail,
    gender: "여자",
    bookmark_folders: ["example"],
    phone,
    field: ["WEB"],
    skills: ["a", "b", "c"],
    career: "3년차",
    is_public: true,
    birth_year: "1997",
    profile_image: "",
    self_profile: selfProfile,
    background_color: userBackground,
  };

  const [itemList, setItemList] = useState<PostType[]>([]);
  const queryClient = useQueryClient();

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      const newQueryData = await queryClient.fetchQuery<PostType[]>(
        ["GET_POSTS"],
        getAllPosts
      );
      return newQueryData;
    };

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
  }, [queryClient]);

  // TODO: itemList 이용해서 필터링된 카드 아이템 리스트 만들기
  return (
    <MyPageContainer>
      <UserInfoContainer />
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
