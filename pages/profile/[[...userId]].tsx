import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  CardItemContainer,
  GoodJobBadge,
  MyPageContainer,
  MyPageTab,
  TabProfile,
  UserInfoContainer,
} from "@/Components/MyPage";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getCurrentUser } from "@/utils/APIs/supabase";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPageCurrentTab, userLoginCheck } from "@/lib/recoil";
import { useUserProfile } from "@/hooks/query";

const ProfilePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useRecoilState(myPageCurrentTab);
  const [userId, setUserId] = useState("");
  const [likeIds, setLikeIds] = useState<string[]>([]);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);
  const isLogin = useRecoilValue(userLoginCheck);

  const { profileData } = useUserProfile();
  const router = useRouter();

  // 옵셔널 체이닝으로 존재하지 않는 프로필은 본인으로 리다이렉팅
  const profileUserId = router?.query?.userId?.[0];

  // profileUserId === "" && profileData.user_id === true
  let selfProfileTabList = ["프로젝트", "칭찬배지", "프로필"];

  if (!profileUserId) {
    selfProfileTabList = ["프로젝트", "북마크", "좋아요", "칭찬배지", "프로필"];
  } else if (profileUserId === profileData.user_id) {
    selfProfileTabList = ["프로젝트", "북마크", "좋아요", "칭찬배지", "프로필"];
  }

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setUserId(user.id);
      }
    },
  });

  const { data: itemList } = useQuery<PostType[]>(["GET_POSTS"], getAllPosts);

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  useEffect(() => {
    if (!profileData.user_id) return;
    if (isLogin && !profileUserId) {
      router.push(`/profile/${profileData.user_id}`);
    }
    if (!isLogin && !profileUserId) {
      router.push("/auth/login");
    }
  }, []);

  // 본인이 작성한 아이템 리스트
  const myItemList = useMemo(() => {
    if (!itemList) return [];

    // 로그인한 유저의 프로필
    if (profileData.user_id === profileUserId || !profileUserId)
      return itemList.filter((item) => item.user_id === userId);

    // 다른 프로필
    if (profileData.user_id !== profileUserId)
      return itemList.filter((item) => item.user_id === profileUserId);

    return [];
  }, [itemList, userId]);

  // 내가 북마크한 아이템 id 리스트
  const fetchBookmarkList = async () => {
    await supabase
      .from("bookmark")
      .select("post_id")
      .eq("user_id", userId)
      .then((res) => {
        if (res) {
          if (res.data === null) return;
          const listIdsList = res.data.map((item) => item.post_id);
          setBookmarkIds(listIdsList);
        }
      });
  };

  const bookmarkList = useMemo(() => {
    if (bookmarkIds) {
      if (!itemList) return [];
      return itemList.filter((item) => bookmarkIds.includes(item.id));
    }
    return itemList;
  }, [bookmarkIds, itemList]);

  // 내가 좋아요한 아이템 리스트
  const fetchLikeList = async () => {
    await supabase
      .from("like")
      .select("post_id")
      .eq("user_id", userId)
      .then((res) => {
        if (res) {
          if (res.data === null) return;
          const listIdsList = res.data.map((item) => item.post_id);
          setLikeIds(listIdsList);
        }
      });
  };

  const likeList = useMemo(() => {
    if (likeIds) {
      if (!itemList) return [];
      return itemList.filter((item) => likeIds.includes(item.id));
    }
    return itemList;
  }, [itemList, likeIds]);

  useEffect(() => {
    if (!userId) return;
    fetchBookmarkList();
    fetchLikeList();
  }, [userId]);

  const filteredItemList = useMemo(() => {
    switch (currentTab) {
      case 0:
        return myItemList;
      case 1:
        return bookmarkList;
      case 2:
        return likeList;
      default:
        return myItemList;
    }
  }, [currentTab, myItemList, bookmarkList, likeList]);

  if (!filteredItemList) return <div>에러</div>;

  // 중첩 삼항연산자 해체
  let Component = null;
  if (currentTab === selfProfileTabList.length - 1) {
    Component = <TabProfile />;
  } else if (currentTab === selfProfileTabList.length - 2) {
    Component = <GoodJobBadge />;
  } else if (filteredItemList?.length > 0) {
    Component = <CardItemContainer itemList={filteredItemList ?? []} />;
  } else {
    Component = <EmptyPost>게시글이 없습니다.</EmptyPost>;
  }

  return (
    <MyPageContainer>
      <UserInfoContainer profileUserId={profileUserId} />
      <MyPageTab
        tabList={selfProfileTabList}
        currentTab={currentTab}
        onClick={handleClick}
      />
      <ContentContainer>{Component}</ContentContainer>
    </MyPageContainer>
  );
};

const ContentContainer = styled.section`
  width: 58.75rem;
`;

const EmptyPost = styled.div`
  ${(props) => props.theme.fonts.title24}
  color: ${(props) => props.theme.colors.gray7};
  width: 100%;
  padding: 5.25rem 0;
  text-align: center;
`;

export default ProfilePage;
